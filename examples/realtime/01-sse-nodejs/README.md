# Real-Time Metrics Dashboard - Node.js SSE

**Complexity:** Intermediate
**Stack:** Node.js + Express + Server-Sent Events

## Use Case
Live system metrics dashboard that updates in real-time without polling. Perfect for monitoring CPU, memory, active connections, or any streaming data source.

## What This Demonstrates
- Server-Sent Events (SSE) with Express
- `Silcrow.stream()` for batched updates
- Efficient real-time data binding
- Production-ready error handling and reconnection

## File Structure
```
01-sse-nodejs/
├── server.js         # Express SSE server
├── index.html        # Dashboard UI with Silcrow
├── package.json      # Dependencies
└── README.md
```

## Run
```bash
npm install
node server.js
# Open http://localhost:3000
```

## Key Learnings
- SSE is simpler than WebSockets for one-way data streams
- `Silcrow.stream()` batches rapid updates into single DOM patch
- Automatic reconnection with EventSource
- No build step, runs in any browser
