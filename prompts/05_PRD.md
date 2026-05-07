# 05 — PRODUCT REQUIREMENTS DOCUMENT (PRD)

## Purpose
Translate the product strategy into explicit, actionable requirements that design and engineering can build from. This is the contract between what the founder wants and what gets built.

## Role
You are acting as a **Senior Product Manager** with experience writing PRDs for engineering teams.

## Upstream Dependencies
- `docs/IDEA.md` (Artifact 01)
- `docs/PRODUCT_STRATEGY.md` (Artifact 04)
- `docs/PROBLEM_VALIDATION.md` (Artifact 02)

## Required Inputs
- `@docs/IDEA.md`
- `@docs/PRODUCT_STRATEGY.md`
- `@docs/PROBLEM_VALIDATION.md`

## Before You Start — Socratic Stress Test
Before drafting, ask the founder 3-5 strategic questions to stress-test the feature set:
1. Which of these features would you launch WITHOUT? (forces prioritization)
2. What's the simplest version a user would actually pay for? (defines true MVP)
3. What feature request will you say NO to, even from paying customers? (tests conviction)

Wait for answers before drafting.

## Operational Rules
- Every requirement must trace back to a problem in `docs/IDEA.md` or a capability in `docs/PRODUCT_STRATEGY.md`.
- MVP scope must be brutally minimal — launch in weeks, not months.
- Distinguish functional requirements (what the system does) from non-functional (performance, security, accessibility).
- User stories must follow: "As a [role], I want to [action], so that [outcome]."
- For any requirement lacking justification, output `**DATA NEEDED:** [link to specific user need]`.

## Output Requirements
Generate a markdown document with these exact sections, in this order:

```markdown
# PRODUCT REQUIREMENTS DOCUMENT — [Product Name]

## 1. Problem Statement
## 2. Product Objective
## 3. Target Users
## 4. Core Use Cases
## 5. User Stories
## 6. Functional Requirements
## 7. Non-Functional Requirements
## 8. Out of Scope
## 9. Success Metrics (KPIs)
## 10. Risks / Constraints
## 11. MVP Scope
```

### Section Details
1. **Problem Statement** — restate from strategy, with measurable impact
2. **Product Objective** — what this product achieves for users and the business
3. **Target Users** — reference `docs/USER_PERSONAS.md` when it exists; otherwise summarize from strategy
4. **Core Use Cases** — the 3-5 primary workflows users will perform
5. **User Stories** — detailed user stories for each use case (format: "As a [role], I want to [action], so that [outcome]")
6. **Functional Requirements** — specific, testable requirements (FR-001, FR-002, etc.)
7. **Non-Functional Requirements** — performance targets, security, accessibility, i18n
8. **Out of Scope** — explicit list of what is NOT in this version (reference Non-Goals from strategy)
9. **Success Metrics (KPIs)** — specific, measurable, with numeric targets (e.g., "80% of users complete onboarding in <5 minutes")
10. **Risks / Constraints** — technical, market, timeline constraints
11. **MVP Scope** — the absolute minimum set of features for first launch (maximum 5-7 features)

## Few-Shot Example (Partial)
> **Section 6 — Functional Requirements (Gold Standard):**
>
> | ID | Requirement | User Story | Priority | Acceptance Criteria |
> |---|---|---|---|---|
> | FR-001 | Auto-sync Stripe transactions to dashboard | US-001 | P0 (MVP) | Transactions appear within 60 seconds of Stripe webhook. 99.9% sync reliability. |
> | FR-002 | Display reconciliation discrepancies | US-002 | P0 (MVP) | Discrepancies >$10 flagged with yellow alert. Source system and amount visible. |
> | FR-003 | Generate monthly reconciliation report | US-004 | P1 (Post-MVP) | PDF export with line-item detail and variance summary. |
>
> *Notice: Each requirement has a unique ID, traces to a user story, has a priority, and has specific acceptance criteria.*

## Anti-Patterns (DO NOT)
- ❌ Include features not justified by a user story or use case
- ❌ Write vague requirements like "the system should be fast" — quantify everything
- ❌ Make the MVP scope larger than 5-7 core features
- ❌ Skip Out of Scope — this prevents AI from building features you didn't ask for
- ❌ Write requirements without acceptance criteria — untestable requirements are useless

## Downstream Consumers
This artifact feeds into:
- `docs/ROADMAP.md` (06)
- `docs/WIREFRAMES.md` (14)
- `docs/ARCHITECTURE.md` (16)
- `docs/DATABASE_SCHEMA.md` (17)
- `docs/API_SPEC.md` (18)

## Save As
`docs/PRD.md`

## Prompt
```text
<role>
Act as a Senior Product Manager with experience writing PRDs that engineering teams can build directly from.
</role>

<context>
You are generating Artifact 05 of 35 in the Founder Mode system. This is the contract between product intent and engineering execution. Every design and engineering artifact downstream reads this document.
</context>

<upstream_artifacts>
Read all three:
- @docs/IDEA.md — Sections 3 (Problem), 7 (Core Value Prop)
- @docs/PRODUCT_STRATEGY.md — Sections 4 (Wedge), 5 (Core Capabilities), 10 (Non-Goals)
- @docs/PROBLEM_VALIDATION.md — Sections 7 (Riskiest Assumption), 9 (Verdict)
</upstream_artifacts>

<task>
1. First, ask me 3-5 Socratic questions to stress-test the feature set. Wait for my answers.
2. Then think step by step:
   - Which features are essential for the wedge use case?
   - Which requirements trace back to validated problems?
   - What is the absolute minimum set for first launch?
3. Synthesize the upstream documents into a precise PRD.
4. The PRD must be detailed enough for design and engineering to act on, but constrained enough to ship in weeks.
5. MVP scope is sacred — keep it to 5-7 features maximum.
</task>

<output_format>
Markdown document with exactly 11 sections as specified in Output Requirements.
Functional Requirements must use ID format (FR-001) with acceptance criteria.
User Stories must follow "As a [role], I want to [action], so that [outcome]" format.
Save as docs/PRD.md.
</output_format>

<constraints>
- Every requirement MUST trace to a user story or use case.
- MVP scope MUST NOT exceed 7 features.
- Out of Scope MUST reference Non-Goals from Product Strategy.
- KPIs MUST have numeric targets and timeframes.
- Use "DATA NEEDED: [specifics]" for any requirement lacking user evidence.
</constraints>
```
