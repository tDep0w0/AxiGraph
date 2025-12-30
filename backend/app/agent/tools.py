from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.tools import tool, InjectedToolCallId
from langchain_core.messages import HumanMessage, ToolMessage
from langgraph.types import Command
from langgraph.prebuilt import InjectedState
import numpy as np
import json
from typing import Annotated
from sklearn.preprocessing import normalize
from dotenv import load_dotenv
from services.get_search_result import get_search_result
from services.mindmap_cast import mindmap_cast
from services.recursive_cluster import recursive_cluster
from services.filter_tree import filter_tree
from services.mindmap_format import mindmap_format
from agent.prompts.filter_prompt import filter_prompt
from models import AgentState

load_dotenv()


@tool
async def fetch_data(
    topic: str,
    tool_call_id: Annotated[str, InjectedToolCallId],
) -> Command:
    """Fetch new data based on a given topic"""

    print("Getting search results...")

    data = await get_search_result(topic)

    print("Search results received.")

    embed_model = OpenAIEmbeddings(model="text-embedding-3-large")

    texts = [
        f"{result.get('title_full') or result.get("title")}. {result.get('abstract') or result.get('snippet')}"
        for result in data
    ]

    unnormalized_embeddings = np.array(await embed_model.aembed_documents(texts))
    embeddings = normalize(unnormalized_embeddings)

    indexed_data = list(enumerate(data))

    tree = await recursive_cluster(indexed_data, embeddings)

    tree["label"] = topic.capitalize()

    mindmap = mindmap_cast(tree)

    return Command(
        update={
            "messages": [
                ToolMessage(f"Data updated successfully", tool_call_id=tool_call_id)
            ],
            "topic": topic,
            "search_result": data,
            "clustered_result": mindmap,
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

    filter_model = ChatOpenAI(model="gpt-4o-mini", temperature=0)

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


tools = [fetch_data, filter_data]
