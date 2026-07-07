# Motion System

## Purpose

Define subtle premium motion for card hover, preview transitions, section reveals, and interaction states.

## Scope

Motion is limited to frontend presentation and uses Framer Motion only. It does not trigger persistence, analytics, or external calls.

## Architecture

Reusable presets live in `components/motion/presets.ts`. Cards and previews apply local Framer Motion animations.

## Rules

Animate transform and opacity first. Avoid layout-shifting width or height animation. Keep preview motion isolated inside preview frames. Respect `prefers-reduced-motion` in global CSS.

## Specifications

Required presets are fadeIn, fadeUp, fadeDown, slideLeft, slideRight, scaleIn, blurIn, revealMask, staggerChildren, cardLift, glowHover, and previewMorph.

## Workflow

New motion must map to a documented preset or a detail-specific preview state.

## Validation Rules

Hover, focus, active, selected, loading, disabled, fade, slide, scale, blur, reveal, scroll reveal, stagger, card lift, glow hover, and preview transition must remain visually represented.

## Acceptance Criteria

Cards lift on hover, preview state controls visibly change the preview, and motion remains subtle.

## Definition of Done

Motion builds without TypeScript errors and does not cause layout shift.
