from langgraph.graph import END
from models import AgentState
from agent.tools import tools
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import ToolNode

model = ChatOpenAI(model="gpt-4o-mini", temperature=0).bind_tools(tools=tools)

tool_node = ToolNode(tools=tools)


async def model_node(state: AgentState) -> AgentState:
    result = await model.ainvoke(state["messages"])
    return {**state, "messages": [result]}


async def tools_router(state: AgentState):
    last_message = state["messages"][-1]

    if hasattr(last_message, "tool_calls") and len(last_message.tool_calls) > 0:
        return "tool_node"

    return END
