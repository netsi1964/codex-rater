# AGENTS.md

## 🧭 Codex Agent Implementation Guide

This project uses a modern, lightweight web stack optimized for live demos and fast deployment. Follow the instructions below to ensure compatibility and coherence with the project vision.

---

## 📦 Backend Guidelines (Deno)

**Environment**: Use the latest stable version of Deno with full TypeScript support.

**Runtime**: Deno Deploy

**Modules and APIs:**

* Use native `fetch` and `Request/Response` interfaces
* Use `Deno.Kv` for persistent vote storage
* Organize code under `/api` (routes) and `/kv` (utility functions)

**Structure:**

```bash
/api
  └── vote.ts         # POST endpoint to receive and store vote
  └── results.ts      # GET endpoint to fetch vote tallies
/kv
  └── kv.ts           # KV store interaction layer
```

**Security:**

* Enforce one-vote-per-device via `localStorage`
* Avoid any IP or cookie-based tracking (POC simplicity)

---

## 🎨 Frontend Guidelines (Client)

**Technologies:**

* Vanilla JavaScript (no frameworks)
* Tailwind CSS (with container queries)

**Responsive Design:**

* Use `@container` queries for layout changes
* Minimize breakpoints; design for fluid scaling

**Directory:**

```bash
/static
  └── index.html
  └── styles.css
  └── app.js
```

**Interactivity:**

* Handle vote clicks with JS DOM events
* Persist voted state in `localStorage`
* Render SVG chart dynamically with JS (no chart libraries)

**Icons:**

* Display 5 pre-generated images with accompanying text
* Match vote index (1 = worst, 5 = best)

---

## ✅ Testing

Use Deno's standard testing library.

```bash
deno test
```

Tests should cover:

* KV operations
* Vote processing
* Percentage calculations

---

## 📋 Summary

Codex should generate code using:

* Deno Deploy backend with latest Deno + TypeScript
* Frontend using only Vanilla JS, Tailwind CSS and container queries
* SVG charts and fun icon voting experience
* No third-party packages unless strictly necessary
