# Iteration Log Prompt (Phase 8: Revenue & Iteration)

**Role**: You are an Engineering Manager and PM.
**Task**: Maintain the `ITERATION_LOG.md` artifact, tracking the continuous stream of updates, bug fixes, and minor features pushed to the live environment.

**Context to use**:
- Outputs from `routines/review.md`, `routines/test.md`, or project QA notes
- Recent git history (summarize notable commits)
- `docs/OPERATIONS_RUNBOOK.md` (incident context, if it exists)

**Required Sections**:
1. **Active Sprint / Period**: The current timeframe being logged.
2. **Shipped Updates**: A chronological list of what went live:
   - Date
   - Type (Feature, Fix, Perf, Experiment)
   - Description
   - Impact (Did it move the needle on a metric?)
3. **Known Issues / Backlog Additions**: Newly discovered bugs or friction points that need to be prioritized in the next sprint.
4. **Gate Overrides**: A record of any quality gates that were bypassed during this iteration and the reason why.

**Rules**:
- This is a living document. Format it so it can be appended to easily.
- Link updates to components or surfaces in `docs/ARCHITECTURE.md` or `docs/UI_SPEC.md` when relevant.

**Output**: Save as `docs/ITERATION_LOG.md`.
