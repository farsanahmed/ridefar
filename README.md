# RIDEFAR

Bicycle parts and accessories for Kenya. Delivery across Kenya. M-Pesa payments.

Brand: RIDEFAR · Currency: KSh · Contact: +254 731 480 504 · ridefar.ke@gmail.com · Instagram & TikTok @ridefar.ke · Mavueni, Kilifi, Kenya

Design tokens and brand rules live in [`DESIGN.md`](./DESIGN.md).

---

## Status by phase

| Phase | Scope | State |
|---|---|---|
| 1 | UI design system + homepage | **Done** |
| 2 | Database schema + RLS | **Done** |
| 3 | Auth | Next |
| 4 | Products + shop + search | Next |
| 5 | Cart + wishlist | Next |
| 6 | Checkout + orders | Next |
| 7 | M-Pesa integration (sandbox) | Next |
| 8 | Customer account | Next |
| 9 | Admin dashboard | Next |
| 10 | Inventory, promotions, reviews | Next |
| 11 | SEO, performance, security review | Next |

---

## Local setup

```bash
npm install
cp .env.example .env.local     # fill in Supabase keys when you have them
npm run dev                    # http://localhost:3000
```

Commands:

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | TypeScript check, no emit |
| `npm run lint` | ESLint |

### Node on this device

`node_modules` lives in a scratch directory because shared storage has no execute permission. If `npm install` fails with `EACCES` or a missing `node_modules/.bin`, install in a writable directory and copy the result back.

---

## Data rules (non-negotiable)

1. **No fake data.** With an empty database the UI shows empty states. The only sample data is `src/lib/demo/data.ts` and every demo row is labelled **DEMO** in the interface.
2. **Demo mode is off as soon as Supabase is configured.** It can also be forced with `NEXT_PUBLIC_DEMO_DATA=true|false`.
3. **Prices are never trusted from the browser.** Totals are recalculated on the server from database rows before an order is created.
4. **No secrets in client code.** M-Pesa credentials and the Supabase service role key are server-only environment variables.
5. **Orders are marked `PAID` only after a verified Safaricom callback.**

### Removing the demo data

```bash
rm src/lib/demo/data.ts          # optional: the module only feeds demo mode
echo "NEXT_PUBLIC_DEMO_DATA=false" >> .env.local
```

---

## Environment variables

See [`.env.example`](./.env.example). Summary:

| Variable | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | public | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | public | RLS-protected read key |
| `SUPABASE_SERVICE_ROLE_KEY` | **server only** | Admin writes, M-Pesa order creation |
| `MPESA_CONSUMER_KEY` / `MPESA_CONSUMER_SECRET` | **server only** | Darja OAuth |
| `MPESA_SHORTCODE` / `MPESA_PASSKEY` | **server only** | STK push credentials |
| `MPESA_CALLBACK_URL` | **server only** | Safaricom callback endpoint |
| `MPESA_ENVIRONMENT` | **server only** | `sandbox` or `production` |
| `NEXT_PUBLIC_SITE_URL` | public | Canonical URL for SEO |
| `NEXT_PUBLIC_DEMO_DATA` | public | Force demo catalogue on/off |

---

## Structure

```
src/
  app/            routes (App Router): home, shop, cart, orders, account, policies
  components/
    home/         hero, categories, featured products, promo banner, why RIDEFAR
    product/      product card + technical line-art
    site/         header, bottom navigation, footer, placeholders
    ui/           buttons, badges, skeletons, empty & error states
  lib/
    data/         server-side catalogue reads (Supabase → demo → empty)
    demo/         clearly-labelled sample data
    supabase/     server clients
    site.ts       brand constants, categories, navigation
    money.ts      KSh formatting and discount maths
```
