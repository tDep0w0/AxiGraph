from typing import Optional, cast
from langgraph.types import Command
from langchain_core.messages import HumanMessage, AIMessageChunk
import json
from models import AgentState
from uuid import uuid4
from fastapi import FastAPI, Query
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from agent import tool_list, graph
from utils.get_search_result import get_search_result

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Type"],
)


async def generate_events(message: str, checkpoint_id: Optional[str] = None):
    if checkpoint_id is None:
        checkpoint_id = str(uuid4())
        yield f'data: {{"type": "checkpoint", "checkpoint_id" : "{checkpoint_id}"}}\n\n'

    events = graph.astream_events(
        {"messages": [HumanMessage(content=message)]},
        config={"configurable": {"thread_id": checkpoint_id}},
    )

    async for event in events:
        event_type = event["event"]

        if event_type == "on_chat_model_stream":
            ai_chunk = cast(AIMessageChunk, event["data"].get("chunk"))
            ai_content = str(ai_chunk.content).replace("'", "\\'").replace("\n", "\\n")

            metadata = event.get("metadata")
            if not ai_content or (
                metadata is not None and metadata.get("langgraph_node") == "tool_node"
            ):
                continue

            yield f'data: {{"type": "content", "content": "{ai_content}"}}\n\n'

        elif event_type == "on_tool_end" and event["name"] in tool_list:
            output_command = cast(Command, event["data"].get("output"))
            state = cast(AgentState, output_command.update)

            yield f'data: {{"type": "results", "content": {{"search_results": {json.dumps(state['search_result'])}, "clustered_results": {json.dumps(state['clustered_result'])}}}}}\n\n'

    yield f'data: {{"type": "end"}}\n\n'


@app.get("/api/agent/{message}")
async def agent(message: str, checkpoint_id: Optional[str] = Query(None)):
    return StreamingResponse(
        generate_events(message, checkpoint_id),
        media_type="text/event-stream",
    )


@app.get("/api/search")
async def search_api(q: str = Query(...)):
    return await get_search_result(q)
