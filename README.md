# Ayushi Desai — Portfolio

Single-page portfolio built with Next.js (App Router). No Tailwind — one
hand-written stylesheet at `app/globals.css` so there's a single source of
truth for the design.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Deploy to Vercel

**Option A — via GitHub (recommended)**
1. Push this folder to a new GitHub repo (e.g. `ayushid543/portfolio`).
2. Go to https://vercel.com/new, import that repo.
3. Framework preset auto-detects as Next.js — no config needed.
4. Click Deploy. You'll get a live `*.vercel.app` URL, and can attach a
   custom domain later under Project Settings → Domains.

**Option B — via CLI**
```bash
npm install -g vercel
vercel
```
Follow the prompts (link/create project, confirm defaults). Run `vercel --prod`
to push to production.

## Things to swap in before you launch

- `public/headshot.jpg` — replace if you want a different photo.
- `app/page.js` → Work section — swap the placeholder icon tiles for real
  screenshots of MeetingMind and DriverPlan, and update the GitHub links to
  the exact repo URLs (currently both point to your profile root).
- Hero stat callouts (4.00 GPA / 10× / 15%) — these were pulled straight from
  your resume; swap for different numbers any time.
- `app/layout.js` — metadata/Open Graph description if you want different
  copy for link previews on LinkedIn/WhatsApp.

## Structure

```
app/
  layout.js     — fonts, <head> metadata
  page.js       — all page content + interactivity (nav, tabs, scroll reveal)
  globals.css   — full design system (colors, type, layout)
public/
  headshot.jpg  — your photo, used in the About section
```
