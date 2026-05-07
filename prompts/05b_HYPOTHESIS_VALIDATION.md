# 05b — HYPOTHESIS-DRIVEN VALIDATION PLAN

## Purpose
Replace guesswork with structured experimentation. Define testable hypotheses for problem, solution, and business model — with clear success criteria and kill criteria.

## Role
You are acting as a **Product Strategist** specializing in lean experimentation and validation methodology.

## Tier
Pre-PMF, Scaling (critical before committing engineering resources).

## Upstream Dependencies
- `docs/IDEA.md` (Artifact 01)
- `docs/PROBLEM_VALIDATION.md` (Artifact 02)
- `docs/MECE_PROBLEM_BREAKDOWN.md` (Artifact 04b, if available)

## Required Inputs
- `@docs/IDEA.md`
- `@docs/PROBLEM_VALIDATION.md`
- `@docs/MECE_PROBLEM_BREAKDOWN.md` (if available)

## Before You Start — Ask These Questions
1. What is the biggest uncertainty about this product right now?
2. What key assumptions are you making that haven't been tested?
3. What would make you stop building this? (Kill criteria)

## Operational Rules
- Every hypothesis must be falsifiable — if you can't prove it wrong, it's not a hypothesis.
- Each test must have a specific success metric (not "see if it works").
- Include timeline and resource requirements for each test.
- Define explicit kill criteria — when to stop and pivot.
- Order hypotheses from cheapest/fastest to validate to most expensive.
- For any assumed benchmark, output `**DATA NEEDED:** [source for this benchmark]`.

## Output Requirements
Generate a markdown document with these exact sections, in this order:

```markdown
# HYPOTHESIS VALIDATION PLAN — [Product Name]

## 1. Hypothesis Set 1: Problem Validation
## 2. Hypothesis Set 2: Solution Validation
## 3. Hypothesis Set 3: Business Model Validation
## 4. Kill Criteria
## 5. Timeline & Resources
## 6. PMF Signals
```

### Section Details
1. **Hypothesis Set 1: Problem Validation** — Does the customer actually have this problem? 3 hypotheses, each with:

| # | Hypothesis | Test Method | Success Criteria | Failure Action | Timeline | Cost |
|---|---|---|---|---|---|---|

2. **Hypothesis Set 2: Solution Validation** — Does the product solve the problem? 3 hypotheses covering usability, onboarding, retention
3. **Hypothesis Set 3: Business Model Validation** — Can you make money? 2 hypotheses covering willingness-to-pay and churn
4. **Kill Criteria** — Explicit conditions that mean "stop and pivot" (minimum 3 conditions)
5. **Timeline & Resources** — Week-by-week validation plan with budget
6. **PMF Signals** — What product-market fit looks like for this specific product (quantitative + qualitative)

## Few-Shot Example (Partial)
> **Hypothesis Set 1 — Problem Validation (Gold Standard):**
>
> | # | Hypothesis | Test Method | Success Criteria | Failure Action | Timeline | Cost |
> |---|---|---|---|---|---|---|
> | H1.1 | Finance teams spend >10 hrs/week on billing reconciliation | Survey 30 mid-market SaaS finance leaders | >60% confirm >10 hrs/week | Pivot: problem is less severe than assumed | Week 1-2 | $200 (survey tool) |
> | H1.2 | Manual reconciliation causes >2% revenue leakage | Analyze anonymized data from 5 volunteer companies | Median leakage >2% ARR | Reframe: position as efficiency, not revenue recovery | Week 2-3 | $0 (data sharing agreement) |
> | H1.3 | Finance teams actively seek alternatives to spreadsheets | Google Trends + Ahrefs keyword analysis | >1,000 monthly searches for related terms | Adjust GTM: problem exists but isn't actively sought — need outbound | Week 1 | $100 (Ahrefs) |
>
> **Kill Criteria for Set 1:** If <30% of surveyed finance leaders confirm >5 hrs/week on reconciliation, the problem is not severe enough to build a product around.

## Anti-Patterns (DO NOT)
- ❌ Write hypotheses that can't be disproven — "Users will love it" is not a hypothesis
- ❌ Skip the kill criteria — the hardest part is knowing when to stop
- ❌ Set success criteria after the test — that's confirmation bias
- ❌ Test everything at once — validate problem before solution, solution before business model
- ❌ Propose expensive tests first — start with $0-$200 experiments

## Save As
`docs/HYPOTHESIS_VALIDATION.md`

## Prompt
```text
<role>
Act as a Product Strategist specializing in lean experimentation and hypothesis-driven validation.
</role>

<context>
You are generating Artifact 05b of 35 in the Founder Mode system. This artifact prevents the founder from committing engineering resources to unvalidated assumptions. Every hypothesis must be falsifiable with a cheap, fast test.
</context>

<upstream_artifacts>
Read all:
- @docs/IDEA.md — Sections 8 (Business Model), 11 (Open Questions)
- @docs/PROBLEM_VALIDATION.md — Sections 4 (Evidence Inventory), 7 (Riskiest Assumption), 8 (Validation Experiments)
- @docs/MECE_PROBLEM_BREAKDOWN.md — Section 4 (Problem Priority Ranking), if available
</upstream_artifacts>

<task>
1. Think step by step:
   - What are the top 3 assumptions about the problem?
   - What are the top 3 assumptions about the solution?
   - What are the top 2 assumptions about the business model?
   - What would make each assumption false?
   - What's the cheapest way to test each?
2. Create 3 hypothesis sets (Problem, Solution, Business Model).
3. Each hypothesis must have a specific test, measurable success criteria, failure action, timeline, and cost.
4. Define explicit kill criteria — conditions that mean "stop and pivot."
5. Include a week-by-week plan and PMF signal definitions.
</task>

<output_format>
Markdown document with exactly 6 sections as specified in Output Requirements.
Each hypothesis set must use the table format with all 6 columns.
Save as docs/HYPOTHESIS_VALIDATION.md.
</output_format>

<constraints>
- Every hypothesis MUST be falsifiable — state what would disprove it.
- Success criteria MUST be set BEFORE the test, not after.
- Tests must be ordered cheapest to most expensive.
- Individual test budgets must NOT exceed $500.
- Kill criteria must include minimum 3 explicit conditions.
- Use "DATA NEEDED: [specifics]" for any benchmark that isn't sourced.
</constraints>
```
