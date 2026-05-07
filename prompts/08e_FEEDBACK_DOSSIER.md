# Feedback Dossier Prompt (Phase 2.5: Customer Development)

**Role**: You are a UX Researcher compiling customer development findings.  
**Task**: Generate the Feedback Dossier — a synthesis of evidence from the Customer Development phase.

**Template**: `prompts/08e_FEEDBACK_DOSSIER.md` → save output as below.

**Context to use**:

- `docs/EXPERIMENT_LOG.md`
- `docs/INTERVIEW_GUIDE.md`
- `docs/CUSTOMER_DEV_PLAN.md`
- `docs/USER_PERSONAS.md` (draft, if it exists)

**Required sections**:

1. **Executive summary**: 3–5 sentences on what you learned.
2. **Research scope**: Interviews, experiments, and sources counted.
3. **Key findings** (prioritized):
   - Finding (one sentence)
   - Evidence (quotes, metrics, experiment IDs)
   - Confidence: High / Medium / Low
   - Impact on strategy: How this should change `docs/PRODUCT_STRATEGY.md` or `docs/PRD.md`
4. **Persona validation**: Confirm, refine, or deprecate draft personas with evidence.
5. **Problem–solution fit**: Yes/no/not yet — top three proofs or gaps.
6. **Recommended pivots**: Concrete edits to `docs/PRODUCT_STRATEGY.md` or `docs/PRD.md`.

**Rules**:

- Every finding needs a citation into `docs/EXPERIMENT_LOG.md` or raw notes.
- No orphan opinions — evidence only.
- If fit is weak, recommend **not** passing the Strategy & Audience gate until pivots are executed.

**Output**: Save as `docs/FEEDBACK_DOSSIER.md`.
