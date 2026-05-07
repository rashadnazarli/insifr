# PSP Architecture & Multi-PSP Routing

## Payment Orchestration Layer

An orchestration layer sits between your application and multiple PSPs, enabling:
- **Intelligent routing** (cost, geography, success rate)
- **Automatic failover** (retry on different PSP if one fails)
- **Normalization** (single internal API regardless of PSP)

### High-Level Architecture
```
[Merchant App]
     │
[Orchestration API] ← routing rules engine
     │
  ┌──┴──────────────────┐
  │                     │
[Stripe]           [Adyen]        [Tap Payments]
```

### Routing Logic (TypeScript)
```typescript
interface RoutingRule {
  condition: (payment: PaymentRequest) => boolean;
  psp: 'stripe' | 'adyen' | 'tap';
  priority: number;
}

const rules: RoutingRule[] = [
  {
    condition: (p) => p.currency === 'AZN' || p.country === 'AZ',
    psp: 'tap',
    priority: 1,
  },
  {
    condition: (p) => p.amount > 100000, // > $1000, use Adyen for lower fees
    psp: 'adyen',
    priority: 2,
  },
  {
    condition: () => true, // default
    psp: 'stripe',
    priority: 99,
  },
];

function routePayment(payment: PaymentRequest): PSPProvider {
  const rule = rules
    .filter(r => r.condition(payment))
    .sort((a, b) => a.priority - b.priority)[0];
  return getPSPProvider(rule.psp);
}
```

### Failover Pattern
```typescript
async function chargeWithFailover(payment: PaymentRequest): Promise<ChargeResult> {
  const providers = getRoutedProviders(payment); // ordered list

  for (const provider of providers) {
    try {
      const result = await provider.charge(payment);
      if (result.success) return result;
    } catch (err) {
      if (isHardDecline(err)) throw err; // don't retry hard declines (stolen card, etc.)
      logger.warn(`PSP ${provider.name} failed, trying next`, err);
      continue;
    }
  }
  throw new Error('All PSPs failed');
}

function isHardDecline(err: any): boolean {
  // Do NOT retry: do_not_honor, stolen_card, lost_card, card_velocity_exceeded
  const hardDeclineCodes = ['card_declined', 'stolen_card', 'lost_card'];
  return hardDeclineCodes.includes(err.declineCode);
}
```

---

## Idempotency Design

### Rule: Every charge mutation needs an idempotency key
```typescript
// Bad — retrying this can double-charge
await stripe.paymentIntents.create({ amount, currency });

// Good — safe to retry
const idempotencyKey = `charge_${orderId}_${userId}`;
await stripe.paymentIntents.create(
  { amount, currency },
  { idempotencyKey }
);
```

### Idempotency Key Strategy
- `{resource}_{entity_id}_{timestamp_bucket}` — e.g. `pi_order123_20240601`
- Store in your DB with the resulting PSP ID
- On retry, look up existing key → return cached result without calling PSP

---

## Webhook-Driven State Machine

Never update payment status from API response alone. Always await webhook confirmation.

```
[API Call] → status = 'processing'
     ↓
[PSP processes async]
     ↓
[Webhook: payment_intent.succeeded] → status = 'succeeded' → fulfill
[Webhook: payment_intent.payment_failed] → status = 'failed' → notify user
```

### Webhook Deduplication
```typescript
async function handleWebhook(event: WebhookEvent) {
  // Deduplicate — PSPs can send same event multiple times
  const existing = await db.query(
    'SELECT id FROM processed_webhooks WHERE event_id = $1',
    [event.id]
  );
  if (existing.rows.length > 0) return; // already processed

  await db.query(
    'INSERT INTO processed_webhooks (event_id, processed_at) VALUES ($1, now())',
    [event.id]
  );

  // Now process
  await processEvent(event);
}
```

---

## Building CibPay as a PSP

### Card Scheme Certification Path
1. Become an **ISO (Independent Sales Organization)** under a sponsor bank
2. Or get direct **Principal Membership** with Visa/Mastercard (requires significant capital)
3. Implement **ISO 8583** for authorization message exchange with acquirer
4. Pass **PCI DSS Level 1** audit (QSA-certified)
5. Complete **Visa/Mastercard certification testing** for authorization, clearing, settlement

### Merchant Onboarding (KYB) Checklist
- Business registration document
- Director ID verification (KYC)
- Bank account ownership proof
- Website / business description review
- MCC code assignment
- Risk scoring (business type, transaction volume, chargeback history)

### Settlement Flow
```
Customer Card → Issuing Bank → Card Network → Acquiring Bank (CibPay's sponsor)
                                                      ↓
                                              CibPay Settlement Account
                                                      ↓
                                              Merchant Bank Account (T+1 or T+2)
```
