# Live Activity Feed - Python SSE

**Complexity:** Intermediate
**Stack:** Python + FastAPI + Server-Sent Events

## Use Case
Real-time activity feed for social apps, notifications, or event streams. Shows new activities as they happen.

## What This Demonstrates
- FastAPI's StreamingResponse for SSE
- Async Python with real-time updates
- Type-safe API with Pydantic models
- Auto-generated API docs (visit /docs)

## File Structure
```
03-sse-python/
├── server.py         # FastAPI SSE server
├── index.html        # Activity feed UI
├── requirements.txt  # Python dependencies
└── README.md
```

## Run
```bash
pip install -r requirements.txt
python server.py
# Open http://localhost:8000
```

## Key Learnings
- FastAPI makes SSE straightforward with StreamingResponse
- Async generators perfect for real-time streams
- Silcrow list reconciliation handles activity items efficiently
- Built-in API documentation with FastAPI
