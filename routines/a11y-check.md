---
description: Comprehensive accessibility audit of the application
---

# Accessibility Check Workflow

## Steps

### 1. Load Context

Read `@docs/DESIGN_SYSTEM.md` and `@docs/DESIGN_TOKENS.md` to understand the project's visual system.

### 2. Color & Contrast Audit

Check all text/background combinations against WCAG 2.1:
- **AA standard** (minimum): 4.5:1 for normal text, 3:1 for large text (18px+ or 14px+ bold)
- **AAA standard** (recommended): 7:1 for normal text, 4.5:1 for large text
- Check both light and dark themes
- Verify semantic colors (success, error, warning) meet contrast requirements
- Ensure focus indicators are visible (2:1 minimum against adjacent colors)

### 3. Keyboard Navigation Audit

Verify ALL interactive elements are keyboard accessible:
- **Tab order** — logical, follows visual layout (left-to-right, top-to-bottom)
- **Focus visible** — every focusable element shows a clear focus ring
- **Enter/Space** — all buttons and links activate on Enter or Space
- **Escape** — closes modals, dropdowns, and popups
- **Arrow keys** — navigate within menus, tabs, and radio groups
- **Skip link** — "Skip to content" link exists as first focusable element
- **No keyboard traps** — user can always tab out of any component

### 4. ARIA & Semantic HTML Audit

- All images have `alt` attributes (decorative images use `alt=""`)
- Form inputs have associated `<label>` elements (not just placeholder text)
- Landmark roles are used: `<nav>`, `<main>`, `<header>`, `<footer>`, `<aside>`
- Dynamic content uses `aria-live` regions for screen reader announcements
- Icon-only buttons have `aria-label` attributes
- Modals use `role="dialog"` and `aria-modal="true"`
- Custom components have appropriate ARIA roles and states
- Page has a single `<h1>` with proper heading hierarchy (h1 → h2 → h3, no skips)

### 5. Responsive & Mobile Accessibility

- Touch targets are at least 44×44px (iOS) / 48×48dp (Android)
- Content is readable without horizontal scrolling at 320px width
- Zoom to 200% doesn't break layout or hide content
- No information conveyed by color alone (use icons, text, or patterns too)

### 6. Motion & Animation

- Check for `prefers-reduced-motion` media query support
- Animations respect the reduced motion preference
- No auto-playing animations that can't be paused
- No flashing content (seizure risk: no content flashes more than 3 times per second)

### 7. Produce Report

Structure findings as:
- 🔴 **Critical** — users cannot access core functionality (missing labels, keyboard traps, no contrast)
- 🟡 **Warning** — usable but degraded experience (poor contrast on secondary elements, missing alt text)
- 🟢 **Suggestion** — enhancement opportunities (better ARIA live regions, improved screen reader flow)

Each finding must include:
- Element/component affected
- Specific file and line (if applicable)
- WCAG criterion violated (e.g., "WCAG 2.1 SC 1.4.3 Contrast")
- Suggested fix

### 8. Log Results

Append to `claude-progress.txt`:
```
A11Y CHECK <ISO timestamp>
Scope: <pages/components checked>
Findings: <X critical, Y warnings, Z suggestions>
Key issues: <1-line summary of critical findings>
```

## Rules
- Never skip dark mode — both themes must be accessible
- Test with actual keyboard navigation, not just visual inspection
- Every form must be completable without a mouse
- Screen reader compatibility is required, not optional
