# 13 — LAYOUT SYSTEM

## Purpose
Define reusable page layout templates that ensure every screen shares a consistent structure. This prevents every page from being designed from scratch.

## Role
You are acting as a **Layout Systems Designer**.

## Upstream Dependencies
- `docs/COMPONENT_LIBRARY.md` (Artifact 12)
- `docs/DESIGN_SYSTEM.md` (Artifact 11)

## Required Inputs
- `@docs/COMPONENT_LIBRARY.md`
- `@docs/DESIGN_SYSTEM.md`

## Operational Rules
- Layouts must be responsive-first (mobile → desktop).
- Each template must specify the grid system, content areas, and navigation placement.
- Layouts should work with CSS Grid and/or Flexbox — no framework-specific solutions.
- Specify behavior at all 4 breakpoints: 375, 768, 1024, 1440.

## Output Requirements
Generate a markdown document with these exact sections, in this order:

```markdown
# LAYOUT SYSTEM — [Product Name]

## 1. Grid System
## 2. Layout Templates
## 3. Navigation Patterns
## 4. Content Regions
## 5. Responsive Rules
```

### Section Details
1. **Grid System** — columns, gutters, margins at each breakpoint:

| Breakpoint | Columns | Gutter | Margin | Max Width |
|---|---|---|---|---|

2. **Layout Templates** (define 4-6 reusable templates):
   - **Dashboard Layout** — sidebar + header + content area + (optional) right panel
   - **Marketing/Landing Layout** — full-width hero + content sections + footer
   - **Form Layout** — centered content with max-width constraint
   - **List/Table Layout** — header + filters + scrollable list + pagination
   - **Auth Layout** — centered card on branded background
   - **Settings Layout** — sidebar navigation + detail panel
3. **Navigation Patterns**:
   - Desktop: persistent sidebar or top bar
   - Tablet: collapsible sidebar
   - Mobile: bottom navigation bar
4. **Content Regions** — max-widths for readable text (65-75ch), full-bleed sections, constrained containers
5. **Responsive Rules** — how each layout adapts (stack order changes, element hiding, nav switching)

For each template, provide:
- ASCII wireframe sketch
- CSS Grid/Flexbox approach
- Component placement
- Breakpoint behavior

## Few-Shot Example (Partial)
> **Dashboard Layout (Gold Standard):**
>
> ```
> Desktop (1440px):
> ┌─────────────────────────────────────────────────┐
> │ [Sidebar 240px] │ [Header ─────────────────────] │
> │                 │ [Content area ───────────────] │
> │ • Dashboard     │ ┌─────────┐ ┌─────────┐      │
> │ • Projects      │ │ Stat    │ │ Stat    │      │
> │ • Settings      │ │ Card    │ │ Card    │      │
> │                 │ └─────────┘ └─────────┘      │
> │                 │ ┌─────────────────────┐      │
> │                 │ │ Main content table  │      │
> │                 │ └─────────────────────┘      │
> └─────────────────────────────────────────────────┘
>
> Mobile (375px):
> ┌───────────────┐
> │ [Header ────] │
> │ [Content ──] │
> │ [Stat] [Stat]│
> │ [Table ────] │
> │              │
> │ [Bottom Nav] │
> └───────────────┘
> ```
>
> **CSS Approach:**
> ```css
> .layout-dashboard {
>   display: grid;
>   grid-template-columns: 240px 1fr;
>   grid-template-rows: 64px 1fr;
>   min-height: 100vh;
> }
> @media (max-width: 768px) {
>   .layout-dashboard {
>     grid-template-columns: 1fr;
>     grid-template-rows: 56px 1fr 56px; /* header, content, bottom-nav */
>   }
> }
> ```

## Anti-Patterns (DO NOT)
- ❌ Design fixed-width layouts that don't adapt
- ❌ Skip the mobile layout — it's the first breakpoint, not an afterthought
- ❌ Create unique layouts for every page — reuse templates
- ❌ Use percentage widths for text — use max-width with ch or rem units
- ❌ Forget to define how the sidebar collapses on mobile

## Downstream Consumers
This artifact feeds into:
- `docs/WIREFRAMES.md` (14) — wireframes use these layout templates
- `docs/UI_SPEC.md` (15) — screen specs reference layout names

## Save As
`docs/LAYOUT_SYSTEM.md`

## Prompt
```text
<role>
Act as a Layout Systems Designer responsible for reusable page structure templates.
</role>

<context>
You are generating Artifact 13 of 35 in the Founder Mode system. These layout templates ensure every screen shares a consistent structure. Wireframes (14) and UI Spec (15) will reference these templates by name.
</context>

<upstream_artifacts>
Read both:
- @docs/COMPONENT_LIBRARY.md — navigation components, card components, table components
- @docs/DESIGN_SYSTEM.md — Section 7 (Responsive Behavior), spacing rules
</upstream_artifacts>

<task>
1. Think step by step:
   - What page types will the product need based on the PRD use cases?
   - What grid system works across all 4 breakpoints?
   - How does navigation transform from desktop to mobile?
   - What content width ensures readability?
2. Define the grid system with columns, gutters, and margins per breakpoint.
3. Create 4-6 reusable layout templates with ASCII wireframes.
4. Specify CSS Grid/Flexbox approach for each template.
5. Define navigation patterns for desktop, tablet, and mobile.
</task>

<output_format>
Markdown document with exactly 5 sections as specified in Output Requirements.
Grid system must be a table with breakpoint specifications.
Each layout template must include ASCII wireframes for desktop AND mobile.
Save as docs/LAYOUT_SYSTEM.md.
</output_format>

<constraints>
- Layouts MUST be responsive-first (mobile → desktop).
- MUST use CSS Grid and/or Flexbox — no framework-specific solutions.
- Every template MUST show behavior at all 4 breakpoints.
- Text content width MUST NOT exceed 75ch for readability.
- Mobile layout MUST NOT be an afterthought — define it first.
</constraints>
```
