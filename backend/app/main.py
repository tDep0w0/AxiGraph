from typing import Optional
from fastapi import FastAPI, Query
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from services.generate_events import generate_events
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Type"],
)


@app.get("/api/agent/{message}")
async def agent(message: str, checkpoint_id: Optional[str] = Query(None)):
    return StreamingResponse(
        generate_events(message, checkpoint_id),
        media_type="text/event-stream",
    )


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
