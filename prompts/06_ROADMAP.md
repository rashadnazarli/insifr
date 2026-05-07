# 06 — ROADMAP

## Purpose
Sequence the PRD requirements into a time-based delivery plan that balances speed-to-market with sustainable development.

## Role
You are acting as a **Technical Program Manager** experienced in shipping early-stage products.

## Upstream Dependencies
- `docs/PRD.md` (Artifact 05)
- `docs/PRODUCT_STRATEGY.md` (Artifact 04)

## Required Inputs
- `@docs/PRD.md`
- `@docs/PRODUCT_STRATEGY.md`

## Operational Rules
- Phase 1 (MVP) should be deliverable in 2-4 weeks for a solo founder using AI-assisted development.
- Each phase must have a clear "done" criteria — not just a list of features.
- Distinguish between build phases and validation phases (ship → measure → learn).
- Dependencies between features must be explicitly stated.
- For any timeline estimate lacking precedent, output `**ESTIMATED:** [basis for this estimate]`.

## Output Requirements
Generate a markdown document with these exact sections, in this order:

```markdown
# ROADMAP — [Product Name]

## 1. Roadmap Philosophy
## 2. Visual Roadmap Tree
## 3. Phase 1: MVP
## 4. Phase 2: Foundation
## 5. Phase 3: Growth
## 6. Phase 4: Scale
## 7. Dependency Map
## 8. Risk Milestones
## 9. Cut List
```

### Section Details
1. **Roadmap Philosophy** — time-boxed vs. feature-boxed, and rationale
2. **Visual Roadmap Tree** — a `mermaid` diagram (graph TD or LR) visualizing the path, identifying core nodes vs. optional branches (in the style of roadmap.sh/developer-roadmap). Use `classDef` to color-code required vs recommended vs optional paths.
3. **Phase 1: MVP** — features, timeline (Week 1-4), done criteria, launch strategy
4. **Phase 2: Foundation** — features that solidify the core, based on Phase 1 learnings (Month 2-3)
5. **Phase 3: Growth** — features that drive user acquisition and retention (Month 3-6)
6. **Phase 4: Scale** — features for scale, enterprise, or monetization expansion (Month 6+)
7. **Dependency Map** — which features block other features
8. **Risk Milestones** — decision points where the founder must evaluate data before proceeding
9. **Cut List** — features that could be cut from each phase if timeline pressure increases

## Few-Shot Example (Partial)
> **Section 2 — Phase 1: MVP (Gold Standard):**
>
> **Timeline:** Week 1-3
> **Features:**
> | # | Feature | FR Ref | Effort | Dependencies | Cut? |
> |---|---|---|---|---|---|
> | 1 | Stripe webhook integration | FR-001 | 2 days | None | NO — core |
> | 2 | Reconciliation dashboard | FR-002 | 3 days | #1 | NO — core |
> | 3 | Discrepancy alerts | FR-003 | 1 day | #2 | YES — can launch without |
> | 4 | User auth (magic link) | FR-007 | 1 day | None | NO — security |
>
> **Done Criteria:**
> - [ ] A user can connect Stripe, see transactions, and identify discrepancies in <5 minutes
> - [ ] System handles 1,000 transactions without errors
> - [ ] 3 beta users have completed the full flow
>
> **Launch Strategy:** Closed beta with 5-10 hand-picked SaaS finance teams.

## Anti-Patterns (DO NOT)
- ❌ Create a 12-month roadmap with specific dates — use relative timelines (Week 1-2, Month 2, etc.)
- ❌ Front-load every feature into Phase 1
- ❌ Skip the Cut List — this is your insurance policy when time runs short
- ❌ Ignore dependencies — building auth after the dashboard is a common mistake
- ❌ Create phases without done criteria — "Phase 1 done" must mean something testable

## Downstream Consumers
This artifact feeds into:
- `docs/ARCHITECTURE.md` (16) — informs what needs to be built when
- `docs/PITCH_DECK.md` (25) — slide 11 (Roadmap / Milestones)

## Save As
`docs/ROADMAP.md`

## Prompt
```text
<role>
Act as a Technical Program Manager experienced in shipping early-stage products with AI-assisted development.
</role>

<context>
You are generating Artifact 06 of 35 in the Founder Mode system. This artifact sequences requirements into a time-based delivery plan. The target is a solo founder building with AI assistance — Phase 1 MUST be achievable in 2-4 weeks.
</context>

<upstream_artifacts>
Read both:
- @docs/PRD.md — Sections 6 (Functional Requirements), 8 (Out of Scope), 11 (MVP Scope)
- @docs/PRODUCT_STRATEGY.md — Sections 4 (Wedge), 5 (Core Capabilities)
</upstream_artifacts>

<task>
1. Think step by step:
   - What is the minimum feature set for a usable MVP?
   - What are the hard dependencies between features?
   - What can be cut if the founder runs out of time?
   - What validation must happen between phases?
2. Sequence features into 4 phases with realistic timelines.
3. Phase 1 must be achievable in 2-4 weeks by a solo founder.
4. Each phase needs clear done criteria and a cut list.
5. Include risk milestones — decision points where data must be evaluated.
</task>

<output_format>
Markdown document with exactly 8 sections as specified in Output Requirements.
Phase features must be presented as tables with effort estimates.
Done criteria must use checkbox format.
Save as docs/ROADMAP.md.
</output_format>

<constraints>
- Phase 1 MUST NOT exceed 4 weeks of solo-founder effort.
- Every phase MUST have done criteria and a cut list.
- Dependencies MUST be explicitly mapped — no implicit ordering.
- Use relative timelines (Week 1-2, Month 2), not calendar dates.
- Use "ESTIMATED: [basis]" for any timeline that lacks precedent.
</constraints>
```
