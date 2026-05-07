# 08 — CUSTOMER JOURNEY MAP

## Purpose
Map the complete lifecycle of the user's interaction with the product — from discovery to daily use to advocacy. This informs onboarding design, notification strategy, and retention mechanics.

## Role
You are acting as a **Customer Experience Architect** designing a future-state journey.

## Upstream Dependencies
- `docs/USER_PERSONAS.md` (Artifact 07)
- `docs/PRD.md` (Artifact 05)

## Required Inputs
- `@docs/USER_PERSONAS.md`
- `@docs/PRD.md`

## Operational Rules
- Map the journey for the PRIMARY persona only. Secondary persona differences can be noted as variants.
- Focus on the "future state" — the ideal journey with your product, not the current broken journey.
- Identify the "First Value Moment" — the exact point where the user first experiences the core value.
- Be specific about touchpoints — "receives an email" is vague; "receives a personalized onboarding email with 3 setup steps" is useful.
- For any touchpoint requiring user research validation, output `**DATA NEEDED:** [specific user behavior data needed]`.

## Output Requirements
Generate a markdown document with these exact sections, in this order:

```markdown
# CUSTOMER JOURNEY — [Product Name] — [Primary Persona Name]

## Journey Map

| Stage | User Goals | Actions | Digital Touchpoints | Emotional State | Moment of Truth |
|---|---|---|---|---|---|
| 1. Awareness | | | | | |
| 2. Acquisition / Onboarding | | | | | |
| 3. Active Engagement | | | | | |
| 4. Retention | | | | | |
| 5. Advocacy | | | | | |

## 6. First Value Moment
## 7. Churn Risks
## 8. Intervention Points
```

### Section Details
1-5. **Journey Stages** — Table with:
   - **Awareness** — how they discover the product exists
   - **Acquisition / Onboarding** — how they sign up and reach the First Value Moment (max 3-5 steps)
   - **Active Engagement** — daily/weekly usage patterns
   - **Retention** — what keeps them coming back (and what might cause churn)
   - **Advocacy** — how satisfied users become referral sources
6. **First Value Moment** — the specific action/screen where the user first "gets it" (be precise: "When Sarah sees her first auto-reconciled invoice match on the dashboard — ~90 seconds after connecting Stripe")
7. **Churn Risks** — the top 3 moments where users are most likely to abandon, ranked by severity
8. **Intervention Points** — where proactive action (email, tooltip, notification) can prevent drop-off. For each: trigger condition, intervention type, expected impact.

## Few-Shot Example (Partial)
> **Section 6 — First Value Moment (Gold Standard):**
>
> **The Moment:** Sarah connects her Stripe account (OAuth, 30 seconds) → dashboard auto-populates with last 30 days of transactions → system highlights 3 discrepancies worth $2,847 in potential revenue leakage → Sarah says "Oh wow, I didn't know about these."
>
> **Time to First Value:** ~90 seconds from signup
> **Screen:** Main dashboard, "Discrepancies" panel with yellow highlights
> **Emotional shift:** Anxiety ("will this be hard to set up?") → Relief ("it just works") → Delight ("I'm already finding money")
>
> **Design implication:** The dashboard MUST surface discrepancies immediately — no empty states, no "come back tomorrow."

## Anti-Patterns (DO NOT)
- ❌ Map a generic "awareness → purchase" funnel without product-specific details
- ❌ Skip the emotional arc — understanding frustration and delight moments drives UX
- ❌ Ignore churn risks — knowing where users leave is as important as knowing where they stay
- ❌ Make the onboarding stage longer than 3-5 steps
- ❌ Describe touchpoints generically — "receives email" is useless; describe the email

## Downstream Consumers
This artifact feeds into:
- `docs/WIREFRAMES.md` (14) — onboarding flow design
- `docs/GROWTH_STRATEGY.md` (24) — referral and retention mechanics
- `docs/UX_AUDIT.md` (22) — journey-based audit criteria

## Save As
`docs/CUSTOMER_JOURNEY.md`

## Prompt
```text
<role>
Act as a Customer Experience Architect designing a future-state user journey.
</role>

<context>
You are generating Artifact 08 of 35 in the Founder Mode system. This journey map drives onboarding design, notification strategy, and retention mechanics. The primary persona's journey is the blueprint for the entire user experience.
</context>

<upstream_artifacts>
Read both:
- @docs/USER_PERSONAS.md — Primary persona: Sections 3 (JTBD), 4 (Pain Points), 5 (Current Tools), 8 (Decision-Making)
- @docs/PRD.md — Sections 4 (Core Use Cases), 5 (User Stories)
</upstream_artifacts>

<task>
1. Think step by step:
   - How does the primary persona first discover this product?
   - What is the fastest path from signup to First Value Moment?
   - What are the daily/weekly habits that create retention?
   - Where are the 3 highest-risk moments for churn?
   - What triggers could turn a user into an advocate?
2. Map all 5 lifecycle stages in a structured table for the primary persona.
3. Define the First Value Moment with precision: exact screen, time, and emotional shift.
4. Identify top 3 churn risks ranked by severity.
5. Design intervention points with trigger conditions and expected impact.
</task>

<output_format>
Markdown document with journey map table (5 stages) plus 3 additional sections (FVM, Churn, Interventions).
Journey map must be a markdown table with all 6 columns.
First Value Moment must include time-to-value and specific screen.
Save as docs/CUSTOMER_JOURNEY.md.
</output_format>

<constraints>
- Map PRIMARY persona only — note secondary differences as variants.
- First Value Moment MUST specify time-to-value in seconds/minutes.
- Onboarding MUST NOT exceed 5 steps.
- Churn risks MUST be ranked by severity with specific trigger conditions.
- Touchpoints MUST be specific — no generic "sends email" descriptions.
- Use "DATA NEEDED: [specifics]" for any retention assumption lacking user data.
</constraints>
```
