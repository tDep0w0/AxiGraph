from langchain_openai import OpenAIEmbeddings
from langchain_core.tools import tool, InjectedToolCallId
from langchain_core.messages import ToolMessage
from langgraph.types import Command
import numpy as np
from typing import Annotated
from sklearn.preprocessing import normalize
from sklearn.cluster import KMeans
from utils.get_search_result import get_search_result
from utils.choose_k import choose_k
from utils.label_cluster import label_cluster
from utils.mindmap_cast import mindmap_cast
from models import ResultTemplate, SearchResult, PatentData
from collections import defaultdict
from dotenv import load_dotenv
import asyncio

load_dotenv()


async def recursive_cluster(
    indexed_data: list[tuple[int, SearchResult]],
    embeddings,
    min_cluster_size: int = 5,
) -> ResultTemplate:

    n = len(indexed_data)
    idxs = [i for i, _ in indexed_data]
    sub_data = [result for _, result in indexed_data]
    sub_embeddings = [embeddings[i] for i in idxs]
    positions = [result.get("position") for result in sub_data]

    mapped_data: list[PatentData] = [
        {
            "title": result.get("title_full") or result.get("title"),
            "abstract": result.get("abstract") or result.get("snippet"),
        }
        for result in sub_data
    ]

    print("Clustering...")

    label_task = asyncio.create_task(label_cluster(mapped_data))

    k = choose_k(n)

    if n <= min_cluster_size or k <= 1:
        return ResultTemplate(
            label=await label_task,
            positions=positions,
            children=[],
        )

    kmeans = KMeans(n_clusters=k, random_state=42, n_init="auto")
    labels = kmeans.fit_predict(sub_embeddings)

    clusters = defaultdict(list[tuple[int, SearchResult]])
    for label, indexed_result in zip(labels, indexed_data):
        clusters[label].append(indexed_result)

    children_coros = [
        recursive_cluster(indexed_results, embeddings)
        for _, indexed_results in clusters.items()
    ]
    children = await asyncio.gather(*children_coros)

    return ResultTemplate(
        label=await label_task,
        positions=positions,
        children=children,
    )


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
