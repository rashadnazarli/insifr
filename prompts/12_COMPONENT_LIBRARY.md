# 12 — COMPONENT LIBRARY

## Purpose
Define the reusable UI building blocks that compose every screen. No page should be built from scratch — everything is assembled from this library.

## Role
You are acting as a **Frontend Component Architect**.

## Upstream Dependencies
- `docs/DESIGN_SYSTEM.md` (Artifact 11)
- `docs/DESIGN_TOKENS.md` (Artifact 10)

## Required Inputs
- `@docs/DESIGN_SYSTEM.md`
- `@docs/DESIGN_TOKENS.md`

## Operational Rules
- Each component must reference token values, not hard-coded styles.
- Define variants (sizes, colors), states (hover, disabled, error), and slots (content areas).
- Components should be pure HTML + CSS — no framework-specific code unless ARCHITECTURE specifies one.
- Include usage guidelines: when to use each component and when NOT to.

## Output Requirements
Define these component categories with full specifications:

```markdown
# COMPONENT LIBRARY — [Product Name]

## 1. Buttons
## 2. Inputs
## 3. Cards
## 4. Navigation
## 5. Modals & Dialogs
## 6. Badges & Tags
## 7. Tables
## 8. Lists
## 9. Feedback
## 10. Empty States
## 11. Icons
```

### Section Details
1. **Buttons** — primary, secondary, ghost, danger, icon-only; sizes: sm, md, lg
2. **Inputs** — text, email, password, textarea, select, checkbox, radio, toggle
3. **Cards** — standard, interactive (clickable), featured, stats
4. **Navigation** — top bar, sidebar, bottom nav (mobile), breadcrumbs, tabs
5. **Modals & Dialogs** — confirmation, form, alert
6. **Badges & Tags** — status, category, notification count
7. **Tables** — sortable headers, pagination, empty state
8. **Lists** — simple, with actions, with avatars
9. **Feedback** — toast notifications, alerts (info/success/warning/error), progress bars, skeleton loaders
10. **Empty States** — no data, first-time user, error state
11. **Icons** — using Google Material Symbols (Outlined)

For each component include:
- Visual description
- CSS class name (`.btn`, `.card`, `.input`, etc.)
- HTML structure example
- Token references for colors, spacing, radius
- All states (default, hover, focus, active, disabled)
- Responsive behavior
- When to use / when NOT to use

## Few-Shot Example (Partial)
> **Button Component (Gold Standard):**
>
> ```html
> <!-- Primary Button -->
> <button class="btn btn--primary btn--md">
>   <span class="material-symbols-outlined">add</span>
>   Create Project
> </button>
>
> <!-- Ghost Button -->
> <button class="btn btn--ghost btn--sm">Cancel</button>
> ```
>
> | Variant | Background | Text Color | Border | Use When |
> |---|---|---|---|---|
> | Primary | `--color-primary` | `--color-text-inverse` | none | Primary CTA (1 per screen) |
> | Secondary | `--color-surface` | `--color-primary` | `--color-border` | Secondary actions |
> | Ghost | transparent | `--color-text-primary` | none | Tertiary, cancel actions |
> | Danger | `--color-danger` | `--color-text-inverse` | none | Destructive actions only |
>
> **Sizes:** `btn--sm` (32px height), `btn--md` (40px height), `btn--lg` (48px height)
>
> **❌ Do NOT use:** Primary button more than once per visible screen area.

## Anti-Patterns (DO NOT)
- ❌ Create components without state definitions (especially disabled and error)
- ❌ Skip empty states — these are the screens real users see first
- ❌ Design desktop-only components without mobile adaptation
- ❌ Use framework-specific syntax (JSX, Vue template) — keep it HTML + CSS
- ❌ Define components without "when NOT to use" guidance

## Downstream Consumers
This artifact feeds into:
- `docs/LAYOUT_SYSTEM.md` (13) — layouts compose these components
- `docs/WIREFRAMES.md` (14) — wireframes reference these components
- `docs/UI_SPEC.md` (15) — screen specs use these components

## Save As
`docs/COMPONENT_LIBRARY.md`

## Prompt
```text
<role>
Act as a Frontend Component Architect building a reusable component library.
</role>

<context>
You are generating Artifact 12 of 35 in the Founder Mode system. This component library is the building block vocabulary for every screen. Wireframes (14) and UI Spec (15) will reference these components by name and class.
</context>

<upstream_artifacts>
Read both:
- @docs/DESIGN_SYSTEM.md — all interaction states, animation specs, responsive rules
- @docs/DESIGN_TOKENS.md — token names for colors, spacing, radius, shadows
</upstream_artifacts>

<task>
1. Think step by step:
   - What components are needed based on the core use cases in the PRD?
   - What variants does each component need?
   - What are all possible states for each interactive component?
   - How does each component adapt on mobile vs. desktop?
2. Define all 11 component categories with full specifications.
3. Each component must include: HTML structure, CSS classes, token references, all states, and usage guidelines.
4. Use HTML + CSS conventions (no framework code).
5. Include "when to use" and "when NOT to use" for every component.
</task>

<output_format>
Markdown document with exactly 11 component categories as specified.
Each component must include HTML code examples and a variant table.
Save as docs/COMPONENT_LIBRARY.md.
</output_format>

<constraints>
- All style values MUST reference design tokens — no hard-coded colors/sizes.
- All interactive components MUST define all 7 states from the Design System.
- HTML MUST be framework-agnostic (no JSX, no Vue templates).
- Each component MUST include "when NOT to use" guidance.
- Empty states MUST be defined for every data-dependent component.
</constraints>
```
