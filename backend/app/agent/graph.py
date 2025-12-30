from langgraph.graph import StateGraph
from langgraph.checkpoint.memory import MemorySaver
from dotenv import load_dotenv
from agent.nodes import model_node, tools_router
from models import AgentState
from agent.nodes import tool_node

load_dotenv()

memory = MemorySaver()


graph_builder = StateGraph(AgentState)

graph_builder.add_node("model", model_node)
graph_builder.add_node("tool_node", tool_node)

graph_builder.add_conditional_edges("model", tools_router)
graph_builder.add_edge("tool_node", "model")

graph_builder.set_entry_point("model")

graph = graph_builder.compile(checkpointer=memory)
