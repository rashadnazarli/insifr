---
description: Deep security review of pending code changes using Anthropic's security analysis methodology
---

# Security Review Workflow

## Steps

1. Adopt the persona of a **Senior Security Engineer** conducting a focused security review.

2. Gather context on pending changes:
   - Run `git status` to see current state
   - Run `git diff --name-only origin/HEAD...` to identify modified files
   - Run `git log --no-decorate origin/HEAD...` to review commits
   - Run `git diff --merge-base origin/HEAD` to get the full diff

3. **Phase 1 — Repository Context Research**:
   - Identify existing security frameworks and libraries in use
   - Look for established secure coding patterns in the codebase
   - Examine existing sanitization and validation patterns
   - Understand the project's security model and threat model
   - Read `@docs/ARCHITECTURE.md` and `@docs/API_SPEC.md` if they exist

4. **Phase 2 — Comparative Analysis**:
   - Compare new code changes against existing security patterns
   - Identify deviations from established secure practices
   - Look for inconsistent security implementations
   - Flag code that introduces new attack surfaces

5. **Phase 3 — Vulnerability Assessment** across these categories:

   **Input Validation:**
   - SQL injection, command injection, XXE, template injection
   - NoSQL injection, path traversal in file operations

   **Authentication & Authorization:**
   - Auth bypass logic, privilege escalation paths
   - Session management flaws, JWT vulnerabilities

   **Crypto & Secrets:**
   - Hardcoded API keys, passwords, or tokens
   - Weak cryptographic algorithms, improper key management

   **Injection & Code Execution:**
   - RCE via deserialization, pickle/YAML injection
   - Eval injection, XSS (reflected, stored, DOM-based)

   **Data Exposure:**
   - Sensitive data logging, PII handling violations
   - API endpoint data leakage, debug info exposure

6. **Phase 3b — AI/LLM Security Assessment** (CONDITIONAL)

   If `docs/AI_ARCHITECTURE.md` exists OR the codebase contains LLM API calls, prompt templates, or AI model integrations, ALSO assess against the **OWASP LLM Top 10**:

   **LLM01 — Prompt Injection:**
   - User input concatenated directly into prompts without sanitization
   - System prompts exposed or overridable via user input
   - Missing input/output boundary enforcement between user content and instructions

   **LLM02 — Insecure Output Handling:**
   - LLM output rendered as HTML without sanitization (XSS via AI)
   - LLM output used in database queries without parameterization
   - LLM output passed to system commands or file operations

   **LLM03 — Training Data Poisoning:**
   - User-submitted data used to fine-tune or update models without validation
   - RAG knowledge bases accepting unvetted external content

   **LLM04 — Model Denial of Service:**
   - No rate limiting on AI endpoints
   - No maximum input length enforcement on prompts
   - No timeout on inference calls

   **LLM05 — Supply Chain Vulnerabilities:**
   - Untrusted or unverified model sources
   - Third-party prompt libraries used without review

   **LLM06 — Sensitive Information Disclosure:**
   - PII passed to external AI APIs without redaction
   - System prompts containing secrets, internal URLs, or business logic leakable via prompt extraction
   - AI responses echoing back sensitive user data from other sessions

   **LLM07 — Insecure Plugin/Tool Design:**
   - AI-called tools/functions with excessive permissions
   - Missing input validation on tool parameters the AI controls
   - AI agents with write access to production data without human approval

   **LLM08 — Excessive Agency:**
   - AI making irreversible decisions without human-in-the-loop checkpoints
   - Missing scope boundaries on AI agent actions
   - AI modifying or deleting data without confirmation

   **LLM09 — Overreliance:**
   - AI output presented as fact without confidence indicators or source attribution
   - Critical business decisions automated without human review gate

   **LLM10 — Model Theft:**
   - Fine-tuned model weights or system prompts accessible via API responses
   - No access controls on model endpoints

7. **Apply False Positive Filtering** — Do NOT report:
   - Denial of Service or resource exhaustion issues (except LLM04 for AI products)
   - Secrets stored on disk (handled by other processes)
   - Rate limiting concerns (except for AI endpoints — LLM04)
   - Lack of input validation without proven security impact
   - Test-only files
   - Log spoofing or non-PII logging
   - Theoretical race conditions
   - Outdated third-party library versions
   - Client-side permission checks (backend is responsible)
   - Environment variables / CLI flags (assumed trusted)
   - Memory safety issues in memory-safe languages

8. **Confidence Scoring** — Only report findings with >80% confidence of actual exploitability:
   - **0.9–1.0**: Certain exploit path identified
   - **0.8–0.9**: Clear vulnerability pattern with known exploitation methods
   - **Below 0.8**: Do not report (too speculative)

9. Produce a structured report. For each finding include:

   ```
   ## Vuln N: [Category]: `file.ext:line`
   - **Severity**: HIGH | MEDIUM
   - **Confidence**: 0.X
   - **Description**: What the vulnerability is
   - **Exploit Scenario**: How an attacker could exploit it
   - **Recommendation**: Specific fix with code example
   ```

   For AI/LLM findings, also include:
   ```
   - **OWASP LLM Reference**: LLM0X
   ```

## Severity Guidelines
- 🔴 **HIGH**: Directly exploitable — RCE, data breach, auth bypass, prompt injection leading to data exfiltration
- 🟡 **MEDIUM**: Requires specific conditions but significant impact
- Do NOT report LOW severity findings

## Rules
- Focus ONLY on security — this is not a code quality or architecture review
- Only flag issues with >80% confidence of real exploitability
- Better to miss theoretical issues than flood with false positives
- Every finding must include specific file, line, and a concrete exploit scenario
- Every finding must include a suggested fix
- Do not review auto-generated, third-party, or test-only code
- Do not comment on existing security concerns — only new changes
- AI/LLM assessment (Phase 3b) only activates when AI components are detected — do not force it on non-AI projects
