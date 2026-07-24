# RapidAct

AI transparency tooling for EU AI Act Article 50 — detect AI chatbots, disclose to visitors, keep evidence.

- **Landing + scanner**: React 19 + Vite + Tailwind + shadcn/ui (frontend), Hono + tRPC (API), Drizzle + MySQL (leads & scans)
- **Deploy**: Dockerfile → Coolify from GitHub (`main` = production)

## Scripts
- `npm run dev` — dev server
- `npm run build` — production build (dist/public + dist/boot.js)
- `npm start` — production server on :3000
- `npm run db:push` — sync schema (leads, scans tables)

## Env
`DATABASE_URL`, `APP_ID`, `APP_SECRET` (set in Coolify, never committed)

## Deploy status

Production: https://rapidact.megawebs.com (Coolify auto-deploys every push to `main`)
