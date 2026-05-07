# Stripe Advanced Reference

## Stripe Connect (Marketplace / Platform Payments)

### Account Types
- **Standard**: Merchant has own Stripe dashboard. Least control.
- **Express**: Stripe-hosted onboarding. Best for most marketplaces.
- **Custom**: Full white-label. Most control, most compliance burden (you become responsible for ToS, KYC).

### Creating a Connected Account (Express)
```typescript
const account = await stripe.accounts.create({
  type: 'express',
  country: 'AZ',
  email: merchant.email,
  capabilities: {
    card_payments: { requested: true },
    transfers: { requested: true },
  },
});

// Generate onboarding link
const accountLink = await stripe.accountLinks.create({
  account: account.id,
  refresh_url: `${BASE_URL}/reauth`,
  return_url: `${BASE_URL}/onboarding-complete`,
  type: 'account_onboarding',
});
```

### Destination Charge (Platform takes fee)
```typescript
const paymentIntent = await stripe.paymentIntents.create({
  amount: 10000, // $100.00
  currency: 'usd',
  application_fee_amount: 500, // $5.00 platform fee
  transfer_data: {
    destination: connectedAccountId,
  },
});
```

### Separate Charges + Transfers
```typescript
// Charge customer on platform
const charge = await stripe.charges.create({ amount: 10000, currency: 'usd', source: tokenId });

// Later, transfer to merchant
await stripe.transfers.create({
  amount: 9000,
  currency: 'usd',
  destination: connectedAccountId,
  source_transaction: charge.id,
});
```

---

## Stripe Radar (Fraud)

```typescript
const paymentIntent = await stripe.paymentIntents.create({
  amount,
  currency,
  radar_options: {
    session: radarSessionId, // from Stripe.js radar session
  },
  metadata: {
    ip_address: req.ip,
    user_agent: req.headers['user-agent'],
  },
});
```

### Custom Radar Rules (Dashboard)
- Block if `card_country != :ip_country`  
- Review if `risk_score > 75`
- Allow if `metadata.trusted_customer = true`

---

## Stripe Billing (Subscriptions)

```typescript
// Create subscription
const subscription = await stripe.subscriptions.create({
  customer: customerId,
  items: [{ price: priceId }],
  payment_behavior: 'default_incomplete',
  payment_settings: { save_default_payment_method: 'on_subscription' },
  expand: ['latest_invoice.payment_intent'],
});

// Handle subscription webhooks
// customer.subscription.updated
// invoice.payment_succeeded
// invoice.payment_failed -> retry logic, dunning emails
// customer.subscription.deleted -> revoke access
```

### Dunning (Failed Payment Recovery)
Configure in Dashboard: Settings > Billing > Subscriptions and emails  
Smart Retries uses ML to retry at optimal times. Enable it.

---

## Stripe Terminal (In-Person)

```typescript
// Create connection token for Terminal SDK
const connectionToken = await stripe.terminal.connectionTokens.create();

// Create reader (register physical device)
const reader = await stripe.terminal.readers.create({
  registration_code: 'simulated-wpe', // from device
  label: 'Checkout Lane 1',
  location: locationId,
});
```

---

## Key Stripe Webhook Events

| Event | When to handle |
|---|---|
| `payment_intent.succeeded` | Fulfill order |
| `payment_intent.payment_failed` | Notify user, log failure reason |
| `charge.dispute.created` | Alert team, gather evidence |
| `charge.refunded` | Update order status |
| `customer.subscription.deleted` | Revoke access |
| `invoice.payment_failed` | Trigger dunning |
| `account.updated` | Check if Connect account is `charges_enabled` |
