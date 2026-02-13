package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"time"
)

type Stock struct {
	Symbol    string  `json:"symbol"`
	Price     float64 `json:"price"`
	Change    float64 `json:"change"`
	ChangeP   float64 `json:"changePercent"`
	Volume    int     `json:"volume"`
	Timestamp string  `json:"timestamp"`
}

type StockUpdate struct {
	Stocks []Stock `json:"stocks"`
}

var stocks = []struct {
	symbol   string
	price    float64
	baseVol  int
}{
	{"AAPL", 178.50, 50000000},
	{"GOOGL", 142.30, 25000000},
	{"MSFT", 405.20, 30000000},
	{"AMZN", 175.80, 45000000},
	{"TSLA", 248.90, 80000000},
	{"META", 485.30, 20000000},
}

func main() {
	http.HandleFunc("/", serveIndex)
	http.HandleFunc("/api/stocks", handleSSE)

	port := ":8080"
	fmt.Printf(`
╔═══════════════════════════════════════════════╗
║     Silcrow Stock Ticker - Go Example        ║
╚═══════════════════════════════════════════════╝

🚀 Server running at http://localhost%s
📈 Stocks endpoint: http://localhost%s/api/stocks

Press Ctrl+C to stop
`, port, port)

	log.Fatal(http.ListenAndServe(port, nil))
}

func serveIndex(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "index.html")
}

func handleSSE(w http.ResponseWriter, r *http.Request) {
	// Set SSE headers
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "Streaming unsupported", http.StatusInternalServerError)
		return
	}

	// Send initial connection message
	fmt.Fprintf(w, "data: {\"status\":\"connected\"}\n\n")
	flusher.Flush()

	// Create ticker for updates
	ticker := time.NewTicker(500 * time.Millisecond)
	defer ticker.Stop()

	// Context for client disconnect
	ctx := r.Context()

	log.Printf("Client connected: %s", r.RemoteAddr)

	for {
		select {
		case <-ctx.Done():
			log.Printf("Client disconnected: %s", r.RemoteAddr)
			return
		case <-ticker.C:
			update := generateStockUpdate()
			data, err := json.Marshal(update)
			if err != nil {
				log.Printf("Error marshaling data: %v", err)
				continue
			}

			fmt.Fprintf(w, "data: %s\n\n", data)
			flusher.Flush()
		}
	}
}

func generateStockUpdate() StockUpdate {
	update := StockUpdate{
		Stocks: make([]Stock, len(stocks)),
	}

	for i, stock := range stocks {
		// Simulate price movement
		change := (rand.Float64() - 0.5) * 5.0
		newPrice := stock.price + change
		changePercent := (change / stock.price) * 100

		// Simulate volume
		volume := stock.baseVol + rand.Intn(10000000)

		update.Stocks[i] = Stock{
			Symbol:    stock.symbol,
			Price:     roundToTwo(newPrice),
			Change:    roundToTwo(change),
			ChangeP:   roundToTwo(changePercent),
			Volume:    volume,
			Timestamp: time.Now().Format("15:04:05"),
		}

		// Update base price for next iteration
		stocks[i].price = newPrice
	}

	return update
}

func roundToTwo(val float64) float64 {
	return float64(int(val*100)) / 100
}
