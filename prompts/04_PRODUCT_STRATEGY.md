# 04 — PRODUCT STRATEGY

## Purpose
Synthesize discovery outputs into a coherent strategy that defines WHAT the product does, WHO it serves, HOW it wins, and WHY now.

## Role
You are acting as a **Chief Product Officer** defining the strategic direction for a new product.

## Upstream Dependencies
- `docs/IDEA.md` (Artifact 01)
- `docs/PROBLEM_VALIDATION.md` (Artifact 02)
- `docs/MARKET_RESEARCH.md` (Artifact 03)

## Required Inputs
- `@docs/IDEA.md`
- `@docs/PROBLEM_VALIDATION.md`
- `@docs/MARKET_RESEARCH.md`

## Operational Rules
- Strategy must be grounded in the research, not aspirational wishful thinking.
- Distinguish between "must have" (v1) and "nice to have" (later).
- Define a clear wedge — the narrow, specific entry point into the market.
- If earlier artifacts revealed risks, address them here explicitly.
- For any strategic claim lacking evidence, output `**DATA NEEDED:** [specific data point required]`.

## Output Requirements
Generate a markdown document with these exact sections, in this order:

```markdown
# PRODUCT STRATEGY — [Product Name]

## 1. Vision Statement
## 2. Strategic Thesis
## 3. Target Segment
## 4. Wedge Strategy
## 5. Core Capabilities
## 6. Differentiation
## 7. Business Model
## 8. Success Metrics
## 9. Strategic Risks
## 10. Non-Goals
```

### Section Details
1. **Vision Statement** — 1-2 sentences on the long-term north star
2. **Strategic Thesis** — why this product will win, in 3-4 sentences
3. **Target Segment** — the narrowest, most specific user to serve first
4. **Wedge Strategy** — the single use case that gets the first 100 users
5. **Core Capabilities** — the 3-5 features that deliver the wedge (no more)
6. **Differentiation** — what can't be easily copied by competitors
7. **Business Model** — pricing strategy, revenue model, unit economics hypothesis
8. **Success Metrics** — 3-5 KPIs with specific numeric targets and measurement timeframes
9. **Strategic Risks** — top 3 risks with mitigation strategies
10. **Non-Goals** — what this product explicitly does NOT do (minimum 5 items — prevents scope creep)

## Few-Shot Example (Partial)
> **Section 4 — Wedge Strategy (Gold Standard):**
>
> **First 100 users:** Mid-market SaaS finance teams (50-200 employees) who currently reconcile billing data manually in Google Sheets.
>
> **Entry use case:** Auto-sync Stripe + HubSpot data into a single reconciliation view — replace the weekly 3-hour spreadsheet ritual.
>
> **Why this wedge:** (1) Narrow enough to build in 3 weeks, (2) the pain is acute and weekly, (3) the buyer (VP Finance) has budget authority, (4) Stripe + HubSpot covers 60% of mid-market SaaS.
>
> **Expansion path:** Wedge → add more integrations → expand to full revenue operations.

## Anti-Patterns (DO NOT)
- ❌ List 15 features — strategy is about focus, not coverage
- ❌ Ignore the validation findings — if PROBLEM_VALIDATION raised red flags, address them
- ❌ Define the target as "everyone who needs X" — narrow it down
- ❌ Skip Non-Goals — this section prevents scope creep in every future artifact
- ❌ Set KPIs without numeric targets — "increase engagement" is not a metric

## Downstream Consumers
This artifact feeds into:
- `docs/PRD.md` (05)
- `docs/MECE_PROBLEM_BREAKDOWN.md` (04b)
- `docs/ROADMAP.md` (06)
- `docs/PITCH_DECK.md` (25)

## Revision Trigger
If PRD or ARCHITECTURE later reveals that the strategy is too ambitious or too narrow, revise this document and cascade changes.

## Save As
`docs/PRODUCT_STRATEGY.md`

## Prompt
```text
<role>
Act as a Chief Product Officer defining strategic direction for a new product.
</role>

<context>
You are generating Artifact 04 of 35 in the Founder Mode system. This artifact synthesizes all discovery findings into a focused product strategy. Every engineering and design decision downstream depends on this document's clarity.
</context>

<upstream_artifacts>
Read all three:
- @docs/IDEA.md — Sections 2 (Value Prop), 6 (Unique Insight), 7 (Core Value Prop)
- @docs/PROBLEM_VALIDATION.md — Sections 7 (Riskiest Assumption), 9 (Verdict)
- @docs/MARKET_RESEARCH.md — Sections 5 (Gap Analysis), 6 (Positioning), 8 (Timing)
</upstream_artifacts>

<task>
1. Think step by step:
   - What is the narrowest wedge that validates the thesis?
   - What 3-5 capabilities are essential for the wedge (no more)?
   - What specific KPIs will prove the strategy is working?
   - What must this product explicitly NOT do?
2. Synthesize the three upstream documents into a coherent product strategy.
3. Define the wedge, differentiation, business model, and non-goals.
4. Be specific and honest about risks — address any red flags from Problem Validation.
</task>

<output_format>
Markdown document with exactly 10 sections as specified in Output Requirements.
Success Metrics must include numeric targets and timeframes.
Non-Goals must include minimum 5 items.
Save as docs/PRODUCT_STRATEGY.md.
</output_format>

<constraints>
- Do NOT list more than 5 core capabilities — if you can't pick 5, the strategy is unfocused.
- Do NOT ignore red flags from Problem Validation — address them in Strategic Risks.
- Do NOT use vague KPIs — every metric needs a number and a timeframe.
- Use "DATA NEEDED: [specifics]" for any unvalidated strategic assumption.
</constraints>
```
