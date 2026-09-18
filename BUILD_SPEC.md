# Corporate Ghost Quiz — Build Spec

A viral, self-roast personality quiz ("What Kind Of Corporate Ghost Are You?" — 日本の"社畜幽霊"自虐診断を英語市場に輸出するPOC).

## Hard requirements

1. Next.js 16 App Router (already scaffolded at this repo root). **Do NOT re-scaffold.**
2. Must build & run under **vinext** (Cloudflare Workers). Verify with `npm run build:vinext` and `npm run start:vinext` (wrangler dev). If workerd isn't installed, run `npm install-scripts approve workerd esbuild --all` first — check the exact npm syntax with `npm install-scripts --help`; it may be `npm install-scripts approve --all`.
3. **Zero runtime AI.** Deterministic client-side scoring (pure TS function, no network, no API keys). All data static.
4. Mobile-first, screenshots as the share artifact. Result screen must look great as a screenshot (self-contained, no scroll cut-off).
5. Add tests for the scoring engine with **vitest** (plain unit tests — do NOT require the Cloudflare vitest plugin; keep pure logic importable Node-side). `npm test`.
6. TypeScript strict.

## The 8 ghost types

Each ghost = { code, name, emoji, title (funny subtitle), short (1-line self-roast hook), description (2-3 sentences, dark-funny), strengths[3] (mocking bits that "sound like a compliment"), ritual (what you do when you log off on Friday), haunt (where your ghost roams the office on Sunday) }.

1. **OTGM — The Overtime Ghost Master** 🕛
   Title: "Deadline's favorite employee"
   Hook: "You've seen 2am so often it quietly filed a restraining order."
   Details: logs on at 9, logs off "after one more email" — always one more. Strength: your inbox is your legacy. Haunt: the empty office peering at the vending machine at 3am.

2. **MTRG — The Meeting Revenant** 📋
   Title: "An appointment to have no appointments"
   Hook: "Your calendar is so full you had to schedule a meeting to read this quiz."
   Details: back-to-back, no lunch, and every meeting could've been an email. You agree to things in sync calls you'll never do. Haunt: an endless Zoom room, permanently "please mute."

3. **KPIZ — The KPI Zombie** 📊
   Title: "If it isn't measured, it doesn't exist"
   Hook: "You once felt productive just because a number went up."
   Strength: T-shaped, but the vertical bar is a chart. Ritual: update 4 dashboards at 5:59 so the number looks green overnight. Haunt: the spreadsheet graveyard.

4. **CPGH — The Cubicle Poltergeist** 🧊
   Title: "Two screens, zero plans"
   Hook: "You've been at your desk 30 minutes and still haven't decided what to open first."
   Strength: deep work … if deep work means refreshing a page 7 times. Ritual: organize one drawer as a coping mechanism. Haunt: the break room, hovering, not speaking.

5. **EMZG — The Email Zombie** ✉️
   Title: "Send now, think never"
   Hook: "You reply to emails before the sender finishes writing them."
   Strength: legendary response time, cursed response quality. Ritual: write the reply at 11:58pm, schedule-send it for 9am to seem alive. Haunt: an outbox that never stops growing.

6. **BRNO — The Business Ninja** ... (drop)

6. **BRNT — The Burnout Phantom** 🔋
   Title: "Running on fumes and office coffee"
   Hook: "Your weekend is 48 hours and somehow none of it restores you."
   Strength: you once had energy; you have the email archive to prove it. Ritual: sleep through alarms, wake up more tired. Haunt: the nap room (if you had one, which is the problem).

7. **SLGH — The Slack Ghoul** 💬
   Title: "Typing… until the end of time"
   Hook: "You've said 'sorry for the late reply' so often it's your catchphrase."
   Strength: presence, if 'present' means 'green dot but panicking'. Ritual: heart-react everything to look engaged. Haunt: a thread where someone asks a question and the ghoul stares at the reply box.

8. **LNGH — The Lunchtime Ghost** 🍱
   Title: "Desk dining eternal"
   Hook: "You asked what you had for lunch and genuinely don't remember."
   Strength: efficiency — you merged eating into the meeting. Ritual: microwave something sad, eat it standing. Haunt: the office kitchen, fading in and out by the fridge.

## Scoring

8 questions, each with 4 options. Each option maps to a fixed ghost code (+weight 1). After all answers, the code with the highest tally wins. Deterministic, tie-break = first reached. Questions framed as "you know it's bad when…" with believable slippery-slope options. Keep questions SHORT (≤ 12 words each option).

## UI flow (single page, React state, no router)

State machine: `start → in-quiz (0..7) → result`.
- Start screen: big title, 1-line pitch, CTA button. Tappable, big.
- Quiz screen: ONE question at a time (mobile-friendly), progress bar (e.g. 3/8), 4 big tappable option cards. Tap → advance immediately (no confirm). Last one → compute → result.
- Result screen: the ghost's emoji huge, code in a "tag" pill, name, title, hook, description, 3 strengths, ritual, haunt. Then a big "SHARE" affordance: copy-to-clipboard a one-line result string AND a "share a tag" — must be screenshot-friendly: the result card is self-contained, high-contrast, no cut-off, works on phone viewport.
- "Take again" button (gacha — replay encouraged). "See all 8 types" expandable (SEO).

## Style

- Dark theme (midnight office / haunted mood), one accent color. Big emoji. System font stack — no Google Fonts (offline, no network dep).
- CSS: plain CSS modules or a single globals.css. NO Tailwind (keep deps minimal).
- Fully static / no external requests. Put the whole thing in `app/page.tsx` + `app/globals.css` + `lib/ghosts.ts` + `lib/scoring.ts`.

## SEO / share

- `app/layout.tsx`: metadata — title "What Corporate Ghost Are You? (Self-Roast Quiz)", description, proper `og:` tags, `theme-color`. Favicon can stay default.
- Add `app/result/[code]/page.tsx`? NO — keep single page to reduce scope. Instead: result card includes a copyable share string. (No dynamic OG route in this POC; note it as next step.)

## Deliverables

Run and report: `npm run build:vinext` exit code, `npm test` pass count, and `npm run start:vinext` serving the page (confirm it responds, e.g. curl the local port). Do not deploy.