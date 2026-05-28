# Teach vibecoding (PM-friendly)

**Vibecoding:** you steer with product intent in plain language; the AI handles syntax. Founder Mode adds **light rails** so speed does not turn into chaos.

---

## Core habits

### 1. Outcome before implementation

State:

- User-visible outcome.
- **Done** (3–5 acceptance bullets).
- **Out of scope.**

Use `docs/system/templates/initiative-intake-template.md` until it feels natural.

### 2. Tiny slices

Smallest step that proves progress (one screen, one endpoint, one test). Big vague asks invite mistakes.

### 3. Verify

After non-trivial code: ask where files are; run suggested checks. If something feels off: **pause** and ask for assumptions in bullets.

### 4. One chat, multiple hats

In one agent thread:

- “Act as PM — tighten scope.”
- “Act as implementer — write code.”
- “Act as reviewer — find flaws.”

### 5. Gates

Before calling work “done,” skim `routines/phase-gate.md`.

---

## When the AI frustrates you

> Stop implementing. List your assumptions; I will mark each true/false.

Then continue after alignment.

---

## Artifact depth

- **Lean:** intake → short PRD → one MVP slice → retro.
- **Full:** `routines/new-project.md` for the full artifact chain.

Match depth to risk.

---

## Optional depth

Use `@skills/<name>/SKILL.md` when you need specialist help (review, QA, etc.).

---

## Success

Small shipped increments, clear acceptance checks, and occasional prompt/routine tweaks when something fails twice.
