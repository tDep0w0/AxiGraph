from sklearn.cluster import KMeans
from services.choose_k import choose_k
from services.label_cluster import label_cluster
from models import ResultTemplate, SearchResult, PatentData
from collections import defaultdict
import asyncio


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
