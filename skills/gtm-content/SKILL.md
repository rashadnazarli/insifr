---
name: gtm-content
description: Generates go-to-market content from strategy artifacts — landing pages, launch copy, pitch materials.
---

# GTM Content Generator Skill

When executed, you will act as a Growth Marketing Strategist generating launch and marketing content from existing Founder Mode artifacts.

## Execution Steps:
1. Read the following artifacts (if available):
   - `docs/PRD.md` — product definition
   - `docs/GROWTH_STRATEGY.md` — channels and tactics
   - `docs/BRAND_GUIDELINES.md` — voice, tone, visual identity
   - `docs/USER_PERSONAS.md` — target audience
   - `docs/COMPETITIVE_POSITIONING.md` — positioning statement
   - `docs/PITCH_DECK.md` — investor narrative
2. Generate the requested content type:
   - **Landing page copy:** Hero headline, subhead, 3 feature blocks, CTA, social proof section
   - **Product Hunt launch:** Tagline, description, first comment, maker story
   - **Email sequences:** Welcome, onboarding (3-email), re-engagement
   - **Social media kit:** 10 tweets/posts for launch week
   - **Press release:** Standard format for tech press
   - **Pitch email:** Cold outreach to investors, partners, or early customers
3. Ensure all content:
   - Uses the brand voice from `BRAND_GUIDELINES.md`
   - References the positioning from `COMPETITIVE_POSITIONING.md`
   - Targets the primary persona from `USER_PERSONAS.md`
   - Includes specific claims backed by strategy artifacts (not generic marketing fluff)
4. Output as ready-to-use markdown with clear section headers.

## Anti-Patterns:
- ❌ Generic marketing language ("revolutionary", "game-changing", "best-in-class")
- ❌ Claims not supported by the artifacts ("10x faster" without benchmark data)
- ❌ Missing CTA or next steps
- ❌ Ignoring the brand voice

## Output:
Content document in markdown, ready to copy-paste into the target platform.
