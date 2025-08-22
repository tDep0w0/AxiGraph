from models import ResultTemplate, MindMap
from utils.get_cluster_prompt import get_cluster_prompt
from utils.clean_json_string import clean_json_string
from utils.get_search_result import get_search_result
from utils.mindmap_cast import mindmap_cast
from utils.mindmap_format import mindmap_format
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, ToolMessage
from langchain_core.tools import tool, InjectedToolCallId
from langgraph.types import Command
from dotenv import load_dotenv
from typing import Annotated
import math
import json

load_dotenv()

cluster_model = ChatOpenAI(model="gpt-4o", temperature=0)


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
) -> Command:
    """Fetch new data based on a given topic"""

    print("Getting search result...")

    data = await get_search_result(topic)

    print("Search result received.")

    mapped_data = [
        {
            "position": item.get("position"),
            "title": item.get("title"),
            "abstract": item.get("abstract"),
        }
        for item in data
    ]

    tree: ResultTemplate | MindMap | None = {
        "label": topic,
        "positions": [item.get("position") for item in data],
        "children": None,
        "relevancy": None,
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
