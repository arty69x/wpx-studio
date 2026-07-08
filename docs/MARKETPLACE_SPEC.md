# Marketplace Spec

## Purpose

Specify the product marketplace list and detail experience for WPX Studio.

## Scope

Marketplace scope includes search, category tabs, subcategory chips, filter UI, sort control, component cards, detail pages, preview state controls, save UI, export UI, related components, and local mock metadata.

## Architecture

`/marketplace` renders a client-side filtered local catalog. `/marketplace/[slug]` renders static detail pages for catalog slugs generated from local data.

## Rules

The marketplace must not fetch external APIs, persist saves, create real exports, or introduce authentication.

## Specifications

Cards show preview, name, category, subcategory, price badge, creator, tags, interaction type, motion type, responsive badge, preview button, save button, and export button.

## Workflow

Users search or filter, inspect cards, open detail, switch device and preview states, inspect structure validation, and review save/export UI.

## Validation Rules

All cards must resolve to an existing detail route. Detail pages must have valid local catalog metadata.

## Acceptance Criteria

Marketplace list feels like a product marketplace and detail pages feel like component product pages.

## Definition of Done

Search, filters, responsive grid, cards, and detail routes work with the full local catalog.

## Catalog-Wide Installation Update

All marketplace-facing sections consume `data/marketplace.ts`: landing metrics, category cards, catalog rail, motion inventory, structure representatives, export format inventory, marketplace list, detail pages, and related components. This keeps the prototype visually consistent and prevents disconnected mock UI.
