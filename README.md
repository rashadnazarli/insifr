# insifr

**Founder Mode** starter for learning **product-led AI-assisted coding** (for example Cursor Agent): prompts, routines, optional skill packs, and a short agent **operating contract**.

Public repo: [github.com/rashadnazarli/insifr](https://github.com/rashadnazarli/insifr). Fork or clone, open the folder in Cursor, then use [GETTING_STARTED_PROMPTS.md](GETTING_STARTED_PROMPTS.md) for copy-paste prompts.

---

## Clone size

This repo includes a large optional `skills/` tree. A full clone can be slow.

- **Shallow clone (smaller, faster):**  
  `git clone --depth 1 https://github.com/rashadnazarli/insifr.git`
- You can ignore `skills/` at first; use `@skills/<folder>/SKILL.md` only when you need depth (see [PERSONALIZE.md](PERSONALIZE.md)).

---

## Who this is for

Beginners and PM-led builders who want structure **without** a heavy toolchain.

---

## Read first

| Order | File |
|-------|------|
| 0 | [GETTING_STARTED_PROMPTS.md](GETTING_STARTED_PROMPTS.md) — paste-ready prompts |
| 1 | [TEACH_VIBECODING.md](TEACH_VIBECODING.md) |
| 2 | [CURSOR_AGENT_PLAYBOOK.md](CURSOR_AGENT_PLAYBOOK.md) |
| 3 | [FOUNDER_MODE.md](FOUNDER_MODE.md) (skim lifecycle + gates) |
| 4 | [QUICK_REFERENCE.md](QUICK_REFERENCE.md) |

**Customize naming:** [PERSONALIZE.md](PERSONALIZE.md)

---

## What’s in the repo

| Path | Purpose |
|------|---------|
| `docs/system/` | Operating contract + intake & retro templates |
| `prompts/` | Artifact prompts |
| `routines/` | Workflows (`new-project`, `new-feature`, `phase-gate`, …) |
| `skills/` | Optional depth — `@`-mention a skill when you need it |
| `.cursor/rules/` | Optional Cursor defaults for this starter |

Put generated project docs under `docs/projects/<your-project>/` — see [docs/README.md](docs/README.md).

---

## Minimal workflow (Cursor)

1. New Agent chat → `@docs/system/founder-mode-agent-operating-contract.md` and `@docs/system/templates/initiative-intake-template.md` (or start from [GETTING_STARTED_PROMPTS.md](GETTING_STARTED_PROMPTS.md)).
2. Fill intake; ask for a **small plan** and **acceptance criteria** before code.
3. Ship in **tiny slices**; verify each slice.
4. Use `routines/phase-gate.md` before calling a chunk “done”.

---

## Publish to GitHub

See [GITHUB_DEPLOY.md](GITHUB_DEPLOY.md).

---

## License / attribution

- Repo framework (prompts, routines, docs outside bundled trees): [LICENSE](LICENSE) (MIT).
- Bundled packs under `skills/` and similar: keep each path’s `LICENSE.txt` or license file when redistributing.
