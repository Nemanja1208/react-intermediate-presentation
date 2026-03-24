import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════
   SLIDE DATA — each slide is a self-contained object
   ═══════════════════════════════════════════════ */

const SLIDES = [
  /* ───── COVER ───── */
  {
    id: "cover",
    type: "cover",
    badge: "INTERMEDIATE REACT",
    title: "Beyond the Basics",
    subtitle: "Components · Packages · API Calls · Env Vars · Routing · Auth & Protected Routes",
    footer: "Use ← → arrow keys or buttons to navigate",
  },

  /* ───── WHY THIS MATTERS ───── */
  {
    id: "why",
    type: "concept",
    badge: "THE BIG PICTURE",
    title: "From Tutorials to Production",
    blocks: [
      {
        icon: "📦",
        label: "You know the basics",
        text: "Components, props, state, lists, forms — you've built small apps with these.",
      },
      {
        icon: "🚀",
        label: "Now you need real skills",
        text: "How do you structure a real app? Fetch live data? Use third-party packages? Handle errors?",
      },
      {
        icon: "📈",
        label: "Our running example",
        text: 'We\'ll build pieces of a Stock Market Dashboard — a real-world app that fetches live prices, renders charts, and reacts to user input.',
      },
    ],
    note: "Every code example in this presentation builds toward this dashboard. By the end, you'll understand how apps like Avanza or Bloomberg Terminal are structured.",
  },

  /* ───── COMPONENT ARCHITECTURE ───── */
  {
    id: "architecture",
    type: "split",
    badge: "THINKING IN COMPONENTS",
    title: "Breaking Down a Real UI",
    left: {
      label: "The Dashboard Layout",
      content: "diagram",
      diagram: [
        { name: "App", depth: 0, color: "#00e676" },
        { name: "Header", depth: 1, color: "#40c4ff" },
        { name: "SearchBar", depth: 2, color: "#ffd740" },
        { name: "UserMenu", depth: 2, color: "#ffd740" },
        { name: "Dashboard", depth: 1, color: "#40c4ff" },
        { name: "StockCard", depth: 2, color: "#ffd740" },
        { name: "PriceChart", depth: 2, color: "#ffd740" },
        { name: "NewsFeed", depth: 2, color: "#ffd740" },
        { name: "Footer", depth: 1, color: "#40c4ff" },
      ],
    },
    right: {
      label: "Key Principles",
      items: [
        {
          title: "Single Responsibility",
          desc: "Each component does ONE thing well. StockCard shows one stock. PriceChart draws one chart.",
        },
        {
          title: "Reusable by Design",
          desc: "StockCard works for any stock — AAPL, TSLA, VOLV-B. Just pass different props.",
        },
        {
          title: "Compose, Don't Inherit",
          desc: "Build complex UIs by nesting simple components. Dashboard contains StockCards, not extends them.",
        },
        {
          title: "Data Flows Down",
          desc: "App fetches stock data → passes it to Dashboard → which passes each stock to a StockCard.",
        },
      ],
    },
  },

  /* ───── CREATING COMPONENTS ───── */
  {
    id: "components",
    type: "code",
    badge: "CUSTOM COMPONENTS",
    title: "Building a StockCard Component",
    steps: [
      {
        label: "1. Define the Component",
        description: "Start with a function that takes props. Think: what data does this card need to display?",
        code: `// components/StockCard.jsx

function StockCard({ symbol, name, price, change }) {
  // Is the stock up or down today?
  const isPositive = change >= 0;

  return (
    <div className="stock-card">
      <div className="stock-header">
        <span className="symbol">{symbol}</span>
        <span className="name">{name}</span>
      </div>

      <div className="stock-price">
        {price.toFixed(2)} SEK
      </div>

      <div className={\`stock-change \${isPositive ? "up" : "down"}\`}>
        {isPositive ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
      </div>
    </div>
  );
}

export default StockCard;`,
      },
      {
        label: "2. Use It in Your App",
        description: "Import and render it with different data. Each instance is independent — its own card with its own values.",
        code: `// App.jsx
import StockCard from './components/StockCard';

function App() {
  return (
    <div className="dashboard">
      <StockCard
        symbol="VOLV-B"
        name="Volvo B"
        price={268.40}
        change={1.85}
      />
      <StockCard
        symbol="ERIC-B"
        name="Ericsson B"
        price={82.16}
        change={-0.73}
      />
      <StockCard
        symbol="AAPL"
        name="Apple Inc"
        price={2145.00}
        change={2.41}
      />
    </div>
  );
}`,
      },
      {
        label: "3. What's Happening?",
        description:
          "Each <StockCard /> is like calling new StockCard(props) in C#. React creates a separate instance with its own data. When the props change, React re-renders just that card.",
        code: `// Think of it like C#:
// var card1 = new StockCard("VOLV-B", "Volvo", 268.40, 1.85);
// var card2 = new StockCard("ERIC-B", "Ericsson", 82.16, -0.73);
//
// But in React:
// - The UI updates automatically when data changes
// - No manual .Render() call needed
// - Each component manages its own piece of the screen`,
      },
    ],
  },

  /* ───── FILE STRUCTURE ───── */
  {
    id: "structure",
    type: "concept",
    badge: "PROJECT ORGANIZATION",
    title: "How to Structure Your Files",
    blocks: [
      {
        icon: "📁",
        label: "Folder Structure",
        text: null,
        code: `my-stock-app/
├── src/
│   ├── components/        ← Reusable UI pieces
│   │   ├── StockCard.jsx
│   │   ├── PriceChart.jsx
│   │   ├── SearchBar.jsx
│   │   └── NewsFeed.jsx
│   ├── hooks/             ← Custom hooks (reusable logic)
│   │   └── useStockData.js
│   ├── services/          ← API calls
│   │   └── stockApi.js
│   ├── App.jsx            ← Main app component
│   ├── App.css            ← Global styles
│   └── main.jsx           ← Entry point (don't touch)
├── package.json
└── vite.config.js`,
      },
      {
        icon: "💡",
        label: "The Rule of Thumb",
        text: "If a component is used in more than one place, it goes in /components. If logic is reused, it goes in /hooks. If it calls an API, it goes in /services. Keep App.jsx clean — it should mostly just compose other components together.",
      },
      {
        icon: "⚠️",
        label: "Common Mistake",
        text: 'Don\'t put everything in App.jsx! If your App.jsx is over 100 lines, you probably need to extract components. Each file should be small and focused.',
      },
    ],
  },

  /* ───── INSTALLING PACKAGES ───── */
  {
    id: "packages",
    type: "code",
    badge: "NPM PACKAGES",
    title: "Installing & Using Third-Party Packages",
    steps: [
      {
        label: "1. Finding Packages",
        description:
          "npmjs.com is the package registry. Before installing anything, check: weekly downloads (popularity), last updated (maintained?), bundle size (performance), GitHub stars (community trust).",
        code: `# Packages we'll use for our stock dashboard:

# HTTP client for API calls (alternative to fetch)
npm install axios

# Chart library for price graphs
npm install recharts

# Date formatting (stock timestamps)
npm install date-fns

# Icons
npm install lucide-react`,
      },
      {
        label: "2. Importing & Using a Package",
        description: "After installing, import what you need. Most packages have great docs — always read the README on npmjs.com first.",
        code: `// Using axios for HTTP requests
import axios from 'axios';

// Using recharts for charts
import {
  LineChart, Line, XAxis, YAxis, Tooltip
} from 'recharts';

// Using date-fns for formatting
import { format, formatDistanceToNow } from 'date-fns';

// Using lucide-react for icons
import { TrendingUp, TrendingDown, Search } from 'lucide-react';

// Example: formatting a date
const timestamp = new Date("2026-03-22T14:30:00");
format(timestamp, "HH:mm, d MMM");  // → "14:30, 22 Mar"
formatDistanceToNow(timestamp);      // → "2 hours ago"`,
      },
      {
        label: "3. package.json — Your Project's DNA",
        description:
          'Every npm install adds the package to package.json. This file is like your .csproj in .NET — it defines all dependencies. When someone clones your repo, "npm install" reads this file and installs everything.',
        code: `// package.json (auto-managed — don't edit by hand)
{
  "name": "stock-dashboard",
  "dependencies": {
    "axios": "^1.7.2",       // ^ = compatible updates
    "date-fns": "^3.6.0",
    "lucide-react": "^0.383.0",
    "react": "^18.3.1",
    "recharts": "^2.12.7"
  },
  "devDependencies": {
    "vite": "^5.3.1"         // only needed during development
  }
}`,
      },
    ],
  },

  /* ───── CALLING APIs ───── */
  {
    id: "apis",
    type: "code",
    badge: "FETCHING DATA",
    title: "Calling APIs — Getting Live Data",
    steps: [
      {
        label: "1. The Service Layer",
        description:
          "Keep API calls in a separate file. This is like a C# service class — one place for all HTTP logic. Easy to test, easy to change.",
        code: `// services/stockApi.js

const BASE_URL = "https://api.example.com/v1";

export async function getStockPrice(symbol) {
  const response = await fetch(
    \`\${BASE_URL}/stocks/\${symbol}\`
  );

  if (!response.ok) {
    throw new Error(\`Failed to fetch \${symbol}\`);
  }

  const data = await response.json();
  return data;
  // Returns: { symbol, name, price, change, history[] }
}

export async function searchStocks(query) {
  const response = await fetch(
    \`\${BASE_URL}/search?q=\${encodeURIComponent(query)}\`
  );
  const data = await response.json();
  return data.results;
}`,
      },
      {
        label: "2. fetch vs axios",
        description:
          "Both work fine. fetch is built-in (no install needed). axios has nicer error handling and automatic JSON parsing. Pick one and stick with it.",
        code: `// ── Using fetch (built-in) ──
const response = await fetch("/api/stocks/AAPL");
if (!response.ok) throw new Error("Failed!");
const data = await response.json();   // manual step!

// ── Using axios (npm install axios) ──
import axios from 'axios';
const { data } = await axios.get("/api/stocks/AAPL");
// ✓ auto JSON parsing
// ✓ auto throws on 4xx/5xx errors
// ✓ request/response interceptors
// ✓ request cancellation built-in

// For this course: fetch is perfectly fine.
// Use axios when you want cleaner code in larger apps.`,
      },
      {
        label: "3. The C# Comparison",
        description:
          "If you've used HttpClient in C#, the pattern is almost identical. The async/await works the same way — it's just a different syntax.",
        code: `// ── C# (.NET) ──
public async Task<Stock> GetStock(string symbol)
{
    var response = await _httpClient
        .GetAsync($"/api/stocks/{symbol}");
    response.EnsureSuccessStatusCode();
    var stock = await response.Content
        .ReadFromJsonAsync<Stock>();
    return stock;
}

// ── JavaScript (React) ──
export async function getStock(symbol) {
  const response = await fetch(
    \`/api/stocks/\${symbol}\`
  );
  if (!response.ok) throw new Error("Failed");
  const stock = await response.json();
  return stock;
}
// Same pattern: await → check → parse → return`,
      },
    ],
  },

  /* ───── useEffect ───── */
  {
    id: "useeffect",
    type: "code",
    badge: "SIDE EFFECTS",
    title: "useEffect — Running Code at the Right Time",
    steps: [
      {
        label: "1. The Problem",
        description:
          "You can't call fetch() directly in your component body — it would run on EVERY render, causing infinite loops. You need useEffect to say: 'run this code once when the component loads.'",
        code: `// ❌ WRONG — runs on every render, infinite loop!
function StockView({ symbol }) {
  const [stock, setStock] = useState(null);

  // This runs every time the component renders
  // setStock causes a re-render → fetch runs again → loop!
  fetch(\`/api/stocks/\${symbol}\`)
    .then(res => res.json())
    .then(data => setStock(data));

  return <div>{stock?.price}</div>;
}`,
      },
      {
        label: "2. The Solution — useEffect",
        description:
          'useEffect takes two arguments: a function (what to do) and a dependency array (when to do it). The dependency array is the key — it controls WHEN your effect runs.',
        code: `// ✅ CORRECT — runs once on mount, and when symbol changes
import { useState, useEffect } from 'react';
import { getStockPrice } from '../services/stockApi';

function StockView({ symbol }) {
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadStock() {
      try {
        setLoading(true);
        const data = await getStockPrice(symbol);
        setStock(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadStock();
  }, [symbol]);  // ← Re-run when symbol changes!

  if (loading) return <p>Loading {symbol}...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>{stock.name}</h2>
      <p>{stock.price} SEK</p>
    </div>
  );
}`,
      },
      {
        label: "3. Dependency Array Cheat Sheet",
        description: "The second argument to useEffect controls when the effect runs. This is the most important thing to understand.",
        code: `// ── When does useEffect run? ──

useEffect(() => {
  // Runs after EVERY render
});

useEffect(() => {
  // Runs ONCE when component mounts (appears)
}, []);                     // ← empty array = "no dependencies"

useEffect(() => {
  // Runs when 'symbol' changes
}, [symbol]);               // ← re-runs if symbol is different

useEffect(() => {
  // Runs when EITHER changes
}, [symbol, timeRange]);    // ← multiple dependencies

// ── The C# Mental Model ──
// Think of useEffect(fn, []) as the constructor
// Think of useEffect(fn, [symbol]) as a property setter
//   that triggers side effects when the value changes`,
      },
    ],
  },

  /* ───── LOADING & ERROR STATES ───── */
  {
    id: "loading",
    type: "code",
    badge: "UX PATTERNS",
    title: "Loading States & Error Handling",
    steps: [
      {
        label: "1. The Three States of Data Fetching",
        description:
          "Every API call has three possible outcomes: loading, success, or error. Professional apps handle all three. Never leave users staring at a blank screen.",
        code: `function StockDashboard() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);         // Clear previous errors
        const data = await getWatchlist();
        setStocks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);      // Always stop loading
      }
    }
    load();
  }, []);

  // ── Handle each state ──
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (stocks.length === 0) return <EmptyState />;

  return (
    <div className="grid">
      {stocks.map(stock => (
        <StockCard key={stock.symbol} {...stock} />
      ))}
    </div>
  );
}`,
      },
      {
        label: "2. Reusable Loading & Error Components",
        description:
          "Build these once, use them everywhere. Every page that fetches data needs loading and error states.",
        code: `// components/LoadingSpinner.jsx
function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="loading">
      <div className="spinner" />
      <p>{message}</p>
    </div>
  );
}

// components/ErrorMessage.jsx
function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box">
      <p>Something went wrong</p>
      <p className="error-detail">{message}</p>
      {onRetry && (
        <button onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

// Usage:
<ErrorMessage
  message="Could not load stock data"
  onRetry={() => window.location.reload()}
/>`,
      },
      {
        label: "3. The Spread Operator Trick",
        description:
          'Notice the {...stock} syntax? It spreads all properties of the stock object as individual props. It\'s a handy shortcut.',
        code: `// Without spread — tedious for many props:
<StockCard
  symbol={stock.symbol}
  name={stock.name}
  price={stock.price}
  change={stock.change}
/>

// With spread — all props at once:
<StockCard {...stock} />

// They do the exact same thing!
// {...stock} unpacks the object into individual props.

// ⚠️ Only use spread when the object's keys
//    match the component's expected props exactly.
//    Don't spray random data into components.`,
      },
    ],
  },

  /* ───── CHILDREN & COMPOSITION ───── */
  {
    id: "composition",
    type: "code",
    badge: "COMPOSITION PATTERN",
    title: "children — Components Inside Components",
    steps: [
      {
        label: "1. The children Prop",
        description:
          "In React, anything you put BETWEEN the opening and closing tags of a component becomes the special 'children' prop. This is how you build wrapper/layout components.",
        code: `// A reusable Card wrapper
function DashboardCard({ title, children }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        {children}  {/* ← Whatever you put inside */}
      </div>
    </div>
  );
}

// Usage — put ANYTHING inside:
<DashboardCard title="VOLV-B · Volvo">
  <PriceChart data={volvoHistory} />
  <p>Last updated: 14:30</p>
</DashboardCard>

<DashboardCard title="Latest News">
  <NewsFeed articles={articles} />
</DashboardCard>`,
      },
      {
        label: "2. Layout Components",
        description:
          "This pattern is incredibly powerful for layouts. Build a PageLayout once, reuse it on every page.",
        code: `// A page layout with sidebar
function PageLayout({ sidebar, children }) {
  return (
    <div className="layout">
      <aside className="sidebar">
        {sidebar}
      </aside>
      <main className="content">
        {children}
      </main>
    </div>
  );
}

// Usage:
function DashboardPage() {
  return (
    <PageLayout
      sidebar={<Watchlist stocks={myStocks} />}
    >
      <h1>Market Overview</h1>
      <StockGrid stocks={allStocks} />
      <NewsFeed />
    </PageLayout>
  );
}

// The layout doesn't know or care what's inside it.
// That's the beauty of composition.`,
      },
    ],
  },

  /* ───── PUTTING IT TOGETHER ───── */
  {
    id: "fullexample",
    type: "code",
    badge: "FULL EXAMPLE",
    title: "Putting It All Together",
    steps: [
      {
        label: "1. The Service",
        description: "API calls live in their own file — clean and reusable.",
        code: `// services/stockApi.js
const API_KEY = "your_api_key";
const BASE = "https://api.stockdata.example.com";

export async function getStock(symbol) {
  const res = await fetch(
    \`\${BASE}/quote/\${symbol}?apikey=\${API_KEY}\`
  );
  if (!res.ok) throw new Error("Failed to fetch stock");
  return await res.json();
}

export async function getHistory(symbol, range = "1m") {
  const res = await fetch(
    \`\${BASE}/history/\${symbol}?range=\${range}\`
  );
  if (!res.ok) throw new Error("Failed to fetch history");
  return await res.json();
}`,
      },
      {
        label: "2. The StockCard Component",
        description: "A self-contained card that fetches its own data.",
        code: `// components/StockCard.jsx
import { useState, useEffect } from 'react';
import { getStock } from '../services/stockApi';

function StockCard({ symbol }) {
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStock(symbol)
      .then(data => setStock(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [symbol]);

  if (loading) return <div className="card skeleton" />;
  if (!stock) return <div className="card error" />;

  const isUp = stock.change >= 0;

  return (
    <div className={\`card \${isUp ? "bullish" : "bearish"}\`}>
      <h3>{stock.symbol}</h3>
      <p className="price">{stock.price.toFixed(2)}</p>
      <p className={\`change \${isUp ? "green" : "red"}\`}>
        {isUp ? "+" : ""}{stock.change.toFixed(2)}%
      </p>
    </div>
  );
}

export default StockCard;`,
      },
      {
        label: "3. The Dashboard (App)",
        description: "The App composes everything together. Clean, readable, and each component handles its own logic.",
        code: `// App.jsx
import { useState } from 'react';
import StockCard from './components/StockCard';
import SearchBar from './components/SearchBar';

const DEFAULT_STOCKS = [
  "VOLV-B", "ERIC-B", "SEB-A", "HM-B"
];

function App() {
  const [watchlist, setWatchlist] = useState(DEFAULT_STOCKS);

  const addStock = (symbol) => {
    if (!watchlist.includes(symbol)) {
      setWatchlist([...watchlist, symbol]);
    }
  };

  const removeStock = (symbol) => {
    setWatchlist(watchlist.filter(s => s !== symbol));
  };

  return (
    <div className="app">
      <header>
        <h1>Stock Dashboard</h1>
        <SearchBar onSelect={addStock} />
      </header>

      <div className="stock-grid">
        {watchlist.map(symbol => (
          <StockCard
            key={symbol}
            symbol={symbol}
            onRemove={() => removeStock(symbol)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;`,
      },
    ],
  },

  /* ───── ENVIRONMENT VARIABLES ───── */
  {
    id: "envvars",
    type: "code",
    badge: "ENVIRONMENT VARIABLES",
    title: "Keeping Secrets Out of Your Code",
    steps: [
      {
        label: "1. The Problem",
        description:
          "API keys, backend URLs, and other config should NEVER be hardcoded in your source code. If you push an API key to GitHub, anyone can steal it. Environment variables solve this.",
        code: `// ❌ NEVER DO THIS — your API key is now on GitHub!
const API_KEY = "sk_live_abc123secretkey";
const BASE_URL = "https://api.stockdata.com";

export async function getStock(symbol) {
  const res = await fetch(
    \`\${BASE_URL}/quote/\${symbol}?key=\${API_KEY}\`
  );
  return await res.json();
}

// Anyone who reads your code now has your paid API key.
// Bots actively scan GitHub for leaked keys.`,
      },
      {
        label: "2. Create a .env File",
        description:
          "In Vite projects, create a .env file in the project root. Variables MUST start with VITE_ to be accessible in your code. This file is never committed to Git.",
        code: `# .env  (in your project root, next to package.json)

VITE_API_KEY=sk_live_abc123secretkey
VITE_API_BASE_URL=https://api.stockdata.com
VITE_APP_TITLE=Stock Dashboard

# ── Important rules ──
# 1. Variables MUST start with VITE_
# 2. No quotes around values (usually)
# 3. No spaces around the = sign
# 4. Restart dev server after changes!

# You can also have different files:
# .env              → always loaded
# .env.local        → local overrides (gitignored)
# .env.development  → only in dev mode
# .env.production   → only in production build`,
      },
      {
        label: "3. Using Env Vars in Code",
        description:
          "Access them via import.meta.env.VITE_YOUR_VARIABLE. Vite replaces these at build time — they become normal strings in the final bundle.",
        code: `// services/stockApi.js — the CORRECT way

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getStock(symbol) {
  const res = await fetch(
    \`\${BASE_URL}/quote/\${symbol}?key=\${API_KEY}\`
  );
  if (!res.ok) throw new Error("Failed to fetch stock");
  return await res.json();
}

// ── Don't forget .gitignore! ──
// Add this line to your .gitignore file:
// .env
// .env.local
// .env*.local

// ⚠️ IMPORTANT: VITE_ vars are embedded in the
// built JS bundle — they're NOT truly secret.
// For real secrets (DB passwords etc.), use a backend.
// VITE_ vars are fine for public API keys and URLs.`,
      },
      {
        label: "4. The C# Comparison",
        description:
          "If you've used appsettings.json and IConfiguration in .NET, this is the same concept — externalized config that changes per environment.",
        code: `// ── C# / .NET approach ──
// appsettings.json:
// { "ApiKey": "sk_live_abc123", "BaseUrl": "https://..." }
//
// In code:
// var key = _config["ApiKey"];
// var url = _config["BaseUrl"];
// Or with user secrets: dotnet user-secrets set "ApiKey" "..."

// ── React / Vite approach ──
// .env:
// VITE_API_KEY=sk_live_abc123
// VITE_API_BASE_URL=https://...
//
// In code:
// const key = import.meta.env.VITE_API_KEY;
// const url = import.meta.env.VITE_API_BASE_URL;

// Same concept, different syntax.
// .NET has user-secrets → React has .env.local
// .NET has appsettings.Production.json → React has .env.production`,
      },
    ],
  },

  /* ───── SERVICE LAYER ARCHITECTURE ───── */
  {
    id: "servicelayer",
    type: "code",
    badge: "SERVICE ARCHITECTURE",
    title: "Building a Professional API Service Layer",
    steps: [
      {
        label: "1. The Base API Client",
        description:
          "Create a reusable base client that handles auth headers, error parsing, and base URL — so you don't repeat this logic in every function.",
        code: `// services/apiClient.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiClient(endpoint, options = {}) {
  // Get token from localStorage (set during login)
  const token = localStorage.getItem("authToken");

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      // Attach JWT token if we have one
      ...(token && { Authorization: \`Bearer \${token}\` }),
      ...options.headers,
    },
  };

  const response = await fetch(
    \`\${BASE_URL}\${endpoint}\`, config
  );

  // Handle common HTTP errors
  if (response.status === 401) {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
    throw new Error("Session expired — please log in again");
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Request failed");
  }

  return response.json();
}`,
      },
      {
        label: "2. Domain-Specific Services",
        description:
          "Each service file handles one domain. stockService handles stocks, authService handles login/register. They all use the base apiClient.",
        code: `// services/stockService.js
import { apiClient } from './apiClient';

export const stockService = {
  // GET /api/stocks/VOLV-B
  getQuote: (symbol) =>
    apiClient(\`/api/stocks/\${symbol}\`),

  // GET /api/stocks/VOLV-B/history?range=1m
  getHistory: (symbol, range = "1m") =>
    apiClient(\`/api/stocks/\${symbol}/history?range=\${range}\`),

  // GET /api/stocks/search?q=volvo
  search: (query) =>
    apiClient(\`/api/stocks/search?q=\${encodeURIComponent(query)}\`),

  // POST /api/watchlist   { symbol: "VOLV-B" }
  addToWatchlist: (symbol) =>
    apiClient("/api/watchlist", {
      method: "POST",
      body: JSON.stringify({ symbol }),
    }),

  // DELETE /api/watchlist/VOLV-B
  removeFromWatchlist: (symbol) =>
    apiClient(\`/api/watchlist/\${symbol}\`, {
      method: "DELETE",
    }),
};

// Usage in a component:
// import { stockService } from '../services/stockService';
// const data = await stockService.getQuote("VOLV-B");`,
      },
      {
        label: "3. Auth Service",
        description:
          "The auth service handles login, register, logout, and token management. It stores the JWT token in localStorage.",
        code: `// services/authService.js
import { apiClient } from './apiClient';

export const authService = {
  // POST /api/auth/login
  login: async (email, password) => {
    const data = await apiClient("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    // Store the JWT token
    localStorage.setItem("authToken", data.token);
    return data.user;
  },

  // POST /api/auth/register
  register: (email, password, name) =>
    apiClient("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    }),

  // Clear token and redirect
  logout: () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  },

  // Check if user has a valid token
  isAuthenticated: () => {
    return !!localStorage.getItem("authToken");
  },

  // GET /api/auth/me (validate token, get user)
  getCurrentUser: () => apiClient("/api/auth/me"),
};`,
      },
      {
        label: "4. Full File Structure",
        description: "Here's how the complete services folder looks. Each file has a clear responsibility.",
        code: `src/
├── services/
│   ├── apiClient.js       ← Base HTTP client
│   │                         (headers, auth, errors)
│   ├── authService.js     ← Login, register, logout
│   ├── stockService.js    ← Stock quotes, history, search
│   └── newsService.js     ← Market news articles
│
├── components/            ← UI components use services
│   ├── StockCard.jsx      → uses stockService.getQuote()
│   ├── SearchBar.jsx      → uses stockService.search()
│   └── LoginForm.jsx      → uses authService.login()

// ── Why this structure? ──
// 1. Components don't know about fetch/axios/URLs
// 2. Swap the backend? Only change services/
// 3. Add auth headers? Only change apiClient.js
// 4. Easy to test — mock the service, not fetch`,
      },
    ],
  },

  /* ───── REACT ROUTER ───── */
  {
    id: "routing",
    type: "code",
    badge: "REACT ROUTER",
    title: "Multi-Page Apps with React Router",
    steps: [
      {
        label: "1. Install & Setup",
        description:
          "React Router lets you have multiple 'pages' in your SPA (Single Page App). No page reloads — the URL changes but React swaps out components instantly.",
        code: `# Install React Router
npm install react-router-dom

// ── main.jsx — Wrap your app with BrowserRouter ──
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);`,
      },
      {
        label: "2. Define Your Routes",
        description:
          "In App.jsx, use Routes and Route to map URLs to components. Think of it like routing in ASP.NET — each path renders a different 'page'.",
        code: `// App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import StockDetailPage from './pages/StockDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        {/* Exact path matching */}
        <Route path="/" element={<DashboardPage />} />

        {/* Dynamic parameter — :symbol */}
        <Route
          path="/stock/:symbol"
          element={<StockDetailPage />}
        />

        {/* Auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 404 catch-all — must be last! */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}`,
      },
      {
        label: "3. Navigation & Links",
        description:
          "Use <Link> instead of <a> tags for internal navigation. Link doesn't reload the page — it just tells React Router to swap the component.",
        code: `// components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");  // Programmatic navigation
  };

  return (
    <nav>
      {/* ✅ Use Link for internal navigation */}
      <Link to="/">Dashboard</Link>
      <Link to="/stock/VOLV-B">Volvo</Link>

      {/* ❌ NEVER use <a> for internal links */}
      {/* <a href="/dashboard">Dashboard</a>  ← reloads page! */}

      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

// ── The C# / .NET Comparison ──
// ASP.NET:   [Route("/stock/{symbol}")]
//            public IActionResult Stock(string symbol)
//
// React:     <Route path="/stock/:symbol" ... />
//            const { symbol } = useParams();`,
      },
      {
        label: "4. Reading URL Parameters",
        description:
          "Use the useParams hook to read dynamic parts of the URL. This is how you build detail pages — /stock/VOLV-B passes 'VOLV-B' as a parameter.",
        code: `// pages/StockDetailPage.jsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { stockService } from '../services/stockService';

function StockDetailPage() {
  // :symbol from the route becomes a param
  const { symbol } = useParams();

  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    stockService.getQuote(symbol)
      .then(data => setStock(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [symbol]);  // Re-fetch when URL param changes

  if (loading) return <p>Loading {symbol}...</p>;
  if (!stock) return <p>Stock not found</p>;

  return (
    <div>
      <h1>{stock.name} ({stock.symbol})</h1>
      <p className="price">{stock.price} SEK</p>
      <PriceChart data={stock.history} />
    </div>
  );
}

// When user visits /stock/TSLA:
//   useParams() returns { symbol: "TSLA" }
// When user visits /stock/VOLV-B:
//   useParams() returns { symbol: "VOLV-B" }`,
      },
    ],
  },

  /* ───── AUTH CONTEXT ───── */
  {
    id: "authcontext",
    type: "code",
    badge: "AUTH CONTEXT",
    title: "Sharing Auth State Across the App",
    steps: [
      {
        label: "1. The Problem with Props",
        description:
          "Your Navbar needs to know if the user is logged in. Your Dashboard needs the user's name. Your API client needs the token. Passing these as props through every component is painful. Context solves this.",
        code: `// ❌ Prop drilling — passing auth through every level:
<App user={user}>
  <Layout user={user}>
    <Navbar user={user} />
    <Dashboard user={user}>
      <StockCard user={user} />  {/* Why does StockCard need user?? */}
    </Dashboard>
  </Layout>
</App>

// ✅ Context — any component can access auth directly:
// Navbar:    const { user } = useAuth();
// Dashboard: const { user } = useAuth();
// StockCard doesn't need it? Then it doesn't import it.`,
      },
      {
        label: "2. Create the Auth Context",
        description:
          "A Context is like a global variable that React tracks. When the value changes, all consumers re-render automatically.",
        code: `// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create a Provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app load, check if we have a valid token
  useEffect(() => {
    authService.getCurrentUser()
      .then(user => setUser(user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const user = await authService.login(email, password);
    setUser(user);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Provide values to all children
  return (
    <AuthContext.Provider value={{
      user, loading, login, logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Custom hook for easy access
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}`,
      },
      {
        label: "3. Wrap Your App",
        description: "Wrap the entire app with AuthProvider so every component can access auth state.",
        code: `// main.jsx
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Now ANY component in the app can do:
//   import { useAuth } from '../context/AuthContext';
//   const { user, login, logout } = useAuth();

// ── The C# / .NET Comparison ──
// ASP.NET: services.AddScoped<IAuthService>();
//          → injected via constructor anywhere
//
// React:   <AuthProvider> wraps the app
//          → accessed via useAuth() hook anywhere
//
// Same pattern: register once, use everywhere.`,
      },
      {
        label: "4. Using Auth in Components",
        description: "Any component can now check auth state, show/hide UI elements, and call login/logout.",
        code: `// components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Dashboard</Link>

      {isAuthenticated ? (
        <>
          <span>Welcome, {user.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

// components/LoginForm.jsx
function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await login(email, password);
      navigate("/");  // Redirect to dashboard
    } catch (err) {
      setError("Invalid email or password");
    }
  };
  // ... render form inputs and button
}`,
      },
    ],
  },

  /* ───── PROTECTED ROUTES ───── */
  {
    id: "protectedroutes",
    type: "code",
    badge: "PROTECTED ROUTES",
    title: "Guarding Pages Behind Authentication",
    steps: [
      {
        label: "1. The ProtectedRoute Component",
        description:
          "A ProtectedRoute is a wrapper that checks: are you logged in? If yes, show the page. If no, redirect to /login. It's like the [Authorize] attribute in ASP.NET.",
        code: `// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // Still checking token? Show loading state
  if (loading) {
    return <div className="loading">Checking authentication...</div>;
  }

  // Not logged in? Redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Logged in → render the protected page
  return children;
}

export default ProtectedRoute;

// ── The C# / .NET Comparison ──
// ASP.NET:  [Authorize]
//           public IActionResult Dashboard() { ... }
//
// React:    <ProtectedRoute>
//             <DashboardPage />
//           </ProtectedRoute>
//
// Same idea: middleware that intercepts and redirects.`,
      },
      {
        label: "2. Using Protected Routes in App.jsx",
        description:
          "Wrap any Route's element with <ProtectedRoute> to require authentication. Public routes like /login remain unwrapped.",
        code: `// App.jsx — the complete routing setup
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages (no auth needed)
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Protected pages (auth required)
import DashboardPage from './pages/DashboardPage';
import StockDetailPage from './pages/StockDetailPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        {/* ── Public Routes ── */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ── Protected Routes ── */}
        <Route path="/" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />

        <Route path="/stock/:symbol" element={
          <ProtectedRoute>
            <StockDetailPage />
          </ProtectedRoute>
        } />

        <Route path="/settings" element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } />

        {/* ── 404 ── */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}`,
      },
      {
        label: "3. Cleaner Pattern with Layout Routes",
        description:
          "Instead of wrapping every route individually, you can use a layout route to protect multiple pages at once. Much cleaner for apps with many protected pages.",
        code: `// components/ProtectedLayout.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedLayout() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Outlet renders whatever nested route matched
  return (
    <div className="app-layout">
      <Sidebar />
      <main>
        <Outlet />  {/* ← Nested route renders here */}
      </main>
    </div>
  );
}

// App.jsx — cleaner, less repetition
function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* All protected routes nested under one guard */}
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/stock/:symbol" element={<StockDetailPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}`,
      },
      {
        label: "4. Complete Auth Flow Summary",
        description: "Here's how all the pieces connect — from login to protected page access. This is how real production apps work.",
        code: `// ── THE COMPLETE AUTH FLOW ──
//
// 1. User visits /dashboard (protected)
//    → ProtectedRoute checks useAuth()
//    → isAuthenticated = false
//    → Redirects to /login
//
// 2. User fills in LoginForm
//    → Calls useAuth().login(email, password)
//    → authService.login() → POST /api/auth/login
//    → Server returns JWT token
//    → Token stored in localStorage
//    → AuthContext updates: user = {...}, isAuthenticated = true
//
// 3. User is redirected to /dashboard
//    → ProtectedRoute checks useAuth()
//    → isAuthenticated = true ✓
//    → DashboardPage renders
//    → StockCard calls stockService.getQuote()
//    → apiClient attaches Bearer token to request
//    → Server validates JWT → returns data
//
// 4. User clicks Logout
//    → useAuth().logout()
//    → Token removed from localStorage
//    → AuthContext updates: user = null
//    → ProtectedRoute: isAuthenticated = false
//    → Redirect to /login
//
// Files involved:
//   context/AuthContext.jsx    → global auth state
//   services/authService.js   → API calls for auth
//   services/apiClient.js     → attaches JWT to all requests
//   components/ProtectedRoute → guards pages
//   pages/LoginPage.jsx       → login form UI`,
      },
    ],
  },

  /* ───── COMMON MISTAKES ───── */
  {
    id: "mistakes",
    type: "concept",
    badge: "WATCH OUT",
    title: "Common Mistakes & How to Fix Them",
    blocks: [
      {
        icon: "🔄",
        label: "Infinite Loop in useEffect",
        text: null,
        code: `// ❌ Missing dependency array — runs forever!
useEffect(() => {
  fetchData().then(d => setData(d));
});

// ✅ Add [] to run once on mount
useEffect(() => {
  fetchData().then(d => setData(d));
}, []);`,
      },
      {
        icon: "🔑",
        label: 'Missing "key" in Lists',
        text: null,
        code: `// ❌ No key — React can't track items
{stocks.map(s => <StockCard symbol={s} />)}

// ✅ Unique key for each item
{stocks.map(s => (
  <StockCard key={s} symbol={s} />
))}`,
      },
      {
        icon: "🔒",
        label: "Secrets in Code",
        text: null,
        code: `// ❌ Hardcoded API key
const KEY = "sk_live_abc123secret";

// ✅ Use .env + import.meta.env
const KEY = import.meta.env.VITE_API_KEY;`,
      },
      {
        icon: "🔀",
        label: "Mutating State Directly",
        text: null,
        code: `// ❌ Direct mutation — React won't re-render!
stocks.push("TSLA");
setStocks(stocks);

// ✅ Create a new array (immutable update)
setStocks([...stocks, "TSLA"]);`,
      },
    ],
  },

  /* ───── WHAT'S NEXT ───── */
  {
    id: "next",
    type: "concept",
    badge: "KEEP GOING",
    title: "What to Learn Next",
    blocks: [
      {
        icon: "🧠",
        label: "Advanced State Management",
        text: "When Context isn't enough — libraries like Zustand or Redux Toolkit for complex global state with many updates.",
      },
      {
        icon: "🎣",
        label: "Custom Hooks",
        text: 'Extract reusable logic into hooks like useStockData(symbol) or useDebounce(value). The "services for React" pattern that keeps components clean.',
      },
      {
        icon: "🧪",
        label: "Testing",
        text: "Vitest + React Testing Library. Test components, hooks, and services. Mock API calls. Write tests that give you confidence to refactor.",
      },
      {
        icon: "🚀",
        label: "Deployment",
        text: "Build for production with 'npm run build'. Deploy to Vercel, Netlify, or Azure Static Web Apps. Set environment variables in the hosting dashboard.",
      },
    ],
    note: "You now have the skills to build real, production-ready React applications with authentication, routing, API integration, and proper architecture. These are the same patterns used at companies like Spotify, Klarna, and Avanza.",
  },

  /* ───── CHEAT SHEET ───── */
  {
    id: "cheatsheet",
    type: "cheatsheet",
    badge: "REFERENCE",
    title: "Quick Reference Cheat Sheet",
    sections: [
      {
        title: "Components & Packages",
        items: [
          ["Component", "function MyComp({ prop }) { return <div>...</div>; }"],
          ["Install pkg", "npm install package-name"],
          ["Import", "import { Thing } from 'package-name';"],
          ["Env var", "import.meta.env.VITE_MY_VAR"],
        ],
      },
      {
        title: "API & Services",
        items: [
          ["fetch", "const res = await fetch(url); const data = await res.json();"],
          ["Service", "export const stockService = { getQuote: (s) => apiClient(...) };"],
          ["Auth header", 'Authorization: `Bearer ${token}`'],
          ["Error", "try { ... } catch (err) { setError(err.message); }"],
        ],
      },
      {
        title: "React Router",
        items: [
          ["Route", '<Route path="/stock/:symbol" element={<Page />} />'],
          ["Link", '<Link to="/dashboard">Go</Link>'],
          ["URL param", "const { symbol } = useParams();"],
          ["Redirect", "const navigate = useNavigate(); navigate('/login');"],
        ],
      },
      {
        title: "Auth & Protected Routes",
        items: [
          ["Context", "const { user, login, logout } = useAuth();"],
          ["Guard", "<ProtectedRoute><Page /></ProtectedRoute>"],
          ["Layout", "<Route element={<ProtectedLayout />}>...</Route>"],
          ["Check", "if (!isAuthenticated) return <Navigate to='/login' />;"],
        ],
      },
    ],
  },
];

