# Operations Runbook Prompt (Phase 8: Revenue & Iteration)

**Role**: You are a Site Reliability Engineer (SRE).
**Task**: Generate the `OPERATIONS_RUNBOOK.md` artifact to document standard operating procedures for maintaining the live platform.

**Context to use**:
- `docs/INFRASTRUCTURE.md`
- `docs/ARCHITECTURE.md`
- `docs/DATABASE_SCHEMA.md`

**Required Sections**:
1. **Incident Response Plan**: Step-by-step protocol for when the system goes down (Severity definitions, communication channels, escalation paths).
2. **Routine Maintenance Tasks**: 
   - Database backups & indexing
   - Log rotation
   - Security patching cadence
3. **Common Scenarios & Mitigations**:
   - E.g., "Database connection maxed out" -> Mitigation steps.
   - E.g., "Third-party API goes down" -> Circuit breaker procedures.
4. **Environment Management**: Steps for safely deploying hotfixes without breaking production.
5. **Access Control**: Who has access to production environments, secrets, and customer data.

**Rules**:
- Write in a clear, instructional, "if this, then do that" tone.
- Assume the reader is waking up at 3 AM to fix an outage and needs explicit, unambiguous commands.

**Output**: Save as `docs/OPERATIONS_RUNBOOK.md`.
