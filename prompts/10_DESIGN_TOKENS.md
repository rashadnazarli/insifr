# 10 — DESIGN TOKENS

## Purpose
Create the centralized token system that ensures changes to colors, fonts, spacing, and radii propagate consistently across the entire product. Change one token — the whole UI updates.

## Role
You are acting as a **Design Systems Architect**.

## Upstream Dependencies
- `docs/BRAND_GUIDELINES.md` (Artifact 09)
- `docs/CUSTOMER_JOURNEY.md` (Artifact 08)

## Required Inputs
- `@docs/BRAND_GUIDELINES.md`
- `@docs/CUSTOMER_JOURNEY.md`

## Operational Rules
- All UI must reference tokens — never hard-coded values.
- Use semantic naming: `--color-primary` not `--blue-500`, `--space-4` not `--16px`.
- Include both light and dark theme values.
- The token system must support theme-wide changes with a single edit.
- Tokens must map exactly to the brand guidelines colors and typography.

## Output Requirements
Generate a markdown document with these exact sections, in this order:

```markdown
# DESIGN TOKENS — [Product Name]

## 1. Color Tokens
## 2. Typography Tokens
## 3. Spacing Tokens
## 4. Radius Tokens
## 5. Shadow Tokens
## 6. Motion Tokens
## 7. Z-Index Scale
## 8. Glassmorphism Presets
## 9. Iconography
## 10. Usage Rules
## 11. Implementation Notes
```

### Section Details
1. **Color Tokens** — full palette for both themes:
   - Primary, primary-hover, primary-light
   - Secondary, accent
   - Background, surface, surface-alt, surface-elevated
   - Text (primary, secondary, muted, inverse)
   - Border (default, strong)
   - Semantic (success, warning, danger, info) with light variants
2. **Typography Tokens** — font families, weights, sizes (using rem), line heights, letter spacing
3. **Spacing Tokens** — based on 4pt grid (0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24)
4. **Radius Tokens** — none, sm, md, lg, xl, 2xl, full
5. **Shadow Tokens** — xs, sm, md, lg, xl, inner
6. **Motion Tokens** — fast, normal, slow, spring (with easing curves)
7. **Z-Index Scale** — base, dropdown, sticky, overlay, modal, toast
8. **Glassmorphism Presets** — glass background, glass border, blur amount
9. **Iconography** — Google Material Symbols (Outlined) as the default icon set:
   - CDN link
   - Usage syntax
   - Icon size tokens: `--icon-sm: 20px`, `--icon-md: 24px`, `--icon-lg: 32px`, `--icon-xl: 48px`
   - Icon weight: 400 (default), 700 (emphasis)
10. **Usage Rules** — when to use which token (e.g., "Use `--shadow-md` for cards, `--shadow-lg` for modals")
11. **Implementation Notes** — reference to `design-system/css_variables.css` and `design-system/design_tokens.json`

After generating the markdown spec, also update:
- `design-system/css_variables.css` with the actual CSS custom properties
- `design-system/design_tokens.json` with the JSON representation

## Few-Shot Example (Partial)
> **Section 1 — Color Tokens (Gold Standard):**
>
> ```css
> /* Light Theme */
> :root {
>   --color-primary: #2563EB;        /* CTAs, links, primary actions */
>   --color-primary-hover: #1D4ED8;  /* Hover state for primary */
>   --color-primary-light: #DBEAFE;  /* Badges, subtle highlights */
>   --color-bg: #FAFBFC;             /* Page background */
>   --color-surface: #FFFFFF;        /* Card/modal backgrounds */
>   --color-surface-elevated: #FFFFFF; /* Floating elements with shadow */
>   --color-text-primary: #0F172A;   /* Headlines, body text */
>   --color-text-muted: #64748B;     /* Help text, timestamps */
>   --color-border: #E2E8F0;         /* Default borders */
>   --color-success: #16A34A;        /* Positive states */
>   --color-danger: #DC2626;         /* Error, destructive actions */
> }
>
> /* Dark Theme */
> [data-theme="dark"] {
>   --color-primary: #3B82F6;
>   --color-bg: #0F172A;
>   --color-surface: #1E293B;
>   --color-text-primary: #F1F5F9;
>   --color-text-muted: #94A3B8;
>   --color-border: #334155;
> }
> ```
>
> *Notice: Each token has a semantic name, hex value, and usage comment. Both themes are defined.*

## Anti-Patterns (DO NOT)
- ❌ Use arbitrary names like `--color-1` or `--space-a`
- ❌ Define tokens without usage context
- ❌ Skip dark theme — it's not optional
- ❌ Use px units for font sizes — use rem for scalability
- ❌ Define colors that don't match Brand Guidelines — tokens must trace to Artifact 09

## Downstream Consumers
This artifact feeds into:
- `docs/DESIGN_SYSTEM.md` (11) — interaction rules reference these tokens
- `docs/COMPONENT_LIBRARY.md` (12) — components reference these tokens
- `design-system/css_variables.css` — actual implementation

## Save As
`docs/DESIGN_TOKENS.md`

## Prompt
```text
<role>
Act as a Design Systems Architect responsible for the centralized token system.
</role>

<context>
You are generating Artifact 10 of 35 in the Founder Mode system. This token system is the single source of truth for all visual values. Every component, layout, and screen downstream references these tokens. Changing a token value here should ripple through the entire product.
</context>

<upstream_artifacts>
Read both:
- @docs/BRAND_GUIDELINES.md — Sections 7 (Color Palette), 8 (Typography System)
- @docs/CUSTOMER_JOURNEY.md — to understand interaction context (onboarding speed, emotional states)
</upstream_artifacts>

<task>
1. Think step by step:
   - Map each brand color to a semantic token name
   - Define the light/dark theme pair for every color token
   - Create a spacing scale based on 4pt grid
   - Define motion tokens that match the brand personality (playful = bouncy, professional = smooth)
2. Create the complete token specification with all 11 categories.
3. Every token must have: name, value, and usage comment.
4. Generate CSS custom properties for both light and dark themes.
5. Also update the implementation files (css_variables.css and design_tokens.json).
</task>

<output_format>
Markdown document with exactly 11 sections as specified in Output Requirements.
Color tokens must be shown as CSS custom properties with comments.
Both light and dark theme values must be specified.
Save as docs/DESIGN_TOKENS.md.
Also update design-system/css_variables.css and design-system/design_tokens.json.
</output_format>

<constraints>
- ALL token names MUST use semantic naming (--color-primary, NOT --blue-500).
- ALL colors MUST have both light and dark theme values.
- Font sizes MUST use rem units, NOT px.
- Every token MUST include a usage comment.
- Tokens MUST exactly match Brand Guidelines colors and fonts.
</constraints>
```
