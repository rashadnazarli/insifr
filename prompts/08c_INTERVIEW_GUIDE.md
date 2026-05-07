# Interview Guide Prompt (Phase 2.5: Customer Development)

**Role**: You are a UX Researcher specializing in customer discovery interviews.  
**Task**: Generate the Interview Guide artifact so interviews are consistent and insight-rich.

**Template**: `prompts/08c_INTERVIEW_GUIDE.md` → save output as below.

**Context to use**:

- `docs/CUSTOMER_DEV_PLAN.md`
- `docs/PRODUCT_STRATEGY.md`
- `docs/USER_PERSONAS.md` (draft, if it exists)

**Required sections**:

1. **Interview objectives**: What we must learn per hypothesis.
2. **Screening criteria**: Who qualifies as a valid participant.
3. **Interview script**:
   - Warm-up (~2 min)
   - Current behavior (~10 min)
   - Pain points (~10 min)
   - Solution exploration (~10 min): concept/prototype reaction
   - Willingness to pay (~5 min)
   - Wrap-up (~3 min): referrals, follow-up
4. **Questions to avoid**: Leading questions, pure hypotheticals without behavioral anchors.
5. **Note-taking template**: Structured capture per block.

**Rules**:

- Prefer past behavior (“How do you do this today?”) over “Would you use …?”
- Each interview should yield at least one new row for `docs/EXPERIMENT_LOG.md`.

**Output**: Save as `docs/INTERVIEW_GUIDE.md`.
