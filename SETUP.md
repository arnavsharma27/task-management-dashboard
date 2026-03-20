# Task Dashboard Setup Guide

This file explains **every step** to set up and run the Task Dashboard project on your machine.

## 1) Prerequisites

Install these first:

- **Node.js**: `20.x` or newer (recommended)
- **npm**: comes with Node
- **Git** (optional, if cloning from repo)

Check installed versions:

```bash
node -v
npm -v
```

If you are using Node `18.x`, project may still run, but you can see engine warnings from some tooling.

---

## 2) Go To Project Folder

If project already exists locally:

```bash
cd /home/arnavsharma/Licious/task-dashboard
```

If cloning from a repo, do:

```bash
git clone <your-repository-url>
cd task-dashboard
```

---

## 3) Install Dependencies

Run:

```bash
npm install
```

This installs:

- React + TypeScript + Vite
- MUI (`@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`)
- Sass (`sass`)
- Drag and drop (`@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`)

---

## 4) Start Development Server

Run:

```bash
npm run dev
```

Vite prints a local URL, usually:

- `http://localhost:5173/`

Open it in browser.

---

## 5) Build For Production

Run:

```bash
npm run build
```

This creates optimized files in:

- `dist/`

---

## 6) Preview Production Build Locally

After build:

```bash
npm run preview
```

Then open the URL shown in terminal.

---

## 7) Project Structure (Important Files)

- `src/App.tsx` -> Main dashboard logic and layout
- `src/domain/types.ts` -> Task TypeScript types
- `src/domain/storage.ts` -> localStorage load/save
- `src/components/TaskFormDialog.tsx` -> Create/Edit modal
- `src/components/TaskList.tsx` -> List view + drag/drop reordering
- `src/components/TaskCards.tsx` -> Card view
- `src/components/FiltersBar.tsx` -> Search + filters + counts UI
- `src/components/ConfirmDialog.tsx` -> Delete confirmation
- `src/styles/global.scss` -> Nested SCSS styles
- `src/index.css` -> Root/global page sizing rules

---

## 8) Available Scripts

From project root:

- `npm run dev` -> start dev server
- `npm run build` -> TypeScript check + production build
- `npm run preview` -> preview production build
- `npm run lint` -> run lint checks

---

## 9) How Data Persistence Works

Tasks are saved in browser localStorage with key:

- `task-dashboard.tasks`

So when you refresh, tasks remain available.

---

## 10) Common Issues + Fixes

### A) White screen

1. Check terminal for compile errors.
2. Run:

```bash
npm run build
```

3. Fix reported errors and refresh browser.

### B) Port already in use

Run on another port:

```bash
npm run dev -- --port 5174
```

### C) Old dependencies cache issue

```bash
rm -rf node_modules package-lock.json
npm install
```

### D) Header/content alignment issues

Already handled by:

- full-width root styles in `src/index.css`
- fixed AppBar + toolbar offset in `src/App.tsx`

---

## 11) Quick Setup (Copy-Paste)

```bash
cd /home/arnavsharma/Licious/task-dashboard
npm install
npm run dev
```

Then open:

- `http://localhost:5173/`

