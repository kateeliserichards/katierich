# Katie Rich Homes

Private single-page landing site for **Katie Rich Homes** — New Home Sales by
Kate Richards (New Home Matchmaker, Carine WA), with finance via Neptune Finance.

> **Private / not for public deployment.** The page is marked `noindex,nofollow`.

## Stack

React + Vite + TypeScript · Tailwind CSS (`tailwindcss-animate`) · GSAP ·
Framer Motion · hls.js · react-router-dom.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## The logo

The wordmark (white script "katierich" + red swoosh) lives at
`src/assets/logo.png` and is used in the navbar, hero and footer.

> ⚠️ The committed `logo.png` is a generated **placeholder** standing in for the
> real wordmark. Drop the supplied logo file in at `src/assets/logo.png`
> (same path/name) and everything picks it up automatically — no code changes.

## Listings data

`src/data/listings.ts` is the curated subset of listings shown on the site.
Cards link **out** to each listing's Domain page — Domain is never embedded or
scraped at runtime. The full portfolio lives on the
[Domain agent profile](https://www.domain.com.au/real-estate-agent/kate-richards-2035247/).

To refresh the data, run the standalone helper manually (see below).

## Listings scraper (manual, optional)

`scripts/scrape-listings.ts` is a personal convenience tool for the site owner
(an authorised agent for these listings). It is **not** part of the build and is
never imported by the app.

```bash
npm run scrape   # fetches the Domain agent page and regenerates listings.ts
```

It depends on Domain's current HTML, uses a polite User-Agent + delay, runs
sparingly, and fails safe (won't overwrite good data on error). Update the
selectors if Domain's markup changes.

## To-dos before going live

- Replace `src/assets/logo.png` with the real wordmark.
- Swap the hero/footer HLS placeholder for a real Perth homes/build clip
  (`src/hooks/useHlsVideo.ts`).
- Set the business email in `src/data/site.ts`.
- **Compliance:** add Kate's Credit Representative authorisation details and
  confirm required wording with Neptune before any credit content goes live
  (see `// COMPLIANCE` / `// TODO` markers in `Finance.tsx` and `Footer.tsx`).
