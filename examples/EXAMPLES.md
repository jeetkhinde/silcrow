# Silcrow Examples

Complete, production-ready examples demonstrating Silcrow's capabilities across different use cases, backends, and deployment scenarios.

## 📋 Quick Navigation

- [Simple Examples](#simple-examples) - Basic concepts (5-10 lines of code)
- [Real-Time Data](#real-time-data) - Server-Sent Events with multiple backends
- [Framework Integration](#framework-integration) - HTMX, Alpine.js, Vanilla JS
- [Advanced Patterns](#advanced-patterns) - Production techniques
- [Production Scenarios](#production-scenarios) - Deployment-ready examples

---

## 🎯 Simple Examples

Perfect for learning Silcrow basics. Each example is self-contained and runs in the browser.

### 01. Form Binding
**File:** `simple/01-form-binding.html`
**Complexity:** Simple
**What it demonstrates:**
- Two-way data binding with form inputs
- Property binding (`:value`)
- Live preview updates
- Form state management

**Run:**
```bash
open simple/01-form-binding.html
```

---

### 02. List Rendering
**File:** `simple/02-list-rendering.html`
**Complexity:** Simple
**What it demonstrates:**
- Dynamic lists with `s-list`
- Item keys for reconciliation
- Local bindings (`.field`)
- Add/delete operations

**Run:**
```bash
open simple/02-list-rendering.html
```

---

### 03. Property Binding
**File:** `simple/03-property-binding.html`
**Complexity:** Simple
**What it demonstrates:**
- Checkboxes (`:checked`)
- Select dropdowns (`:value`)
- Disabled state (`:disabled`)
- Image sources (`:src`)
- Link hrefs (`:href`)
- Range inputs

**Run:**
```bash
open simple/03-property-binding.html
```

---

### 04. Nested Paths
**File:** `simple/04-nested-paths.html`
**Complexity:** Simple
**What it demonstrates:**
- Deep object traversal (`user.profile.address.city`)
- Complex JSON structures
- Dot notation binding
- Real-world data shapes

**Run:**
```bash
open simple/04-nested-paths.html
```

---

### 05. Template Switching
**File:** `simple/05-template-switching.html`
**Complexity:** Simple
**What it demonstrates:**
- Multiple templates for one list
- Dynamic template selection via `key#templateId`
- Heterogeneous data rendering
- Social feed use case (posts, photos, videos, ads)

**Run:**
```bash
open simple/05-template-switching.html
```

---

## 🔴 Real-Time Data

Server-Sent Events (SSE) examples with different backend languages.

### 01. Node.js + Express - Metrics Dashboard
**Directory:** `realtime/01-sse-nodejs/`
**Complexity:** Intermediate
**Stack:** Node.js, Express, SSE
**What it demonstrates:**
- Express SSE endpoint
- Real-time metrics streaming
- `Silcrow.stream()` for batched updates
- Connection management

**Run:**
```bash
cd realtime/01-sse-nodejs
npm install
node server.js
# Open http://localhost:3000
```

**Key Files:**
- `server.js` - Express server with SSE
- `index.html` - Dashboard UI
- `package.json` - Dependencies

---

### 02. Go - Stock Ticker
**Directory:** `realtime/02-sse-go/`
**Complexity:** Intermediate
**Stack:** Go, net/http, SSE
**What it demonstrates:**
- Go's Flusher interface for SSE
- Concurrent connection handling
- High-frequency updates (500ms)
- Zero external dependencies

**Run:**
```bash
cd realtime/02-sse-go
go run main.go
# Open http://localhost:8080
```

**Key Files:**
- `main.go` - Go SSE server
- `index.html` - Stock ticker UI

---

### 03. Python + FastAPI - Activity Feed
**Directory:** `realtime/03-sse-python/`
**Complexity:** Intermediate
**Stack:** Python, FastAPI, Async
**What it demonstrates:**
- FastAPI StreamingResponse
- Async generators for SSE
- Type-safe API with Pydantic
- Auto-generated docs at `/docs`

**Run:**
```bash
cd realtime/03-sse-python
pip install -r requirements.txt
python server.py
# Open http://localhost:8000
```

**Key Files:**
- `server.py` - FastAPI server
- `index.html` - Activity feed UI
- `requirements.txt` - Python dependencies

---

### 04. Rust + Axum - Server Metrics
**Directory:** `realtime/04-sse-rust/`
**Complexity:** Advanced
**Stack:** Rust, Axum, Tokio
**What it demonstrates:**
- Axum's SSE support
- Tokio async streams
- Type-safe JSON with serde
- Production-grade performance

**Run:**
```bash
cd realtime/04-sse-rust
cargo run --release
# Open http://localhost:3000
```

**Key Files:**
- `src/main.rs` - Axum SSE server
- `static/index.html` - Metrics dashboard
- `Cargo.toml` - Rust dependencies

---

## 🔗 Framework Integration

How Silcrow works alongside other tools and frameworks.

### 01. HTMX + Silcrow - Multi-Page App
**Directory:** `frameworks/01-htmx-integration/`
**Complexity:** Intermediate
**Stack:** HTMX, Silcrow, Express
**What it demonstrates:**
- HTMX loads HTML fragments
- Silcrow patches JSON data
- `htmx:afterSettle` integration
- Clean separation of concerns

**Run:**
```bash
cd frameworks/01-htmx-integration
npm install
node server.js
# Open http://localhost:3000
```

**Key Concept:** HTMX handles HTML, Silcrow handles JSON

---

### 02. Alpine.js + Silcrow
**File:** `frameworks/02-alpine-integration/index.html`
**Complexity:** Intermediate
**Stack:** Alpine.js, Silcrow
**What it demonstrates:**
- Alpine for UI interactions (modals, tabs, dropdowns)
- Silcrow for server data binding
- Zero conflicts between libraries
- No build step required

**Run:**
```bash
open frameworks/02-alpine-integration/index.html
```

**Key Concept:** Alpine for UI state, Silcrow for server state

---

### 03. Vanilla JS SPA with Routing
**File:** `frameworks/03-vanilla-spa/index.html`
**Complexity:** Intermediate
**Stack:** Vanilla JavaScript, Silcrow
**What it demonstrates:**
- Simple client-side router (< 50 lines)
- History API integration
- Multiple pages with data binding
- No framework overhead

**Run:**
```bash
cd frameworks/03-vanilla-spa
python -m http.server 8000
# or
npx serve .
# Open http://localhost:8000
```

**Key Concept:** You don't always need React/Vue/Angular

---

## 🚀 Advanced Patterns

Production-ready techniques for real-world applications.

### 01. Multi-Source Data Aggregation
**File:** `advanced/01-multi-source-aggregation.html`
**Complexity:** Advanced
**What it demonstrates:**
- Fetching from multiple APIs (GitHub user + repos)
- `Promise.all()` for parallel requests
- Data aggregation and computed stats
- Status tracking per data source

**Run:**
```bash
open advanced/01-multi-source-aggregation.html
```

**Key Concept:** Combine data from multiple endpoints into single state

---

### 02. Optimistic Updates with Rollback
**File:** `advanced/02-optimistic-updates.html`
**Complexity:** Advanced
**What it demonstrates:**
- Instant UI updates (optimistic)
- Automatic rollback on failure
- State snapshots for recovery
- User feedback with toast notifications

**Run:**
```bash
open advanced/02-optimistic-updates.html
```

**Key Concept:** Update UI immediately, sync with server, rollback if failed

---

### 03. Infinite Scroll
**File:** `advanced/03-infinite-scroll.html`
**Complexity:** Advanced
**What it demonstrates:**
- Intersection Observer API
- Pagination with `s-list`
- Load-on-scroll pattern
- Performance with large lists

**Run:**
```bash
open advanced/03-infinite-scroll.html
```

**Key Concept:** Silcrow's keyed reconciliation handles large, growing lists efficiently

---

### 04. Third-Party API Integration
**File:** `advanced/04-third-party-api.html`
**Complexity:** Advanced
**What it demonstrates:**
- GitHub API integration
- OpenWeather API (with fallback demo data)
- Error handling and fallbacks
- Multi-tab interface

**Run:**
```bash
open advanced/04-third-party-api.html
```

**Key Concept:** Silcrow works with any JSON API - no adapters needed

---

## 📦 Production Scenarios

Deployment-ready examples for real-world use.

### 01. CDN Deployment
**Directory:** `production/01-cdn-deployment/`
**Complexity:** Simple
**Stack:** Silcrow CDN, Static Host
**What it demonstrates:**
- Zero build step deployment
- Global CDN with edge caching
- Works on any static host
- Production checklist

**Deployment Options:**
```bash
# GitHub Pages
git push origin main

# Netlify
# Drag folder to netlify.com/drop

# Any static server
python -m http.server 8000
```

**Key Concept:** Not all apps need complex build pipelines

---

### 02. Error Handling & Retry Logic
**File:** `production/02-error-handling.html`
**Complexity:** Advanced
**What it demonstrates:**
- Exponential backoff retry logic
- Graceful degradation
- Fallback/cached data
- Request metrics and logging

**Run:**
```bash
open production/02-error-handling.html
```

**Key Concept:** Production apps need robust error handling

---

## 🎓 Learning Path

### Beginner
1. Start with **Simple Examples** (01-05)
2. Try **Alpine.js Integration**
3. Build a small app using **CDN Deployment**

### Intermediate
1. Explore **Real-Time Data** (pick your backend)
2. Study **HTMX Integration** or **Vanilla SPA**
3. Implement **Third-Party API** example

### Advanced
1. Master **Optimistic Updates**
2. Build **Multi-Source Aggregation**
3. Production-ize with **Error Handling**

---

## 🛠️ Running Examples

### No Backend Required
Just open in browser:
- All `simple/*.html`
- All `advanced/*.html`
- All `frameworks/*.html` (except HTMX)
- `production/02-error-handling.html`

### Requires Backend
Install dependencies first:
- `realtime/01-sse-nodejs` - `npm install`
- `realtime/02-sse-go` - Go installed
- `realtime/03-sse-python` - `pip install -r requirements.txt`
- `realtime/04-sse-rust` - Rust/Cargo installed
- `frameworks/01-htmx-integration` - `npm install`

---

## 📊 Example Matrix

| Example | Complexity | Backend | Build Step | Use Case |
|---------|-----------|---------|------------|----------|
| Form Binding | Simple | None | No | Basic forms |
| List Rendering | Simple | None | No | Todo lists |
| Property Binding | Simple | None | No | Form controls |
| Nested Paths | Simple | None | No | Complex data |
| Template Switching | Simple | None | No | Mixed content |
| SSE Node.js | Intermediate | Node.js | No | Dashboards |
| SSE Go | Intermediate | Go | No | High-frequency |
| SSE Python | Intermediate | Python | No | Activity feeds |
| SSE Rust | Advanced | Rust | No | Performance |
| HTMX Integration | Intermediate | Node.js | No | Multi-page |
| Alpine Integration | Intermediate | None | No | UI + Data |
| Vanilla SPA | Intermediate | None | No | Routing |
| Multi-Source | Advanced | None | No | API aggregation |
| Optimistic Updates | Advanced | None | No | Offline-first |
| Infinite Scroll | Advanced | None | No | Long lists |
| Third-Party API | Advanced | None | No | External data |
| CDN Deployment | Simple | None | No | Production |
| Error Handling | Advanced | None | No | Resilience |

---

## 💡 Key Concepts

### Data Binding
- `s-bind="path"` - Text content
- `s-bind="path:property"` - DOM properties
- Nested paths: `user.profile.name`

### Lists
- `s-list="items"` - Collection binding
- Items need `key` field
- Local bindings: `.field`

### Template Switching
- `key#templateId` - Dynamic templates
- Multiple templates per list
- Heterogeneous data

### Real-Time
- `Silcrow.stream()` - Batched updates
- SSE for one-way data
- WebSocket for two-way

### Production
- CDN deployment
- Error handling
- Retry logic
- Graceful degradation

---

## 🔧 Common Patterns

### Fetch and Patch
```javascript
fetch('/api/data')
  .then(r => r.json())
  .then(data => Silcrow.patch(data, '#app'));
```

### Server-Sent Events
```javascript
const update = Silcrow.stream('#app');
const events = new EventSource('/api/stream');
events.onmessage = (e) => update(JSON.parse(e.data));
```

### Optimistic Update
```javascript
const prev = JSON.parse(JSON.stringify(state));
state.todos.push(newTodo);
Silcrow.patch(state, '#app');

try {
  await api.save(newTodo);
} catch (error) {
  state = prev; // Rollback
  Silcrow.patch(state, '#app');
}
```

---

## 📚 Additional Resources

- **Main README:** `../ReadMe.md`
- **Runtime Source:** `../silcrow.runtime.js`
- **CDN Link:** `https://cdn.jsdelivr.net/gh/jeetkhinde/silcrow@1.0.0/silcrow.runtime.js`

---

## 🤝 Contributing Examples

Have an interesting Silcrow use case? Contributions welcome!

**Requirements:**
- Complete, runnable code
- Clear README with Use Case
- File structure documented
- Run instructions

**Categories we'd love to see:**
- E-commerce checkout flow
- Real-time collaboration
- Offline-first PWA
- Mobile-responsive dashboard
- WebSocket chat
- GraphQL integration

---

## ⚡ Performance Tips

1. **Use `Silcrow.stream()`** for high-frequency updates
2. **Batch API calls** with `Promise.all()`
3. **Minimize bindings** - only bind what changes
4. **Use local bindings** (`.field`) in lists
5. **Leverage browser cache** for CDN assets
6. **Lazy load** heavy content
7. **Debounce** user input handlers

---

## 🎯 Example Selection Guide

**"I want to learn Silcrow basics"**
→ Start with Simple Examples (01-05)

**"I need real-time updates"**
→ Check Real-Time Data (pick your backend)

**"I'm using HTMX/Alpine"**
→ See Framework Integration

**"I need production patterns"**
→ Study Advanced + Production examples

**"I want to deploy quickly"**
→ Use CDN Deployment example

**"I'm building a dashboard"**
→ SSE examples + Multi-Source Aggregation

**"I need offline support"**
→ Optimistic Updates + Error Handling

---

**Happy coding with Silcrow! 🚀**

For questions or issues, visit: https://github.com/jeetkhinde/silcrow
