from models import MindMap


def filter_tree(tree: MindMap, positions_set: set) -> MindMap:
    return MindMap(
        id=tree["id"],
        data={
            "label": tree["data"]["label"],
            "positions": [p for p in tree["data"]["positions"] if p in positions_set],
        },
        children=[
            filter_tree(child, positions_set) for child in (tree["children"] or [])
        ],
    )
