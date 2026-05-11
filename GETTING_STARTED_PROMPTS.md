# Getting started — copy-paste prompts

Use these in a **new Agent chat** after you open this repo as the workspace in Cursor. Attach files with `@` so the model reads them.

For background, read [TEACH_VIBECODING.md](TEACH_VIBECODING.md) and [CURSOR_AGENT_PLAYBOOK.md](CURSOR_AGENT_PLAYBOOK.md).

---

## 1. Your first prompt (session prime)

Copy everything in the block below (including the `@` lines).

```text
Follow @docs/system/founder-mode-agent-operating-contract.md.

For this session, treat @docs/system/templates/initiative-intake-template.md as the default format for new work.

I am the PM; you are the agent. Do this in order:
1) Briefly restate how you will operate (3 bullets max).
2) Walk me through the intake template: ask only the questions you need to fill it; leave placeholders where I say "TBD".
3) Propose a **small plan** (steps, risks, files you might touch) and **3–5 acceptance criteria** for the first slice only.
4) Do **not** write implementation code until I explicitly approve the plan.

If anything is ambiguous, ask one clarifying question at a time.
```

---

## 2. Approve plan, then one slice of implementation

Use after you are happy with the plan from prompt 1.

```text
Plan approved. Implement **only** the first slice we agreed. After changes:
- Quote paths and main symbols you touched.
- Give exact **verify** steps (commands or manual checks).
List any assumptions you could not verify from the repo.
```

---

## 3. First artifact (project brief) — optional

Pick a folder name for outputs (example: `my-app`). Create `docs/projects/<name>/` if needed.

```text
Read @prompts/00_PROJECT_BRIEF.md. Ask me a short set of elicitation questions, then generate the project brief as @docs/projects/<your-project-name>/PROJECT_BRIEF.md following that prompt's output structure. If upstream docs are missing, note gaps inline instead of inventing facts.
```

---

## 4. When the agent drifts or you are stuck

```text
Stop implementing. Output a numbered list of your **assumptions** about my goals, stack, and constraints. I will mark each true or false; do not continue until I reply.
```

(from [TEACH_VIBECODING.md](TEACH_VIBECODING.md))

---

## 5. Before calling work “done” for a slice

```text
Using @routines/phase-gate.md as a checklist, review what we shipped in this slice. Call out gaps, risks, and the smallest follow-up I should schedule.
```

---

## Where to go next

| Goal | Reference |
|------|-----------|
| Full artifact pipeline | `@routines/new-project.md` |
| Single feature | `@routines/new-feature.md` |
| All prompt templates | [prompts/README.md](prompts/README.md) |
