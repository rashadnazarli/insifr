# 25 — PITCH DECK

## Purpose
Turn the product thesis and business case into an investor-ready narrative. Even if not raising — this clarifies the founder's own thinking.

## Role
You are acting as a **Venture-Backed Startup Pitch Strategist** who has reviewed thousands of decks.

## Upstream Dependencies
- `docs/IDEA.md` (Artifact 01)
- `docs/MARKET_RESEARCH.md` (Artifact 03)
- `docs/PRODUCT_STRATEGY.md` (Artifact 04)
- `docs/ROADMAP.md` (Artifact 06)
- `docs/GROWTH_STRATEGY.md` (Artifact 24)

## Required Inputs
- `@docs/IDEA.md`
- `@docs/MARKET_RESEARCH.md`
- `@docs/PRODUCT_STRATEGY.md`
- `@docs/ROADMAP.md`
- `@docs/GROWTH_STRATEGY.md`

## Operational Rules
- Make the story investor-relevant: problem → solution → market → traction → team → ask.
- Do NOT fabricate traction — if pre-revenue, present milestone logic and progress signals.
- Each slide should have one core message, not a paragraph.
- Write for a 10-minute verbal pitch — the deck supports the story, it doesn't carry it alone.
- For any metric presented, label as `ACTUAL` (real data) or `PROJECTED` (estimate).

## Output Requirements
Generate a deck outline with speaking notes per slide:

```markdown
# PITCH DECK — [Product Name]

## Slide 1: Title / Vision
## Slide 2: Problem
## Slide 3: Current Alternatives / Why They Fail
## Slide 4: Solution
## Slide 5: Market Opportunity
## Slide 6: Product / Demo Narrative
## Slide 7: Business Model
## Slide 8: Go-to-Market
## Slide 9: Traction / Progress
## Slide 10: Growth Strategy
## Slide 11: Roadmap / Milestones
## Slide 12: Team / Why Us
## Slide 13: Risks / Why We Win
## Slide 14: Ask / Use of Funds
```

For each slide:
- **Core Message** — the one thing the audience should remember
- **Speaking Notes** — what to say out loud (not on the slide)
- **Visual Suggestion** — what the slide should look like (chart, screenshot, diagram)
- **Source** — which upstream artifact this data comes from

## Few-Shot Example (Partial)
> **Slide 5: Market Opportunity (Gold Standard):**
>
> **Core Message:** $2.1B serviceable market with a clear acquisition path to $8.4M ARR Year 1.
>
> **Speaking Notes:** "The global SaaS billing market is $12 billion. We're targeting the $2.1 billion mid-market segment — companies between 50 and 500 employees. Year one, we're going after 400 customers paying $1,750 a month, which gets us to $8.4 million ARR. That's less than 1% of our serviceable market."
>
> **Visual:** TAM/SAM/SOM concentric circles diagram with dollar values. Bottom callout: "<1% penetration = $8.4M ARR"
>
> **Source:** Market Research §2 (ESTIMATED — bottom-up methodology). Conversion assumption from Growth Strategy §8.
>
> **Labels:** TAM: VALIDATED (Gartner report), SAM: ESTIMATED, SOM: PROJECTED

## Anti-Patterns (DO NOT)
- ❌ Fabricate metrics or traction that doesn't exist
- ❌ Put paragraphs of text on slides — slides are visual, speaking notes are verbal
- ❌ Skip the "Why Now" narrative — timing is critical for investors
- ❌ Claim "no competition" — investors know better
- ❌ Mix ACTUAL and PROJECTED data without labeling — investors will catch this

## Save As
`docs/PITCH_DECK.md`

## Prompt
```text
<role>
Act as a Venture-Backed Startup Pitch Strategist who has reviewed thousands of decks and coached founders through fundraising.
</role>

<context>
You are generating Artifact 25 of 35 in the Founder Mode system. This pitch deck synthesizes the entire product thesis into a persuasive 14-slide narrative. Every data point must trace to a specific upstream artifact.
</context>

<upstream_artifacts>
Read all five:
- @docs/IDEA.md — Sections 2 (Value Prop), 6 (Unique Insight), 9 (Market Context)
- @docs/MARKET_RESEARCH.md — Sections 2 (Market Size), 4 (Competitive Landscape), 8 (Timing)
- @docs/PRODUCT_STRATEGY.md — Sections 2 (Strategic Thesis), 4 (Wedge), 7 (Business Model)
- @docs/ROADMAP.md — Sections 2-5 (Phases)
- @docs/GROWTH_STRATEGY.md — Sections 1 (Growth Thesis), 2 (Channels), 8 (30-Day Experiments)
</upstream_artifacts>

<task>
1. Think step by step:
   - What's the one-sentence hook that grabs attention?
   - What order of slides creates the most compelling narrative arc?
   - Which data points are ACTUAL vs. PROJECTED?
   - What's the investor's #1 objection, and how do we address it?
2. Create a 14-slide pitch deck outline with core message, speaking notes, and visual suggestion per slide.
3. Be persuasive but honest — do not fabricate traction.
4. Label all data as ACTUAL or PROJECTED.
5. Source every claim back to a specific upstream artifact section.
</task>

<output_format>
Markdown document with 14 slide sections.
Each slide: Core Message, Speaking Notes, Visual Suggestion, Source.
All metrics labeled as ACTUAL or PROJECTED.
Save as docs/PITCH_DECK.md.
</output_format>

<constraints>
- Do NOT fabricate traction or metrics.
- Every data point MUST cite its source artifact and section.
- Every metric MUST be labeled ACTUAL or PROJECTED.
- Slides are VISUAL — speaking notes carry the detail.
- "Why Now" narrative is MANDATORY (Slide 2 or 3).
</constraints>
```
