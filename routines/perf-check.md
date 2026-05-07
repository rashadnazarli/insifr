---
description: Run Lighthouse audit and compare against performance budget
---

# Performance Check Workflow

## Steps

### 1. Load Performance Budget

Read `@docs/ARCHITECTURE.md` and extract the performance budget targets:
- Lighthouse Performance score: ≥ 90
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1
- Total bundle size: < 200KB compressed
- Time to Interactive (TTI): < 3.5s on 4G

### 2. Build the Project

```bash
npm run build
```

Measure the output:
```bash
# Check bundle size (compressed)
du -sh dist/ || Get-ChildItem dist -Recurse | Measure-Object -Sum Length
```

Report the total bundle size against the 200KB budget.

### 3. Run Lighthouse Audit

If the project has a running dev server or deployed preview URL:

```bash
# Using Lighthouse CLI (if available)
npx lighthouse <url> --output=json --output-path=./lighthouse-report.json --chrome-flags="--headless"
```

If Lighthouse CLI is not available, provide instructions for:
- Chrome DevTools → Lighthouse tab → Generate report
- Or use [PageSpeed Insights](https://pagespeed.web.dev/)

### 4. Analyze Results

Compare each metric against the budget:

| Metric | Target | Actual | Status |
|---|---|---|---|
| Performance Score | ≥ 90 | ? | 🟢 / 🔴 |
| LCP | < 2.5s | ? | 🟢 / 🔴 |
| FID | < 100ms | ? | 🟢 / 🔴 |
| CLS | < 0.1 | ? | 🟢 / 🔴 |
| Bundle Size | < 200KB | ? | 🟢 / 🔴 |
| TTI | < 3.5s | ? | 🟢 / 🔴 |

### 5. Identify Bottlenecks

For any metric that fails (🔴):

**Large Bundle:**
- Run `npx vite-bundle-visualizer` to identify large dependencies
- Suggest code splitting, lazy loading, or tree shaking
- Check for accidentally bundled dev dependencies

**Slow LCP:**
- Check for render-blocking resources (fonts, CSS, JS)
- Verify images use lazy loading and modern formats (WebP, AVIF)
- Check for unnecessary API calls during initial render

**High CLS:**
- Check for images/embeds without explicit width/height
- Verify fonts use `font-display: swap`
- Check for dynamic content injection above the fold

**Slow TTI:**
- Check for heavy JavaScript execution on load
- Verify third-party scripts are deferred
- Check for synchronous API calls during bootstrap

### 6. Produce Report

Structure as:
- 🟢 **Passing** — metrics within budget
- 🔴 **Failing** — metrics over budget, with specific fix recommendations
- 📊 **Trend** — if previous reports exist, show improvement/regression

### 7. Log Results

Append to `claude-progress.txt`:
```
PERF CHECK <ISO timestamp>
URL: <tested URL>
Score: <lighthouse score>/100
LCP: <value>s | FID: <value>ms | CLS: <value> | Bundle: <value>KB
Status: pass | fail
Issues: <1-line summary of failures>
```

## Rules
- Always build before measuring — never test dev mode performance
- Test on both desktop and mobile profiles
- Compare against the ARCHITECTURE.md budget, not arbitrary benchmarks
- Performance issues are bugs — treat 🔴 findings as blockers for `/deploy`
