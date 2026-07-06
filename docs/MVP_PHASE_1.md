# MVP Phase 1

## Goal

Deliver the first client-side-only WPX Studio workspace.

## In Scope

- Dark Tech Studio UI layout
- Multiple URL input
- HTML paste input
- HTML file upload
- DOMPurify sanitization
- DOMParser component detection
- Component checklist
- Sandbox iframe preview
- Append mode
- Basic merge mode
- Export ZIP using JSZip and FileSaver.js
- TODO placeholders for IndexedDB, CSS scoping, plugin system, asset manager, and dependency graph

## Out of Scope

- IndexedDB persistence
- Plugin system
- Marketplace
- Advanced CSS scoping
- Backend proxy
- API routes
- Server Actions

## Acceptance

- App runs as a browser-only Next.js client application.
- Users can paste or upload HTML.
- Sanitized HTML can be detected into components.
- Selected components can be previewed.
- Selected output can be downloaded as ZIP.
- No backend features are introduced.

## Testing

Run when environment allows:

```bash
npm install
npm run lint
npm run build
```

If dependency installation is blocked by the environment, document the exact blocker in `docs/BUILD_NOTES.md`.
