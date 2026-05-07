---
description: Generate and run tests with self-healing for failures
---

# Test Workflow

## Steps

1. Analyze the recent code changes to determine test scope.

2. Generate comprehensive tests covering:
   - **Unit tests** for all business logic functions
   - **Integration tests** for API endpoint interactions
   - **E2E tests** for critical user flows (if applicable)

3. Run all tests in the sandboxed terminal.

4. If tests fail:
   - Analyze the failure output
   - Determine if the failure is in the test or in the code
   - If the code is wrong: fix the code and re-run
   - If the test is wrong: fix the test and re-run
   - Repeat until all tests pass (max 3 self-heal cycles)

5. Report results:
   - Total tests run
   - Tests passed / failed
   - Any self-healing fixes applied
   - Coverage summary if available

6. **Record results in progress file**: If `feature-progress.json` exists and a testing step is tracked, update it:
   ```json
   { "name": "Run tests", "status": "done", "testsPassed": 12, "testsFailed": 0 }
   ```
   Then git checkpoint: `git add -A && git commit -m "test: <scope> — all passing"`

7. **Append to session notes**: Write test outcomes to `claude-progress.txt`:
   ```
   TESTS <ISO timestamp>
   Scope: <what was tested>
   Results: <X passed, Y failed>
   Self-healed: <any fixes applied>
   ```

## Rules
- Tests must not depend on external services — mock all API calls
- Use descriptive test names that explain what is being tested
- Group tests by feature/module
- Never mark tests as "skipped" to make the suite pass