/* ═══════════════════════════════════════════════
   ANIMATED BACKGROUND — matrix-like stock ticker
   ═══════════════════════════════════════════════ */

function TickerBackground() {
  const tickers = ["VOLV-B", "ERIC-B", "AAPL", "TSLA", "HM-B", "SEB-A", "MSFT", "GOOG", "NDA-SE", "SWED-A", "INVE-B", "SAND", "ABB", "ATCO-A", "HEXA-B"];
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const particles = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 18; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.2 + Math.random() * 0.4,
        ticker: tickers[Math.floor(Math.random() * tickers.length)],
        value: (50 + Math.random() * 500).toFixed(1),
        positive: Math.random() > 0.4,
        opacity: 0.04 + Math.random() * 0.06,
        size: 9 + Math.floor(Math.random() * 3),
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < -30) {
          p.y = canvas.height + 30;
          p.x = Math.random() * canvas.width;
        }
        ctx.font = `500 ${p.size}px 'Courier New', monospace`;
        ctx.fillStyle = p.positive
          ? `rgba(0,230,118,${p.opacity})`
          : `rgba(255,82,82,${p.opacity})`;
        ctx.fillText(`${p.ticker} ${p.value}`, p.x, p.y);
      });
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}

/* ═══════════════════════════════════════════════
   MINI LIVE TICKER BAR (top of screen)
   ═══════════════════════════════════════════════ */

