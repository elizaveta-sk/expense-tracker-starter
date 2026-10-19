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

The whole app lives in a single component, `src/App.jsx`:
- All state is local `useState`: the transactions list (hardcoded seed data, reset on every reload), the add-transaction form fields, and two filters (type, category).
- Totals (income, expenses, balance) and the filtered list are derived on each render from `transactions`.
- The category list is a hardcoded array in `App.jsx`, shared by the form and the filter dropdown.
- Styling is plain CSS in `src/App.css` and `src/index.css`.

Transaction shape: `{ id, description, amount, type: "income" | "expense", category, date: "YYYY-MM-DD" }`. Note that `amount` is stored as a **string** (both in the seed data and from the form input), so the `reduce` summing totals concatenates strings rather than adding numbers.

## Lint notes

`no-unused-vars` ignores identifiers matching `^[A-Z_]`. `eslint-plugin-react-refresh` is enabled, so component files should export only components.
