# HTMX + Silcrow Multi-Page App

**Complexity:** Intermediate
**Stack:** HTMX + Silcrow + Node.js/Express

## Use Case
Combine HTMX for HTML fragments with Silcrow for JSON data binding. Perfect for multi-page apps where HTMX handles navigation and Silcrow handles dynamic data.

## What This Demonstrates
- HTMX loads HTML fragments
- Silcrow patches JSON data into fragments
- Best of both worlds: server-rendered HTML + client data binding
- Progressive enhancement pattern

## File Structure
```
01-htmx-integration/
├── server.js         # Express server
├── index.html        # Main page
├── fragments/        # HTML fragments
│   ├── dashboard.html
│   └── profile.html
├── package.json
└── README.md
```

## Run
```bash
npm install
node server.js
# Open http://localhost:3000
```

## Key Learnings
- HTMX handles HTML, Silcrow handles JSON
- Use `htmx:afterSettle` event to patch data
- Clean separation of concerns
- No conflicts between libraries
