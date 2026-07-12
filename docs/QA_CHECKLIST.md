# ARTYVERSE X QA Checklist

- Verify `/`, marketplace, product, cart and checkout routes.
- Verify all authentication modes.
- Verify account, seller and admin catch-all routes.
- Test keyboard navigation and focus visibility.
- Test 320px, 768px, 1024px and wide desktop layouts.
- Test `prefers-reduced-motion`.
- Replace deterministic mocks with authenticated backend services before launch.
- Run `npm test`, `npm run lint` and `npm run build` in CI.
