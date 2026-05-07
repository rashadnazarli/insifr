---
description: Apply Founder Mode templates (prompts, routines, docs) to the current project workspace
---

# Apply Founder Mode

Copy **prompts**, **routines**, and methodology files from this repo into another project so `/new-feature`, `/new-project`, and related workflows work there.

> **Note:** This workflow does **not** depend on a legacy `scaffold/` folder. Use the **`founder-mode` repo root** (or your **`insifr-founder-mode`** checkout) as the source.

## Source directory

Set `FOUNDER_MODE_SRC` to the absolute path of the Founder Mode repository that contains `prompts/` and `routines/`:

```bash
export FOUNDER_MODE_SRC="/path/to/founder-mode"
```

## Copy into an empty or existing project (`PROJECT_ROOT`)

**macOS / Linux** — merge without overwriting existing files by default (`-n`); inspect then re-run without `-n` only where intended:

```bash
export PROJECT_ROOT="/path/to/your-app"
mkdir -p "$PROJECT_ROOT/prompts" "$PROJECT_ROOT/routines" "$PROJECT_ROOT/docs"

cp -n "$FOUNDER_MODE_SRC/prompts/"*.md "$PROJECT_ROOT/prompts/" 2>/dev/null || true
cp -Rn "$FOUNDER_MODE_SRC/schemas" "$PROJECT_ROOT/" 2>/dev/null || true
cp -n "$FOUNDER_MODE_SRC/routines/"*.md "$PROJECT_ROOT/routines/" 2>/dev/null || true
cp -n "$FOUNDER_MODE_SRC/FOUNDER_MODE.md" "$PROJECT_ROOT/" 2>/dev/null || true
```

If your target repo already has **`docs/system/`** operating templates, keep them; otherwise copy from a checkout that includes them (for example the full `founder-mode` repo):

```bash
mkdir -p "$PROJECT_ROOT/docs/system/templates"
cp -n "$FOUNDER_MODE_SRC/docs/system/"*.md "$PROJECT_ROOT/docs/system/" 2>/dev/null || true
cp -n "$FOUNDER_MODE_SRC/docs/system/templates/"*.md "$PROJECT_ROOT/docs/system/templates/" 2>/dev/null || true
```

**Windows (PowerShell)** — adjust paths:

```powershell
$FOUNDER_MODE_SRC = "C:\path\to\founder-mode"
$PROJECT_ROOT = "C:\path\to\your-app"
Copy-Item "$FOUNDER_MODE_SRC\prompts\*.md" "$PROJECT_ROOT\prompts\" -ErrorAction SilentlyContinue
Copy-Item "$FOUNDER_MODE_SRC\routines\*.md" "$PROJECT_ROOT\routines\" -ErrorAction SilentlyContinue
Copy-Item "$FOUNDER_MODE_SRC\FOUNDER_MODE.md" "$PROJECT_ROOT\" -ErrorAction SilentlyContinue
```

## After copying

1. Confirm which folders were created or updated (`prompts/`, `routines/`, `docs/`, `schemas/`).
2. Ask the user:
   > "Founder Mode files are in place. Run the full **`routines/retrofit.md`** workflow to scan the codebase and extract docs, or start manually with **`routines/new-feature.md`**, **`routines/review.md`**, **`routines/test.md`**, etc.?"

3. If they choose retrofit, open **`routines/retrofit.md`** in this repo (or the copied copy under `PROJECT_ROOT/routines/`) and follow it.

4. If they start manually, list common workflows:
   - `new-feature.md` — scoped implementation
   - `new-project.md` — artifact pipeline
   - `review.md` — architecture / security review
   - `test.md` — tests
   - `ui-check.md` — UI verification
   - `doc.md` — documentation
   - `phase-gate.md` — quality gate
   - `revise.md` — artifact revision + cascade
   - `retrofit.md` — codebase → docs extraction

## Session anchors (optional)

If **`docs/system/`** exists in the project, load these at the start of deep work sessions:

- `docs/system/founder-mode-agent-operating-contract.md`
- `docs/system/templates/initiative-intake-template.md`
- `docs/system/templates/post-initiative-learning-loop.md`

Treat them as defaults for planning, execution, and retrospectives.
