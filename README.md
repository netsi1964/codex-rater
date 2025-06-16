# Codex Rater

[Demo](https://codex-rater.deno.dev/)

A small demo app for rating a Codex talk using playful icons. The project is built with Deno Deploy on the backend and a lightweight frontend in vanilla JavaScript and Tailwind CSS with container queries.

Users vote once per device by clicking one of five icons (1–5). Votes are stored in Deno KV and results are rendered live in an SVG chart.

## Getting Started

```bash
deno task start
```

## Running Tests

```bash
deno test
```

## Project Structure

```
/static       → frontend files (HTML/CSS/JS)
/api          → API endpoints (vote submit, fetch results)
/kv           → Deno KV utils
/tests        → test files
```

For more background and feature ideas see [PRD.md](PRD.md).