# Branching Strategy

## Branch Types

- `main`: production-ready history.
- `develop` or `work`: integration branch when the team uses staged integration.
- `feature/<name>`: new feature or documentation work.
- `fix/<name>`: defect fixes.
- `release/<version>`: release stabilization.
- `hotfix/<name>`: urgent production fixes.

## Protection Rules

Production branches should require pull requests, passing checks, review approval, up-to-date branches, signed commits when required, and restricted force pushes.

## Naming

Branch names should be lowercase, hyphenated, concise, and tied to the work outcome.

## Merge Policy

Use squash merge for compact feature history, merge commits for preserving complex branch context, and rebase only when the team accepts rewritten branch history.

## Release Branches

Release branches accept only stabilization changes, documentation corrections, version updates, and approved release-blocker fixes.
