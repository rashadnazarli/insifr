---
description: Initialize or resume a working session for the active project. Creates session state file and loads recent context.
---

# /session — Session Initialization

Run this at the start of any working session, or when switching to a new task within a project. It ensures cross-routine continuity by maintaining a `claude-progress.txt` file in the project root.

## Steps

### 1. Detect Active Project

Check for any of these signals to identify the active project:
- `docs/PROJECT_BRIEF.md` exists → read `project_name` from it
- `docs/IDEA.md` exists → read the project name from the title
- `feature-progress.json` exists → read `featureId` and `status`
- Ask the founder: "Which project are we working on today?"

### 2. Initialize Session State File

Check if `claude-progress.txt` exists in the project root:
- **If it doesn't exist**, create it with this header:
  ```
  # Session Log — [Project Name]
  # Format: [ACTION] [ISO timestamp] | [Summary]
  # ---
  SESSION [timestamp] | Project initialized. Starting fresh session.
  ```
- **If it exists**, read the last 10 lines to load recent context. Announce:
  > "Resuming [Project Name]. Last action: [last entry from log]"

### 3. Load Project Artifacts

Automatically read these if they exist in `docs/`:
- `PROJECT_BRIEF.md` — project mode, tier, AI flag
- `IDEA.md` — what we're building
- `PRD.md` — what features are defined

Report which artifacts exist and which phase the project is currently in based on what's present in `docs/`.

### 4. Check For In-Progress Feature

If `feature-progress.json` exists and has `status: "in_progress"`:
- Read the feature name and last completed step
- Announce:
  > "⚠️ Feature [name] is in-progress at step [N]. Resume? (yes/no)"
- If yes: hand off to `/new-feature` and skip to the last incomplete step.

### 5. Announce Readiness

End with a clear status report:

```
✅ Session ready for [Project Name]
   Phase: [current phase based on docs/]
   Artifacts completed: [count] of [total for this mode]
   In-progress feature: [name] or None
   Last session: [date of last claude-progress.txt entry]
```

## Session Log Format

All routines that append to `claude-progress.txt` use this format:
```
[ACTION] [ISO timestamp] | [One-line summary]
```

Where `ACTION` is one of:
- `SESSION` — session start/resume
- `ARTIFACT` — artifact generated
- `REVIEW` — code review completed
- `GATE` — phase gate passed
- `GATE_OVERRIDE` — phase gate skipped (with reason)
- `DEPLOY` — deployment completed
- `FEATURE` — feature implementation completed
- `NOTE` — free-form note

## Rules
- Always run this before starting work if you haven't already in this session
- Never delete `claude-progress.txt` — it accumulates across sessions
- Keep entries to one line each — brevity is the goal
- If the founder asks "what did we do last time?" — read and summarize `claude-progress.txt`
