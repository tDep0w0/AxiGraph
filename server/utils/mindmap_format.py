from models import MindMap


def mindmap_format(tree: MindMap) -> MindMap | None:
    """Trimming off any empty node or node with single child"""

    if len(tree["data"]["positions"] or []) == 0:
        return None

    children = [
        child
        for child in [mindmap_format(child) for child in (tree.get("children") or [])]
        if child is not None
    ]

    if len(children) == 0 or len(children) == 1:
        return MindMap(
            id=tree["id"],
            data={
                "label": tree["data"]["label"],
                "positions": tree["data"]["positions"],
                "relevancy": tree["data"]["relevancy"],
            },
            children=[],
        )

    return MindMap(
        id=tree["id"],
        data={
            "label": tree["data"]["label"],
            "positions": tree["data"]["positions"],
            "relevancy": tree["data"]["relevancy"],
        },
        children=children,
    )
