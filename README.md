# WHISPERX | STUDIO (WPX)

WHISPERX | STUDIO is a client-side-only workspace for prototyping WordPress-ready HTML and CSS packages. MVP Phase 1 focuses on safe local editing, browser-only sanitization, CSS validation, IndexedDB persistence, and ZIP export.

## Tech Stack

- Next.js 15
- TypeScript
- TailwindCSS
- Framer Motion
- DOMPurify
- JSZip
- FileSaver.js
- css-tree
- idb

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Folder Structure

```text
app/                  Next.js App Router pages and global styles
components/           Client UI components
lib/                  Client-side studio utilities
docs/                 Product, architecture, build, and change documentation
```

## MVP Phases

1. **MVP Phase 1:** Local HTML/CSS studio, sanitization, CSS validation, IndexedDB save, ZIP export.
2. **MVP Phase 2:** Import workflows and richer block templates. TODO: define only after Phase 1 approval.
3. **MVP Phase 3:** Advanced validation and packaging guidance. TODO: define only after Phase 2 approval.

## Prohibited Features

- No backend processing.
- No API routes.
- No Server Actions.
- No database or cloud persistence.
- No direct production pushes unless explicitly instructed.

## Vercel Deployment Workflow

- Push feature branches to GitHub to create Vercel Preview Deployments.
- Open a Pull Request for review and preview validation.
- Merge to `main` only when instructed; `main` deploys to Production.
