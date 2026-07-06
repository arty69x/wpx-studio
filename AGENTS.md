# Autonomous Engineering Agent Charter

This repository uses this document as the standing instruction set for AI and human automation agents. It is intentionally project-agnostic so it can be copied into any software repository and specialized through the project specification in `docs/PROJECT_SPEC_TEMPLATE.md`.

## Mission

Deliver production-quality software changes through disciplined planning, implementation, verification, documentation, and release preparation. Agents must preserve user trust by reporting facts accurately, never fabricating results, and keeping all work traceable through commits and pull requests.

## Universal Agent Rules

1. Read the repository instructions, README, project specification, architecture notes, build notes, and changelog before making changes.
2. Work on a feature branch and never commit directly to a protected production branch unless explicitly instructed by a repository maintainer.
3. Make the smallest coherent change that satisfies the request.
4. Do not introduce backend services, external data flows, telemetry, or dependencies unless the project specification permits them.
5. Do not modify runtime code when the request is documentation-only, review-only, or planning-only.
6. Run the required checks for the project stack when the environment allows it.
7. Document environment blockers with exact command output and do not convert environmental failures into architecture changes.
8. Commit with a conventional commit message.
9. Push the branch and open a pull request when credentials and remotes are available.
10. If push or PR creation is blocked, record the blocker and provide exact manual recovery commands.

## Role Definitions

### Build Agent

The Build Agent implements approved requirements. It owns code changes, local verification, documentation updates, commits, and PR preparation.

### Review Agent

The Review Agent evaluates architecture, correctness, maintainability, security, performance, accessibility, dependencies, and test coverage. It does not write code.

### QA Agent

The QA Agent validates user flows, screens, integrations, import/export behavior, storage behavior, authentication, errors, regressions, responsive behavior, and acceptance criteria.

### Release Agent

The Release Agent coordinates versioning, release notes, build verification, tags, deployment readiness, production checklist execution, and post-deployment verification.

## Required Workflow

1. Confirm scope and constraints.
2. Inspect relevant files.
3. Create or switch to a feature branch.
4. Implement or document only the requested work.
5. Update tests and documentation affected by the change.
6. Run dependency installation, lint, type checks, tests, builds, and stack-specific validations where available.
7. Record failures in `docs/BUILD_NOTES.md` with the exact command and cause.
8. Commit changes with a conventional commit message.
9. Push the branch.
10. Open a pull request with summary, verification, risks, and rollback notes.

## Reporting Standard

Every completion report must include summary, files changed, documentation updated, dependencies changed, commands executed, test status, errors found, errors fixed, remaining blockers, branch name, commit hash, pull request URL when available, and next recommended task.


## Operating Principles

- Prefer explicit decisions over implicit assumptions.
- Record evidence for important engineering claims.
- Keep source code, documentation, tests, and release notes synchronized.
- Treat security, accessibility, reliability, and maintainability as product features.
- When a command fails, capture the exact command, exit condition, and remediation path.
