from typing import TypedDict, Optional, Annotated
from langgraph.graph import add_messages


class NodeData(TypedDict):
    label: str
    positions: list[int]


class MindMap(TypedDict):
    id: str
    data: NodeData
    children: Optional[list["MindMap"]]


class SearchResult(TypedDict):
    position: int
    title: str
    snippet: str
    source: str


class ResultTemplate(TypedDict):
    label: str
    positions: list[int]
    children: Optional[list["ResultTemplate"]]


class AgentState(TypedDict):
    messages: Annotated[list, add_messages]
    topic: Optional[str]
    search_result: Optional[list]
    clustered_result: Optional[MindMap]
