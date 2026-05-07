---
name: security-review
description: Runs a deep security audit of pending changes against OWASP Top 10 and project rules.
---

# Security Review Skill

When executed, you will act as an expert security auditor evaluating recent or pending codebase changes.

## Execution Steps:
1. Identify all code changes that have been made since the last approved state (e.g., using `git diff`).
2. Analyze the modified code against the project's security constraints (derived from `global.md`).
3. Pay strict attention to:
   - Hardcoded secrets or credentials.
   - Missing input sanitization or output encoding.
   - Destructive operations (e.g., recursive deletes, untested DB migrations) lacking user approval hooks.
   - Usage of known insecure APIs.
4. If High or Critical vulnerabilities are found:
   - Immediately halt the deployment or code commit process.
   - Generate a remediation plan and assign it back to the Engineer Agent.
5. Otherwise, formally approve the code for the security phase.
