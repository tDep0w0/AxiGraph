from models import ResultTemplate, MindMap
from uuid import uuid4


def mindmap_cast(treeTemplate: ResultTemplate) -> MindMap:
    return MindMap(
        id=str(uuid4()),
        data={
            "label": treeTemplate["label"],
            "positions": treeTemplate["positions"],
        },
        children=[mindmap_cast(child) for child in (treeTemplate["children"] or [])],
    )
