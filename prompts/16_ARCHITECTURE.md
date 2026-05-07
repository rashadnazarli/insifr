# 16 — SYSTEM ARCHITECTURE

## Purpose
Define the high-level technical structure of the product. This document governs all code organization, technology choices, and system boundaries.

## Role
You are acting as a **Principal Software Architect** experienced in building products for startups.

## Upstream Dependencies
- `docs/PRD.md` (Artifact 05)
- `docs/ROADMAP.md` (Artifact 06)
- `docs/UI_SPEC.md` (Artifact 15)
- `docs/PRODUCT_STRATEGY.md` (Artifact 04)

## Required Inputs
- `@docs/PRD.md`
- `@docs/ROADMAP.md`
- `@docs/UI_SPEC.md`
- `@docs/PRODUCT_STRATEGY.md`

## Before You Start — Decision Framework
For each technology choice, evaluate against these criteria:
1. **Speed of execution** — can a solo founder ship this in 2-4 weeks?
2. **Operational simplicity** — serverless > servers for small teams
3. **Cost at zero scale** — free tier matters for pre-revenue products
4. **Ecosystem maturity** — well-documented > cutting-edge

### Stack Default
Unless the PRD justifies otherwise, start with:
- Frontend: Vanilla HTML + CSS + JavaScript, bundled with Vite
- Backend: Firebase (Functions, Firestore, Auth, Hosting)
- Styling: CSS Custom Properties (design tokens from `design-system/css_variables.css`)

If you recommend a different stack, provide explicit justification for each deviation.

### Conway's Law Check (Solo-Founder Calibration)
Before finalizing architecture, apply this test:
- Can ONE person operate every component of this system without help?
- Is the number of independently deployable units ≤ 3?
- Can the entire system be understood by reading 2-3 documents?

If the answer to any question is "no", the architecture is over-engineered for a solo founder. Simplify until all answers are "yes".

## Operational Rules
- Recommend a stack with clear justification for each choice.
- Balance speed of execution with long-term maintainability.
- Separate application layers clearly.
- Do NOT write code or install commands — this is the blueprint, not the build.
- For any technology recommendation lacking benchmark data, output `**DATA NEEDED:** [specific benchmark or proof needed]`.

## Output Requirements
Generate a markdown document with these exact sections, in this order:

```markdown
# SYSTEM ARCHITECTURE — [Product Name]

## 1. Architectural Goals
## 2. Technology Stack
## 3. Frontend Architecture
## 4. Backend Architecture
## 5. System Design Primer Assessment
## 6. Data Architecture (High Level)
## 7. Build & Deployment Architecture
## 8. Third-Party Integrations
## 9. Security Architecture (High Level)
```

### Section Details
1. **Architectural Goals** — scalability target, SLAs, RTO/RPO expectations, constraints.
2. **Technology Stack** — languages, frameworks, and infrastructure choices with rationale. Include justification table:

| Layer | Technology | Justification | Alternative Rejected | Free Tier? |
|---|---|---|---|---|
| Frontend | Vite + React | Standard ecosystem, fast build | Next.js (overkill without SSR need) | Yes (Hosts static files) |

3. **Frontend Architecture** — component structure, state management pattern, routing.
4. **Backend Architecture** — service architecture, communication protocols (REST/GraphQL/gRPC).
5. **System Design Primer Assessment** — evaluate CAP theorem trade-offs (e.g. CP vs AP), identify caching layers (Redis/Memcached vs CDN), and specify load-balancing/queuing strategies required as it scales.
6. **Data Architecture (High Level)** — storage strategies (SQL vs NoSQL vs Object), avoiding schema detail.
7. **Build & Deployment** — CI/CD flow, environments (dev/staging/prod).
8. **Third-Party Integrations** — external APIs and webhooks.
9. **Security Architecture (High Level)** — auth flow, data encryption.

### 12-Factor Compliance Matrix
| Factor | Status | Implementation |
|---|---|---|

### Performance Budget
- Lighthouse ≥ 90, LCP < 2.5s, FID < 100ms, CLS < 0.1, bundle < 200KB, TTI < 3.5s

