# Changelog

All notable changes to this documentation framework are recorded here. The format follows Keep a Changelog principles and uses semantic categories that help release managers understand impact.

## Unreleased

### Added

- Created a reusable engineering documentation framework covering autonomous agents, contributors, conduct, build prompts, review prompts, QA prompts, release prompts, specifications, architecture, database, API, UI, coding standards, folder structure, Git workflow, branching, testing, production readiness, security, performance, releases, build notes, known issues, and troubleshooting.
- Added comprehensive production, security, performance, and release checklists with at least 100 verification items each.

### Changed

- Reframed the repository documentation as a reusable company-grade template suitable for future software projects across web, mobile, desktop, backend, and full-stack systems.

### Fixed

- Fixed Vercel ESLint module resolution by importing `eslint-config-next/core-web-vitals.js` with an explicit extension.
- Added a global CSS module declaration so TypeScript accepts side-effect imports such as `app/globals.css` during Next.js production builds.
