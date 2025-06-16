# Codex Rater 🎉

Rate a Codex intro talk using fun AI-generated icons. Built for live demos using:
- 🧠 Vanilla JS
- 💨 Tailwind CSS + container queries
- ⚡ Deno Deploy + KV storage
- 📊 SVG-based results chart

## 📸 Demo
> _Add GIF or screenshot_

## ✨ Features
- QR-code landing page with CTA
- 1-click voting using icons (1–5)
- Vote stored in Deno KV
- Vote once per device (localStorage)
- Live results in SVG chart

## 🛠 Tech Stack
- Vanilla JavaScript
- Tailwind CSS with container queries
- Deno Deploy
- Deno KV
- SVG for rendering charts

## 🚀 Getting Started

```bash
deno task start
```

## 🧪 Tests

Unit tests written with [`std/testing`](https://deno.land/std/testing).  
Run tests with:

```bash
deno test
```

## 📂 Project Structure
```
/static       → frontend files (HTML/CSS/JS)
/api          → API endpoints (vote submit, fetch results)
/kv           → Deno KV utils
/tests        → test files
```

## 🗂 Roadmap
- [ ] Add server-side IP rate limit (optional)
- [ ] Animated chart transitions
- [ ] Admin mode for viewing votes in real-time

## 🎨 Icon Prompts & Texts

_(1 = worst, 5 = best)_

**1. Melting Banana in Panic**  
Prompt: *...depicting a melting banana holding its cheeks in panic, eyes wide with horror.*  
Text: “Oh dear, this was absolutely ap-peelingly awful!”

**2. Nervous Teacup Sweating**  
Prompt: *...depicting a teacup nervously sweating, with shaking hands and a forced smile.*  
Text: “Mildly steeped, mostly spilled.”

**3. Robot with Toast Jammed in Its Head**  
Prompt: *...depicting a robot with burnt toast stuck in its head and smoke curling out, looking baffled.*  
Text: “Sparks flew… but not in a good way.”

**4. Cactus Trying to Dance but Tangled in Laces**  
Prompt: *...depicting a cactus trying to tap dance but tripping over untied sneakers with an awkward grin.*  
Text: “Clumsy, but charmingly pointy!”

**5. Flying Fish with Graduation Cap and Confetti**  
Prompt: *...depicting a flying fish leaping with a graduation cap and confetti, reading a book mid-air.*  
Text: “Top marks! I’m flipping impressed!”

## 📄 License
MIT

