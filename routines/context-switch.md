---
description: Save the current project state and switch context to a different active project.
---

# /context-switch — Switch Active Project

Use this when you want to move from one project to another mid-session. This saves your current project's state, then loads the target project's context.

## Trigger Phrases

- "Switch to [project name]"
- "Let's work on [project name] instead"
- "Load [project name]"
- "Context switch to [project]"

## Steps

### 1. Save Current State

If a project is currently active:

1. Check if `feature-progress.json` exists — if `status: in_progress`, log a warning:
   > "⚠️ Feature [name] is still in progress. Switch anyway? Any unsaved context will need to be reloaded."
   
2. Append to `claude-progress.txt` in the current project root:
   ```
   NOTE [timestamp] | Context switch out. Next: [target project name]
   ```

### 2. Identify Target Project

The target project is identified by its folder name under `Insifr/projects/`:

```
Insifr/
  projects/
    pocket-cfo/        ← "switch to pocket-cfo"
    [future-project]/  ← "switch to [future-project]"
```

If the project doesn't exist yet, ask:
> "That project doesn't exist yet. Do you want to start a new project with `/new-project`?"

### 3. Load Target Project Context

Navigate to the target project directory and load:

1. **`docs/PROJECT_BRIEF.md`** → Announce project name, mode, tier, AI flag
2. **Latest artifact in `docs/`** → Report current phase
3. **`claude-progress.txt`** → Read last 5 entries for context
4. **`feature-progress.json`** if exists → Report in-progress feature

### 4. Announce Readiness

```
✅ Switched to: [Project Name]
   Location: Insifr/projects/[project-folder]/
   Phase: [current phase]
   Artifacts completed: [count] / [total for mode]
   Last session note: [last line from claude-progress.txt]
   In-progress feature: [name] or None
```

Append to `claude-progress.txt` in the new project:
```
SESSION [timestamp] | Context switched in from [previous project or "fresh session"]
```

## Parallel-Project Isolation Rules

When multiple projects are live simultaneously (e.g., Avena + Celentano), the following boundaries apply:

### Shared Artifacts (OS-level, not project-scoped)
These artifacts are shared across all projects and live in the `founder-mode/` root:
- `FOUNDER_MODE.md` — the methodology itself
- `routines/` — execution routines (shared behavior)
- `skills/` — agent skill definitions (shared capabilities)
- `prompts/` — artifact prompt templates (shared templates)
- `Backlog.md` — master cross-project task log

### Project-Scoped Artifacts (isolated per project)
These artifacts are unique to each project and live in the project's `docs/` directory:
- All 43 core artifacts (PRD, Architecture, Roadmap, etc.)
- `feature-progress.json` — per-project feature state
- `claude-progress.txt` — per-project session log
- Legal documents (`docs/legal/`)
- Analytics reports

### Isolation Rules
1. **Never cross-contaminate**: Do not reference Project A's `ARCHITECTURE.md` when working on Project B unless explicitly instructed.
2. **Shared learnings are OS-level**: If a debugging insight from Celentano should apply everywhere, update `routines/debug.md`, not Celentano's local docs.
3. **Git worktrees for parallel code work**: If working on code for both projects simultaneously, use separate git worktrees (see `routines/parallel-sprints.md`).
4. **Episodic memory is project-scoped**: Each project has its own SQLite memory DB at `~/.gemini/antigravity/memory/<project_id>.db`.

## Rules
- Never lose in-progress feature context without warning the founder
- Always announce which project is now active after switching
- If no previous project was active, skip step 1 entirely
- Context switch does NOT start any work — wait for the founder's next instruction
