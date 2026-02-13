# Stock Ticker - Go SSE

**Complexity:** Intermediate
**Stack:** Go + net/http + Server-Sent Events

## Use Case
Real-time stock price updates for a trading dashboard. Demonstrates high-frequency updates with minimal overhead.

## What This Demonstrates
- Go's built-in SSE support with Flusher interface
- Handling multiple concurrent SSE connections
- Structured JSON streaming
- Production-ready CORS and error handling

## File Structure
```
02-sse-go/
├── main.go           # Go SSE server
├── index.html        # Stock ticker UI
├── go.mod            # Go modules file
└── README.md
```

## Run
```bash
go mod init silcrow-sse-go-example
go run main.go
# Open http://localhost:8080
```

## Key Learnings
- Go's Flusher interface enables efficient SSE
- Silcrow handles rapid price updates smoothly
- No external dependencies needed in Go
- Clean concurrent connection management
