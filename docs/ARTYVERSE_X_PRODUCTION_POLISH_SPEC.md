# ARTYVERSE X — Full Production Polish Specification

## Product promise

ARTYVERSE X must feel unmistakable within the first three seconds: playful, premium, slightly mischievous, modern, and collectible. A screen that is merely clean or functional is not complete. The experience must be memorable without becoming noisy, slow, inaccessible, or difficult to maintain.

## Release principles

1. **Distinct before decorative** — each major surface must include at least one ARTYVERSE-owned visual or interaction pattern.
2. **Product remains the hero** — motion, glow, mascot, and typography support discovery and conversion rather than competing with content.
3. **Motion communicates state** — animations must reveal hierarchy, continuity, ownership, progress, or feedback.
4. **Responsive by composition** — mobile is recomposed for touch and thumb reach, not compressed desktop.
5. **Accessible by default** — keyboard, focus, contrast, reduced motion, semantic markup, and clear status messaging are release requirements.
6. **Code and design share language** — component names, variants, motion tokens, and states must map cleanly between Figma, HTML, and React.

## Brand architecture

- Primary product name: **ARTYVERSE**
- Expressive campaign / experimental layer: **ARTYVERSE X**
- Lowercase editorial lockup: **artyverse x**
- Mascot: **Orbit**
- Primary line: **Collect the beautifully weird.**
- Supporting line: **Create. Collect. Own. Forever.**
- Campaign line: **Come for the drop. Stay for the weird.**

Legacy `ARTVERSE` and `WHISPERX` naming must not appear on the production landing experience, metadata, social cards, analytics labels, or new design-system components.

## Visual system

### Core colors

| Token | Value | Role |
|---|---:|---|
| `arty.black` | `#050507` | Primary canvas |
| `arty.ink` | `#0B0B10` | Elevated dark surface |
| `arty.paper` | `#F7F7F3` | Light-mode canvas |
| `arty.lime` | `#C6FF00` | Primary action, discovery, success |
| `arty.pink` | `#FF2DB7` | Expressive accent, scarcity, delight |
| `arty.cyan` | `#20E8D4` | Verification, information |
| `arty.violet` | `#8B5CF6` | Mystery, premium collection |

Neon colors should occupy less than 20% of a typical viewport. Large text and product imagery carry hierarchy; glow is a supporting layer.

### Type hierarchy

- Display: bold geometric sans, tight tracking, fluid with `clamp()`.
- Interface: neutral modern sans for speed and legibility.
- Data and edition labels: monospace, uppercase, tracked.
- Display line-height: `0.82–1.0`.
- Body line-height: `1.55–1.8`.
- Do not use uppercase for long paragraphs.

### Shape language

- Capsules for commands and filters.
- Rounded asymmetric containers for mascot and storytelling moments.
- Strong 24–34px radii for primary cards.
- Circular rings and orbit lines establish motion continuity.
- Product cards use depth stages rather than generic image rectangles.

## Motion operating system

### Named motion families

| Family | Meaning | Usage |
|---|---|---|
| Orbit | discovery and spatial continuity | Mascot, product rail, decorative nodes |
| Snap | responsive command feedback | Buttons, tabs, filters, quantity controls |
| Squish | playful physical confirmation | Save, cart, tap, hold actions |
| Warp | context-preserving navigation | Card to detail, modal, sheet |
| Reward | completion and ownership | Checkout, voucher, collection progress |
| Lock | trust and verification | COA, payment, security |

### Timing tokens

- Instant: `120ms`
- Quick: `180ms`
- Responsive: `280ms`
- Expressive: `480ms`
- Story: `800ms`
- Cinematic: `1200ms`

### Easing tokens

```css
--arty-snap: cubic-bezier(.2,.9,.25,1);
--arty-orbit: cubic-bezier(.16,1,.3,1);
--arty-exit: cubic-bezier(.7,0,.84,0);
```

### Reduced motion

When `prefers-reduced-motion: reduce` is active:

- Stop infinite floating and ticker movement.
- Replace parallax and spatial travel with opacity changes.
- Preserve state feedback without overshoot.
- Never hide content behind motion completion.

## Custom production components

### Orbit Portal

