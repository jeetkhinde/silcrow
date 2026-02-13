const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use(express.json());

// Mock data
const dashboardData = {
  stats: {
    totalUsers: 1247,
    activeNow: 89,
    revenue: 45230,
    growth: 12.5
  },
  recentActivity: [
    { key: 1, user: 'Sarah Chen', action: 'Created new project', time: '2 min ago' },
    { key: 2, user: 'Marcus Lee', action: 'Uploaded 3 files', time: '5 min ago' },
    { key: 3, user: 'Emily Rodriguez', action: 'Commented on task', time: '12 min ago' }
  ]
};

const profileData = {
  user: {
    name: 'Alex Thompson',
    email: 'alex@example.com',
    role: 'Senior Developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    joined: '2023-01-15'
  },
  stats: {
    projects: 24,
    contributions: 387,
    followers: 156
  }
};

// Serve fragments
app.get('/fragments/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'fragments', 'dashboard.html'));
});

app.get('/fragments/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'fragments', 'profile.html'));
});

// API endpoints
app.get('/api/dashboard', (req, res) => {
  // Simulate slight data changes
  const data = JSON.parse(JSON.stringify(dashboardData));
  data.stats.activeNow += Math.floor(Math.random() * 10) - 5;
  res.json(data);
});

app.get('/api/profile', (req, res) => {
  res.json(profileData);
});

// Root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════╗
║     HTMX + Silcrow Integration Example       ║
╚═══════════════════════════════════════════════╝

🚀 Server running at http://localhost:${PORT}

Press Ctrl+C to stop
  `);
});
