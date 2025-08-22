from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import ToolNode
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
from models import AgentState
from tools.fetch_data_embed import fetch_data
from tools.filter_data import filter_data

load_dotenv()

memory = MemorySaver()

tools = [fetch_data, filter_data]
tool_list = ["fetch_data", "filter_data"]

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


graph_builder = StateGraph(AgentState)

graph_builder.add_node("model", model_node)
graph_builder.add_node("tool_node", tool_node)

graph_builder.set_entry_point("model")

graph_builder.add_conditional_edges("model", tools_router)
graph_builder.add_edge("tool_node", "model")

graph = graph_builder.compile(checkpointer=memory)
