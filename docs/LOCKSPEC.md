# LOCKSPEC

## Purpose

Define the non-negotiable scope, structure, interaction, motion, responsive, data, and validation rules for the WPX Studio frontend prototype.

## Scope

Only `/`, `/marketplace`, and `/marketplace/[slug]` are implemented. The product is a frontend-only marketplace prototype with local mock data and UI-only save/export controls.

## Architecture

The app uses Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and local data from `data/marketplace.ts`. It must not add backend routes, databases, authentication, dashboards, billing, analytics, deployment features, real APIs, real saves, or real exports.

## Rules

Every page is composed of sections. Every section must contain a container. Component-level UI cannot own page-level max width. Micro Div is allowed only inside Component or Node.

## Specifications

The locked hierarchy is Website → Page → Section → Container → Grid → Row → Column → Stack → Component → Node → Element → Micro Div. Grid is not Stack. Column is not automatically Stack. Row and Column preserve layout hierarchy.


## Standalone WPX Product Artifact

The repository now includes `wpx-product.html` as a complete standalone HTML/CSS/JS product surface for WPX product demonstrations. The artifact remains frontend-only, uses no backend services, and has no external runtime dependencies. It must preserve mobile-first responsiveness, accessible focus states, visible idle/hover/focus/active/selected/disabled/loading states, animated SVG connections, background effects, simulated save/export actions, and reduced-motion support.

The standalone artifact is allowed to simulate workflow, validation, save, and export states in browser JavaScript only. It must not introduce telemetry, API calls, authentication, external data flows, databases, or real export execution.

## Workflow

Documentation is updated before implementation when behavior changes. Implementation then follows this file and the supporting specs.

## Validation Rules

Section must contain Container. Container cannot be inside Micro Div. Micro Div cannot contain Section. Component can contain Node. Node can contain Element or Micro Div. Grid can contain Row or Column. Row can contain Column. Column can contain Stack or Component.

## Acceptance Criteria

The landing, marketplace list, marketplace detail, preview/save/export UI, catalog metadata, structure tree, validation status, interaction states, motion states, and responsive layouts are visible and limited to frontend-only behavior.

## Definition of Done

Lint, build, and tests pass. No prohibited backend or platform scope is introduced. Documentation and implementation remain aligned.