function LiveTicker() {
  const items = [
    { s: "VOLV-B", p: "268.40", c: "+1.85%", up: true },
    { s: "ERIC-B", p: "82.16", c: "-0.73%", up: false },
    { s: "SEB-A", p: "151.20", c: "+0.42%", up: true },
    { s: "AAPL", p: "2145.00", c: "+2.41%", up: true },
    { s: "HM-B", p: "164.80", c: "-1.12%", up: false },
    { s: "TSLA", p: "1720.50", c: "+3.07%", up: true },
    { s: "SAND", p: "218.60", c: "+0.95%", up: true },
    { s: "NDA-SE", p: "132.45", c: "-0.28%", up: false },
  ];
  const doubled = [...items, ...items];

  return (
    <div style={{ overflow: "hidden", background: "rgba(0,0,0,0.6)", borderBottom: "1px solid rgba(0,230,118,0.1)", backdropFilter: "blur(10px)", height: 28, display: "flex", alignItems: "center", position: "relative", zIndex: 10 }}>
      <div style={{ display: "flex", gap: "2rem", animation: "tickerScroll 30s linear infinite", whiteSpace: "nowrap", paddingLeft: 20 }}>
        {doubled.map((t, i) => (
          <span key={i} style={{ fontSize: "0.65rem", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.03em" }}>
            <span style={{ color: "#8892a4" }}>{t.s}</span>{" "}
            <span style={{ color: "#c9d1d9" }}>{t.p}</span>{" "}
            <span style={{ color: t.up ? "#00e676" : "#ff5252" }}>{t.c}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   CODE BLOCK with syntax-ish coloring
   ═══════════════════════════════════════════════ */

function CodeBlock({ code, label }) {
  // HTML-escape first so JSX tags display as text, not rendered as HTML
  const escaped = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const highlighted = escaped.replace(
    /(\/\/.*)|(&quot;|&apos;|['"`])(?:(?!\2).)*\2|\b(import|export|from|default|const|let|var|function|return|async|await|if|else|try|catch|finally|throw|new|typeof|null|true|false|undefined)\b|\b(useState|useEffect|useRef)\b/g,
    (match, comment, strQuote, keyword, hook) => {
      if (comment !== undefined) return `<span class="cmt">${match}</span>`;
      if (strQuote !== undefined) return `<span class="str">${match}</span>`;
      if (keyword !== undefined) return `<span class="kw">${match}</span>`;
      if (hook !== undefined) return `<span class="hook">${match}</span>`;
      return match;
    }
  );

  return (
    <div style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(0,230,118,0.08)", borderRadius: 8, overflow: "hidden", fontSize: "0.68rem", backdropFilter: "blur(8px)" }}>
      {label && (
        <div style={{ padding: "0.3rem 0.75rem", borderBottom: "1px solid rgba(0,230,118,0.06)", color: "#00e676", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'IBM Plex Mono', monospace", background: "rgba(0,230,118,0.03)" }}>
          {label}
        </div>
      )}
      <pre
        style={{ margin: 0, padding: "0.75rem", overflowX: "auto", color: "#c9d1d9", fontFamily: "'IBM Plex Mono', monospace", lineHeight: 1.7, whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SLIDE RENDERERS
   ═══════════════════════════════════════════════ */

function Badge({ children }) {
  return (
    <span style={{ display: "inline-block", padding: "0.2rem 0.7rem", borderRadius: 4, background: "rgba(0,230,118,0.08)", border: "1px solid rgba(0,230,118,0.2)", color: "#00e676", fontSize: "0.6rem", letterSpacing: "0.2em", fontFamily: "'IBM Plex Mono', monospace", marginBottom: "0.75rem" }}>
      {children}
    </span>
  );
}

function CoverSlide({ slide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100%", textAlign: "center", padding: "2rem", position: "relative" }}>
      <Badge>{slide.badge}</Badge>
      <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, background: "linear-gradient(135deg, #00e676 0%, #40c4ff 50%, #ffd740 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.1, marginBottom: "0.75rem", fontFamily: "'Sora', sans-serif" }}>
        {slide.title}
      </h1>
      <p style={{ color: "#8892a4", fontSize: "0.95rem", maxWidth: 550, lineHeight: 1.6, fontFamily: "'IBM Plex Mono', monospace" }}>
        {slide.subtitle}
      </p>
      <div style={{ marginTop: "2.5rem", display: "flex", gap: "0.75rem" }}>
        {["19 Slides", "Live Code", "Stock Market Theme"].map((t) => (
          <span key={t} style={{ padding: "0.3rem 0.75rem", borderRadius: 4, border: "1px solid rgba(0,230,118,0.12)", background: "rgba(0,230,118,0.04)", color: "#00e676", fontSize: "0.65rem", fontFamily: "'IBM Plex Mono', monospace" }}>
            {t}
          </span>
        ))}
      </div>
      <p style={{ marginTop: "2rem", color: "#4a5568", fontSize: "0.7rem", fontFamily: "'IBM Plex Mono', monospace" }}>
        {slide.footer}
      </p>
    </div>
  );
}

function ConceptSlide({ slide }) {
  return (
    <div style={{ padding: "1.5rem", maxWidth: 880, margin: "0 auto" }}>
      <Badge>{slide.badge}</Badge>
      <h2 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#e6edf3", marginBottom: "1.25rem", fontFamily: "'Sora', sans-serif" }}>{slide.title}</h2>
      <div style={{ display: "grid", gridTemplateColumns: slide.blocks.length <= 3 ? "repeat(auto-fit, minmax(240px, 1fr))" : "1fr 1fr", gap: "0.75rem" }}>
        {slide.blocks.map((b, i) => (
          <div
            key={i}
            style={{
              background: "rgba(0,0,0,0.35)",
              border: "1px solid rgba(0,230,118,0.08)",
              borderRadius: 10,
              padding: "1rem",
              backdropFilter: "blur(8px)",
              animation: `fadeSlideUp 0.5s ease ${i * 0.1}s both`,
            }}
          >
            <div style={{ fontSize: "1.3rem", marginBottom: "0.4rem" }}>{b.icon}</div>
            <div style={{ color: "#00e676", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'IBM Plex Mono', monospace", marginBottom: "0.35rem" }}>
              {b.label}
            </div>
            {b.text && <p style={{ color: "#8892a4", fontSize: "0.82rem", lineHeight: 1.6, margin: 0 }}>{b.text}</p>}
            {b.code && (
              <div style={{ marginTop: "0.5rem" }}>
                <CodeBlock code={b.code} />
              </div>
            )}
          </div>
        ))}
      </div>
      {slide.note && (
        <div style={{ marginTop: "1rem", padding: "0.75rem 1rem", borderRadius: 8, background: "rgba(64,196,255,0.05)", borderLeft: "3px solid rgba(64,196,255,0.3)", color: "#8892a4", fontSize: "0.78rem", lineHeight: 1.6 }}>
          💡 {slide.note}
        </div>
      )}
    </div>
  );
}

function SplitSlide({ slide }) {
  return (
    <div style={{ padding: "1.5rem", maxWidth: 920, margin: "0 auto" }}>
      <Badge>{slide.badge}</Badge>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#e6edf3", marginBottom: "1rem", fontFamily: "'Sora', sans-serif" }}>{slide.title}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        {/* Left — diagram */}
        <div style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(0,230,118,0.08)", borderRadius: 10, padding: "1rem", backdropFilter: "blur(8px)" }}>
          <div style={{ color: "#00e676", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'IBM Plex Mono', monospace", marginBottom: "0.75rem" }}>
            {slide.left.label}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            {slide.left.diagram.map((node, i) => (
              <div
                key={i}
                style={{
                  marginLeft: node.depth * 24,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  animation: `fadeSlideUp 0.4s ease ${i * 0.06}s both`,
                }}
              >
                {node.depth > 0 && (
                  <span style={{ color: "rgba(136,146,164,0.3)", fontSize: "0.7rem", fontFamily: "'IBM Plex Mono', monospace" }}>
                    {node.depth === 1 ? "├─" : "│  └─"}
                  </span>
                )}
                <span
                  style={{
                    padding: "0.15rem 0.5rem",
                    borderRadius: 4,
                    border: `1px solid ${node.color}33`,
                    background: `${node.color}0d`,
                    color: node.color,
                    fontSize: "0.7rem",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: 500,
                  }}
                >
                  {"<"}{node.name}{" />"}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Right — principles */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {slide.right.items.map((item, i) => (
            <div
              key={i}
              style={{
                background: "rgba(0,0,0,0.35)",
                border: "1px solid rgba(0,230,118,0.06)",
                borderRadius: 8,
                padding: "0.7rem 0.85rem",
                backdropFilter: "blur(8px)",
                animation: `fadeSlideUp 0.4s ease ${i * 0.08 + 0.3}s both`,
              }}
            >
              <div style={{ color: "#40c4ff", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.2rem" }}>
                {item.title}
              </div>
              <p style={{ color: "#8892a4", fontSize: "0.75rem", lineHeight: 1.5, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CodeSlide({ slide }) {
  const [activeStep, setActiveStep] = useState(0);
  const step = slide.steps[activeStep];

  return (
    <div style={{ padding: "1.25rem", maxWidth: 920, margin: "0 auto" }}>
      <Badge>{slide.badge}</Badge>
      <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#e6edf3", marginBottom: "0.75rem", fontFamily: "'Sora', sans-serif" }}>
        {slide.title}
      </h2>

      {/* Step tabs */}
      <div style={{ display: "flex", gap: "0.3rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
        {slide.steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            style={{
              padding: "0.3rem 0.7rem",
              borderRadius: 4,
              border: `1px solid ${i === activeStep ? "rgba(0,230,118,0.3)" : "rgba(136,146,164,0.1)"}`,
              background: i === activeStep ? "rgba(0,230,118,0.08)" : "transparent",
              color: i === activeStep ? "#00e676" : "#4a5568",
              cursor: "pointer",
              fontSize: "0.65rem",
              fontFamily: "'IBM Plex Mono', monospace",
              transition: "all 0.15s",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Description */}
      <div style={{ marginBottom: "0.65rem", padding: "0.6rem 0.85rem", borderRadius: 8, background: "rgba(64,196,255,0.04)", borderLeft: "3px solid rgba(64,196,255,0.25)" }}>
        <p style={{ color: "#a0aec0", fontSize: "0.8rem", lineHeight: 1.6, margin: 0 }}>
          {step.description}
        </p>
      </div>

      {/* Code */}
      <CodeBlock code={step.code} label={step.label} />
    </div>
  );
}

function CheatsheetSlide({ slide }) {
  return (
    <div style={{ padding: "1.25rem", maxWidth: 920, margin: "0 auto" }}>
      <Badge>{slide.badge}</Badge>
      <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#e6edf3", marginBottom: "1rem", fontFamily: "'Sora', sans-serif" }}>{slide.title}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        {slide.sections.map((sec, si) => (
          <div
            key={si}
            style={{
              background: "rgba(0,0,0,0.35)",
              border: "1px solid rgba(0,230,118,0.08)",
              borderRadius: 10,
              overflow: "hidden",
              backdropFilter: "blur(8px)",
              animation: `fadeSlideUp 0.4s ease ${si * 0.1}s both`,
            }}
          >
            <div style={{ padding: "0.45rem 0.75rem", background: "rgba(0,230,118,0.04)", borderBottom: "1px solid rgba(0,230,118,0.06)", color: "#00e676", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'IBM Plex Mono', monospace" }}>
              {sec.title}
            </div>
            {sec.items.map(([label, val], i) => (
              <div key={i} style={{ padding: "0.35rem 0.75rem", borderBottom: i < sec.items.length - 1 ? "1px solid rgba(136,146,164,0.05)" : "none" }}>
                <div style={{ color: "#40c4ff", fontSize: "0.6rem", fontFamily: "'IBM Plex Mono', monospace", marginBottom: "0.1rem" }}>
                  {label}
                </div>
                <code style={{ color: "#8892a4", fontSize: "0.67rem", fontFamily: "'IBM Plex Mono', monospace", wordBreak: "break-all" }}>
                  {val}
                </code>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════ */

export default function StockPresentation() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [animKey, setAnimKey] = useState(0);
  const total = SLIDES.length;
  const slide = SLIDES[current];

  const goTo = (n) => {
    const next = Math.max(0, Math.min(total - 1, n));
    if (next !== current) {
      setDirection(next > current ? 1 : -1);
      setCurrent(next);
      setAnimKey((k) => k + 1);
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        goTo(current + 1);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goTo(current - 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current]);

  const renderSlide = () => {
    switch (slide.type) {
      case "cover": return <CoverSlide slide={slide} />;
      case "concept": return <ConceptSlide slide={slide} />;
      case "split": return <SplitSlide slide={slide} />;
      case "code": return <CodeSlide slide={slide} />;
      case "cheatsheet": return <CheatsheetSlide slide={slide} />;
      default: return null;
    }
  };

  return (
    <div style={{ height: "100vh", background: "#0a0f1a", color: "#c9d1d9", fontFamily: "'Sora', 'Segoe UI', sans-serif", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;700&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(${direction > 0 ? "40px" : "-40px"}); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .cmt { color: #4a5568; font-style: italic; }
        .str { color: #ffd740; }
        .kw { color: #40c4ff; }
        .hook { color: #00e676; font-weight: 600; }
        *::-webkit-scrollbar { width: 4px; }
        *::-webkit-scrollbar-track { background: transparent; }
        *::-webkit-scrollbar-thumb { background: rgba(0,230,118,0.15); border-radius: 2px; }
      `}</style>

      <TickerBackground />
      <LiveTicker />

      {/* Progress bar */}
      <div style={{ height: 2, background: "rgba(0,230,118,0.06)", position: "relative", zIndex: 10 }}>
        <div style={{ height: "100%", background: "linear-gradient(90deg, #00e676, #40c4ff)", width: `${((current + 1) / total) * 100}%`, transition: "width 0.4s cubic-bezier(0.22, 1, 0.36, 1)" }} />
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.4rem 1.25rem", borderBottom: "1px solid rgba(0,230,118,0.06)", background: "rgba(10,15,26,0.8)", backdropFilter: "blur(12px)", position: "relative", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{ color: "#00e676", fontSize: "0.75rem", animation: "pulse 2s infinite" }}>●</span>
          <span style={{ fontSize: "0.65rem", color: "#4a5568", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.05em" }}>
            REACT_INTERMEDIATE // {slide.badge || slide.type.toUpperCase()}
          </span>
        </div>
        <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? 22 : 5,
                height: 5,
                borderRadius: 3,
                border: "none",
                background: i === current ? "#00e676" : i < current ? "rgba(0,230,118,0.25)" : "rgba(136,146,164,0.1)",
                cursor: "pointer",
                transition: "all 0.25s",
                padding: 0,
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div
        key={animKey}
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          position: "relative",
          zIndex: 5,
          animation: "slideIn 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {renderSlide()}
      </div>

      {/* Footer nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.45rem 1.25rem", borderTop: "1px solid rgba(0,230,118,0.06)", background: "rgba(10,15,26,0.8)", backdropFilter: "blur(12px)", position: "relative", zIndex: 10 }}>
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          style={{
            padding: "0.3rem 0.85rem",
            borderRadius: 4,
            border: "1px solid rgba(136,146,164,0.1)",
            background: "transparent",
            color: current === 0 ? "#1a2332" : "#4a5568",
            cursor: current === 0 ? "default" : "pointer",
            fontSize: "0.68rem",
            fontFamily: "'IBM Plex Mono', monospace",
            transition: "all 0.15s",
          }}
        >
          ← PREV
        </button>
        <span style={{ fontSize: "0.6rem", color: "#2d3748", fontFamily: "'IBM Plex Mono', monospace" }}>
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button
          onClick={() => goTo(current + 1)}
          disabled={current === total - 1}
          style={{
            padding: "0.3rem 0.85rem",
            borderRadius: 4,
            border: `1px solid ${current === total - 1 ? "rgba(136,146,164,0.05)" : "rgba(0,230,118,0.2)"}`,
            background: current === total - 1 ? "transparent" : "rgba(0,230,118,0.06)",
            color: current === total - 1 ? "#1a2332" : "#00e676",
            cursor: current === total - 1 ? "default" : "pointer",
            fontSize: "0.68rem",
            fontFamily: "'IBM Plex Mono', monospace",
            transition: "all 0.15s",
          }}
        >
          NEXT →
        </button>
      </div>
    </div>
  );
}