## Few-Shot Example (Partial)
> **Section 2 — Technology Stack (Gold Standard):**
>
> | Layer | Technology | Justification | Alternative Rejected | Free Tier? |
> |---|---|---|---|---|
> | Frontend | Vite + Vanilla JS | Fastest build times, zero framework lock-in, <50KB bundle | Next.js (too heavy for MVP, SSR not needed) | ✅ Free |
> | Backend | Firebase Functions (Node 18) | Zero-config serverless, auto-scaling, tight Firestore integration | Express on Railway (requires server management) | ✅ Free (2M invocations/mo) |
> | Database | Firestore | Real-time sync, offline support, auto-scaling, no schema migrations | Supabase/PostgreSQL (need SQL for complex queries — revisit at 10K users) | ✅ Free (1GB storage) |
> | Auth | Firebase Auth | Magic link + Google OAuth in <1 hour setup | Auth0 (overkill for MVP) | ✅ Free (50K MAU) |
> | Hosting | Firebase Hosting | Single deploy command, global CDN, auto-SSL | Vercel (good but separate deploy pipeline) | ✅ Free (10GB/mo) |
>
> **Conway's Law Check:** ✅ All components managed via single `firebase` CLI. Solo-founder can operate everything.

## Anti-Patterns (DO NOT)
- ❌ Default to React/Next.js without justification — vanilla is the default
- ❌ Over-engineer for scale the product doesn't have yet
- ❌ Choose a database that requires infrastructure management when Firestore would suffice
- ❌ Skip the directory structure — this prevents architectural drift
- ❌ Create microservices for a product with zero users — monolith first, always
- ❌ Add message queues, event buses, or service meshes before paying customers

## Downstream Consumers
This artifact feeds into:
- `docs/DATABASE_SCHEMA.md` (17) — technology choice determines schema approach
- `docs/API_SPEC.md` (18) — defines API patterns and hosting
- `docs/INFRASTRUCTURE.md` (19) — deployment and ops plan

## Revision Trigger
If this architecture reveals that a PRD feature is technically infeasible, flag the conflict and propose a PRD revision.

## Save As
`docs/ARCHITECTURE.md`

## Prompt
```text
<role>
Act as a Principal Software Architect experienced in building startup products for solo founders.
</role>

<context>
You are generating Artifact 16 of 35 in the Founder Mode system. This architecture blueprint governs all code organization and technology choices. Database Schema (17), API Spec (18), and Infrastructure (19) all depend on the decisions made here.
</context>

<upstream_artifacts>
Read all:
- @docs/PRD.md — Sections 6 (Functional Requirements), 7 (Non-Functional), 11 (MVP Scope)
- @docs/ROADMAP.md — Phase 1 timeline and features
- @docs/UI_SPEC.md — screen inventory and data requirements
- @docs/PRODUCT_STRATEGY.md — Section 10 (Non-Goals), Section 9 (Strategic Risks)
</upstream_artifacts>

<task>
1. Think step by step:
   - What are the core technical requirements from the PRD?
   - What's the simplest stack that supports MVP in 2-4 weeks?
   - Does this pass the Conway's Law check for solo-founder operation?
   - What are the performance budget targets?
2. Recommend a technology stack with justification for each choice.
3. Apply the Conway's Law check — simplify if any answer is "no."
4. Define the complete frontend and backend architecture.
5. Include 12-Factor compliance matrix and performance budget.
6. If the product uses AI, flag that Artifact 26 (AI Architecture) is required.
</task>

<output_format>
Markdown document with all sections as specified in Output Requirements.
Technology Stack must be a justification table comparing alternatives.
12-Factor compliance must be a table with status per factor.
Save as docs/ARCHITECTURE.md.
</output_format>

<constraints>
- Default stack is Vanilla JS + Vite + Firebase — justify ANY deviation.
- Conway's Law check is MANDATORY — architecture must pass for solo-founder.
- Performance budget is MANDATORY and must be verified during /review.
- i18n foundation is MANDATORY even for v1 single-language.
- Do NOT write code — this is the blueprint, not the build.
- Use "DATA NEEDED: [specifics]" for any technology choice lacking benchmarks.
</constraints>
```
