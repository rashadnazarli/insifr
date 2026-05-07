---
description: Implement the systematic debugging pattern to identify, trace, and fix complex issues without guessing.
---

# Systematic Debugging Workflow

This routine enforces a rigorous, four-phase root cause process. It prevents "shotgun debugging" (guessing and checking) and ensures fixes are atomic, verified, and correctly understood.

## Prerequisites
- A reported bug, error trace, or Sentry issue.
- Access to the codebase and running local environment.

## Step 0: Start from Sentry (Always)

Before touching code, pull the Sentry context. Use `/sentry-triage` for full workflow.

1. **Pull the issue:** Get `title`, `culprit`, `count`, `userCount`, `firstSeen`, `lastSeen`.
2. **Get the stack trace:** Fetch the latest event with full stack + breadcrumbs.
3. **Map frames to local source:** For each `inApp` frame, open the local file at `lineno ± 20 lines`.
4. **Check breadcrumbs:** The last 5 breadcrumbs before the error reveal the user action that triggered it.
5. **Check suspect commits:** Correlate `firstSeen` with recent deploys.

> If no Sentry issue exists for this bug (e.g., user-reported visual bug), skip to Phase 1.

## The 4-Phase Root Cause Process

### Phase 1: Isolate (Narrow the Scope)
1. **Define the Failure:** What is the exact error message or unexpected behavior?
2. **Boundary Identification:** Which component, service, or layer is failing? (e.g., Is it the frontend UI state, the API payload, or the database query?)
3. **Minimize Noise:** Strip away unrelated components. Can you reproduce the issue in isolation (e.g., using a raw `curl` command instead of the frontend)?

### Phase 2: Reproduce (Trigger Reliably)
1. **Identify Triggers:** What specific inputs, state conditions, or environmental factors cause the bug?
2. **Create the Reproduction Case:** Write a failing test, a specific script, or document the exact manual steps to trigger the bug 100% of the time.
3. **Verification:** Do not proceed to Trace until you can reliably reproduce the failure on demand.

### Phase 3: Trace (Follow the Data Flow)
1. **Work Backwards:** Start from the exact point of failure (e.g., the line throwing the exception) and trace the data flow backward.
2. **Inspect State:** Use debuggers, `console.log`, or Sentry traces to inspect the state at each step of the flow.
3. **Find the Divergence:** Identify the exact point where the system's actual state diverges from its expected state.
4. **Formulate Hypothesis:** Write down *why* the divergence occurred.

### Phase 4: Fix (Atomic Fix and Verify)
1. **Apply the Fix:** Write the minimal code necessary to resolve the root cause. Do not refactor unrelated code.
2. **Verification-Before-Completion:** 
   - Run the reproduction case from Phase 2. It must now pass/succeed.
   - Run the broader test suite to ensure no regressions.
   - Confirm the fix in context (e.g., visually in the browser, or via the API).
3. **Commit:** Create an atomic commit for this specific fix.

## Quality Gate (Debugging)
- [ ] Has the exact root cause been identified and documented, rather than just treating a symptom?
- [ ] Is the fix atomic and targeted?
- [ ] Has the verification case successfully passed after the fix was applied?
