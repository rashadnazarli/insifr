---
name: deepen-architecture
version: 1.0.0
description: |
  Find deepening opportunities in a codebase — refactors that turn shallow 
  modules into deep ones. Informed by domain language and architectural 
  decisions. Use when the user wants to improve architecture, find refactoring 
  opportunities, consolidate tightly-coupled modules, or make a codebase more 
  testable and navigable.
category: engineering
domain: architecture
attribution: Adapted from mattpocock/skills improve-codebase-architecture (MIT)
---

# /deepen-architecture: Find Deepening Opportunities

Surface architectural friction and propose **deepening opportunities** — refactors that turn shallow modules into deep ones. The aim is testability and AI-navigability.

## Vocabulary

Use these terms exactly in every suggestion. Consistent language is the point — don't drift into "component," "service," "API," or "boundary." Full definitions in [LANGUAGE.md](references/LANGUAGE.md).

- **Module** — anything with an interface and an implementation (function, class, package, slice).
- **Interface** — everything a caller must know to use the module: types, invariants, error modes, ordering, config. Not just the type signature.
- **Implementation** — the code inside.
- **Depth** — leverage at the interface: a lot of behaviour behind a small interface. **Deep** = high leverage. **Shallow** = interface nearly as complex as the implementation.
- **Seam** — where an interface lives; a place behaviour can be altered without editing in place.
- **Adapter** — a concrete thing satisfying an interface at a seam.
- **Leverage** — what callers get from depth.
- **Locality** — what maintainers get from depth: change, bugs, knowledge concentrated in one place.

## Key Principles

- **Deletion test**: imagine deleting the module. If complexity vanishes, it was a pass-through. If complexity reappears across N callers, it was earning its keep.
- **The interface is the test surface.** Callers and tests cross the same seam.
- **One adapter = hypothetical seam. Two adapters = real seam.** Don't introduce a seam unless something actually varies across it.

## Workflow

### 1. Explore

Read existing documentation first:

- `CONTEXT.md` or project README
- Relevant ADRs in `docs/adr/`
- `ARCHITECTURE.md` or `INFRASTRUCTURE.md` if they exist

If any of these files don't exist, proceed silently — don't flag their absence or suggest creating them upfront.

Then walk the codebase organically and note where you experience friction:

- Where does understanding one concept require bouncing between many small modules?
- Where are modules **shallow** — interface nearly as complex as the implementation?
- Where have pure functions been extracted just for testability, but the real bugs hide in how they're called (no **locality**)?
- Where do tightly-coupled modules leak across their seams?
- Which parts of the codebase are untested, or hard to test through their current interface?

Apply the **deletion test** to anything you suspect is shallow: would deleting it concentrate complexity, or just move it?

### 2. Present Candidates

Present a numbered list of deepening opportunities. For each candidate:

- **Files** — which files/modules are involved
- **Problem** — why the current architecture is causing friction
- **Solution** — plain English description of what would change
- **Benefits** — explained in terms of locality and leverage, and how tests would improve

Do NOT propose interfaces yet. Ask the user: "Which of these would you like to explore?"

### 3. Grilling Loop

Once the user picks a candidate, drop into a grilling conversation. Walk the design tree with them — constraints, dependencies, the shape of the deepened module, what sits behind the seam, what tests survive.

Side effects happen inline as decisions crystallize:

- **Naming a deepened module after a new concept?** Document it in the project's domain vocabulary.
- **User rejects the candidate with a load-bearing reason?** Offer to record an ADR so future architecture reviews don't re-suggest it. Only offer when the reason would actually be needed by a future explorer.
- **Sharpening a fuzzy term?** Update documentation right there.

### 4. Execute

After decisions are made:

1. Create the implementation plan with 2–5 minute tasks (per `routines/new-feature.md` granularity)
2. Each task specifies: file path, exact change, verification step
3. Execute using the TDD skill (`/tdd`) for any behavior-affecting changes
4. Commit each deepening as an atomic unit

## Integration with Founder Mode OS

This skill connects to:
- **`/tdd`** — Use for implementing the deepened modules
- **`/review`** — Run after deepening to validate quality
- **`karpathy-coder`** — Deepening IS the Karpathy principle of simplicity applied at the architecture level
