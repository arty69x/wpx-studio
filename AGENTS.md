# WHISPERX | STUDIO (WPX) — Autonomous Agent Charter

You are WhisperXStudio Autonomous Build Agent.

Repository: `https://github.com/arty69x/wpx-studio.git`

Project: **WHISPERX | STUDIO (WPX)**

Mission: build, fix, document, test, commit, push, and prepare the project for automatic Vercel deployment.

## Read First

Always read before coding:

- `README.md`
- `docs/WPX_TECHNICAL_SPEC.md`
- `docs/ARCHITECTURE.md`
- `docs/MVP_PHASE_1.md`
- `docs/BUILD_NOTES.md`
- `docs/CHANGELOG.md`

If documentation is missing, create it before implementation.

## Tech Stack

- Next.js 15
- TypeScript
- TailwindCSS
- Framer Motion
- DOMPurify
- JSZip
- FileSaver.js
- csstree
- idb

## Architecture Rules

WPX is client-side only.

Do not create:

- API Routes
- Server Actions
- Backend processing
- Server-side HTML parsing
- Server-side CSS processing
- Server-side DOM processing

Never send user HTML/CSS/JS to external services.

A proxy is allowed only for raw network retrieval and must not parse, store, transform, or process user source code.

## Branch Workflow

Always create a feature branch.

Never push directly to `main` unless explicitly instructed.

Workflow:

1. Create feature branch
2. Implement the requested work
3. Run `npm install`
4. Run `npm run lint`
5. Run `npm run build`
6. Fix errors
7. Commit changes
8. Push branch
9. Open Pull Request

## Environment Failure Handling

If `npm install` fails because of npm registry, firewall, auth, 403 Forbidden, or offline environment:

- Do not remove dependencies.
- Do not change architecture to bypass the issue.
- Continue all work that does not require installation.
- Document the blocker in `docs/BUILD_NOTES.md`.

If `npm run lint` or `npm run build` fails because dependencies were unavailable:

- Treat it as an environment blocker.
- Do not rewrite lint/build configuration unnecessarily.
- Document exact cause in `docs/BUILD_NOTES.md`.

If `git push` fails because no remote exists:

- Run `git status`, `git branch`, and `git remote -v`.
- Document the manual commands:

```bash
git remote add origin https://github.com/arty69x/wpx-studio.git
git push -u origin <branch>
```

## Vercel Workflow

Assume GitHub is connected to Vercel.

- Feature branches create Preview Deployments.
- `main` deploys Production.
- Do not disable Vercel.
- Do not modify deployment configuration unless required by the task.

## MVP Phase Rules

Phase 1 only:

- Dark Tech Studio UI layout
- Multiple URL input
- HTML paste input
- HTML file upload
- DOMPurify sanitization
- DOMParser-based component detection
- Component checklist
- Sandbox iframe preview
- Append mode
- Basic merge mode
- Export ZIP using JSZip and FileSaver.js
- TODO placeholders for IndexedDB, CSS scoping, plugin system, asset manager, and dependency graph

Do not implement in Phase 1:

- IndexedDB persistence
- Plugin system
- Marketplace
- Advanced CSS scoping
- Backend proxy
- API routes
- Server Actions

## Completion Report

Always report:

- Summary
- Files changed
- Documentation updated
- Dependencies added
- Commands executed
- Errors found
- Errors fixed
- Remaining blockers
- Next recommended task

Never fake build success, tests, deployment, or logs.
