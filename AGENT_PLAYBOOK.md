# AI agent playbook — insifr

Get reliable results from any AI coding agent with this repo. The workflow below is **tool-agnostic** — it works in Claude Code, Cursor, Windsurf, Cline, Aider, Copilot Chat, or any IDE/CLI with an agent that can read your files.

> The only tool-specific detail is *how you point the agent at a file*. Wherever this guide says `@file`, use whatever your tool uses (see the table in §2).

---

## 1. Prime a session

At the start of a new agent chat, point it at the contract and intake template:

```text
Follow docs/system/founder-mode-agent-operating-contract.md.
For new work, start from docs/system/templates/initiative-intake-template.md.
```

Optional: add `FOUNDER_MODE.md` when choosing how deep the lifecycle should go.

---

## 2. Reference files on purpose

Most agents let you attach a file as context. The mechanism differs by tool:

| Tool | How to reference a file |
|------|-------------------------|
| Claude Code | type the path, or `@path` |
| Cursor | `@path` |
| Windsurf / Cline | `@path` or the file picker |
| Aider | `/add path` |
| Generic / chat | paste the path; let the agent open it |

Attach **only what's relevant** — narrow context reduces confusion. Useful pointers:

| Reference | When |
|-----------|------|
| `routines/new-feature.md` | One scoped feature |
| `routines/new-project.md` | Full artifact pipeline |
| `routines/review.md` | Review-only pass |
| `skills/review/SKILL.md`, `skills/qa/SKILL.md` | Deeper review / QA |

Avoid attaching half the repo at once.

---

## 3. Ask for a fixed shape

1. **Plan** — steps, risks, files to touch.
2. **Changes** — what changed and why.
3. **Verify** — exact commands or clicks.

Example:

> Plan + acceptance criteria first. No code until I approve. One slice only.

---

## 4. Reduce wrong answers

- "Quote paths and symbols you changed."
- "What might you have assumed wrong?"
- "What could you not verify from our repo or docs?"

---

## 5. Project rules (optional)

Most agents support a "rules" or "memory" file that's loaded automatically. Put your standing instructions there — small slices, no secrets in chat, verify before "done" — so you don't repeat them every session. The file location depends on your tool:

| Tool | Rules / memory file |
|------|---------------------|
| Claude Code | `CLAUDE.md` |
| Cursor | `.cursor/rules/*.mdc` or `.cursorrules` |
| Windsurf | `.windsurfrules` |
| Generic convention | `AGENTS.md` |

This repo ships a minimal Cursor default in `.cursor/rules/insifr-starter.mdc` as an example; copy its content into your tool's rules file. Example rules to add for your team:

- Run tests before claiming done.
- No new dependencies without asking.
- Match existing style in folder X.

---

## 6. Git

Small commits, clear messages. Branch for experiments.

---

## 7. Secrets

Never paste production keys into chat. Use `.env` (gitignored).
