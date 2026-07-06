# Reusable Engineering Documentation Framework

This repository contains a production-grade documentation system for planning, building, reviewing, testing, securing, releasing, and operating software projects. It is designed to be reused across web, mobile, desktop, backend, full-stack, data, and automation products.

## Purpose

The framework gives every project a consistent engineering operating model. Teams can copy the documents into a new repository, complete the project-specific sections, and immediately gain a professional baseline for autonomous agents, human contributors, QA, release management, architecture governance, and production readiness.

## What Is Included

- Autonomous agent instructions in `AGENTS.md`.
- Contributor and community governance through `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`.
- Universal AI prompts for build, review, QA, and release roles.
- Templates for project specifications, architecture, database design, API design, and UI design.
- Engineering standards for TypeScript, React, hooks, imports, accessibility, performance, comments, and documentation.
- Folder, Git, branching, test, release, security, performance, production, troubleshooting, known issue, changelog, and build-note systems.

## Supported Project Types

This framework is suitable for Next.js, React, TypeScript, Tailwind, Node.js, NestJS, Laravel, Python, Flutter, Vue, Angular, Electron, desktop applications, mobile applications, web applications, APIs, libraries, internal tools, and hybrid platforms.

## How To Use This Framework

1. Start with `docs/PROJECT_SPEC_TEMPLATE.md` and define the product, users, goals, screens, flows, data model, APIs, security needs, performance targets, testing strategy, deployment model, and acceptance criteria.
2. Use `docs/ARCHITECTURE_TEMPLATE.md` to define the runtime architecture, boundaries, dependencies, observability, data flow, scalability, and failure modes.
3. Apply `docs/CODING_STANDARDS.md` before writing code.
4. Use `docs/MASTER_BUILD_PROMPT.md` when assigning implementation work to an autonomous engineering agent.
5. Use `docs/REVIEW_AGENT_PROMPT.md`, `docs/QA_AGENT_PROMPT.md`, and `docs/RELEASE_AGENT_PROMPT.md` for independent quality gates.
6. Execute the checklists in `docs/PRODUCTION_CHECKLIST.md`, `docs/SECURITY_CHECKLIST.md`, `docs/PERFORMANCE_CHECKLIST.md`, and `docs/RELEASE_CHECKLIST.md` before production release.
7. Record command output and blockers in `docs/BUILD_NOTES.md`.
8. Track user-visible and operational changes in `docs/CHANGELOG.md`.

## Quality Bar

Documentation in this repository is written for professional engineering teams. Each document is actionable, reusable, and structured for real delivery work rather than demonstration content.

## Governance

Changes to this framework should be reviewed like production code. Documentation changes can change team behavior, compliance posture, product reliability, and release risk.


## Operating Principles

- Prefer explicit decisions over implicit assumptions.
- Record evidence for important engineering claims.
- Keep source code, documentation, tests, and release notes synchronized.
- Treat security, accessibility, reliability, and maintainability as product features.
- When a command fails, capture the exact command, exit condition, and remediation path.
