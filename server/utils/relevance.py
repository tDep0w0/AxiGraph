import numpy as np
from utils.cosine_similarity import cosine_similarity


def relevance(
    parent_vectors: list[np.ndarray], child_vectors: list[np.ndarray]
) -> float:
    parent_centroid: np.ndarray = np.mean(parent_vectors, axis=0)
    child_centroid: np.ndarray = np.mean(child_vectors, axis=0)

    return cosine_similarity(parent_centroid, child_centroid)
