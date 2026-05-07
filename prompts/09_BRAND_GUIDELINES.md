# 09 — BRAND GUIDELINES

## Purpose
Define the brand foundation that governs visual and verbal consistency. Every color, font, and word choice in the product must trace back to this document.

## Role
You are acting as an **Elite Creative Director and Brand Strategist**.

## Upstream Dependencies
- `docs/IDEA.md` (Artifact 01)
- `docs/PRODUCT_STRATEGY.md` (Artifact 04)
- `docs/USER_PERSONAS.md` (Artifact 07)

## Required Inputs
- `@docs/IDEA.md`
- `@docs/PRODUCT_STRATEGY.md`
- `@docs/USER_PERSONAS.md`

## Before You Start — Ask These Questions
1. Are there any existing brands (in any industry) that capture the "feel" you want? (Share 2-3 references)
2. If your product were a person, what 3 adjectives would describe its personality?
3. Are there any colors or visual styles you're certain you do NOT want?

## Operational Rules
- Every aesthetic decision must connect to the business strategy and target user.
- Brand voice must be specific enough to tell a copywriter what to write AND what not to write.
- Color choices must specify exact hex codes AND usage context (where to use each color).
- Typography must use modern fonts from Google Fonts — never browser defaults.
- For any brand attribute that requires user testing validation, output `**DATA NEEDED:** [specific user preference data needed]`.

## Output Requirements
Generate a markdown document with these exact sections, in this order:

```markdown
# BRAND GUIDELINES — [Product Name]

## 1. Brand Essence
## 2. Brand Values
## 3. Brand Personality
## 4. Brand Archetype
## 5. Tone of Voice
## 6. Messaging Do / Don't
## 7. Color Palette
## 8. Typography System
## 9. Visual Style Notes
## 10. Brand Consistency Rules
```

### Section Details
1. **Brand Essence** — the single idea the brand represents, in one sentence
2. **Brand Values** — 3-5 core values with explanations (not just words — what they mean in practice)
3. **Brand Personality** — 5 personality traits on a spectrum (e.g., `Bold ————X— Understated`)
4. **Brand Archetype** — primary archetype (The Creator, The Sage, The Hero, etc.) with rationale
5. **Tone of Voice** — specific guidelines with examples:
   - ✅ Acceptable: "Here's what happened and how to fix it."
   - ❌ Unacceptable: "Oops! Something went wrong 🙈"
6. **Messaging Do / Don't** — table of correct vs. incorrect phrasing (minimum 5 pairs)
7. **Color Palette** — primary, secondary, accent, semantic colors with:
   - Exact hex codes
   - Usage rules (e.g., "Primary blue is for CTAs only. Never use for body text.")
   - WCAG 2.1 AA contrast ratios (minimum 4.5:1 for text, 3:1 for large text)
8. **Typography System**:
   - Heading font (from Google Fonts) — family, weights, sizes
   - Body font (from Google Fonts) — family, weights, sizes
   - Mono font (for code, if applicable) — family, weight
   - Google Fonts import link
9. **Visual Style Notes** — guidance on: imagery style, iconography, illustration approach, whitespace philosophy
10. **Brand Consistency Rules** — the 5 rules that must never be broken

## Few-Shot Example (Partial)
> **Section 7 — Color Palette (Gold Standard):**
>
> | Token | Hex | Usage Rule | Contrast (on white) |
> |---|---|---|---|
> | Primary | `#2563EB` | CTAs, links, primary actions only. Never for body text. | 4.6:1 ✅ |
> | Primary Hover | `#1D4ED8` | Hover state for primary elements | 5.9:1 ✅ |
> | Secondary | `#7C3AED` | Secondary actions, tags, highlights | 5.2:1 ✅ |
> | Background | `#FAFBFC` | Page background. Use `#0F172A` for dark mode | N/A |
> | Surface | `#FFFFFF` | Card backgrounds, modal backgrounds | N/A |
> | Text Primary | `#0F172A` | Headlines, body text | 14.8:1 ✅ |
> | Text Muted | `#64748B` | Help text, timestamps, secondary info | 4.7:1 ✅ |
> | Danger | `#DC2626` | Error states, destructive actions only | 4.5:1 ✅ |
>
> *Notice: Each color has an exact hex, a usage rule, and an accessibility ratio.*

## Anti-Patterns (DO NOT)
- ❌ Use vague adjectives like "clean" or "modern" without defining what that means in CSS terms
- ❌ Pick colors without specifying where they should and should NOT be used
- ❌ Use browser default fonts (Times New Roman, Arial, system serif)
- ❌ Define a "fun" tone of voice for a financial compliance product (match tone to industry)
- ❌ Skip WCAG contrast ratios — inaccessible colors are a design failure

## Downstream Consumers
This artifact feeds into:
- `docs/DESIGN_TOKENS.md` (10) — tokens MUST match these brand colors/fonts
- `docs/DESIGN_SYSTEM.md` (11)
- `docs/PITCH_DECK.md` (25) — deck visual style

## Save As
`docs/BRAND_GUIDELINES.md`

## Prompt
```text
<role>
Act as an Elite Creative Director and Brand Strategist with experience building iconic startup brands.
</role>

<context>
You are generating Artifact 09 of 35 in the Founder Mode system. This brand foundation governs every visual and verbal decision downstream. Design Tokens (Artifact 10), Design System (Artifact 11), and all UI implementations must trace back to this document.
</context>

<upstream_artifacts>
Read all three:
- @docs/IDEA.md — Sections 1 (Product Name), 2 (Value Prop), 6 (Unique Insight)
- @docs/PRODUCT_STRATEGY.md — Sections 3 (Target Segment), 6 (Differentiation)
- @docs/USER_PERSONAS.md — Primary persona: Sections 6 (Information Diet), 9 (Quotes)
</upstream_artifacts>

<task>
1. First, ask me 3 brand vision questions. Wait for my answers.
2. Then think step by step:
   - What brand personality matches both the product strategy and the target user's expectations?
   - What tone of voice would the primary persona trust and engage with?
   - What color palette conveys the brand essence while meeting accessibility standards?
3. Define the complete brand foundation with all 10 sections.
4. Every color must have a hex code, usage rule, AND contrast ratio.
5. Typography must use Google Fonts with specific import links.
</task>

<output_format>
Markdown document with exactly 10 sections as specified in Output Requirements.
Color Palette must be a table with hex, usage rule, and contrast ratio columns.
Tone of Voice must include ✅/❌ example pairs.
Save as docs/BRAND_GUIDELINES.md.
</output_format>

<constraints>
- All colors MUST include WCAG 2.1 AA contrast ratios (4.5:1 minimum for normal text).
- Typography MUST use Google Fonts — no system fonts or browser defaults.
- Tone of Voice MUST include minimum 3 acceptable/unacceptable example pairs.
- Brand Archetype MUST be justified by target persona and strategy.
- Use "DATA NEEDED: [specifics]" for any brand preference requiring user research.
</constraints>
```
