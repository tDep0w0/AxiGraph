from langchain_core.tools import tool, InjectedToolCallId
from langchain_core.messages import HumanMessage, ToolMessage
from langchain_openai import ChatOpenAI
from langgraph.types import Command
from langgraph.prebuilt import InjectedState
from constants.filter_prompt import filter_prompt
from utils.filter_tree import filter_tree
from utils.mindmap_format import mindmap_format
from typing import Annotated
from models import AgentState
from dotenv import load_dotenv
import json

load_dotenv()

filter_model = ChatOpenAI(model="gpt-4o-mini", temperature=0)


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
            "abstract": item.get("abstract"),
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
