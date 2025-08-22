from models import ResultTemplate
import numpy as np
from utils.relevance import relevance


def add_relevance(
    tree: ResultTemplate, indexed_embeddings: list[tuple[int, np.ndarray]]
) -> ResultTemplate:
    position_set = set(tree["positions"])

    sub_indexed_embeddings = [
        (i, item) for (i, item) in indexed_embeddings if i in position_set
    ]

    embeddings = [item for _, item in indexed_embeddings]
    sub_embeddings = [item for _, item in sub_indexed_embeddings]

    return ResultTemplate(
        label=tree["label"],
        positions=tree["positions"],
        relevancy=relevance(embeddings, sub_embeddings),
        children=[
            add_relevance(child, sub_indexed_embeddings)
            for child in (tree["children"] or [])
        ],
    )
