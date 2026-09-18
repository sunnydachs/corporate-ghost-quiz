# Corporate Ghost Quiz

A self-roast personality quiz: **"What Kind Of Corporate Ghost Are You?"** — eight slippery-slope questions, one haunted work style, no recovery plan.

A cheeky export of Japan's "社畜 (corporate drone) self-roast" diagnosis culture to the English-speaking internet — fast, mobile-first, and built to be screenshot-friendly.

## Live

https://corporate-ghost-quiz.sunnydachs.workers.dev

## Stack

- **Next.js 16** (App Router) + **vinext** — server components & SSR that compile clean to Cloudflare Workers
- **Cloudflare Workers** — zero-config free-tier hosting; deploys via GitHub Actions on push to `main`
- **TypeScript**, strict. **vitest** for the deterministic scoring engine.
- **Pixazo (flux-1-schnell)** generated the per-type ghost icons and the OG image.

Why no runtime AI: the quiz is a **deterministic, client-side scoring** engine. Pure function in `lib/scoring.ts`, no network, no API keys, no per-request cost or rate limits. It can survive a viral spike at $0.

## Development

```bash
npm install
npm run dev:vinext     # vinext dev server (Cloudflare runtime)
npm run build:vinext   # production build
npm run start:vinext   # serve built worker locally (wrangler)
npm test               # vitest unit tests (scoring engine)
```

The Next.js-native scripts (`npm run dev` / `build` / `start`) also exist if you want the standard Next.js toolchain for local iteration.

## Deploy

Pushing to `main` triggers GitHub Actions, which:
1. installs deps
2. runs `npm test`
3. builds with vi
4. deploys to Cloudflare Workers via `npm run deploy:vinext`

Requires a `CLOUDFLARE_API_TOKEN` repo secret with Workers Scripts edit permission (see `wrangler.jsonc` for the `account_id`).

## Architecture

```
app/layout.tsx    → metadata + OG/Twitter cards
app/page.tsx      → start → 8-question → result state machine (client)
lib/ghosts.ts     → the 8 ghost types (content) + questions
lib/scoring.ts    → deterministic scorer (pure, tested)
public/ghosts/    → Pixazo-generated type icons
public/og-bg.png  → Open Graph share image (1200×630)
```

The 8 ghosts: Overtime Ghost Master (OTGM), Meeting Revenant (MTRG), KPI Zombie (KPIZ), Cubicle Poltergeist (CPGH), Email Zombie (EMZG), Burnout Phantom (BRNT), Slack Ghoul (SLGH), Lunchtime Ghost (LNGH).

## License

MIT