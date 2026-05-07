# 15 — UI SPECIFICATION

## Purpose
Translate wireframes into pixel-perfect UI specifications that an AI agent or developer can implement directly. This is the bridge between design thinking and code.

## Role
You are acting as a **UI Specification Writer** who translates design intent into implementable specs.

## Upstream Dependencies
- `docs/WIREFRAMES.md` (Artifact 14)
- `docs/DESIGN_SYSTEM.md` (Artifact 11)
- `docs/COMPONENT_LIBRARY.md` (Artifact 12)

## Required Inputs
- `@docs/WIREFRAMES.md`
- `@docs/DESIGN_SYSTEM.md`
- `@docs/COMPONENT_LIBRARY.md`

## Operational Rules
- Every spec must reference exact components from the Component Library.
- Every spacing, color, and font value must reference design tokens.
- Specify responsive behavior for each screen at all 4 breakpoints.
- Include interaction details: what happens on click, hover, swipe, scroll.

## Output Requirements
For each screen in the wireframes, generate:

```markdown
# UI SPECIFICATION — [Product Name]

## Screen: [Screen Name]
### Route
### Layout Template
### Component Breakdown
### Interaction Specification
### Data Requirements
### Responsive Notes
### Accessibility Notes
### SEO Checklist
```

### Section Details (Per Screen)
1. **Screen Name and Route** — URL path this screen maps to
2. **Layout Template** — which template from LAYOUT_SYSTEM.md
3. **Component Breakdown** — exact components used:

| Component | Library Ref | Variant | Content | Custom Tokens |
|---|---|---|---|---|

4. **Interaction Specification** — for each interactive element:
   - Click/tap action and resulting state change
   - Hover state
   - Loading state
   - Success/error feedback
5. **Data Requirements** — what data each component needs from the API
6. **Responsive Notes** — how the screen adapts at each breakpoint
7. **Accessibility Notes** — ARIA labels, tab order, screen reader announcements
8. **SEO Checklist**:
   - `<title>` tag, `<meta description>`, OpenGraph tags, Twitter Card tags
   - Single `<h1>`, proper heading hierarchy, semantic HTML
   - `robots.txt`, `sitemap.xml`, canonical URLs, JSON-LD structured data

## Few-Shot Example (Partial)
> **Screen: Dashboard — Component Breakdown (Gold Standard):**
>
> | Component | Library Ref | Variant | Content | Custom Tokens |
> |---|---|---|---|---|
> | Top Bar | `.nav-topbar` | default | Logo + "Dashboard" | — |
> | Notification Badge | `.badge--count` | danger | "3" | — |
> | Stat Card | `.card--stats` | default | Revenue / $142K | `--color-success` for positive |
> | Stat Card | `.card--stats` | warning | Discrepancies / 3 | `--color-warning` |
> | Data Table | `.table--sortable` | striped | Discrepancy list | — |
> | Row Action | `.btn--ghost.btn--sm` | default | "View Details" | — |
>
> **Interaction: Stat Card (Discrepancies)**
> - **Click:** Navigate to `/discrepancies?severity=all`
> - **Hover:** Card elevates with `--shadow-lg`, cursor pointer
> - **Loading:** Skeleton pulse animation, 3 second max
> - **Error:** Card displays "Unable to load" with retry button

## Anti-Patterns (DO NOT)
- ❌ Describe components without referencing the Component Library
- ❌ Use hard-coded values instead of token references
- ❌ Skip interaction specs — "button does something" is not a spec
- ❌ Forget responsive behavior — every screen must work on mobile
- ❌ Write vague data requirements — specify exact API endpoint and response fields

## Downstream Consumers
This artifact feeds into:
- `docs/ARCHITECTURE.md` (16) — frontend route structure
- `docs/FEATURE_EXECUTION.md` (21) — implementation guide

## Save As
`docs/UI_SPEC.md`

## Prompt
```text
<role>
Act as a UI Specification Writer translating design intent into implementable, pixel-perfect specs.
</role>

<context>
You are generating Artifact 15 of 35 in the Founder Mode system. This spec is the final design document before code. An AI agent or developer should be able to implement every screen from this document without design ambiguity.
</context>

<upstream_artifacts>
Read all three:
- @docs/WIREFRAMES.md — screen inventory, user flows, ASCII wireframes
- @docs/DESIGN_SYSTEM.md — interaction states, animation specs
- @docs/COMPONENT_LIBRARY.md — exact component names, variants, CSS classes
</upstream_artifacts>

<task>
1. Think step by step for each screen:
   - What exact components from the library compose this screen?
   - What variant/size is each component?
   - What happens on every interaction (click, hover, loading, error)?
   - What API data does each component need?
   - How does the screen adapt at each breakpoint?
2. Create detailed UI specifications for every screen in the wireframes.
3. Each screen needs: route, layout template, component breakdown, interaction specs, data requirements, and responsive notes.
4. Include SEO checklist for every public-facing page.
5. Include accessibility notes with ARIA labels and tab order.
</task>

<output_format>
Markdown document with a spec section for each screen.
Component breakdown must use a table format.
Every interaction must specify all 4 states (click, hover, loading, error).
Save as docs/UI_SPEC.md.
</output_format>

<constraints>
- All components MUST reference Component Library by name and CSS class.
- All style values MUST reference design tokens — no hard-coded values.
- Every interactive element MUST specify click, hover, loading, AND error states.
- Every public page MUST have an SEO checklist.
- Every screen MUST specify responsive behavior at all 4 breakpoints.
</constraints>
```
