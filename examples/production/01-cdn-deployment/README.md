# CDN Deployment

**Complexity:** Simple
**Stack:** Silcrow CDN + Any Static Host

## Use Case
Deploy production apps without any build step. Perfect for rapid deployment, micro-frontends, or embedding widgets in existing sites.

## What This Demonstrates
- Zero-config CDN deployment
- No npm, webpack, or build tools needed
- Production-ready with edge caching
- Works on any static host (GitHub Pages, Netlify, S3, etc.)

## File Structure
```
01-cdn-deployment/
├── index.html        # Complete production app
└── README.md
```

## Run
```bash
# No dependencies to install!

# Option 1: Open directly in browser
open index.html

# Option 2: Any static server
python -m http.server 8000
# or
npx serve .

# Option 3: Deploy to GitHub Pages
git add .
git commit -m "Deploy"
git push
# Enable Pages in repo settings
```

## Deployment Checklist
- [x] Silcrow loaded from CDN
- [x] No build step required
- [x] Works on any static hosting
- [x] Global edge caching via jsDelivr
- [x] Automatic minification
- [x] ~4KB total bundle size

## Key Learnings
- Not all apps need complex build pipelines
- CDN delivery is fast and reliable
- Perfect for progressive enhancement
- Great for embedding in legacy sites
