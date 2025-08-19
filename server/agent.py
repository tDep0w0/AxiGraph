from typing import Annotated
from langgraph.graph import StateGraph, END
from langgraph.types import Command
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import ToolNode, InjectedState
from langchain_core.messages import HumanMessage, ToolMessage
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool, InjectedToolCallId
from dotenv import load_dotenv
import json
from utils.clean_json_string import clean_json_string
from utils.get_cluster_prompt import get_cluster_prompt
from filter_prompt import filter_prompt
from utils.mindmap_format import mindmap_format
from utils.filter_tree import filter_tree
from utils.mindmap_cast import mindmap_cast
from utils.get_search_result import get_search_result
from models import ResultTemplate, AgentState, MindMap
import math
from services.search import search

load_dotenv()

memory = MemorySaver()

cluster_model = ChatOpenAI(model="gpt-4o", temperature=0)
filter_model = ChatOpenAI(model="gpt-4o-mini", temperature=0)


def clusterize(tree: ResultTemplate, results: list[dict], depth=0):
    if len(tree["positions"] or []) <= 5 or depth > math.ceil(len(results) / 10):
        tree["children"] = []
        return

    if len(tree["positions"] or []) >= 30:
        cluster_prompt = get_cluster_prompt(4, 7)
    else:
        cluster_prompt = get_cluster_prompt(2, 3)

    positions_set = set(tree["positions"] or [])
    filtered_result = [
        item for item in results if item.get("position") in positions_set
    ]

    response = cluster_model.invoke(
        [cluster_prompt] + [HumanMessage(content=json.dumps(filtered_result))]
    )
    formatted_response = list(json.loads(clean_json_string(str(response.content))))

    print(formatted_response)

    for child in formatted_response:
        clusterize(child, results, depth + 1)

    tree["children"] = formatted_response


@tool
async def fetch_data(
    topic: str,
    tool_call_id: Annotated[str, InjectedToolCallId],
) -> Command | str:
    """Fetch new data based on a given topic"""

    print("Getting search result...")

    data = await get_search_result(topic)

    print("Search result received.")

    mapped_data = [
        {
            "position": item.get("position"),
            "title": item.get("title"),
            "snippet": item.get("snippet"),
        }
        for item in data
    ]

    tree: ResultTemplate | MindMap | None = {
        "label": topic,
        "positions": [item.get("position") for item in data],
        "children": None,
    }

    clusterize(tree, mapped_data)

    tree = mindmap_cast(tree)
    tree = mindmap_format(tree)

    return Command(
        update={
            "messages": [
                ToolMessage(f"Data updated successfully", tool_call_id=tool_call_id)
            ],
            "topic": topic,
            "search_result": data,
            "clustered_result": tree,
        }
    )


@tool
async def filter_data(
    topic: str,
    is_filter_out: bool,
    state: Annotated[AgentState, InjectedState],
    tool_call_id: Annotated[str, InjectedToolCallId],
) -> Command:
    """Filter the current data

    Args:
        topic: The topic to filter
        is_filter_out:
            - if true: filter out all the data related to the topic.
            - if false: keep only the data related to the topic.
    """

    search_result = state["search_result"] or []

    mapped_data = [
        {
            "title": item.get("title"),
            "snippet": item.get("snippet"),
        }
        for item in search_result
    ]

    filtered_result = []
    filtered_positions = set()

    for idx, item in enumerate(mapped_data):
        print(idx)
        response = await filter_model.ainvoke(
            [filter_prompt]
            + [HumanMessage(content=json.dumps(item) + f"topic: {topic}")]
        )

        if ("no" in str(response.content) and is_filter_out) or (
            "yes" in str(response.content) and not is_filter_out
        ):
            filtered_result.append(search_result[idx])
            filtered_positions.add(search_result[idx].get("position"))

    formatted_tree = None
    if state["clustered_result"] is not None:
        filtered_tree = filter_tree(state["clustered_result"], filtered_positions)
        formatted_tree = mindmap_format(filtered_tree)

    return Command(
        update={
            "messages": [
                ToolMessage(f"Data filtered successfully", tool_call_id=tool_call_id)
            ],
            "search_result": filtered_result,
            "clustered_result": formatted_tree,
        }
    )


tools = [fetch_data, filter_data]
tool_list = ["fetch_data", "filter_data"]

model = ChatOpenAI(model="gpt-4o-mini", temperature=0).bind_tools(tools=tools)

tool_node = ToolNode(tools=tools)


async def model_node(state: AgentState) -> AgentState:
    result = await model.ainvoke(state["messages"])
    return {**state, "messages": [result]}


async def tools_router(state: AgentState):
    last_message = state["messages"][-1]

    if hasattr(last_message, "tool_calls") and len(last_message.tool_calls) > 0:
        return "tool_node"

    return END


graph_builder = StateGraph(AgentState)

graph_builder.add_node("model", model_node)
graph_builder.add_node("tool_node", tool_node)

graph_builder.set_entry_point("model")

graph_builder.add_conditional_edges("model", tools_router)
graph_builder.add_edge("tool_node", "model")

graph = graph_builder.compile(checkpointer=memory)
