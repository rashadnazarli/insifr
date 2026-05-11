# Cursor Agent playbook — insifr

Get reliable results from Cursor Agent with this repo.

---

## 1. Prime a session

Paste or `@`-reference:

```text
Follow docs/system/founder-mode-agent-operating-contract.md.
For new work, start from docs/system/templates/initiative-intake-template.md.
```

Optional: `@FOUNDER_MODE.md` when choosing how deep the lifecycle should go.

---

## 2. Use `@` on purpose

| Reference | When |
|-----------|------|
| `routines/new-feature.md` | One scoped feature |
| `routines/new-project.md` | Full artifact pipeline |
| `routines/review.md` | Review-only pass |
| `skills/review/SKILL.md`, `skills/qa/SKILL.md` | Deeper review / QA |

Avoid attaching half the repo — narrow context reduces confusion.

---

## 3. Ask for a fixed shape

1. **Plan** — steps, risks, files to touch.  
2. **Changes** — what changed and why.  
3. **Verify** — exact commands or clicks.

Example:

> Plan + acceptance criteria first. No code until I approve. One slice only.

---

## 4. Reduce wrong answers

- “Quote paths and symbols you changed.”
- “What might you have assumed wrong?”
- “What could you not verify from our repo or docs?”

---

## 5. Cursor rules (optional)

This repo ships a minimal default in `.cursor/rules/insifr-starter.mdc` (small slices, no secrets in chat, verify before “done”). Edit or add rules in `.cursor/rules/` for your team, e.g.:

- Run tests before claiming done.
- No new dependencies without asking.
- Match existing style in folder X.

---

## 6. Git

Small commits, clear messages. Branch for experiments.

---

## 7. Secrets

Never paste production keys into chat. Use `.env` (gitignored).
