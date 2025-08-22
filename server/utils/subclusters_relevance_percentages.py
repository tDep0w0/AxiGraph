import numpy as np
from utils.cosine_similarity import cosine_similarity


def subclusters_relevance_percentages(
    parent_vectors: list[np.ndarray], subclusters: list[list[np.ndarray]]
) -> np.ndarray:
    parent_centroid: np.ndarray = np.mean(parent_vectors, axis=0)

    sims = []

    for child in subclusters:
        child_centroid: np.ndarray = np.mean(child, axis=0)
        sims.append(cosine_similarity(parent_centroid, child_centroid))

    sims_array = np.array(sims)
    percentages: np.ndarray = sims_array / sims_array.sum() * 100

    # Round to nearest integer
    rounded: np.ndarray = np.rint(percentages).astype(int)

    # Fix rounding error so sum = 100
    diff = 100 - rounded.sum()
    if diff != 0:
        # Adjust the cluster with the largest decimal remainder
        remainders = percentages - np.floor(percentages)
        idx = np.argmax(remainders) if diff > 0 else np.argmin(remainders)
        rounded[idx] += diff

    return rounded
