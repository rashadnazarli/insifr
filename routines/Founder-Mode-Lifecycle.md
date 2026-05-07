---
name: "insifr Product Lifecycle"
description: "The complete 39-artifact sequential product build lifecycle with adaptive project modes and multi-project support."
variables:
  project_name: ""              # Name of the active project (e.g., "Celentano", "NewVenture")
  project_mode: "full"          # full | starter | business | technical | consultant
  project_tier: "pre-pmf"       # pre-pmf | scaling | series
  include_ai: false             # true if AI/ML product
  stack_tier: "standard"        # lightweight | standard | full-stack | mobile
---

# insifr Product Lifecycle

This routine dictates how the insifr team of agents builds a product from start to finish.

**Active Project:** `{{project_name}}`
**Mode:** `{{project_mode}}` determines which artifacts are generated.

---

## Step 0: Project Initialization (Assigned to: CEO Agent)
- Receive project brief from Rashad (via Paperclip dashboard or IDE).
- Ask clarifying questions using the Proactive Inquiry Protocol:
  1. What product are we building? What problem does it solve?
  2. Who experiences this problem most acutely?
  3. What do they currently use instead?
- Determine `project_mode`, `project_tier`, `include_ai`, and `stack_tier`.
- Create a project workspace folder if it doesn't exist.
- Set `project_name` and announce: "Project {{project_name}} initialized. Starting Phase 1: Discovery."
- Delegate to PM Agent.

---

## Phase 1: Discovery (Assigned to: PM Agent)
- Generate Artifact 01 (Idea Discovery)
- Generate Artifact 02 (Problem Validation)
- Generate Artifact 03 (Market Research)
➔ Proceed seamlessly to Phase 1b.

## Phase 1b: Strategic Analysis (Assigned to: PM Agent)
*Conditional: Only if `{{project_tier}}` = scaling or series*
- Generate Artifact 03b (Porter's Five Forces)
- Generate Artifact 07b (Competitive Positioning Matrix)
- Generate Artifact 08b (SWOT Analysis)
➔ Proceed seamlessly to Phase 2.

## Phase 2: Strategy (Assigned to: PM Agent)
- Generate Artifact 04 (Product Strategy)
- *If `{{project_tier}}` ≠ lightweight:* Generate Artifact 04b (MECE Problem Breakdown)
- Generate Artifact 05 (PRD)
- *If `{{project_tier}}` = pre-pmf or scaling:* Generate Artifact 05b (Hypothesis Validation Plan)
- Generate Artifact 06 (Roadmap)
➔ Proceed seamlessly to Phase 2b.

## Phase 2b: Stress Testing (Assigned to: PM Agent)
*Conditional: Only if `{{project_tier}}` = scaling or series*
- Generate Artifact 06b ("So What?" Stress Test)
➔ Proceed seamlessly to Phase 3.

## Phase 3: Audience (Assigned to: PM Agent)
- Generate Artifact 07 (User Personas)
- Generate Artifact 08 (Customer Journey Map)

**⛔ BOARD APPROVAL REQUIRED:**
The CEO Agent must present Phase 1-3 artifacts to Rashad for approval via Paperclip dashboard before releasing work to the Design team.

*If `{{project_mode}}` = business, STOP HERE. Business mode generates only Phases 1-3.*

---

## Phase 4: Brand & Design (Assigned to: Designer Agent)
- Generate Artifact 09 (Brand Guidelines)
- Generate Artifact 10 (Design Tokens)
- Generate Artifact 11 (Design System)
- Generate Artifact 12 (Component Library)
- Generate Artifact 13 (Layout System)

**⛔ BOARD APPROVAL REQUIRED:**
Visuals must be approved by Rashad before wireframing.

## Phase 5: Implementation (Assigned to: Designer Agent)
- Generate Artifact 14 (Wireframes)
- Generate Artifact 15 (UI Spec)

**⛔ BOARD APPROVAL REQUIRED:**
UX flow must be locked before engineering starts.

---

## Phase 6: Engineering (Assigned to: Architect Agent)

**Stack selection:** Use the `{{stack_tier}}` variable to determine the approved technology stack.
- `lightweight` → HTML/CSS/JS, Vite, Firebase/Supabase
- `standard` → Next.js or Vite+React, Supabase, Vercel
- `full-stack` → Next.js, PostgreSQL, Redis, Docker, cloud
- `mobile` → Flutter/Dart, Riverpod/Bloc, Supabase/Firebase, Fastlane

- Generate Artifact 16 (Architecture) — **locks the stack choice**
- Generate Artifact 17 (Database Schema)
- Generate Artifact 18 (API Spec)
- Generate Artifact 19 (Infrastructure)

## Phase 6b: AI Engineering (Assigned to: Architect Agent)
*Conditional: Only if `{{include_ai}}` = true*
- Generate Artifact 26 (AI Architecture)
- Generate Artifact 27 (AI Guardrails)
- Generate Artifact 28 (Data Governance)
- Generate Artifact 29 (AI Compliance)

**⛔ BOARD APPROVAL REQUIRED:**
Technical Blueprint locked. Hand off to DevSecOps Engineer.

*If `{{project_mode}}` = technical, STOP HERE. Technical mode generates only Phases 4-6.*

---

## Phase 7: Build & Launch (Assigned to: Engineer Agent)
- Generate Artifact 20 (Workflows)
- Generate Artifact 21 (Feature Execution) — **Executes code writing**
- Generate Artifact 22 (UX Audit)
- Generate Artifact 23 (Architecture Review)
- Generate Artifact 24 (Growth Strategy)
- Generate Artifact 25 (Pitch Deck)

*(Note: During Phase 7, the Red Team Auditor Agent continuously scans commits against the security and rules criteria).*

---

## Artifact Count Summary

| Mode | Artifacts Generated | Phases |
|---|---|---|
| `--full` | 39 (33 standard + 6 frameworks) | All |
| `--starter` | 7 (core business) | 1-3 only |
| `--business` | 14 (business + frameworks) | 1-3 + frameworks |
| `--technical` | 15 (design + engineering) | 4-6 only |
| `--consultant` | 39 + investor framing | All + pitch language |
