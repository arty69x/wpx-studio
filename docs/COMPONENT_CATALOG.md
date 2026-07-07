# Component Catalog

## Purpose

Define the local mock catalog used by the WPX Studio marketplace prototype.

## Scope

The catalog contains every provided reference component name as a real `ComponentItem` record with metadata, preview pattern, structure tree, interaction, motion, responsive behavior, variants, properties, source metadata, and export formats.

## Architecture

Catalog data lives in `data/marketplace.ts`. Types live in `lib/types.ts`. Preview rendering varies by `previewPattern`.

## Rules

Catalog data is local only. Items cannot reference remote APIs or real export jobs. Existing component names must be preserved.

## Specifications

Preview patterns are carousel, navigation, typography, layout, background, and interaction. These patterns create different visual previews and different internal structure nodes while preserving the locked hierarchy.

## Workflow

Choose category and subcategory, assign preview pattern, create metadata, generate structure tree, validate structure, and render in list/detail views.

## Validation Rules

Every item must include id, slug, name, description, category, subCategory, creator, priceType, tags, interactionType, motionType, responsive, exportFormats, structure, variants, properties, sourceType, sourceMeta, and previewPattern.

## Acceptance Criteria

All provided component names appear in the catalog and render as marketplace cards and detail pages.

## Definition of Done

The catalog builds all static detail paths and passes lint, build, and tests.
