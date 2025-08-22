from typing import TypedDict, Optional, Annotated
from langgraph.graph import add_messages


class NodeData(TypedDict):
    label: str
    positions: list[int]
    relevancy: Optional[int | float]


class MindMap(TypedDict):
    id: str
    data: NodeData
    children: Optional[list["MindMap"]]


class SearchResult(TypedDict):
    position: int
    title: str
    patent_link: str
    snippet: str
    title_full: Optional[str]
    abstract: Optional[str]
    thumbnail: Optional[str]


class ResultTemplate(TypedDict):
    label: Optional[str]
    positions: list[int]
    relevancy: Optional[int | float]
    children: Optional[list["ResultTemplate"]]


class AgentState(TypedDict):
    messages: Annotated[list, add_messages]
    topic: Optional[str]
    search_result: Optional[list[SearchResult]]
    clustered_result: Optional[MindMap]


class PatentData(TypedDict):
    title: str
    abstract: str
