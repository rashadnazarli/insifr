---
name: review
version: 1.0.0
description: |
  Pre-landing PR review. Analyzes diff against the base branch for SQL safety, LLM trust
  boundary violations, conditional side effects, and other structural issues.
category: engineering
domain: code-review
---

# Pre-Landing PR Review

Analyze the current branch's diff against the base branch for structural issues that tests don't catch.

## Step 1: Check branch
Run `git branch --show-current`. If on base branch or no diff against `origin/<base>`, output "Nothing to review" and stop.

## Step 2: Get the diff
```bash
git fetch origin <base> --quiet
git diff origin/<base>
```

## Step 3: Critical pass (core review)
Apply CRITICAL categories against the diff:
SQL & Data Safety, Race Conditions & Concurrency, LLM Output Trust Boundary, Shell Injection, Enum & Value Completeness.

**Search-before-recommending:** When recommending a fix pattern (especially for concurrency, caching, auth):
- Verify the pattern is current best practice for the framework version.
- Verify API signatures against current docs.

## Step 4: Fix-First Review
**Every finding gets action — not just critical ones.**

### 4a. Classify each finding
Classify as AUTO-FIX or ASK. Critical findings lean toward ASK; informational findings lean toward AUTO-FIX.

### 4b. Auto-fix all AUTO-FIX items
Apply each fix directly. Output a one-line summary: `[AUTO-FIXED] [file:line] Problem → what you did`

### 4c. Batch-ask about ASK items
Present ASK items in ONE AskUserQuestion:
- List each item with number, severity, problem, recommended fix.
- Provide options: A) Fix as recommended, B) Skip.
- Include an overall RECOMMENDATION.

### 4d. Apply user-approved fixes
Apply fixes where user chose "Fix."

### Verification of claims
- If you claim "this pattern is safe" → cite the specific line.
- If you claim "this is handled elsewhere" → cite the handling code.
- Never say "likely handled" — verify or flag as unknown.
- "This looks fine" is not a finding. Cite evidence or flag as unverified.

## Step 5: TODOS cross-reference
Read `TODOS.md`. Cross-reference diff against open TODOs:
- Does this PR close any open TODOs?
- Does this PR create work that should become a TODO?

## Step 6: Documentation staleness check
Check if code changes affect features described in `.md` files (README, ARCHITECTURE, etc).
If doc was NOT updated but code WAS changed, flag as INFORMATIONAL: "Documentation may be stale."

## Important Rules
- **Read the FULL diff before commenting.**
- **Fix-first, not read-only.** AUTO-FIX items are applied directly. ASK items are only applied after approval. Never commit or push.
- **Be terse.** One line problem, one line fix. No preamble.
- **Only flag real problems.** Skip anything that's fine.
