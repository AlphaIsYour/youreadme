<div align="center">

# Eno README Lab

**A fast, interactive browser-based README builder for open-source maintainers and developers.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![CI](https://github.com/AlphaIsYour/youreadme/actions/workflows/ci.yml/badge.svg)](https://github.com/AlphaIsYour/youreadme/actions)

[Try Demo](http://localhost:3000) • [Key Features](#features) • [Quickstart](#quickstart) • [Roadmap](#roadmap) • [Contributing](#contributing)

</div>

---

## 💡 About Eno README Lab

Writing an engaging, well-structured `README.md` from scratch can be tedious and time-consuming. **Eno README Lab** empowers open-source maintainers, indie hackers, and developers to craft professional README files in minutes.

With drag-and-drop section arrangement, real-time GitHub Flavored Markdown preview, curated Shields.io badges, and an automated best-practices validator, you can focus on building great software while ensuring your repository makes a fantastic first impression.

> **🔒 100% Client-Side & Privacy-First**: Everything runs in your browser. No signup required, no database, and your project data never leaves your device.

---

## ✨ Features

- **🎯 Curated Starter Templates**: Pre-configured templates tailored for Web Apps, Libraries/Packages, CLI Tools, and Minimal projects.
- **⚡ Real-Time Live Preview**: Instant split-view Markdown rendering powered by `react-markdown` and `remark-gfm`.
- **🖐️ Drag & Drop Section Sorting**: Effortlessly organize sections using accessible drag-and-drop handles (`@dnd-kit`).
- **🛡️ Shields.io Badge Library**: Explore, customize, and insert status badges (build status, versions, social links, licenses) with one click.
- **✅ Best Practices Checklist**: Built-in interactive checklist highlighting essential, recommended, and optional sections.
- **🔍 Heading Structure Validator**: Real-time linting for Markdown heading hierarchies (catches missing H1, heading level skips, etc.).
- **💾 One-Click Export**: Instantly copy raw Markdown to your clipboard or download a ready-to-commit `README.md`.
- **🌙 Seamless Dark Theme**: Modern dark aesthetic designed for developer comfort.

---

## 🚀 Quickstart

### Prerequisites

- Node.js 18.x or 20.x+
- npm, yarn, or pnpm

### Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/AlphaIsYour/youreadme.git
cd youreadme

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The live editor is available at `/editor`.

### Available Scripts

| Command         | Purpose                                             |
| --------------- | --------------------------------------------------- |
| `npm run dev`   | Start Next.js development server with hot-reloading |
| `npm run build` | Compile optimized production build                  |
| `npm run start` | Serve production build locally                      |
| `npm run lint`  | Run ESLint across all TypeScript and React files    |

---

## 🗺️ Roadmap

We maintain a transparent roadmap reflecting the real direction of the project:

### ✅ Completed

- [x] Responsive Landing Page and Editor split-view interface
- [x] Drag-and-drop section reordering with `@dnd-kit`
- [x] Shields.io badge picker and category explorer
- [x] Heading hierarchy and structure validator
- [x] Standard starter templates (Web App, Library, CLI, Minimal)
- [x] Markdown export & clipboard copying

### 🔄 In Progress / Planned

- [ ] **Import existing README**: Parse and populate editor sections from an existing `README.md` file.
- [ ] **Local Storage Auto-Save**: Automatically persist in-progress drafts so refreshing doesn't lose data.
- [ ] **Comprehensive Unit Test Suite**: Unit tests for Markdown compiler and heading validator functions.

### 🤝 Help Wanted (Great for Community Contributions!)

- [ ] **New Badge Categories**: Add categories for cloud providers, databases, and CI services in `src/data/badges.ts`.
- [ ] **Accessibility (a11y) Enhancements**: Keyboard navigation and `aria-*` improvements across editor controls.
- [ ] **Mobile Drawer / Toggle**: Smoother mobile responsive preview toggle.

### 🔮 Future Ideas

- [ ] Customizable preview CSS themes (GitHub Light, GitHub Dark, Minimalist).
- [ ] Mermaid diagram section generator block.

---

## 🤝 Contributing

Contributions are what make the open-source community an incredible place to learn, inspire, and create! Any contributions you make are **greatly appreciated**.

Check out our [Contributing Guide](CONTRIBUTING.md) for step-by-step instructions on setting up your environment, coding standards, and how to submit a Pull Request.

Looking for a place to start? Check our issues labeled:

- [`good first issue`](https://github.com/AlphaIsYour/youreadme/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)
- [`help wanted`](https://github.com/AlphaIsYour/youreadme/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)

Please make sure to follow our [Code of Conduct](CODE_OF_CONDUCT.md) in all community interactions.

---

## 👥 Contributors

Thank you to everyone who contributes time, code, and feedback to Eno README Lab!

<!-- Contributors list will be automatically reflected here as the community grows -->

Contributions of any kind — bug reports, documentation clarifications, code fixes, or new template ideas — are always welcome. See the [GitHub Contributor Graph](https://github.com/AlphaIsYour/youreadme/graphs/contributors) for all recognized contributors.

---

## ☕ Support

If you find Eno README Lab helpful for your open-source projects, you can optionally support its ongoing maintenance and development:

<div align="center">

[![Buy Me A Coffee](https://img.shields.io/badge/Support-Buy%20Me%20A%20Coffee-orange?style=for-the-badge&logo=buy-me-a-coffee)](https://buymeacoffee.com/enoalph)

</div>

_Whether or not you donate, your code contributions, issue reports, and feedback are always deeply valued._

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
