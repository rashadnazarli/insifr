# 14 — WIREFRAMES

## Purpose
Create low-fidelity screen blueprints for every core flow, using the layout templates and components already defined. Wireframes validate information architecture before visual polish.

## Role
You are acting as a **UX Designer** focused on information architecture and user flow.

## Upstream Dependencies
- `docs/LAYOUT_SYSTEM.md` (Artifact 13)
- `docs/PRD.md` (Artifact 05)
- `docs/CUSTOMER_JOURNEY.md` (Artifact 08)

## Required Inputs
- `@docs/LAYOUT_SYSTEM.md`
- `@docs/PRD.md`
- `@docs/CUSTOMER_JOURNEY.md`

## Operational Rules
- Wireframes are structural, not visual. Use ASCII/text diagrams or simple descriptions.
- Every screen must specify which layout template it uses.
- Every screen must map to a PRD use case or user story.
- Include navigation flows — how the user gets from screen A to screen B.
- For any flow assumption requiring user testing, output `**DATA NEEDED:** [specific user behavior to test]`.

## Output Requirements
Generate a markdown document with these exact sections, in this order:

```markdown
# WIREFRAMES — [Product Name]

## 1. Screen Inventory
## 2. User Flows
## 3. Screen Wireframes
## 4. Navigation Map
## 5. Empty States
## 6. Error States
```

### Section Details
1. **Screen Inventory** — complete list of screens mapped to PRD features:

| Screen | Route | PRD Feature | Layout Template | Priority |
|---|---|---|---|---|

2. **User Flows** — step-by-step paths for each core use case (with screens connected by arrows)
3. **Wireframe per Screen** — ASCII layout showing: layout template used, content regions, key components placed, interactive elements
4. **Navigation Map** — how all screens connect (site map / flow diagram)
5. **Empty States** — what each data-dependent screen looks like with no data
6. **Error States** — what users see when things go wrong (per screen)

## Few-Shot Example (Partial)
> **Screen Wireframe — Dashboard (Gold Standard):**
>
> **Route:** `/dashboard` | **Layout:** Dashboard Layout | **PRD:** FR-001, FR-002
>
> ```
> ┌──────────────────────────────────────────────┐
> │ [Logo]  Dashboard    [🔔 3] [Avatar ▼]       │
> ├──────────────────────────────────────────────┤
> │ Sidebar  │ Welcome back, Sarah               │
> │          │                                    │
> │ • Dash   │ ┌─────────┐ ┌─────────┐ ┌───────┐ │
> │ • Trans  │ │ Revenue │ │ Sync'd  │ │ Disc. │ │
> │ • Report │ │ $142K   │ │   847   │ │   3   │ │
> │ • Config │ └─────────┘ └─────────┘ └───────┘ │
> │          │                                    │
> │          │ ┌───── Discrepancies ─────────────┐ │
> │          │ │ ⚠ INV-2847  $2,320  Stripe↔CRM │ │
> │          │ │ ⚠ INV-2851  $480    Missing    │ │
> │          │ │ ⚠ INV-2853  $47     Rounding   │ │
> │          │ └────────────────── [View All →] ─┘ │
> └──────────────────────────────────────────────┘
> ```
>
> **Interactive elements:**
> - 🔔 badge → opens notification dropdown
> - Stat cards → click navigates to detail view
> - Discrepancy rows → click opens side panel with details
> - "View All" → navigates to `/discrepancies`

## Anti-Patterns (DO NOT)
- ❌ Skip error and empty states — these are the first thing users see
- ❌ Create screens not mapped to PRD requirements
- ❌ Use high-fidelity mockups at this stage — structure first, pixels later
- ❌ Forget the navigation flow between screens
- ❌ Design screens without specifying the layout template

## Downstream Consumers
This artifact feeds into:
- `docs/UI_SPEC.md` (15) — UI specification adds pixel-perfect detail to these wireframes
- `docs/ARCHITECTURE.md` (16) — informs frontend route structure

## Save As
`docs/WIREFRAMES.md`

## Prompt
```text
<role>
Act as a UX Designer focused on information architecture and user flow validation.
</role>

<context>
You are generating Artifact 14 of 35 in the Founder Mode system. These wireframes validate information architecture before any visual polish. The UI Spec (Artifact 15) will add pixel-perfect detail to these structural blueprints.
</context>

<upstream_artifacts>
Read all three:
- @docs/LAYOUT_SYSTEM.md — available layout templates and navigation patterns
- @docs/PRD.md — Sections 4 (Core Use Cases), 5 (User Stories), 6 (Functional Requirements)
- @docs/CUSTOMER_JOURNEY.md — Section 6 (First Value Moment), Section 7 (Churn Risks)
</upstream_artifacts>

<task>
1. Think step by step:
   - What screens are needed to support every PRD use case?
   - What is the fastest flow from landing to First Value Moment?
   - Where are the churn risk points and how do we design around them?
   - What does each screen look like with NO data?
2. Create a screen inventory mapped to PRD features.
3. Design user flows for each core use case.
4. Create ASCII wireframes for every screen, specifying layout template and components.
5. Define empty states and error states for every data-dependent screen.
</task>

<output_format>
Markdown document with exactly 6 sections as specified in Output Requirements.
Screen inventory must be a table with route and PRD reference.
Wireframes must use ASCII diagrams.
Save as docs/WIREFRAMES.md.
</output_format>

<constraints>
- Every screen MUST map to a PRD use case or user story.
- Every screen MUST specify its layout template from Layout System.
- Empty states MUST be defined for every data-dependent screen.
- Wireframes are structure only — no colors, no fonts, no visual polish.
- Use "DATA NEEDED: [specifics]" for any flow assumption requiring user testing.
</constraints>
```
