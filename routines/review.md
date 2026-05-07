---
description: Architecture and security audit of recent code changes
---

# Code Review Workflow

## Steps

1. Adopt the persona of a **Senior Security and Architecture Lead**.

2. **Load session context**: If `feature-progress.json` exists, read it to understand what features are in-progress or recently completed. If `claude-progress.txt` exists, read the latest entries for context on recent decisions and changes.

3. Analyze all recent code changes (diffs, new files, modified files).

4. Audit for **Security Vulnerabilities**:
   - Check against OWASP Top 10
   - Verify input sanitization on all user-facing inputs
   - Ensure no credentials, API keys, or secrets in code
   - Verify authentication/authorization is enforced on protected routes
   - Check for XSS, CSRF, injection vulnerabilities

5. Audit for **Architecture Compliance**:
   - Verify code follows the structure defined in `@docs/ARCHITECTURE.md`
   - Check separation of concerns (UI / logic / data)
   - Ensure new endpoints follow `@docs/API_SPEC.md`
   - Verify database operations follow `@docs/DATABASE_SCHEMA.md`

6. Audit for **Quality Smell Check (Anti-Slop)**:

   > Adapted from huashu-design's anti-AI-slop checklist. Every element must earn its place — an honest placeholder beats fabricated depth.

   Check all artifacts and code for these AI slop patterns:

   | Slop Pattern | What It Looks Like | Fix |
   |---|---|---|
   | **Fabricated evidence** | Made-up user quotes in PERSONAS, invented competitors in MARKET, fictional case studies | Run `routines/fact-check.md` or mark as `UNVERIFIED ASSUMPTION` |
   | **Filler metrics** | "10x improvement", "$4.2B TAM" with no source | Remove unsourced claims or cite a verified source |
   | **Template language** | Generic boilerplate left unmodified from prompt templates | Customize every section to the specific project |
   | **Padding artifacts** | Obvious/generic content added to make an artifact look complete | Remove padding. Honest gaps > fake depth |
   | **Cargo-cult structure** | Sections copied from templates that don't apply to this project | Delete irrelevant sections rather than filling them with filler |
   | **Invented integrations** | Listing features or integrations that don't exist or weren't requested | Verify against PRD scope |
   | **Confident uncertainty** | Stating assumptions as facts without flagging them | Prefix with `ASSUMPTION:` or verify first |

   **Fact-check cross-reference**: For any factual claims in artifacts (market data, competitor features, technology capabilities), verify that they have been run through `routines/fact-check.md` and recorded in `docs/VERIFIED_FACTS.md`.

   **The principle**: One thousand no's for every yes. Every paragraph, every metric, every claim must earn its place. If removing it wouldn't hurt the artifact, it shouldn't be there.

7. Audit for **Code Quality**:
   - Check algorithmic efficiency (Big-O analysis for critical paths)
   - Enforce DRY principle — flag duplicated logic
   - Verify error handling on all async operations
   - Check for memory leaks or resource cleanup issues
   - Verify adherence to `routines/antigravity.md` operational rules (separation of intent vs. execution, self-annealing loop)

7. Produce a structured review report:
   - 🔴 **Critical** — must fix before deploy
   - 🟡 **Warning** — should fix soon
   - 🟢 **Suggestion** — nice to have improvement

8. **Log review in session notes**: Append to `claude-progress.txt`:
   ```
   REVIEW <ISO timestamp>
   Scope: <what was reviewed>
   Findings: <X critical, Y warnings, Z suggestions>
   Key issues: <1-line summary of critical findings>
   ```

   If no `claude-progress.txt` exists, create it at the project root.

## Rules
- Be ruthlessly honest — do not soften findings
- Every finding must include the specific file and line
- Every finding must include a suggested fix
- Do not review auto-generated or third-party code
- **Verification-Before-Completion**: Do not approve or mark a review as complete unless the changes have been verified to pass tests and function in context. If a fix is proposed, it must be verified before the review loop is closed.
