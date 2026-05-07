---
description: Submit product feedback or bug reports from inside the IDE
---

# /feedback — Feedback & Bug Reports

Capture feedback from beta users directly inside the IDE and write it to a structured log.

## Steps

1. Ask the user for:
   - **Type**: Bug Report 🐛 / Feature Request 💡 / General Feedback 📝
   - **Summary**: One sentence describing the issue or idea
   - **Details**: Full description, steps to reproduce (for bugs), expected behavior
   - **Priority**: Low / Medium / High / Critical
   - **Screenshot**: If applicable

2. Read the project's `.founder-mode/config.json` to get the project name and version.

3. Generate a structured feedback entry:

```markdown
## [TYPE] Summary

**Date:** YYYY-MM-DD HH:MM
**Project:** {project_name}
**Version:** {version}
**Priority:** {priority}

### Description
{details}

### Steps to Reproduce (Bugs)
1. ...
2. ...
3. ...

### Expected vs Actual
- **Expected:** ...
- **Actual:** ...

### Environment
- OS: {detected}
- IDE: {detected}
- Node: {detected}
```

4. Append the entry to `docs/FEEDBACK_LOG.md`. Create the file if it doesn't exist.

5. If the feedback type is a **Bug Report** with **Critical** priority:
   - Also create a GitHub Issue draft in `.github/issues/` (if the directory exists)
   - Tag it with `bug`, `critical`

6. Confirm to the user:
   ```
   ✅ Feedback logged to docs/FEEDBACK_LOG.md
   Type: {type} | Priority: {priority}
   ```
