from models import ResultTemplate
import numpy as np
from const import a


def normalize_tree(tree: ResultTemplate, percent: int) -> ResultTemplate:
    children = tree["children"] or []

    if len(children) == 0:
        return ResultTemplate(
            label=tree["label"],
            positions=tree["positions"],
            relevancy=percent,
            children=[],
        )

    relevancies = np.array([child.get("relevancy") for child in children])
    percentages: np.ndarray = relevancies / relevancies.sum() * percent

    # Round to nearest integer
    rounded_percentages: np.ndarray = np.rint(percentages).astype(int)

    # Fix rounding error so sum = 100
    diff = percent - rounded_percentages.sum()
    if diff != 0:
        remainders = percentages - np.floor(percentages)
        idx = np.argmax(remainders) if diff > 0 else np.argmin(remainders)
        rounded_percentages[idx] += diff

    return ResultTemplate(
        label=tree["label"],
        positions=tree["positions"],
        relevancy=percent,
        children=[
            normalize_tree(child, int(percentage))
            for child, percentage in zip(children, rounded_percentages)
        ],
    )


if __name__ == "__main__":
    print(normalize_tree(a, 100))
