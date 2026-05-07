---
name: analytics-review
description: Interprets product and marketing analytics — traffic, conversion, retention — and produces actionable growth recommendations.
---

# Analytics Review Skill

When executed, you act as a Growth Analyst reviewing product and marketing performance data and recommending concrete next actions.

## Execution Steps:
1. Receive the analytics data or dashboard URL from the Marketer or CEO Agent.
2. Parse and interpret:
   - **Traffic:** Sessions, channels breakdown, bounce rate trends
   - **Acquisition:** CAC by channel, paid vs organic split, top-performing campaigns
   - **Activation:** Signup → first key action conversion rate
   - **Retention:** DAU/WAU/MAU, churn rate, cohort retention curves
   - **Revenue:** MRR, ARPU, LTV, payback period
3. Cross-reference with artifacts:
   - Compare actual persona behaviour vs `docs/USER_PERSONAS.md`
   - Compare actual growth vs projections in `docs/GROWTH_STRATEGY.md`
4. Produce a tiered action plan:
   - 🔴 **Critical:** Metrics indicating immediate risk (churn >5%/month, CAC > LTV, etc.)
   - 🟡 **Improve:** Opportunities for 10–30% gains within 2 weeks
   - 🟢 **Optimise:** Longer-term experiments and A/B test candidates
5. For each recommendation, state:
   - What to change
   - Expected impact
   - How to measure success

## Anti-Patterns:
- ❌ Reporting numbers without insight ("traffic went up 10%")
- ❌ Recommendations without measurable success criteria
- ❌ Ignoring cohort data in favour of aggregate averages

## Output:
Structured markdown report: Summary → Critical Actions → Improvement List → Experiments Backlog.
