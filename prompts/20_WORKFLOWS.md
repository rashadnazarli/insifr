# 20 — WORKFLOWS & AUTOMATION

## Purpose
Define the automated and manual workflows within the product — both user-facing workflows and internal operational automations.

## Role
You are acting as a **Business Process Analyst and Automation Architect**.

## Upstream Dependencies
- `docs/PRD.md` (Artifact 05)
- `docs/ARCHITECTURE.md` (Artifact 16)
- `docs/API_SPEC.md` (Artifact 18)

## Required Inputs
- `@docs/PRD.md`
- `@docs/ARCHITECTURE.md`
- `@docs/API_SPEC.md`

## Operational Rules
- Distinguish between user-triggered workflows and system-automated workflows.
- Each workflow must specify: trigger, steps, conditions, and outcomes.
- Identify which workflows can be automated from day one and which are manual initially.

## Output Requirements
Generate a markdown document with these exact sections:

```markdown
# WORKFLOWS — [Product Name]

## 1. User Workflows
## 2. Admin Workflows
## 3. Automated Workflows
## 4. Workflow Diagrams
## 5. Priority Matrix
```

### Section Details
1. **User Workflows** — step-by-step flows for core user actions (onboarding, core value, settings). Per workflow:

| Step | Actor | Action | System Response | Error Path |
|---|---|---|---|---|

2. **Admin Workflows** — user management, content moderation, data export
3. **Automated Workflows** — scheduled tasks, event-driven triggers, notification rules
4. **Workflow Diagrams** — ASCII or Mermaid flowcharts for each critical workflow
5. **Priority Matrix** — which workflows to automate first (impact vs. effort)

## Few-Shot Example (Partial)
> **User Workflow — Onboarding (Gold Standard):**
>
> | Step | Actor | Action | System Response | Error Path |
> |---|---|---|---|---|
> | 1 | User | Clicks "Get Started" on landing | Show signup form (email only) | — |
> | 2 | User | Enters email, clicks "Send Magic Link" | Send email via Firebase Auth | Invalid email → inline error |
> | 3 | User | Clicks magic link in email | Verify token, create account, redirect to dashboard | Expired link → "Request new link" |
> | 4 | System | Auto-detect: first login? | Show onboarding overlay with 3 setup steps | — |
> | 5 | User | Clicks "Connect Stripe" in step 1 | OAuth flow → Stripe → redirect back with token | OAuth denied → skip, show manual option |
> | 6 | System | Stripe connected | Begin initial data sync, show progress bar | Sync fails → retry with exponential backoff |
> | 7 | System | Sync complete | Dashboard populates, highlight discrepancies | — |
> | ★ | — | **First Value Moment** | User sees first discrepancy highlight | If no discrepancies → show "All clear" celebration |

## Anti-Patterns (DO NOT)
- ❌ List workflows without specifying triggers and outcomes
- ❌ Automate everything — some workflows should be manual at v1 scale
- ❌ Skip admin workflows — someone needs to manage the product
- ❌ Forget error handling within workflows
- ❌ Design workflows without error paths

## Save As
`docs/WORKFLOWS.md`

## Prompt
```text
<role>
Act as a Business Process Analyst and Automation Architect.
</role>

<context>
You are generating Artifact 20 of 35 in the Founder Mode system. These workflows define every process in the product — user-facing, admin, and automated background processes.
</context>

<upstream_artifacts>
Read all three:
- @docs/PRD.md — Sections 4 (Core Use Cases), 5 (User Stories)
- @docs/ARCHITECTURE.md — Section 4 (Backend Architecture), Section 5 (Database)
- @docs/API_SPEC.md — Section 5 (Background Functions)
</upstream_artifacts>

<task>
1. Think step by step:
   - What are the core user workflows from signup to daily use?
   - What admin operations are needed?
   - What can be automated vs. what should be manual at MVP scale?
   - What are the error paths for each workflow?
2. Define all product workflows: user flows, admin flows, and automated background processes.
3. Include flowcharts for complex workflows.
4. Create a priority matrix for automation (impact vs. effort).
</task>

<output_format>
Markdown document with exactly 5 sections.
User workflows must use step-by-step tables with error paths.
Diagrams must use ASCII or Mermaid syntax.
Save as docs/WORKFLOWS.md.
</output_format>

<constraints>
- Every workflow MUST specify trigger, steps, conditions, outcomes, AND error paths.
- Do NOT automate everything at MVP — distinguish manual vs. automated.
- Admin workflows are MANDATORY — someone must manage the product.
- First Value Moment must be clearly marked in the onboarding workflow.
</constraints>
```
