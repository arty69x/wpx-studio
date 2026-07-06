# WHISPERX | STUDIO Technical Specification

## Objective

Build a browser-only studio for drafting, previewing, validating, saving, and exporting WordPress-ready HTML/CSS packages.

## Hard Constraints

- Client-side only.
- No API routes.
- No Server Actions.
- No backend processing.
- Keep the application runnable after every change.

## MVP Phase 1 Scope

- HTML editor.
- CSS editor.
- DOMPurify sanitized preview.
- css-tree CSS syntax validation.
- IndexedDB local save/load using idb.
- ZIP export containing `block.html`, `styles.css`, and export notes.

## Out of Scope

- Authentication.
- Server storage.
- WordPress API integration.
- Remote package processing.
