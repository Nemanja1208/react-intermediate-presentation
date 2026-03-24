# React Intermediate — Stock Market Presentation

A trading-terminal-themed interactive presentation covering intermediate React topics:
custom components, npm packages, API calls, useEffect, loading/error states, composition patterns, and more.

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## Navigation

- **Arrow keys** (← →) or **Space** to move between slides
- Click the **dot indicators** in the header to jump to any slide
- Use the **Prev / Next** buttons in the footer

## Build for Production

```bash
npm run build
```

The output will be in the `dist/` folder — ready to deploy to any static host (Netlify, Vercel, GitHub Pages, etc.).

## Deploy to GitHub Pages

```bash
# 1. Build
npm run build

# 2. Deploy (if using gh-pages package)
npm install -D gh-pages
npx gh-pages -d dist
```

## Slides

1. Cover
2. The Big Picture — from tutorials to production
3. Component Architecture — breaking down a real UI
4. Custom Components — building a StockCard
5. Project Structure — file organization
6. NPM Packages — installing & using third-party code
7. Calling APIs — fetch, axios, service layer
8. useEffect — side effects & dependency arrays
9. Loading & Error States — UX patterns
10. Composition — children prop & layout components
11. Full Example — service → component → app
12. Environment Variables — .env files, secrets, VITE_ prefix
13. Service Layer Architecture — apiClient, domain services, auth service
14. React Router — routes, links, URL params, navigation
15. Auth Context — createContext, useAuth hook, provider pattern
16. Protected Routes — route guards, layout routes, complete auth flow
17. Common Mistakes — pitfalls & fixes
18. What's Next — advanced state, testing, deployment
19. Cheat Sheet — quick reference for everything covered

## Tech Stack

- React 18
- Vite 5
- No external UI libraries — all custom-built
