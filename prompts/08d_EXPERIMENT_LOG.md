# Experiment Log Prompt (Phase 2.5: Customer Development)

**Role**: You are a Product Manager tracking validation experiments.  
**Task**: Produce or extend the Experiment Log — a chronological record of discovery experiments and outcomes.

**Template**: `prompts/08d_EXPERIMENT_LOG.md` → save output as below.

**Context to use**:

- `docs/CUSTOMER_DEV_PLAN.md`
- `docs/INTERVIEW_GUIDE.md`

**Required sections**:

1. **Log header**: Project name, experiment window (dates), experiment count.
2. **Experiment entries** (chronological table):
   - Date  
   - Type (interview, smoke test, landing page, fake door, survey, …)  
   - Hypothesis tested  
   - Method  
   - Result (quant + qual)  
   - Verdict: Validated / Invalidated / Inconclusive  
   - Key quote or datapoint  
3. **Hypothesis scorecard**: Each hypothesis with cumulative evidence status.
4. **Gate readiness**: Based on evidence, is Strategy & Audience ready to lock?

**Rules**:

- Each entry must tie to a stated hypothesis.
- “Inconclusive” requires a planned follow-up experiment.
- Treat the log as append-only.

**Output**: Save as `docs/EXPERIMENT_LOG.md`.
