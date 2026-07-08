# WPX Studio Documentation

## Purpose

Provide implementation-facing documentation for the focused WPX Studio frontend prototype.

## Scope

These documents cover the landing page, marketplace list, marketplace detail, preview/save/export UI, component catalog, locked structure system, locked interaction/motion system, responsive behavior, validation, and acceptance criteria.

## Architecture

The prototype is implemented with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and local mock data. Documentation is production source and must remain aligned with implementation.

## Rules

`LOCKSPEC.md` is the single source of truth. No backend, database, auth, CMS, dashboard, billing, analytics, deployment system, real API, real save, or real export behavior is in scope.

## Specifications

Read `LOCKSPEC.md`, `STRUCTURE_ENGINE.md`, `MOTION_SYSTEM.md`, `MARKETPLACE_SPEC.md`, and `COMPONENT_CATALOG.md` before changing UI code.

## Workflow

Update documentation first when behavior changes, then update implementation, then run lint, build, and tests.

## Validation Rules

Validation rules are documented in `LOCKSPEC.md` and implemented in `lib/structure-validator.ts`.

## Acceptance Criteria

The implemented routes and UI must match the documented locked scope and pass verification commands.

## Definition of Done

Documentation is complete, implementation is aligned, and `npm run lint`, `npm run build`, and `npm test` pass.
