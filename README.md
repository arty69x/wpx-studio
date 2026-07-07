# WPX Studio

WPX Studio is a focused frontend-only Next.js App Router prototype for a premium visual component marketplace. It demonstrates how users browse, preview, save, and inspect export UI for production-ready website components using local mock data only.

## Current Scope

The prototype is intentionally limited to:

- Landing page at `/`.
- Marketplace list page at `/marketplace`.
- Marketplace detail page at `/marketplace/[slug]`.
- Preview, save, and export UI surfaces.
- Local marketplace catalog using the provided component reference names.
- Locked structure system and visible structure validation.
- Locked interaction and motion system.

## Out of Scope

The prototype does not include backend services, API routes, Server Actions, databases, authentication, CMS, dashboard, team features, billing, analytics, deployment automation, real save behavior, or real export generation.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Local mock data

## Verification

Run:

```bash
npm install
npm run lint
npm run build
npm test
```

The active scripts are `dev`, `build`, `start`, `lint`, and `test`.
