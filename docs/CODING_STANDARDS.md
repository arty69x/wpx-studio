# Coding Standards

## General Principles

Code should be readable, predictable, testable, accessible, secure, and easy to delete. Prefer explicit domain language over clever abstractions. Keep files focused and modules cohesive.

## TypeScript

Use strict types, clear interfaces, discriminated unions for state, type guards for unknown data, readonly values when mutation is not required, and explicit return types for exported functions. Avoid `any`, broad casts, and hidden nullability.

## React

Keep components small, name components by domain purpose, separate container concerns from reusable presentation when complexity grows, avoid unnecessary effects, keep render functions pure, and use keys that are stable business identifiers.

## Hooks

Call hooks only at the top level, keep dependency arrays correct, avoid effects for derived state, clean up subscriptions, isolate reusable stateful behavior into custom hooks, and prevent stale closures.

## Naming

Use descriptive names that reveal intent. Components use PascalCase, functions and variables use camelCase, constants use UPPER_SNAKE_CASE only for true constants, files use the repository convention, and tests mirror the unit under test.

## Folder Structure

Place code by feature or domain when product complexity is high and by technical layer only when the project is small. Keep public entry points clear and avoid circular dependencies.

## Imports

Group imports by external packages, internal aliases, relative modules, and types. Do not wrap imports in try/catch. Remove unused imports and avoid deep imports into private package internals.

## Components

Components should expose a minimal API, support disabled/loading/error states when interactive, use semantic elements, forward relevant accessibility attributes, and avoid embedding unrelated business rules.

## Performance

Measure before optimizing. Avoid unnecessary re-renders, large synchronous work on the main thread, unbounded lists, oversized bundles, repeated network calls, and memory leaks.

## Accessibility

Every interactive element must be keyboard reachable, labeled, visible in focus state, and understandable to assistive technology. Color cannot be the only carrier of meaning.

## Error Handling

Handle expected errors close to the boundary where they occur. Use typed results or domain errors for recoverable conditions. Log actionable diagnostics without exposing secrets.

## Comments

Comments explain why, not what. Use comments for invariants, non-obvious tradeoffs, security constraints, interoperability constraints, and references to external standards.

## Documentation

Update README, specifications, API docs, changelog, build notes, and troubleshooting guidance when behavior or operations change.
