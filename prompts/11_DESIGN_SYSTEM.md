# 11 — DESIGN SYSTEM

## Purpose
Define the interaction rules and visual patterns that govern how components behave, animate, and respond to user input. This bridges the gap between static tokens and living UI.

## Role
You are acting as a **UX Engineer and Interaction Designer**.

## Upstream Dependencies
- `docs/DESIGN_TOKENS.md` (Artifact 10)
- `docs/BRAND_GUIDELINES.md` (Artifact 09)

## Required Inputs
- `@docs/DESIGN_TOKENS.md`
- `@docs/BRAND_GUIDELINES.md`

## Operational Rules
- Every rule must reference specific tokens (e.g., "hover transitions use `--motion-normal`").
- Define states for all interactive elements: default, hover, focus, active, disabled, loading, error.
- Specify exact CSS properties where possible.

## Output Requirements
Generate a markdown document with these exact sections, in this order:

```markdown
# DESIGN SYSTEM — [Product Name]

## 1. Design Principles
## 2. Interaction States
## 3. Glassmorphism Rules
## 4. Gradient Rules
## 5. Micro-Animation Specification
## 6. Spacing Rules
## 7. Responsive Behavior
## 8. Accessibility Requirements
## 9. Dark Mode Behavior
## 10. Iconography Rules
```

### Section Details
1. **Design Principles** — 3-5 principles guiding all UI decisions (e.g., "Progressive disclosure over feature density")
2. **Interaction States** — standard state definitions for all interactive elements with exact CSS:
   - Default, Hover, Focus, Active, Disabled, Loading, Error
3. **Glassmorphism Rules** — when to use glass effects (modals, sidebars, overlays), with exact CSS
4. **Gradient Rules** — when gradients are appropriate vs. flat colors, with examples
5. **Micro-Animation Specification**:
   - Button hover: translateY(-1px), shadow increase, duration `--motion-normal`
   - Card hover: shadow deepens, subtle lift
   - Page transitions: fade in, duration `--motion-slow`
   - Loading states: skeleton pulse animation
6. **Spacing Rules** — when to use which spacing token (component padding vs. section margins)
7. **Responsive Behavior** — how components adapt across breakpoints (375, 768, 1024, 1440)
8. **Accessibility Requirements** — contrast ratios, focus indicators, reduced-motion support, ARIA patterns
9. **Dark Mode Behavior** — how each element transforms between themes
10. **Iconography Rules** — using Google Material Symbols with ARIA guidelines

## Few-Shot Example (Partial)
> **Section 2 — Interaction States (Gold Standard):**
>
> ```css
> /* Button States */
> .btn {
>   /* Default */
>   background: var(--color-primary);
>   color: var(--color-text-inverse);
>   border-radius: var(--radius-md);
>   padding: var(--space-3) var(--space-6);
>   transition: all var(--motion-normal) ease-out;
>   cursor: pointer;
> }
> .btn:hover {
>   background: var(--color-primary-hover);
>   transform: translateY(-1px);
>   box-shadow: var(--shadow-md);
> }
> .btn:focus-visible {
>   outline: 2px solid var(--color-primary);
>   outline-offset: 2px;
> }
> .btn:active {
>   transform: translateY(0);
>   box-shadow: var(--shadow-sm);
> }
> .btn:disabled {
>   opacity: 0.5;
>   cursor: not-allowed;
>   pointer-events: none;
> }
> .btn--loading {
>   pointer-events: none;
>   position: relative;
> }
> ```
>
> *Notice: Every property references a token. Every state is defined with exact CSS.*

## Anti-Patterns (DO NOT)
- ❌ Define animations without specifying durations and easing curves
- ❌ Ignore disabled and error states — these are seen by real users
- ❌ Skip accessibility — contrast ratios and focus indicators are mandatory
- ❌ Write rules without referencing tokens — "use blue" instead of "use `var(--color-primary)`"
- ❌ Forget `prefers-reduced-motion` — required for accessibility

## Downstream Consumers
This artifact feeds into:
- `docs/COMPONENT_LIBRARY.md` (12) — components implement these rules
- `docs/LAYOUT_SYSTEM.md` (13) — layouts use these responsive rules
- `docs/WIREFRAMES.md` (14) — wireframes reference these patterns

## Save As
`docs/DESIGN_SYSTEM.md`

## Prompt
```text
<role>
Act as a UX Engineer and Interaction Designer who bridges design tokens and living UI.
</role>

<context>
You are generating Artifact 11 of 35 in the Founder Mode system. This design system defines HOW components behave, not just how they look. The Component Library (Artifact 12) and all UI implementation depend on these interaction rules.
</context>

<upstream_artifacts>
Read both:
- @docs/DESIGN_TOKENS.md — all token definitions (colors, spacing, motion, shadows)
- @docs/BRAND_GUIDELINES.md — Sections 3 (Brand Personality), 9 (Visual Style Notes)
</upstream_artifacts>

<task>
1. Think step by step:
   - What design principles match the brand personality?
   - What interaction patterns does the primary persona expect? (enterprise = subtle, consumer = playful)
   - Which elements need glassmorphism vs. flat treatment?
   - What are the exact CSS properties for each state?
2. Define all interaction states with exact CSS referencing tokens.
3. Specify micro-animations with durations and easing curves.
4. Include responsive behavior at all 4 breakpoints.
5. Define accessibility requirements including reduced-motion support.
</task>

<output_format>
Markdown document with exactly 10 sections as specified in Output Requirements.
Interaction states must include CSS code blocks referencing design tokens.
Save as docs/DESIGN_SYSTEM.md.
</output_format>

<constraints>
- Every CSS property MUST reference design tokens — no hard-coded values.
- ALL 7 interaction states MUST be defined (default, hover, focus, active, disabled, loading, error).
- Animations MUST include `prefers-reduced-motion` fallbacks.
- Focus indicators MUST use `focus-visible`, not `focus`.
- Glassmorphism MUST specify backdrop-filter support fallbacks.
</constraints>
```
