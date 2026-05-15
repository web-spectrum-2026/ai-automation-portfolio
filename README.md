# Mark Dasihit — AI Automation Officer Portfolio

A single-page portfolio site for Mark Dasihit, AI Automation Officer.

> **Multi-agent systems that run operations.**
> Autonomous AI and operational workflows for startups that ship.

## What's inside

- **Selected Work** — 44 workflow patterns across 7 categories: AI · Sales · IT Ops · Marketing · Document Ops · HR · Support. Each has its own detail page (hash-routed) with an original architecture diagram and a walkthrough.
- **Custom architecture diagrams** — 5 of the projects have rich original swimlane SVG diagrams, each demonstrating a different architectural pattern:
  - **Generate leads with Google Maps** — linear pipeline with retry / backoff on rate limits
  - **Angie — personal AI assistant** — hub-and-spoke agent with tool spokes (Calendar, Gmail, Tasks, etc.)
  - **Chat with a database using AI** — planner-executor with SQL safety guard and error-retry loop
  - **RAG chatbot for company documents** — dual pipeline (indexing + query) meeting at a shared vector store
  - **Analyze Landing Page with OpenAI** — fan-out / fan-in × 2 (structural parsing + parallel AI critics)
- **Capabilities** — four practice areas: AI & Agents · Engineering & Development · Operations & Systems · Product & Strategy
- **Stack** — Claude · ChatGPT · CrewAI · OpenClaw · Python · n8n · Make · Supabase · Notion · Airtable · and more
- **Workflows** — four representative architecture diagrams (lead management, content ops, logistics coordination, multi-agent support)

## Structure

```
.
├── index.html       — Self-contained portfolio site (HTML + inline CSS + inline JS)
└── README.md        — This file
```

Single static HTML file. No build step, no framework, no dependencies. Inline CSS and JavaScript. Hash-routed detail pages. Responsive across desktop, tablet, and mobile.

## Tech

- Vanilla HTML5 / CSS3 / ES6+ JavaScript
- Google Fonts: Inter · JetBrains Mono · Instrument Serif
- Original inline SVG architecture diagrams (no external image dependencies)
- Hash routing for project detail pages (`#project/{slug}`)
- IntersectionObserver-driven scroll-reveal animations
- Real-time client-side filtering across 44 project cards
- Touch swipe + keyboard navigation supported

## Run locally

```sh
# Any static file server works
python3 -m http.server 8080
# then open http://localhost:8080
```

Or just open `index.html` directly in a browser — everything works file-protocol (no server required).

## Deploy via GitHub Pages

1. Repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` · folder: `/ (root)`
4. Save. The site goes live at `https://web-spectrum-2026.github.io/ai-automation-portfolio/`

## Contact

The contact section on the live site has placeholder fields ready for real values (email, LinkedIn, portfolio URL, phone). Update those in `index.html` before sharing publicly.

---

Built with [Claude Code](https://claude.com/claude-code).
