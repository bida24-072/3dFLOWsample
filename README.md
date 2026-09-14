# FLOW — 3D Digital Solutions Website

A modern, immersive single‑page website for the fictional digital agency **FLOW**.
Built with **HTML5**, **CSS3**, **Vanilla TypeScript/JavaScript (ES Modules)** and **Three.js**.

## 📁 File Structure

## 🚀 Getting Started

1. Clone or download the project folder.
2. Open `index.html` in a modern browser (Chrome, Firefox, Edge, Safari).
3. That's it — no build step required. Three.js is loaded via CDN import map.

> **Note:** Because ES Modules are used, you must serve the files over HTTP (not `file://`).
> Use any static server, e.g.:
> ```bash
> npx serve .
> # or
> python -m http.server
> ```

## 🧩 Pages / Sections

| Section | ID | Description |
|--------|----|-------------|
| Home / Hero | `#home` | Headline, CTA, stats, floating card |
| Services | `#services` | Grid of 4 core offerings |
| About | `#about` | Company info + feature list |
| Contact / Footer | `#contact` | Email CTA + social links |

## 🛠 Customization

- **Colors:** Edit the gradient values in `css/style.css` (search for `#6c63ff`, `#ff6ec7`, `#a0e9ff`).
- **3D Scene:** Tweak object counts, colors, or speeds inside `js/three-scene.js`.
- **Contact email:** Replace `hello@flow.digital` in `index.html`.
- **Social links:** Update the `href="#"` values in the footer.

## 📦 Tech Stack

- HTML5
- CSS3 (Flexbox, Grid, backdrop-filter, gradients)
- JavaScript ES Modules
- [Three.js r128](https://threejs.org/)
- [Inter Font](https://fonts.google.com/specimen/Inter)
- [Font Awesome 6](https://fontawesome.com/)

## 📄 License

MIT — free for personal and commercial use.
