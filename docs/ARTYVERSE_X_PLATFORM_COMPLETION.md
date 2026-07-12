# ARTYVERSE X — Complete Platform Scope

This document locks the implemented production experience and its route coverage.

## Public commerce

- `/` cinematic ARTYVERSE X landing
- `/marketplace` discovery, filters, search, save and cart feedback
- `/marketplace/[slug]` dynamic product details
- `/cart` editable cart, totals, rewards and empty state
- `/checkout` four-step address, delivery, payment, review and success flow

## Authentication

- `/auth/login`
- `/auth/register`
- `/auth/otp`
- `/auth/forgot-password`
- `/auth/reset-password`

## Collector account

`/account` and catch-all account sections support overview, orders, tracking, returns and refunds, reviews, messages, vouchers and credits, collection, addresses, payment methods, notifications and security sessions.

## Seller Center

`/seller` and catch-all seller sections support overview, products, inventory, orders, fulfillment, returns and disputes, promotions and limited drops, analytics, finance and payouts, COA/serial management, staff and roles, and shop settings.

## Admin Operations

`/admin` and catch-all admin sections support command center, users, seller approval, product moderation, order operations, payments and refunds, commission and fees, campaigns and CMS, community moderation, reports and audit, integrations and system settings.

## Responsive and motion contract

- Desktop: fixed operations sidebar, ambient hero context, responsive metric grid and multi-panel workbench.
- Tablet: collapsible navigation and reduced workspace columns.
- Mobile: thumb-accessible menu, stacked panels, two-column metrics and compact cards.
- Motion: entrance sequencing, active-context transition, chart growth, card hover and signal movement.
- Accessibility: keyboard-focusable controls, semantic navigation labels and `prefers-reduced-motion` support.

## Brand contract

The only approved product names are `ARTYVERSE`, `ARTYVERSE X`, and `artyverse x`. Legacy `ARTVERSE` and `WHISPERX` copy is not allowed in newly implemented commerce/platform experiences.

## Production boundary

The current implementation is a complete high-fidelity frontend experience with deterministic mock data. Real authentication, payments, inventory, fulfillment, moderation and persistence require backend services and secrets and must not be simulated as secure production APIs in the client.
