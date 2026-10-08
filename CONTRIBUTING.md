# Contributing to Eno README Lab

First off, thank you for considering contributing to Eno README Lab! ✨
Whether you're fixing a typo, resolving a bug, improving accessibility, or proposing a new template, all contributions are warmly welcomed.

---

## 🧭 First Time Contributing?

If you are new to open-source or to this repository, take a look at issues labeled:

- [`good first issue`](https://github.com/AlphaIsYour/youralpha-08-eno-readme-lab/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) — Smaller, well-scoped tasks with clear requirements.
- [`help wanted`](https://github.com/AlphaIsYour/youralpha-08-eno-readme-lab/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) — Features or fixes where we are looking for community input and help.

Feel free to comment on an issue to ask questions or claim it before you start working.

---

## 🛠️ Local Development Setup

### Prerequisites

- **Node.js**: 18.x or 20.x+
- **npm** (or `pnpm` / `yarn`)
- **Git**

### Steps

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/eno-readme-lab.git
   cd eno-readme-lab
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser. The app supports hot module reloading.

---

## 🌿 Branching & Git Workflow

1. Ensure your local `master` branch is synchronized with upstream:
   ```bash
   git checkout master
   git pull origin master
   ```
2. Create a descriptive feature branch:
   ```bash
   git checkout -b fix/heading-skip-warning
   # or
   git checkout -b feat/add-storage-sync
   ```
3. Make atomic, focused commits with meaningful commit messages:
   ```bash
   git commit -m "fix(markdown): ignore code blocks in heading structure validation"
   ```
4. Push your branch to your GitHub fork:
   ```bash
   git push origin fix/heading-skip-warning
   ```
5. Open a Pull Request against the `master` branch using our PR template.

---

## 📐 Architecture Overview

Eno README Lab is built as a 100% client-side Next.js 16 (App Router) application. No backend or database is required.

```
src/
├── app/
│   ├── layout.tsx         # Root HTML layout and metadata
│   ├── page.tsx           # Interactive landing page
│   ├── globals.css        # Global Tailwind CSS styling
│   └── editor/
│       └── page.tsx       # Core editor application (state, dnd, layout)
├── components/
│   ├── editor/            # SectionEditor, SortableSection (dnd-kit wrapper)
│   ├── preview/           # MarkdownPreview (react-markdown live renderer)
│   ├── landing/           # Landing page showcase cards
│   └── ui/                # Reusable UI (BadgePicker, Checklist, ValidationPanel, Button)
├── data/
│   ├── badges.ts          # Catalog of Shields.io badges by category
│   └── templates.ts       # Starter templates (Web App, CLI, Library, Minimalist)
├── lib/
│   ├── markdown.ts        # Markdown compiler, heading validator, and checklist definition
│   └── utils.ts           # Utility helpers (IDs, class merging)
└── types/
    └── index.ts           # TypeScript type declarations
```

---

## 🧪 Verification & Code Quality

Before pushing your changes and opening a Pull Request, please ensure:

1. **Code formatting (Prettier)**:
   Format files or verify consistent style:
   ```bash
   # Check formatting
   npm run format:check

   # Automatically format files
   npm run format
   ```
2. **Lint check passes**:
   ```bash
   npm run lint
   ```
3. **Production build succeeds**:
   ```bash
   npm run build
   ```
4. **Responsive behavior**:
   Check that your changes look right on both desktop and mobile viewports.

---

## 💬 Code Style Guidelines

- **Formatting**: Adhere to [.prettierrc](.prettierrc) rules (`semi: true`, `singleQuote: true`, `tabWidth: 2`). Run `npm run format` or enable format-on-save in your editor.
- **TypeScript**: Strive for strict types; avoid using `any`.
- **Components**: Functional components with React hooks.
- **Styling**: Tailwind CSS utility classes; keep custom CSS minimal.
- **Imports**: Use path aliases (`@/components/...`, `@/lib/...`).
- **Simplicity**: Favor clean, readable code over clever abstractions.

---

## ❓ Have Questions or Need Help?

- If you encounter a bug, open an issue using the [Bug Report](https://github.com/AlphaIsYour/youralpha-08-eno-readme-lab/issues/new?template=bug_report.md) template.
- For feature proposals or general questions, feel free to open an issue or initiate a GitHub Discussion.

Thank you for helping make Eno README Lab better! 🚀
