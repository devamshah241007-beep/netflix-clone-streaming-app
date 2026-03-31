# Diverse MVP (AI-first Ecommerce)

Diverse is a production-oriented MVP that generates ecommerce stores from a product photo using OpenAI.

## Stack
- Next.js 15 + TypeScript + Tailwind
- PostgreSQL + Prisma
- NextAuth (credentials, social-ready)
- Stripe subscriptions + webhook
- OpenAI image+text generation

## MVP Flow (implemented)
1. Retailer signup/login
2. Upload product image or paste hosted image URL
3. AI analyzes image and generates store pack
4. Retailer creates store from generation
5. Retailer edits + publishes store
6. Billing page shows trial and plans

## Setup
```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

## Routes
- Public: `/`, `/features`, `/pricing`, `/about`, `/contact`, `/login`, `/signup`
- Retailer: `/dashboard`, `/create-store`, `/my-stores`, `/store-editor/[storeId]`, `/generations`, `/billing`
- Supplier: `/supplier/onboarding`, `/supplier/dashboard`, `/supplier/products`
- Admin: `/admin/dashboard`, `/admin/users`, `/admin/suppliers`, `/admin/plans`

## Production considerations
- Replace local upload route with S3/R2 + signed URLs.
- Add robust RBAC middleware and API authorization per role.
- Add idempotent Stripe webhook event table.
- Add queue/worker (BullMQ) for AI generation + retries at scale.
- Add observability: Sentry, OpenTelemetry, structured audit logs.
- Add CDN and edge caching for store pages.
- Add domain mapping and tenant-aware theming.
- Add full test suite and CI checks.

## Placeholders
- Social auth providers are scaffold-ready but not enabled.
- Analytics charting and moderation tooling are placeholders.
- Supplier orders/interest feed is placeholder-only in this MVP.
