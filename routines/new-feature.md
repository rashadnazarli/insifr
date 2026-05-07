---
description: Implement a new feature with full design system compliance and verification
---

# New Feature Implementation

## Prerequisites
- All foundation artifacts exist in `docs/` (at minimum: PRD, DESIGN_TOKENS, DESIGN_SYSTEM, COMPONENT_LIBRARY, LAYOUT_SYSTEM, ARCHITECTURE, API_SPEC)

## Steps

### 1. Check for In-Progress Work

Before starting, check if there is an existing `feature-progress.json` in the project root:
- If it exists and has `status: "in_progress"`, **resume from the last incomplete step** instead of starting fresh.
- Read `claude-progress.txt` for session notes from previous sessions.
- Run `git log --oneline -5` to see recent checkpoint commits.
- Announce: "Resuming feature [name] from step [N]" and skip to that step.

If no progress file exists or last feature is `status: "done"`, proceed as a new feature.

### 2. Load Project Context

Read the following artifacts:
- `@docs/PRD.md`
- `@docs/UI_SPEC.md`
- `@docs/DESIGN_TOKENS.md`
- `@docs/DESIGN_SYSTEM.md`
- `@docs/COMPONENT_LIBRARY.md`
- `@docs/LAYOUT_SYSTEM.md`
- `@docs/ARCHITECTURE.md`
- `@docs/API_SPEC.md`

If any of these files are missing, **STOP** and report which files are missing.

### 3. Understand and Plan

Understand the feature request from the founder, then create an implementation plan:
- Identify relevant PRD requirements
- Determine required UI screens
- Select appropriate layout template from LAYOUT_SYSTEM
- List components needed from COMPONENT_LIBRARY
- Map required API endpoints from API_SPEC
- Present plan for founder approval before writing code

### 3a. Incremental Show Protocol

> Adapted from huashu-design's Junior Designer workflow — "理解错了早改比晚改便宜100倍" (Catching a misunderstanding early is 100x cheaper than catching it late).

**Never do a "big reveal."** The agent must show work incrementally at defined checkpoints:

#### Show #1 — Assumptions (before writing code)
List all assumptions about:
- User behavior and edge cases
- Data shape and API contracts
- Design patterns being applied
- What's in scope vs. out of scope

Present to the founder. **Wait for confirmation before writing code.** A 2-minute assumption check prevents 2-hour rewrites.

#### Show #2 — 30% Checkpoint (after skeleton)
After file structure + basic scaffolding is in place (but before core logic), show the founder:
- Files created and their purpose
- Component/function stubs
- "Here's the shape of what I'm building — is this the right direction?"

#### Show #3 — 70% Checkpoint (after core logic)
After main functionality works but before polish/edge cases, show the founder:
- Working core flow (screenshot or description)
- Known gaps and remaining work
- Any deviations from the original plan

#### Silent Work Alarm
If the agent has completed **3+ progress steps** without showing the founder anything, it must **stop and present current state**. Silent execution beyond 3 steps is a protocol violation.

**The principle**: The founder should never be surprised by a deliverable. Every show is a chance to course-correct for free.

### 4. Initialize Progress Tracking

After plan approval, create or update `feature-progress.json`:

```json
{
  "featureId": "short-kebab-name",
  "description": "What the feature does",
  "prdRequirement": "PRD-XXX",
  "status": "in_progress",
  "startedAt": "ISO timestamp",
  "steps": [
    { "name": "Create file structure", "status": "pending" },
    { "name": "Implement UI components", "status": "pending" },
    { "name": "Add business logic", "status": "pending" },
    { "name": "Wire API integration", "status": "pending" },
    { "name": "Run tests", "status": "pending" },
    { "name": "Visual verification", "status": "pending" }
  ]
}
```

Adjust the step list to match the actual implementation plan. Steps should be granular enough to resume from.

### 5. Implement the Feature (Step by Step)

For **each step** in the progress file:

1. Mark the step as `"in_progress"` in `feature-progress.json`
2. Implement it:
   - All colors, spacing, typography → CSS variables from design tokens
   - All UI → composed from component library
   - All layouts → follow layout system templates
   - All API calls → follow API specification
   - All business logic → align with PRD requirements
3. Mark the step as `"done"` in `feature-progress.json`
4. **Git checkpoint**: `git add -A && git commit -m "feat(<featureId>): <step name>"`

### 6. Write Session Notes

After each meaningful step (or before ending a session), append to `claude-progress.txt`:

```
SESSION <ISO timestamp>
Feature: <featureId>
Completed: <list of steps done this session>
Next: <what to do next>
Notes: <anything the next session needs to know — patterns used, decisions made, blockers>
```

### 7. Produce the Verification Bundle (mandatory)

#### Structural Evidence
List all files created or modified with brief explanation:
```
pages/dashboard.html — new dashboard page
styles/dashboard.css — dashboard-specific styles
services/analytics.js — analytics API integration
```

#### Visual Evidence
Capture a screenshot or browser recording showing:
- Correct layout template usage
- Correct component usage
- Correct design token colors/spacing/typography

#### Logical Evidence
Show test results or validation output confirming:
- Feature works correctly
- API integration works
- Edge cases handled

### 8. Mark Complete

Update `feature-progress.json`:
- Set `status: "done"`
- Set `completedAt` timestamp
- Final git commit: `git add -A && git commit -m "feat(<featureId>): complete"`

The feature is **NOT COMPLETE** until:
1. All three evidence types are provided.
2. The progress file is marked done.
3. **Verification-Before-Completion**: You have explicitly run the test suite and confirmed the feature works in the live context (e.g., viewing it in the browser or making a real API request). *Never assume code works just because it was written.*

## Rules
- Never invent UI styles outside the design system
- Never create one-off components when a library component exists
- Never add API endpoints not defined in API_SPEC without updating the spec first
- If the feature conflicts with the PRD, flag it before implementing
- Always commit after each completed step — never batch multiple steps into one commit
- Always update `feature-progress.json` before and after each step

## Git Worktree for Parallel Work

When working on features across multiple projects simultaneously (e.g., Avena + Celentano), use Git worktrees to isolate each feature branch:

```bash
# Create a worktree for the feature
git worktree add ../avena-feat-dashboard feat/dashboard

# Work in the isolated worktree
cd ../avena-feat-dashboard
# ... implement feature ...

# When done, merge and clean up
cd ../main-repo
git merge feat/dashboard
git worktree remove ../avena-feat-dashboard
```

**Rules for worktree usage:**
1. Each feature gets its own worktree — never mix features.
2. The main working directory stays on `main` or `develop`.
3. Run verification (Step 7) from within the worktree before merging.
4. Clean up worktrees after merge to avoid directory sprawl.

## Granularity Standard

When breaking a feature into implementation steps (Step 3), apply the Superpowers granularity bar:
- Each step = 2–5 minutes of execution time.
- Each step specifies the exact file path to modify.
- Each step includes complete code or pseudocode (no "implement the logic" hand-waving).
- Each step ends with a verification command.

