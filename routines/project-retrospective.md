---
description: Conduct a structured retrospective to extract lessons, detect operational patterns, and self-anneal the Founder Mode OS directives.
---

# Project Retrospective Workflow

This routine is executed at the end of a major project phase or milestone, or periodically for live platforms in `--maintenance` mode. Its purpose is to evaluate the execution process and update the underlying agent directives, ensuring the OS gets smarter with every iteration.

## Prerequisites
- The target project has completed a major milestone (e.g., Phase 7 Launch, or a significant sprint).
- Artifacts, specifically `ITERATION_LOG.md` (if post-launch) or `docs/` artifacts, are available.

## Workflow Steps

### Phase 1: Context Gathering (Auditor Agent)
1. **Analyze Artifact Trajectory:** Review the diff between the initial `IDEA.md` and the final shipped code / `WORKFLOWS.md`.
2. **Review QA/Review Logs:** Examine the outputs of the `/qa` and `/review` skills during the execution phase. Note recurring issues (e.g., "Always forgets CORS on the API").
3. **Analyze Telemetry:** If in Phase 8, review `TELEMETRY_MODEL.md` and live metrics to identify dropped funnels or performance regressions.

### Phase 2: Synthesis (CEO & Auditor)
1. **Identify Successes:** What agent heuristics or system processes worked exceptionally well?
2. **Identify Failures:** What assumptions were invalidated? What technical debt was accrued? Which quality gates were overridden?
3. **Extract Patterns:** Determine if failures were one-offs or systemic flaws in the agent directives or prompt templates.

### Phase 3: Artifact Generation
1. Generate or append to `PROJECT_RETROSPECTIVE.md` for the specific project.
2. The artifact must include:
   - Summary of the period evaluated.
   - Top 3 successes.
   - Top 3 systemic failures.
   - Recommended updates to OS directives.

### Phase 4: Self-Annealing (CEO Agent)
1. **Directive Updates:** For every systemic failure identified, update the global agent instructions (e.g., `Antigravity-instructions.md` or the specific `SKILL.md` templates).
2. **Prompt tuning:** If an artifact generation failed repeatedly, update the matching numbered template in `prompts/` (see `prompts/README.md`) to prevent the failure mode.
3. **Learning Loop Template:** Complete `docs/system/templates/post-initiative-learning-loop.md` and record concrete prompt/routine/checklist updates before closing the retrospective.

## Quality Gate (Retrospective)
- [ ] Retrospective covers both technical and operational/process layers.
- [ ] At least one concrete update is proposed to a `SKILL.md` or prompt template.
- [ ] Founder has approved the updates to the global OS directives.
- [ ] `docs/system/templates/post-initiative-learning-loop.md` is completed and archived with the project.
