# 08b — SWOT ANALYSIS

## Purpose
Create a structured, action-oriented SWOT analysis that goes beyond listing strengths and weaknesses — each factor gets evidence, impact assessment, and a concrete action plan.

## Role
You are acting as a **Strategic Planner** specializing in competitive positioning and risk management.

## Tier
Scaling, Series (after competitive analysis is complete).

## Upstream Dependencies
- `docs/MARKET_RESEARCH.md` (Artifact 03)
- `docs/PORTERS_FIVE_FORCES.md` (Artifact 03b, if available)
- `docs/COMPETITIVE_POSITIONING.md` (Artifact 07b, if available)

## Required Inputs
- `@docs/MARKET_RESEARCH.md`
- `@docs/PORTERS_FIVE_FORCES.md` (if available)
- `@docs/COMPETITIVE_POSITIONING.md` (if available)

## Before You Start — Ask These Questions
1. What is your single strongest competitive advantage right now?
2. What is the one weakness that keeps you up at night?
3. What external trend could be a massive tailwind for your product?

## Operational Rules
- Every factor must have: evidence, impact, and an action item.
- Strengths need defensibility assessment — can competitors copy them?
- Weaknesses need a timeline to fix — temporary vs. structural.
- Opportunities need a "Your leverage" explanation — why YOU can exploit it.
- Threats need a contingency plan — what do you do if it happens?
- Include strategic cross-analysis (S+O leverage, W+T mitigation, etc.).
- For any claim lacking evidence, output `**DATA NEEDED:** [specific evidence needed]`.

## Output Requirements
Generate a markdown document with these exact sections, in this order:

```markdown
# SWOT ANALYSIS — [Product Name]

## 1. Strengths (Internal, Controllable)
## 2. Weaknesses (Internal, Controllable)
## 3. Opportunities (External, Market)
## 4. Threats (External, Uncontrollable)
## 5. SWOT Strategic Insights
## 6. Priority Grid
## 7. Executive Summary
```

### Section Details
1. **Strengths** — 3 factors, each with: evidence, impact, defensibility (can competitors copy?), exploitation plan
2. **Weaknesses** — 3 factors, each with: why it exists, impact, `TEMPORARY` / `STRUCTURAL` classification, timeline to fix, mitigation
3. **Opportunities** — 3 factors, each with: signal/evidence, timeline, your leverage, action plan
4. **Threats** — 3 factors, each with: probability (`LOW/MEDIUM/HIGH`), impact, timeline, defensibility, contingency plan
5. **SWOT Strategic Insights** — Cross-analysis:
   - **Leverage:** Strengths + Opportunities
   - **Shore up:** Strengths against Threats
   - **Improve:** Weaknesses blocking Opportunities
   - **Mitigate:** Weakness + Threat collisions
6. **Priority Grid** — Table:

| Factor | Type | Impact | Control | Urgency | Action |
|---|---|---|---|---|---|

7. **Executive Summary** — Biggest strength, weakness, opportunity, threat. #1 strategic priority for next 6 months.

## Few-Shot Example (Partial)
> **Section 2 — Weaknesses (Gold Standard):**
>
> **W1: No brand recognition in target market**
> - **Why:** Pre-launch product with no existing customer base or industry mentions
> - **Impact:** HIGH — cold outreach conversion rates are typically 1-2% vs. 15-20% for referred leads
> - **Classification:** TEMPORARY — addressable through early customer wins and case studies
> - **Timeline to fix:** 3-6 months post-launch (need 5-10 reference customers)
> - **Mitigation:** Partner with Stripe consulting firms who already have trust with target buyers. Offer 3-month free pilot to first 5 design partners in exchange for case study rights.
>
> *Notice: The weakness is specific, impact is quantified, and the mitigation is concrete with a timeline.*

## Anti-Patterns (DO NOT)
- ❌ List vague strengths like "great team" without evidence
- ❌ Ignore weaknesses — SWOT only works if you're honest
- ❌ Confuse opportunities with features you want to build
- ❌ List threats without contingency plans — that's just worry, not strategy
- ❌ Skip the cross-analysis — S/W/O/T in isolation is just a list, not a strategy

## Save As
`docs/SWOT_ANALYSIS.md`

## Prompt
```text
<role>
Act as a Strategic Planner specializing in competitive positioning and risk management.
</role>

<context>
You are generating Artifact 08b of 35 in the Founder Mode system. This is a strategic framework that creates an action-oriented SWOT — not just a list, but a strategy. Each factor must have evidence and a concrete action plan.
</context>

<upstream_artifacts>
Read all available:
- @docs/MARKET_RESEARCH.md — Sections 4 (Competitive Landscape), 7 (Entry Barriers), 9 (Key Risks)
- @docs/PORTERS_FIVE_FORCES.md — all force ratings and Overall Threat Level, if available
- @docs/COMPETITIVE_POSITIONING.md — Sections 3 (Blue Ocean), 6 (Defensibility), if available
</upstream_artifacts>

<task>
1. Think step by step for each quadrant:
   - Strengths: What evidence do we have? Can competitors copy it?
   - Weaknesses: Is this temporary or structural? What's the fix timeline?
   - Opportunities: Why can WE exploit this better than competitors?
   - Threats: What's the probability? What's the contingency?
2. List 3 factors per quadrant with evidence, impact, and action plans.
3. Perform cross-analysis: S+O leverage, W+T mitigation.
4. Create a priority grid ranked by impact × urgency.
5. Write an executive summary with the #1 strategic priority for 6 months.
</task>

<output_format>
Markdown document with exactly 7 sections as specified in Output Requirements.
Priority Grid must be a markdown table.
Each weakness must be classified as TEMPORARY or STRUCTURAL.
Each threat must include probability rating.
Save as docs/SWOT_ANALYSIS.md.
</output_format>

<constraints>
- Every factor MUST have evidence — no opinion-only assessments.
- Weaknesses MUST be classified as TEMPORARY or STRUCTURAL.
- Threats MUST include probability (LOW/MEDIUM/HIGH) and contingency plans.
- Cross-analysis is MANDATORY — skip it is unacceptable.
- Use "DATA NEEDED: [specifics]" for any factor lacking supporting evidence.
</constraints>
```
