---
description: Populate the project database with realistic test/seed data for development. Stack-aware — supports Firestore, Supabase, and PostgreSQL.
---

# Seed Workflow

## Steps

### 1. Detect Stack

Read `@docs/ARCHITECTURE.md` and identify the database technology:
- **Firestore** → generate a Node.js Firebase Admin seed script
- **Supabase** → generate a Supabase JS client seed script
- **PostgreSQL / MySQL** → generate a SQL seed file + optional Node.js runner

If `docs/ARCHITECTURE.md` doesn't exist, ask the founder: "What database does this project use?"

### 2. Read Schema

Load `@docs/DATABASE_SCHEMA.md` to understand all collections/tables, fields, types, and relationships.

### 3. Determine Scope

Ask the founder:
- **Full seed** — populate all collections/tables with realistic test data
- **Specific collection/table** — seed only one (e.g., `users`, `products`)
- **Reset + seed** — clear existing dev data first, then repopulate

### 4. Generate Seed Data

For each collection/table, generate realistic test data:

**Data quality rules:**
- Use realistic names, emails, dates — never "test123" or "asdf"
- Include edge cases: empty strings, long text, special characters, Unicode
- Create relational data that links correctly (user IDs in orders, etc.)
- Include all field types defined in the schema
- Generate at least 10 records per collection (unless specified otherwise)

### 5. Create Seed Script

**If Firestore:** Generate `scripts/seed.js`
```javascript
const admin = require('firebase-admin');
if (process.env.FIRESTORE_EMULATOR_HOST) {
  admin.initializeApp({ projectId: 'demo-project' });
} else {
  admin.initializeApp();
}
const db = admin.firestore();
async function seed() {
  const batch = db.batch();
  // ... add documents from generated data
  await batch.commit();
  console.log('✅ Seed complete');
}
seed().catch(console.error);
```
Run: `FIRESTORE_EMULATOR_HOST=localhost:8080 node scripts/seed.js`

---

**If Supabase:** Generate `scripts/seed.ts`
```typescript
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
async function seed() {
  const { error } = await supabase.from('users').insert([/* generated data */]);
  if (error) throw error;
  console.log('✅ Seed complete');
}
seed();
```
Run against local Supabase: `npx supabase start` first, then `npx ts-node scripts/seed.ts`

---

**If PostgreSQL / MySQL:** Generate `scripts/seed.sql`
```sql
-- Disable foreign key checks during seed
BEGIN;
TRUNCATE TABLE orders, users RESTART IDENTITY CASCADE;
INSERT INTO users (name, email, role) VALUES
  ('Rashad Nazarli', 'rashad@example.com', 'admin'),
  ('Test Customer', 'customer@example.com', 'user');
-- ... additional tables
COMMIT;
```
Run: `psql $DATABASE_URL -f scripts/seed.sql`

### 6. Verify

- Check the database console or emulator UI to confirm data exists
- Run a quick query to verify relationships are correct
- Test the app locally — pages should show populated data, not empty states

## Rules
- **NEVER** seed production without explicit founder approval
- Always prefer the local emulator or dev database over live production
- Seed script must be idempotent — running twice shouldn't create duplicates
- Include a `--clear` or `TRUNCATE` strategy to wipe and re-seed
- Store seed scripts in `scripts/` (not in `src/`)
- If stack detection fails, ask the founder rather than guessing


## Steps

### 1. Read Schema

Load `@docs/DATABASE_SCHEMA.md` to understand all collections, fields, and relationships.

### 2. Determine Scope

Ask the founder:
- **Full seed** — populate all collections with realistic test data
- **Specific collection** — seed only one collection (e.g., `users`, `products`)
- **Reset + seed** — clear existing dev data first, then repopulate

### 3. Generate Seed Data

For each collection, generate realistic test data:

**Data quality rules:**
- Use realistic names, emails, dates — never "test123" or "asdf"
- Include edge cases: empty strings, long text, special characters, Unicode
- Create relational data that links correctly (user IDs in orders, etc.)
- Include all field types defined in the schema
- Generate at least 10 records per collection (unless specified otherwise)

**Common patterns:**
```javascript
// Users — mix of roles and states
{ name: "Rashad Nazarli", email: "rashad@example.com", role: "admin", status: "active" }
{ name: "Test Customer", email: "customer@example.com", role: "user", status: "active" }
{ name: "Inactive User", email: "inactive@example.com", role: "user", status: "suspended" }

// Include one of each edge case:
// - New user (just created, no activity)
// - Power user (lots of data, many relations)
// - Churned user (was active, now inactive)
```

### 4. Create Seed Script

Generate a seed script at `scripts/seed.js`:

```javascript
const admin = require('firebase-admin');

// Initialize with local emulator or service account
if (process.env.FIRESTORE_EMULATOR_HOST) {
  admin.initializeApp({ projectId: 'demo-project' });
} else {
  admin.initializeApp();
}

const db = admin.firestore();

async function seed() {
  const batch = db.batch();
  
  // Add documents to batch...
  
  await batch.commit();
  console.log('✅ Seed data inserted');
}

seed().catch(console.error);
```

### 5. Run the Seed

```bash
# Against Firebase Emulator (safe)
FIRESTORE_EMULATOR_HOST=localhost:8080 node scripts/seed.js

# Against real Firestore (ask for confirmation first!)
node scripts/seed.js
```

### 6. Verify

- Check the Firebase console (or emulator UI) to confirm data exists
- Run a quick query to verify relationships are correct
- Test the app locally — pages should show populated data, not empty states

## Rules
- **NEVER** seed production without explicit founder approval
- Always check for emulator first — prefer seeding the emulator over live Firestore
- Seed script must be idempotent — running twice shouldn't create duplicates
- Include a `--clear` flag to wipe and re-seed
- Store seed script in `scripts/seed.js` (not in src/)
