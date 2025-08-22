import math


def choose_k(n: int) -> int:
    """Return how many clusters to split into given n items."""

    if n <= 2:
        return 1
    elif n <= 5:
        return 2
    elif n <= 10:
        return 3
    else:
        return int(math.sqrt(n))