States: `idle`, `tracking`, `opening`, `loading`, `success`, `error`, `sleep`.

Implementation requirements:

- Decorative orbit rings are `aria-hidden`.
- Text status is exposed through an ARIA live region when state changes.
- Rive may be used for the mascot state machine; CSS/HTML fallback is mandatory.

### Product Capsule

Anatomy:

- Product Stage
- Edition Badge
- Creator Identity
- Product Name
- Price Reactor
- Save Action
- Quick Cart Action
- Stock / Drop Signal

Variants: `standard`, `featured`, `limited`, `preorder`, `soldOut`, `owned`, `mystery`.

### Magnetic CTA

Desktop may use subtle pointer attraction. Mobile uses press compression only. Required states: `idle`, `hover`, `focus`, `pressed`, `loading`, `success`, `disabled`.

### Drop Reactor

Contains countdown, stock signal, campaign narrative, verification status, and primary action. Countdown urgency must not depend on color alone.

### Orbit Rail

Desktop supports curved horizontal discovery. Mobile uses a native-feeling swipe rail with snap points. Keyboard users can navigate items with visible focus.

## Responsive contract

### Desktop — 1280px and above

- Rich spatial composition and layered hero.
- Pointer interaction allowed but never required.
- Maximum content width approximately 1720px.
- Four-column product discovery at wide sizes.

### Tablet — 768–1279px

- Hero becomes vertically sequenced.
- Navigation collapses to menu.
- Two-column product discovery.
- Remove expensive secondary parallax layers.

### Mobile — below 768px

- One-column product discovery.
- Minimum touch target 44×44px.
- Primary actions remain within thumb reach.
- Floating visuals may overlap only decorative empty space.
- No interaction depends on hover.

## React implementation contract

- Next.js App Router and TypeScript.
- `framer-motion` handles layout, gesture, presence, and viewport animations.
- Use React state for user-visible interaction state.
- Components expose semantic props rather than raw style controls.
- Server-render meaningful text and navigation.
- Avoid client components unless interaction requires them.
- Dynamic animation packages must be lazy-loaded where practical.

## HTML implementation contract

- Semantic landmarks: `header`, `nav`, `main`, `section`, `article`, `footer`.
- CSS custom properties are the token layer.
- Progressive enhancement: core content and commerce links remain usable without animation JavaScript.
- Web Animations API is preferred for small isolated behavior when React is not used.

## Performance budget

Target on a representative mid-tier mobile device:

- LCP ≤ 2.5s
- INP ≤ 200ms
- CLS ≤ 0.1
- Initial route JS ≤ 180KB gzip where architecture permits
- Hero image ≤ 350KB modern format
- Decorative animation must pause outside the viewport
- Avoid animating layout properties during continuous movement
- Prefer `transform` and `opacity`

## Accessibility release gate

- WCAG 2.2 AA contrast for functional content.
- Visible focus on every interactive element.
- Complete keyboard access.
- Controls have accessible names.
- Status changes announced where necessary.
- No flashing or rapid repeated luminance change.
- Reduced-motion mode visually reviewed.
- Zoom to 200% without loss of content or action.

## Content voice

Playful copy is brief, situational, and never blocks comprehension.

Approved examples:

- Empty cart: “Orbit is starting to worry about this empty bag.”
- Low stock: “Not pressure. Just a very loud whisper.”
- Sold out: “One orbit too late. Next drop?”
- Payment loading: “Talking to the bank in a tiny alien language…”
- Success: “You got it. You may pretend to be calm now.”

Critical payment, shipping, refund, and security messages must remain direct and unambiguous.

## Definition of done

A surface is ready only when all checks pass:

- Brand naming is current.
- Responsive layouts are reviewed at 320, 375, 768, 1024, 1280, and 1440px.
- Empty, loading, error, success, disabled, focus, and reduced-motion states exist.
- Keyboard and screen-reader semantics are checked.
- Product imagery has meaningful fallbacks.
- Motion has a functional purpose and remains performant.
- No generic placeholder card remains on a launch-critical route.
- TypeScript, lint, test, and production build pass.
- Metadata and share previews use ARTYVERSE X.
- Product, design, frontend, QA, accessibility, and performance owners sign off.
