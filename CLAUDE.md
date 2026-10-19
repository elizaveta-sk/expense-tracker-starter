# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

Starter project for a Claude Code course: a React expense tracker that **intentionally** ships with a bug, poor UI, and messy code, to be fixed over the course. Expect to refactor rather than preserve existing patterns.

## Commands

- `npm install` — install dependencies
- `npm run dev` — Vite dev server at http://localhost:5173
- `npm run build` — production build to `dist/`
- `npm run lint` — ESLint (flat config in `eslint.config.js`)
- `npm run preview` — serve the production build

There is no test framework or test script configured.

Vite 7 requires Node.js 20.19+ or 22.12+.

## Architecture

React 19 + Vite, plain JavaScript (JSX, no TypeScript), no router, no state library, no backend or persistence.

All state is local `useState`, with each piece held by the component that uses it. Components live flat in `src/`:
- `App.jsx` owns the transactions list (hardcoded seed data, reset on every reload) and renders the three children below. The categories are a module-level constant here, `{ expense: [...], income: [...] }`, passed as a prop to the form (which offers only the list matching the selected type) and the list.
- `Summary.jsx` takes `transactions` and derives the totals (income, expenses, balance) on each render.
- `TransactionForm.jsx` owns the form field state and passes each new transaction to `App` through `onAdd`.
- `TransactionList.jsx` takes `transactions`, owns the two filters (type, category), and renders the filtered table. Each row has a Delete button that calls `App`'s `onDelete` with the transaction's `id`.
- Styling is plain CSS in `src/App.css` and `src/index.css`.

Transaction shape: `{ id, description, amount, type: "income" | "expense", category, date: "YYYY-MM-DD" }`. `amount` must be a **number**: the form input yields a string, so `TransactionForm`'s `handleSubmit` parses it before calling `onAdd` (otherwise the totals' `reduce` in `Summary` would concatenate strings).

## Lint notes

`no-unused-vars` ignores identifiers matching `^[A-Z_]`. `eslint-plugin-react-refresh` is enabled, so component files should export only components.
