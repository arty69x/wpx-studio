# Changelog

All notable changes to this documentation framework are recorded here. The format follows Keep a Changelog principles and uses semantic categories that help release managers understand impact.

## Unreleased

- Rewrote the application surface as a WHISPERX | STUDIO production design platform with landing, marketplace, component library, builder canvas, motion lab, AI studio, asset manager, design tokens, theme lab, and settings routes.
- Added central typed platform dataset for 60 components, 20 templates, 20 motion presets, 20 assets, 10 themes, and 10 AI prompts.
- Added shared cinematic UI primitives, A4 editorial frame, carousel, filters, command palette, drawer, modal, toast, builder nodes, inspector, prompt cards, asset cards, theme cards, and token swatches.

- Added `AGENTS.md` autonomous engineering agent charter.
- Updated README with WPX client-side architecture rules and Vercel workflow.
- Added WPX Technical Specification Manifest v2026.7.5.
- Updated architecture notes, MVP Phase 1 scope, and build failure handling.
- Implemented the complete client-side WPX Studio workbench across phases 1-5: ingestion, IndexedDB workspace, CSS scoping/link rewriting, workbench utilities, and plugin/preset interfaces.
- Documented npm registry E403 dependency installation blocker and downstream lint/build dependency failures in build notes.
- Fixed Next.js ESLint flat config loading for `eslint-config-next` and restored the App Router global stylesheet.
- Completed build verification fixes for TypeScript, css-tree declarations, fetch queue retry/timeout behavior, project restore, ZIP re-import, export manifest, and safe asset export paths.
