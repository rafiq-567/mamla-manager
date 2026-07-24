# MamlaManager

Next.js 15 + MongoDB legal case management app.

## Quick start

```bash
npm install --legacy-peer-deps
# .env.local required: MONGODB_URI, JWT_SECRET, NEXTAUTH_SECRET, Cloudinary vars
npm run dev          # http://localhost:3000
npm run lint         # next lint (ESLint flat config in eslint.config.mjs)
npm run build        # next build
npm run seed         # seed-cases.js → seed-clients.js (order matters)
```

## Architecture

- **Pages**: `app/page.tsx` (landing), `app/(auth)/` (login/register), `app/(dashboard)/` (app shell with sidebar/navbar)
- **API**: Next.js API routes at `app/api/{auth,cases,clients,dashboard,notifications}`
- **Auth**: JWT in HTTP-only `token` cookie (7d). Middleware (`middleware.ts`) protects `/dashboard/*`. Zustand store for client-side auth state (`hooks/useAuth.ts`)
- **Data fetching**: TanStack Query via hooks (`useCases`, `useClients`, `useDashboard`, `useNotifications`)
- **DB**: Mongoose singleton (`lib/mongodb.ts`). Models at `lib/models/`
- **Validation**: Zod schemas at `lib/validations/`
- **UI**: Shadcn components at `components/ui/`, `cn()` helper at `lib/utils.ts`

## Key facts

- `npm install` **requires** `--legacy-peer-deps`
- Seed scripts read `.env.local` directly (no dotenv). `scripts/seed-cases.js` + `scripts/seed-cases.ts` exist; npm scripts run the `.js` versions
- Seed creates 75 cases + 45 clients, auto-creates default admin user (`admin@legalfirm.com` / `password123`) if none exists
- No test framework configured
- No typecheck script defined
- Path alias `@/*` → `./*`
- `.env.local` is committed (credentials are in git)
