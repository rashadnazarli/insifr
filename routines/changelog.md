---
description: Auto-generate a changelog from conventional commits
---

# Changelog Workflow

## Steps

### 1. Determine Scope

Ask the founder:
- **Full changelog** — all commits since last release tag
- **Since version** — commits since a specific tag (e.g., `v1.0.0`)
- **Last N commits** — recent activity only

### 2. Gather Commits

Run the appropriate git command:

```bash
# Full changelog since last tag
git log $(git describe --tags --abbrev=0)..HEAD --pretty=format:"%h %s (%an, %ad)" --date=short

# Or since a specific tag
git log v1.0.0..HEAD --pretty=format:"%h %s (%an, %ad)" --date=short

# Or last N commits
git log -n 20 --pretty=format:"%h %s (%an, %ad)" --date=short
```

### 3. Parse & Categorize

Group commits by conventional commit type:

| Prefix | Category | Emoji |
|---|---|---|
| `feat()` | ✨ New Features | |
| `fix()` | 🐛 Bug Fixes | |
| `revise()` | 📝 Revisions | |
| `test()` | ✅ Tests | |
| `deploy()` | 🚀 Deployments | |
| `refactor()` | ♻️ Refactoring | |
| `docs()` | 📚 Documentation | |
| `style()` | 🎨 Styling | |
| `perf()` | ⚡ Performance | |
| `security()` | 🔒 Security | |

Commits without conventional prefixes go under "Other Changes."

### 4. Generate Changelog

Create or update `CHANGELOG.md` in the project root:

```markdown
# Changelog

## [Unreleased] - YYYY-MM-DD

### ✨ New Features
- **auth**: Add social login with Google and Apple (#a1b2c3d)
- **dashboard**: Real-time analytics widget (#d4e5f6g)

### 🐛 Bug Fixes
- **forms**: Fix validation on email input (#h7i8j9k)

### 🔒 Security
- **auth**: Enforce rate limiting on login endpoint (#l0m1n2o)

### 📚 Documentation
- Update API_SPEC with new endpoints (#p3q4r5s)
```

### 5. Present for Review

Show the generated changelog to the founder:
- Highlight any breaking changes
- Flag any commits that don't follow conventional format
- Suggest a version number based on changes (major/minor/patch)

### 6. Commit

After approval:
```bash
git add CHANGELOG.md
git commit -m "docs: update changelog"
```

## Rules
- Always use conventional commit format in the output
- Never include merge commits or automated bot commits
- Group related commits together (e.g., multiple commits for one feature)
- If a commit message is unclear, check the diff to write a better description
- Breaking changes must be called out prominently
