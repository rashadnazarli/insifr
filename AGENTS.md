# Agent rules — insifr

Standing instructions for any AI coding agent working in this repo. `AGENTS.md` is the cross-tool convention; many agents load it automatically. (Cursor users also have the same rules in `.cursor/rules/insifr-starter.mdc`; Claude Code users can copy these into `CLAUDE.md`.)

New to the repo? Read [`START_HERE.md`](START_HERE.md) first.

## Default habits

- **Outcomes first:** Use `docs/system/templates/initiative-intake-template.md` for new initiatives when the user hasn't supplied another template.
- **Small slices:** One vertical slice per approval cycle unless the user explicitly asks for more scope.
- **Plan before code:** Propose a short plan + 3–5 acceptance criteria and wait for approval before implementing.
- **Surface assumptions:** When anything is ambiguous, list your assumptions and ask — don't guess and build.
- **No secrets:** Never ask the user to paste API keys, tokens, or production credentials into chat. Prefer env vars and a local `.env` (gitignored).
- **Verify before "done":** After non-trivial edits, state how to verify (commands or manual steps). If you can't run checks, say what the user should run.
- **Escalate scope:** If a request expands scope or conflicts with prior agreement, stop and ask instead of silently absorbing it.
