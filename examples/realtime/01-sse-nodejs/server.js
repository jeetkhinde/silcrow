const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

// SSE endpoint for real-time metrics
app.get('/api/metrics', (req, res) => {
  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Send initial connection message
  res.write('data: {"status":"connected"}\n\n');

  // Simulate system metrics
  const interval = setInterval(() => {
    const metrics = {
      timestamp: new Date().toISOString(),
      cpu: (Math.random() * 100).toFixed(1),
      memory: (Math.random() * 16000).toFixed(0),
      disk: (Math.random() * 100).toFixed(1),
      network: {
        incoming: (Math.random() * 1000).toFixed(0),
        outgoing: (Math.random() * 800).toFixed(0)
      },
      activeUsers: Math.floor(Math.random() * 500) + 100,
      requests: Math.floor(Math.random() * 10000) + 5000,
      errors: Math.floor(Math.random() * 50),
      uptime: formatUptime(process.uptime())
    };

    res.write(`data: ${JSON.stringify(metrics)}\n\n`);
  }, 1000); // Update every second

  // Clean up on client disconnect
  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${days}d ${hours}h ${minutes}m`;
}

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════╗
║   Silcrow SSE Dashboard - Node.js Example    ║
╚═══════════════════════════════════════════════╝

🚀 Server running at http://localhost:${PORT}
📊 Metrics endpoint: http://localhost:${PORT}/api/metrics

Press Ctrl+C to stop
  `);
});
