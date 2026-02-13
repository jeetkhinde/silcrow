# Silcrow

Minimalist DOM patching library. Give it JSON, it updates your DOM.

## Install

```bash
npm install silcrow
```

## Usage

```javascript
import 'silcrow';

// HTML: <div id="app" s-bind="message"></div>
Silcrow.patch({ message: "Hello" }, "#app");
```

## API

### `Silcrow.patch(data, root, options?)`

Patches DOM with data.

- **data**: Plain object with values
- **root**: Element or CSS selector
- **options**: `{ invalidate: boolean, silent: boolean }`

### `Silcrow.invalidate(root)`

Clears cache for root. Next patch rebuilds bindings.

### `Silcrow.stream(root)`

Returns batched update function for high-frequency patches.

```javascript
const update = Silcrow.stream("#app");
update({ count: 1 }); // batched
update({ count: 2 }); // batched
// DOM updates once via microtask
```

## Attributes

### `s-bind`

Binds element to data path.

```html
<!-- Text content -->
<span s-bind="user.name"></span>

<!-- Property -->
<input s-bind="email:value">
<img s-bind="avatar:src">
<input type="checkbox" s-bind="agreed:checked">
```

### `s-list`

Renders array. Items need `key` field.

```html
<ul s-list="todos">
  <template>
    <li s-bind=".title"></li>
  </template>
</ul>
```

```javascript
Silcrow.patch({
  todos: [
    { key: 1, title: "Buy milk" },
    { key: 2, title: "Walk dog" }
  ]
}, "#app");
```

Local bindings use `.field` syntax (dot prefix).

### `s-template`

Specifies template ID for list.

```html
<div s-list="items" s-template="item-tpl"></div>
<template id="item-tpl">
  <div s-bind=".name"></div>
</template>
```

### `s-key`

Auto-added to list items. Contains item key.

### `s-debug`

Add to `<body>` for warnings and errors.

```html
<body s-debug>
```

## Events

### `silcrow:patched`

Fired after each patch (unless `silent: true`).

```javascript
root.addEventListener('silcrow:patched', (e) => {
  console.log(e.detail.paths); // updated paths
});
```
# Integration Examples

## Third-Party APIs

```javascript
// Fetch GitHub user
fetch('https://api.github.com/users/octocat')
  .then(r => r.json())
  .then(data => Silcrow.patch(data, '#profile'));
```

```html
<div id="profile">
  <img s-bind="avatar_url:src">
  <h2 s-bind="name"></h2>
  <p s-bind="bio"></p>
  <a s-bind="html_url:href">Profile</a>
</div>
```

## Server-Sent Events

```javascript
const stream = Silcrow.stream('#dashboard');
const events = new EventSource('/api/metrics');

events.onmessage = (e) => {
  stream(JSON.parse(e.data));
};
```

```html
<div id="dashboard">
  <span s-bind="cpu:textContent">0</span>% CPU
  <span s-bind="memory">0</span> MB
</div>
```

## WebSocket

```javascript
const ws = new WebSocket('wss://api.example.com');
const update = Silcrow.stream('#live-feed');

ws.onmessage = (e) => {
  const data = JSON.parse(e.data);
  update(data);
};
```

```html
<ul id="live-feed" s-list="messages">
  <template>
    <li>
      <strong s-bind=".user"></strong>: 
      <span s-bind=".text"></span>
    </li>
  </template>
</ul>
```

## HTMX

HTMX handles HTML, Silcrow patches JSON endpoints.

```html
<!-- HTMX loads HTML fragment -->
<button hx-get="/widgets/chart" hx-target="#chart">
  Load Chart
</button>

<!-- Silcrow binds JSON data -->
<div id="chart" s-bind="title">
  <canvas id="canvas"></canvas>
</div>

<script>
document.body.addEventListener('htmx:afterSettle', (e) => {
  if (e.detail.target.id === 'chart') {
    fetch('/api/chart-data')
      .then(r => r.json())
      .then(data => {
        Silcrow.patch(data, '#chart');
        drawChart(data); // your chart lib
      });
  }
});
</script>
```

## Alpine.js

Use Alpine for interactions, Silcrow for data binding.

```html
<div x-data="{ open: false }" id="app">
  <!-- Alpine handles UI state -->
  <button @click="open = !open">Toggle</button>
  
  <div x-show="open">
    <!-- Silcrow binds server data -->
    <h3 s-bind="product.name"></h3>
    <p s-bind="product.price"></p>
    <img s-bind="product.image:src">
  </div>
</div>

<script>
fetch('/api/product/123')
  .then(r => r.json())
  .then(data => Silcrow.patch(data, '#app'));
</script>
```

## Your JSON Schema

Direct mapping, no transforms needed.

```javascript
const appData = {
  user: {
    profile: {
      firstName: "Jane",
      email: "jane@example.com"
    },
    settings: {
      theme: "dark",
      notifications: true
    }
  },
  cart: [
    { key: "a1", name: "Widget", qty: 2 },
    { key: "b2", name: "Gadget", qty: 1 }
  ]
};

Silcrow.patch(appData, '#app');
```

```html
<div id="app">
  <input s-bind="user.profile.firstName:value">
  <input s-bind="user.profile.email:value">
  <input type="checkbox" s-bind="user.settings.notifications:checked">
  
  <ul s-list="cart">
    <template>
      <li>
        <span s-bind=".name"></span> × 
        <span s-bind=".qty"></span>
      </li>
    </template>
  </ul>
</div>
```

## Form Submission

```html
<form id="form">
  <input name="title" s-bind="draft.title:value">
  <textarea name="body" s-bind="draft.body:value"></textarea>
  <button type="submit">Save</button>
</form>

<script>
// Load draft
fetch('/api/drafts/1')
  .then(r => r.json())
  .then(data => Silcrow.patch(data, '#form'));

// Submit changes
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const draft = Object.fromEntries(formData);
  
  await fetch('/api/drafts/1', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(draft)
  });
});
</script>
```

## Multi-Source Aggregation

```javascript
const state = { users: [], stats: {} };

Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/stats').then(r => r.json())
]).then(([users, stats]) => {
  state.users = users;
  state.stats = stats;
  Silcrow.patch(state, '#dashboard');
});
```

## Polling

```javascript
const update = Silcrow.stream('#status');

setInterval(async () => {
  const data = await fetch('/api/status').then(r => r.json());
  update(data);
}, 5000);
```
## Security

- Blocks `__proto__`, `constructor`, `prototype` in paths
- Rejects `on*` event handler bindings
- Validates templates (no `<script>`, no inline handlers)
- Nested `s-list` not allowed

## Bundle Size

~4KB minified + gzipped