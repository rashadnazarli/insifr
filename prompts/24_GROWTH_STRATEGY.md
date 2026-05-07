# 24 — GROWTH STRATEGY

## Purpose
Define how the product acquires, activates, and retains users after launch. Strategy must be grounded in the actual product, user, and market — not generic advice.

## Role
You are acting as a **Growth Strategist and Startup GTM Advisor**.

## Upstream Dependencies
- `docs/PRODUCT_STRATEGY.md` (Artifact 04)
- `docs/USER_PERSONAS.md` (Artifact 07)
- `docs/CUSTOMER_JOURNEY.md` (Artifact 08)

## Required Inputs
- `@docs/PRODUCT_STRATEGY.md`
- `@docs/USER_PERSONAS.md`
- `@docs/CUSTOMER_JOURNEY.md`

## Before You Start — Ask These Questions
1. What's your launch budget? (Zero, small, significant)
2. Do you have an existing audience, email list, or community?
3. Are there distribution channels where your target users already gather?

## Operational Rules
- Tie every tactic to the specific user persona and their information diet.
- Distinguish between strategies that cost money and strategies that cost time.
- Prioritize experiments — test cheaper ideas before expensive ones.
- Include specific, measurable goals for each strategy.
- For any growth rate assumption, output `**DATA NEEDED:** [benchmark or comparison data needed]`.

## Output Requirements
Generate a markdown document with these exact sections:

```markdown
# GROWTH STRATEGY — [Product Name]

## 1. Growth Thesis
## 2. Primary Acquisition Channels
## 3. Activation Strategy
## 4. Retention Strategy
## 5. Referral / Network Effects
## 6. Content / SEO / Partnerships
## 7. Metrics to Track
## 8. First 30-Day Growth Experiments
```

### Section Details
1. **Growth Thesis** — core belief about how this product grows (viral, content, sales-led, product-led)
2. **Primary Acquisition Channels** — ranked by expected ROI. Per channel:

| Channel | Why It Works for This Persona | Effort | Timeline | Cost | Expected Result |
|---|---|---|---|---|---|

3. **Activation Strategy** — onboarding optimization, activation metric, target % reaching FVM
4. **Retention Strategy** — engagement hooks, churn prevention, re-engagement
5. **Referral / Network Effects** — mechanism, viral coefficient target
6. **Content / SEO / Partnerships** — topics mapped to pain points, keyword targets
7. **Metrics to Track** — acquisition, activation, retention, revenue metrics with targets
8. **First 30-Day Growth Experiments** — 3-5 specific experiments:

| # | Hypothesis | Test | Metric | Timeline | Cost | Kill if... |
|---|---|---|---|---|---|---|

## Few-Shot Example (Partial)
> **Section 8 — First 30-Day Growth Experiments (Gold Standard):**
>
> | # | Hypothesis | Test | Metric | Timeline | Cost | Kill if... |
> |---|---|---|---|---|---|---|
> | 1 | Finance teams find us via Google Search | Create 3 SEO-optimized blog posts targeting "billing reconciliation automation" | Organic signups from blog | Week 1-2 | $0 (founder writes) | <50 organic visits/week by day 30 |
> | 2 | Stripe partners will refer customers | Email 10 Stripe consulting firms, offer 20% rev share | Partner referrals | Week 1-3 | $0 (outbound only) | <2 positive responses |
> | 3 | Free trial converts at 5%+ | Launch with 14-day free trial, no credit card required | Trial → Paid conversion | Week 2-4 | $0 | <3% conversion by day 30 |
>
> **Kill criteria:** If experiments 1 AND 2 both fail, pivot to outbound sales motion (direct Linkedin outreach to VP Finance at target companies).

## Anti-Patterns (DO NOT)
- ❌ Suggest "go viral on social media" without a specific mechanism
- ❌ Recommend expensive channels for a zero-budget launch
- ❌ Generic advice that could apply to any product
- ❌ Skip metrics — every strategy needs a measurable goal
- ❌ Skip kill criteria — know when an experiment has failed

## Downstream Consumers
This artifact feeds into:
- `docs/PITCH_DECK.md` (25) — slides 8 (Go-to-Market), 10 (Growth Strategy)
- `docs/STRESS_TEST.md` (06b) — GTM assumptions to stress-test

## Save As
`docs/GROWTH_STRATEGY.md`

## Prompt
```text
<role>
Act as a Growth Strategist and Startup GTM Advisor grounding every tactic in specific user behavior.
</role>

<context>
You are generating Artifact 24 of 35 in the Founder Mode system. This growth strategy must be specific to this product, this user, and this market — not generic startup advice.
</context>

<upstream_artifacts>
Read all three:
- @docs/PRODUCT_STRATEGY.md — Sections 3 (Target Segment), 4 (Wedge), 7 (Business Model)
- @docs/USER_PERSONAS.md — Primary persona: Sections 6 (Information Diet), 8 (Decision-Making)
- @docs/CUSTOMER_JOURNEY.md — Sections 1 (Awareness), 5 (Advocacy), 6 (FVM)
</upstream_artifacts>

<task>
1. First, ask me about launch budget, existing audience, and distribution channels. Wait for answers.
2. Then think step by step:
   - Where does the primary persona discover new tools? (match channels to persona)
   - What's the fastest path from signup to First Value Moment?
   - What engagement hooks create retention habits?
   - What are the cheapest tests to validate assumptions?
3. Create a realistic growth strategy tied to the specific persona.
4. Include specific experiments for the first 30 days with kill criteria.
5. Every tactic must be tied to the persona and have a measurable goal.
</task>

<output_format>
Markdown document with exactly 8 sections.
Acquisition channels must be a ranked table.
30-day experiments must include hypothesis, test, metric, AND kill criteria.
Save as docs/GROWTH_STRATEGY.md.
</output_format>

<constraints>
- Every channel MUST be justified by the persona's information diet.
- Every experiment MUST include kill criteria — when to stop.
- Experiments must be ordered cheapest to most expensive.
- Do NOT suggest "go viral" — that's luck, not strategy.
- Use "DATA NEEDED: [specifics]" for any growth rate assumption lacking benchmarks.
</constraints>
```
