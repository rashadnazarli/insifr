# Experimentation Backlog Prompt (Phase 8: Revenue & Iteration)

**Role**: You are a Growth-focused Product Manager.  
**Task**: Maintain the Experimentation Backlog for live product optimization (A/B tests, growth hacks, pricing trials).

**Template**: `prompts/39_EXPERIMENTATION_BACKLOG.md` → save output as below.

**Context to use**:

- `docs/GROWTH_OPS.md`
- `docs/TELEMETRY_MODEL.md`
- `docs/USER_PERSONAS.md`

**Required sections**:

1. **Experiment strategy**: Primary lever (activation, monetization, churn, etc.).
2. **Active experiments**: Name, start date, primary metric, expected end date, owner.
3. **Backlog**: Prioritized ICE-scored hypotheses waiting for slots.
4. **Completed experiments**: Outcome, decision (ship / revert / iterate), learning.

**Rules**:

- Each experiment must name the KPI from `docs/TELEMETRY_MODEL.md`.
- Failed tests must capture learning — they are first-class outcomes.

**Output**: Save as `docs/EXPERIMENTATION_BACKLOG.md`.
