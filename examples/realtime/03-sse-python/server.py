#!/usr/bin/env python3
import asyncio
import json
import random
from datetime import datetime
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.responses import StreamingResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pathlib import Path

app = FastAPI(title="Silcrow SSE Activity Feed")

# Activity templates
ACTIVITIES = [
    {"type": "like", "user": "Sarah Chen", "action": "liked your post", "icon": "❤️"},
    {"type": "comment", "user": "Marcus Lee", "action": "commented on your photo", "icon": "💬"},
    {"type": "follow", "user": "Emily Rodriguez", "action": "started following you", "icon": "👤"},
    {"type": "share", "user": "Alex Kim", "action": "shared your article", "icon": "🔄"},
    {"type": "mention", "user": "Jordan Taylor", "action": "mentioned you in a post", "icon": "@"},
    {"type": "like", "user": "Sam Patel", "action": "liked your comment", "icon": "❤️"},
    {"type": "tag", "user": "Casey Morgan", "action": "tagged you in a photo", "icon": "🏷️"},
]

activity_id = 1

async def generate_activity_stream() -> AsyncGenerator[str, None]:
    """Generate random activities every 2-4 seconds"""
    global activity_id

    # Send connection message
    yield "data: {\"status\":\"connected\"}\n\n"

    while True:
        await asyncio.sleep(random.uniform(2, 4))

        activity = random.choice(ACTIVITIES).copy()
        activity["id"] = activity_id
        activity["timestamp"] = datetime.now().strftime("%I:%M %p")

        activity_id += 1

        # Send activity as SSE event
        yield f"data: {json.dumps(activity)}\n\n"


@app.get("/")
async def root():
    """Serve the HTML file"""
    html_path = Path(__file__).parent / "index.html"
    return HTMLResponse(content=html_path.read_text())


@app.get("/api/activity")
async def activity_stream():
    """SSE endpoint for real-time activities"""
    return StreamingResponse(
        generate_activity_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Access-Control-Allow-Origin": "*",
        },
    )


if __name__ == "__main__":
    import uvicorn

    print("""
╔═══════════════════════════════════════════════╗
║   Silcrow Activity Feed - Python Example     ║
╚═══════════════════════════════════════════════╝

🚀 Server running at http://localhost:8000
📡 Activity endpoint: http://localhost:8000/api/activity
📚 API docs: http://localhost:8000/docs

Press Ctrl+C to stop
    """)

    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
