# Start here

New to insifr? Read **this one page**. Ignore everything else until you've shipped something.

insifr looks big — ~50 prompts, dozens of skill packs, an 8-phase lifecycle. **You do not need any of that to start.** Most of the repo is optional depth you pull in *later*, only when a real problem calls for it. This page is the whole on-ramp.

> The one idea worth keeping: **decide what "done" looks like before you build, build the smallest slice, then verify it.** Everything else is optional scaffolding around that habit.

---

## Before anything: is insifr even right for this?

Be honest about what you're doing. **Skip insifr entirely** if you're:

- writing a throwaway prototype or a one-file script,
- just learning to code and want to experiment freely,
- doing a quick spike to see if something is technically possible.

In those cases the structure here is overhead, not help. Open your editor and go.

**Use insifr when** you're building something you intend to keep, ship to real users, or hand to someone else — and you want the AI to stay aimed at *your* goal instead of wandering.

---

## The 3 files that matter

You can run the entire core method with just these:

| File | What it's for |
|------|---------------|
| `docs/system/founder-mode-agent-operating-contract.md` | The rules of engagement between you and the AI. The single best file in this repo. |
| `docs/system/templates/initiative-intake-template.md` | A short form to define one piece of work before building it. |
| `routines/phase-gate.md` | A checklist to run before you call anything "done." |

That's it. The other ~125 files are *optional depth* — reach for them only when you hit a wall this page doesn't cover.

---

## Your first 30 minutes

This works in **any AI coding agent** — Claude Code, Cursor, Windsurf, Cline, Aider, and others. Open this repo as your workspace and start a fresh agent chat. Wherever this guide writes `@file`, use whatever your tool uses to attach a file (a path, `@path`, or a file picker).

### Step 1 — Set the rules (2 min)

Paste this into a new agent chat:

```text
Follow @docs/system/founder-mode-agent-operating-contract.md for this session.

I'm the product owner; you're the agent. Before writing any code:
1. In 3 bullets, tell me how you'll operate.
2. Ask me only the questions you need to understand what I want to build.
3. Propose a small plan (steps, risks, files you'd touch) plus
   3–5 acceptance criteria for the FIRST slice only.

Do not write implementation code until I say "approved".
Ask one clarifying question at a time if anything is unclear.
```

The agent should now ask you questions instead of guessing. That single behavior change is most of the value.

### Step 2 — Approve and build ONE slice (15–20 min)

When the plan looks right:

```text
Approved. Implement only the first slice we agreed on. After the changes:
- List the file paths and main functions/components you touched.
- Give me exact steps to verify it works (commands to run or things to click).
- List any assumptions you couldn't confirm from the code.
```

A "slice" is the smallest thing that proves progress — one screen, one endpoint, one working button. Not the whole feature.

### Step 3 — Verify before moving on (5 min)

Actually run the verify steps. Then, before starting the next slice:

```text
Using @routines/phase-gate.md as a checklist, review what we just shipped.
Call out gaps, risks, and the smallest sensible next slice.
```

Then loop: plan → one slice → verify → repeat.

---

## When the agent goes sideways

Every AI agent eventually runs off in the wrong direction. The fix is always the same — **stop it and surface its assumptions:**

```text
Stop implementing. List your assumptions about my goals, my stack, and the
constraints, as a numbered list. I'll mark each true or false. Don't continue
until I reply.
```

Catching a wrong assumption now is far cheaper than unwinding an hour of work built on it.

---

## When you're ready for more

Only when a project actually needs it:

| You want to… | Go to |
|--------------|-------|
| Understand the full method and where it can go deep | [`FOUNDER_MODE.md`](FOUNDER_MODE.md) |
| More copy-paste prompts | [`GETTING_STARTED_PROMPTS.md`](GETTING_STARTED_PROMPTS.md) |
| Tool-agnostic tips for driving any agent | [`AGENT_PLAYBOOK.md`](AGENT_PLAYBOOK.md) |
| Generate a specific document (PRD, architecture, …) | [`prompts/README.md`](prompts/README.md) |
| Run a full multi-document pipeline | [`routines/new-project.md`](routines/new-project.md) |
| Pull in a specialist (review, QA, design, …) | `@skills/<name>/SKILL.md` |

**Rule of thumb:** add a document or a skill only when you feel the lack of it. Generating artifacts nobody asked for is just paperwork — it isn't progress.
