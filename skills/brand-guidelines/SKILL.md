---
name: brand-guidelines
description: Universal Brand Asset Protocol. Extracts, verifies, and codifies brand assets (logo, product imagery, colors, typography) for any project. Ensures all downstream artifacts reference a single source of truth — docs/BRAND_SPEC.md — instead of ad-hoc colors and fonts. Use when any task involves a specific brand (own product, client, or competitor).
license: Complete terms in LICENSE.txt
---

# Brand Asset Protocol

> Adapted from huashu-design's Core Asset Protocol — "品牌的本质是它被认出来" (A brand's essence is being recognized).
> The 5-step protocol below is the difference between a 40-point generic output and a 90-point branded one.

## When to Trigger

Any task involving a **specific brand** — the founder mentions a product name, company name, or client. This includes:
- Own products (Celentano, Avena, insifr)
- Client brands
- Competitor analysis requiring accurate brand representation
- Design work (Phase 4: Brand & Design)

## Core Principle: Assets > Specifications

Brand recognition comes from **visual assets first, specifications second**:

| Asset Type | Recognition Impact | Required? |
|---|---|---|
| **Logo** | Highest — instant recognition | Always required |
| **Product imagery / renders** | Very high — the "hero" of physical products | Required for physical products |
| **UI screenshots** | Very high — the "hero" of digital products | Required for digital products |
| **Color palette** | Medium — supports recognition alongside above | Supporting |
| **Typography** | Lower — needs context from above assets | Supporting |
| **Brand voice / tone** | Lower — agent self-check | Supporting |

**Translation to rules:**
- Extracting only colors + fonts without finding the logo = **violation**
- Using CSS shapes or hand-drawn SVG instead of real product images = **violation**
- Proceeding without assets and not telling the founder = **violation**
- An honest placeholder ("logo needed") > a fabricated substitute

## 5-Step Protocol

### Step 1 — Ask (Asset Checklist)

Don't ask "do you have brand guidelines?" — too vague. Ask specifically:

```
For <brand/product>, which of these do you have? I'll list by priority:
1. Logo (SVG / high-res PNG) — required for any brand
2. Product photos / official renders — required for physical products
3. UI screenshots / interface assets — required for digital products
4. Color palette (HEX / RGB values)
5. Font list (Display / Body / Mono)
6. Brand guidelines PDF / Figma / style guide URL

Share what you have. I'll search for anything missing.
```

### Step 2 — Search Official Channels

For each missing asset, search systematically:

| Asset | Search Paths |
|---|---|
| **Logo** | `<brand>.com/brand` · `<brand>.com/press` · `brand.<brand>.com` · Website header (inline SVG) · GitHub/social media avatars |
| **Product imagery** | Product detail pages · Press kit · Official YouTube thumbnails · Official press releases |
| **UI screenshots** | App Store / Google Play listing · Product screenshots section · Demo video frames |
| **Colors** | Website CSS / Tailwind config · Brand guidelines PDF · Inline styles |
| **Fonts** | Website `<link>` tags · Google Fonts references · Brand guidelines |

Fallback search queries:
- Logo: `<brand> logo download SVG`, `<brand> press kit`
- Product: `<brand> <product> official renders`, `<brand> product photography`
- UI: `<brand> app screenshots`, `<brand> dashboard UI`

### Step 3 — Download & Verify

**Quality gate for non-logo assets:**
- Resolution ≥ 2000px for hero imagery
- Source must be official or clearly licensed
- Must match the current version of the product (not outdated)
- Must serve the narrative (not decorative filler)

**Logo exception**: If a logo exists, it must be used regardless of quality — even a 6/10 logo beats no logo by 10x. Logos are identity anchors, not aesthetic choices.

**Verification checklist:**
- [ ] Logo file exists, opens correctly, has transparent background
- [ ] At least one light-background and one dark-background variant
- [ ] Product/UI imagery is current version, not outdated
- [ ] Color values extracted from real source (not guessed from memory)

### Step 4 — Codify into `docs/BRAND_SPEC.md`

Create or update the brand specification file:

```markdown
# <Brand> · Brand Spec
> Collected: YYYY-MM-DD
> Sources: <list download sources>
> Completeness: <Complete / Partial / Inferred>

## Core Assets

### Logo
- Primary: `assets/<brand>/logo.svg`
- Light background: `assets/<brand>/logo-dark.svg`
- Dark background: `assets/<brand>/logo-light.svg`
- Usage: <header / watermark / splash>
- Constraints: <no stretching / no recoloring / minimum clear space>

### Product Imagery (physical products)
- Hero: `assets/<brand>/product-hero.png` (dimensions)
- Detail: `assets/<brand>/product-detail.png`

### UI Screenshots (digital products)
- Home: `assets/<brand>/ui-home.png`
- Core feature: `assets/<brand>/ui-feature.png`

## Design Tokens

### Color Palette
- Primary: #XXXXXX — <source>
- Background: #XXXXXX
- Text: #XXXXXX
- Accent: #XXXXXX
- Forbidden colors: <colors the brand explicitly avoids>

### Typography
- Display: <font stack>
- Body: <font stack>
- Mono: <font stack>

### Brand Voice
- Tone keywords: <3-5 adjectives>
- Anti-patterns: <what the brand is NOT>
```

### Step 5 — Enforce in Downstream Artifacts

Once `docs/BRAND_SPEC.md` exists:
- **All design artifacts** (BRAND_GUIDELINES.md, DESIGN_TOKENS.md, DESIGN_SYSTEM.md) must reference it
- **All code** must use CSS variables derived from the spec: `var(--brand-primary)`, not hardcoded hex
- **All visual outputs** must include the logo where appropriate
- **No ad-hoc colors**: Adding a new color requires updating the spec first

This turns brand consistency from "rely on memory" to "rely on structure."

## Failure Handling

| Missing Asset | Action |
|---|---|
| Logo not found anywhere | **Stop and ask the founder.** Do not substitute with text or shapes. |
| Product imagery not found | Ask founder → Try AI generation with official reference as base → Last resort: honest placeholder with label "product image needed" |
| UI screenshots not found | Ask founder for their own screenshots → Official demo video frames → Placeholder |
| Colors not found | Use the Design Direction Advisor pattern (propose 3 palettes, let founder choose) |

**Never** silently proceed with generic/guessed assets. An honest gap is better than a confident wrong brand.

## Anti-Patterns (Real Failures)

- Using Anthropic's colors for a non-Anthropic project because the skill was hardcoded (the old version of this very skill)
- Guessing a brand color from memory ("I think it's orange") when it's actually blue
- Extracting demo content colors from a product screenshot and treating them as brand colors
- Skipping the logo because "it's just a prototype" — prototypes without logos look like generic templates

## Integration Points

- `routines/new-project.md` — Phase 4 (Brand & Design) triggers this skill
- `routines/phase-gate.md` — Phase 4 gate checks that `docs/BRAND_SPEC.md` exists
- `prompts/09_BRAND_GUIDELINES.md` — References this skill for asset collection
