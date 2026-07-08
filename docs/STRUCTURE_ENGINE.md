# Structure Engine

## Purpose

Document and render the locked WPX hierarchy so every marketplace component can be inspected consistently.

## Scope

The structure engine covers the visual `StructureTree`, local `StructureNode` data, and validation status on marketplace detail pages.

## Architecture

`StructureNode` is defined in `lib/types.ts`. Catalog records include a `structure` tree. `StructureTree` renders the tree. `validateStructure` checks locked hierarchy rules.

## Rules

Section controls vertical rhythm. Container controls max width. Grid controls two-dimensional placement. Row and Column preserve hierarchy. Stack controls one-dimensional flow. Component controls reusable behavior. Node describes internal component anatomy. Element is the rendered primitive. Micro Div is a small decorative or functional wrapper.

## Specifications

Each catalog item uses a pattern-specific structure for carousel, navigation, typography, layout, background, or interaction previews while preserving the same locked hierarchy.

## Workflow

When a catalog item is added or changed, its structure tree is updated first, then validated on the detail page.

## Validation Rules

The validator enforces Section→Container, Grid→Row/Column, Row→Column, Column→Stack/Component, Component→Node, and Node→Element/Micro Div relationships.

## Acceptance Criteria

Every detail page renders a visible structure tree and a visible `Structure Valid` or `Structure Invalid` status.

## Definition of Done

All catalog structures validate and display without runtime errors.
