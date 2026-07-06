# Folder Structure Guide

## Purpose

A predictable folder structure helps teams locate behavior, tests, documentation, assets, configuration, and operational files without relying on tribal knowledge.

## Universal Repository Layout

```text
/
  AGENTS.md
  README.md
  CONTRIBUTING.md
  CODE_OF_CONDUCT.md
  docs/
  src/ or app/
  tests/
  scripts/
  config/
  public/ or assets/
  package, lockfile, or stack manifest
```

## Documentation

`docs/` contains specifications, architecture, standards, prompts, checklists, build notes, changelog, known issues, and troubleshooting.

## Source Code

Source code should be organized by framework convention first and project domain second. Avoid dumping unrelated helpers into a global utility folder.

## Tests

Tests may live beside implementation for unit-level behavior and in dedicated folders for integration, end-to-end, contract, performance, and security tests.

## Scripts

Scripts should be deterministic, documented, safe to rerun, and named by purpose. Destructive scripts must require explicit confirmation or environment gating.

## Configuration

Configuration files should be minimal, documented, and committed only when they do not contain secrets. Environment-specific values belong in secure runtime configuration.
