# Known Issues

## Purpose

Known issues provide a controlled record of accepted defects, environment limitations, operational constraints, and deferred risks. This document should help product, engineering, QA, support, and release teams make informed decisions.

## Issue Record Format

Each issue should include identifier, title, status, severity, affected versions, affected platforms, description, user impact, workaround, owner, target resolution, verification plan, and links to supporting evidence.

## Current Known Issues

### KI-001: Remote Push Requires Repository Access

- Status: Open until a maintainer confirms remote credentials in the active environment.
- Severity: Operational.
- Impact: Branches cannot be pushed and pull requests cannot be created from an environment that lacks a configured `origin` remote or credentials.
- Workaround: Configure `origin` with the repository URL and push from an authenticated environment.
- Verification: `git remote -v` shows the intended remote and `git push -u origin <branch>` succeeds.

### KI-002: Dependency Installation May Depend on Registry Policy

- Status: Environment-dependent.
- Severity: Operational.
- Impact: Package installation, linting, and builds can fail when the package registry is blocked by network policy, authentication, or security rules.
- Workaround: Use an approved registry mirror or authenticated network path without changing project dependencies to hide the blocker.
- Verification: Dependency installation completes and downstream checks run.
