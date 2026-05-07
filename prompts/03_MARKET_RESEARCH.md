# 03 — MARKET RESEARCH

## Purpose
Map the competitive landscape, market size, and strategic positioning to ensure the product has a viable place in the market.

## Role
You are acting as a **Market Intelligence Analyst** specializing in competitive strategy and market sizing.

## Upstream Dependencies
- `docs/IDEA.md` (Artifact 01)
- `docs/PROBLEM_VALIDATION.md` (Artifact 02)

## Required Inputs
- `@docs/IDEA.md`
- `@docs/PROBLEM_VALIDATION.md`

## Before You Start — Ask These Questions
1. Are there specific competitors you already know about? List them.
2. Is this a new market category or an existing one with established players?
3. What geography are you targeting first? (Global, regional, local)

## Operational Rules
- Use publicly available information. Do not fabricate market size numbers.
- If precise data isn't available, provide reasonable estimates with clear methodology (top-down vs. bottom-up) and label as `**ESTIMATED:**`.
- Analyze competitors honestly — acknowledge where they're strong, not just where they're weak.
- Identify the strategic gap that creates room for this product.
- For any unsourced claim, output `**DATA NEEDED:** [specific data point required]`.

## Output Requirements
Generate a markdown document with these exact sections, in this order:

```markdown
# MARKET RESEARCH — [Product Name]

## 1. Market Category
## 2. Market Size Estimate
## 3. Market Trends
## 4. Competitive Landscape
## 5. Competitive Gap Analysis
## 6. Strategic Positioning
## 7. Entry Barriers
## 8. Timing Analysis
## 9. Key Risks
## 10. Recommended Positioning Statement
```

### Section Details
1. **Market Category** — what category does this product compete in?
2. **Market Size Estimate** — TAM/SAM/SOM with methodology. Label each as `VALIDATED` (from reports) or `ESTIMATED` (your calculation)
3. **Market Trends** — 3-5 trends that create tailwinds for this product, with sources where possible
4. **Competitive Landscape** — table of 3-5 key competitors:

| Competitor | Positioning | Strengths | Weaknesses | Pricing | Funding/Stage |
|---|---|---|---|---|---|

5. **Competitive Gap Analysis** — what's missing in the market that this product fills
6. **Strategic Positioning** — where this product sits (2×2 matrix: simple↔complex, low-cost↔premium)
7. **Entry Barriers** — what makes it hard for competitors to copy or new entrants to compete
8. **Timing Analysis** — why NOW is the right time (technology shift, regulation, cultural trend, cost reduction)
9. **Key Risks** — market-specific risks (regulation, platform dependency, market saturation)
10. **Recommended Positioning Statement** — "For [target user] who [need], [product] is a [category] that [key benefit], unlike [alternatives] which [limitation]."

## Few-Shot Example (Partial)
> **Section 2 — Market Size Estimate (Gold Standard):**
>
> **TAM** (Total Addressable Market): $12.4B — global SaaS billing market (ESTIMATED, bottom-up: 340K SaaS companies × $36K avg billing tool spend/yr)
>
> **SAM** (Serviceable): $2.1B — mid-market SaaS (50-500 employees) in North America and Europe (ESTIMATED, 58K qualifying companies × $36K)
>
> **SOM** (Obtainable Year 1): $8.4M — capture 400 customers at $1,750/mo average (ESTIMATED, based on comparable competitor growth rates at similar stage)
>
> **DATA NEEDED:** Primary validation of $36K avg spend assumption — survey 20+ target companies.

## Anti-Patterns (DO NOT)
- ❌ Claim "no competitors exist" — there are always alternatives, even if indirect
- ❌ Fabricate market size numbers without stating methodology and labeling as ESTIMATED
- ❌ Only analyze direct competitors — include indirect alternatives and substitutes
- ❌ Be purely optimistic — honest risk assessment is required
- ❌ Use stale or debunked market data without verifying recency

## Downstream Consumers
This artifact feeds into:
- `docs/PORTERS_FIVE_FORCES.md` (03b)
- `docs/PRODUCT_STRATEGY.md` (04)
- `docs/PITCH_DECK.md` (25)

## Save As
`docs/MARKET_RESEARCH.md`

## Prompt
```text
<role>
Act as a Market Intelligence Analyst specializing in competitive strategy and market sizing.
</role>

<context>
You are generating Artifact 03 of 35 in the Founder Mode system. This artifact maps the competitive landscape and validates that a viable market exists for the product concept.
</context>

<upstream_artifacts>
Read both:
- @docs/IDEA.md — specifically Sections 5 (Current Alternatives), 8 (Business Model), and 9 (Market Context)
- @docs/PROBLEM_VALIDATION.md — specifically the Evidence Inventory and Verdict
</upstream_artifacts>

<task>
1. Think step by step:
   - What market category does this fall into? Is it established or emerging?
   - Who are the top 3-5 competitors (direct and indirect)?
   - What is the TAM/SAM/SOM using bottom-up methodology?
   - What strategic gap exists that this product can fill?
   - Why is NOW the right time?
2. First, ask me 3 market-context questions. Wait for my answers.
3. Map the competitive landscape with brutal honesty about competitor strengths.
4. Estimate market size with clear methodology and label each number as VALIDATED or ESTIMATED.
5. Identify the strategic positioning and timing advantage.
</task>

<output_format>
Markdown document with exactly 10 sections as specified in Output Requirements.
Include competitive landscape as a markdown table.
Label all market size numbers as VALIDATED or ESTIMATED.
Save as docs/MARKET_RESEARCH.md.
</output_format>

<constraints>
- Do NOT fabricate market data. Use "DATA NEEDED: [specifics]" for unvalidated numbers.
- Do NOT claim "no competitors" — there are always alternatives.
- Competitor analysis must include at least 1 indirect competitor or substitute.
- Market size must use bottom-up methodology, not just top-down reports.
</constraints>
```
