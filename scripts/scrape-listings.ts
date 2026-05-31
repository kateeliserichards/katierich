/**
 * ─────────────────────────────────────────────────────────────────────────
 * scrape-listings.ts — PERSONAL CONVENIENCE TOOL · NOT PART OF THE BUILD
 * ─────────────────────────────────────────────────────────────────────────
 *
 * This is a standalone, manually-run helper for the site owner (Kate Richards),
 * who is an authorised agent for the listings it reads. It is NEVER imported by
 * the app and NEVER runs at build or runtime. Run it by hand, sparingly:
 *
 *     npx tsx scripts/scrape-listings.ts          (or: npm run scrape)
 *
 * It fetches Kate's own Domain agent profile, parses her listing cards, and
 * regenerates `src/data/listings.ts`.
 *
 * IMPORTANT / CAVEATS:
 *   • This depends on Domain's CURRENT HTML markup. If Domain changes their
 *     markup (they will, eventually), the selectors below will need updating.
 *   • Please respect Domain's terms of use. This is for the agent's own
 *     listings only — run it occasionally to refresh, not on a schedule, and
 *     not at scale.
 *   • Uses a polite User-Agent and a delay, and FAILS SAFE: if the fetch or
 *     parse yields nothing usable, it leaves the existing listings.ts intact
 *     rather than overwriting good data with garbage.
 * ─────────────────────────────────────────────────────────────────────────
 */

import * as cheerio from "cheerio";
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, "../src/data/listings.ts");

const AGENT_URL =
  "https://www.domain.com.au/real-estate-agent/kate-richards-2035247/";

// A polite, identifiable User-Agent. Run sparingly.
const USER_AGENT =
  "KatieRichHomes-listings-refresh/1.0 (personal use by the listing agent; contact: kate@newhomematchmaker.com.au)";

const DELAY_MS = 2500;

interface ScrapedListing {
  id: string;
  title: string;
  suburb: string;
  price: string;
  beds: number;
  baths: number;
  parking: number;
  image: string;
  url: string;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Pull the trailing numeric id from a Domain listing href. */
function idFromHref(href: string): string | null {
  const m = href.match(/-(\d{6,})\/?$/) ?? href.match(/(\d{6,})\/?$/);
  return m ? m[1] : null;
}

/** Best-effort suburb extraction from a title like "... , LAKELANDS WA 6180". */
function suburbFromTitle(title: string): string {
  const m = title.match(/,\s*([A-Z\s]+?)\s+WA\s+\d{4}/i);
  if (!m) return "";
  return m[1]
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

async function fetchHtml(url: string): Promise<string> {
  // be polite before hitting the server
  await sleep(DELAY_MS);
  const res = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "en-AU,en;q=0.9",
    },
  });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  return res.text();
}

/**
 * Parse listing cards out of the agent page.
 *
 * NOTE: Domain's markup changes over time. These selectors target listing
 * anchors and the bed/bath/car feature list. Update them if the structure
 * shifts — the function returns [] on no matches so the caller can fail safe.
 */
function parseListings(html: string): ScrapedListing[] {
  const $ = cheerio.load(html);
  const out: ScrapedListing[] = [];
  const seen = new Set<string>();

  // Listing cards link to "/<slug>-<id>". Collect unique listing anchors.
  $('a[href*="domain.com.au"], a[href^="/"]').each((_, el) => {
    const href = $(el).attr("href") ?? "";
    if (!/-\d{6,}\/?$/.test(href) && !/\/\d{6,}\/?$/.test(href)) return;

    const id = idFromHref(href);
    if (!id || seen.has(id)) return;

    const card = $(el).closest("[data-testid], li, article");
    const text = card.text();

    // price like "$715,000"
    const priceMatch = text.match(/\$[\d,]+(?:\.\d+)?/);
    // bed/bath/car — Domain renders features as numbers near icons
    const featureMatches = text.match(/(\d+)\s*(?:Bed|Bath|Car|Parking)/gi);

    const title =
      card.find("h2, [data-testid*='address']").first().text().trim() ||
      $(el).attr("title") ||
      "";

    if (!title || !priceMatch) return;

    const nums = (featureMatches ?? [])
      .map((s) => parseInt(s, 10))
      .filter((n) => !Number.isNaN(n));

    const full = href.startsWith("http")
      ? href
      : `https://www.domain.com.au${href}`;

    seen.add(id);
    out.push({
      id,
      title,
      suburb: suburbFromTitle(title),
      price: priceMatch[0],
      beds: nums[0] ?? 0,
      baths: nums[1] ?? 0,
      parking: nums[2] ?? 0,
      image: "",
      url: full.replace(/\/$/, ""),
    });
  });

  return out;
}

/** Render the regenerated listings.ts file from a template. */
function renderFile(listings: ScrapedListing[]): string {
  const header = `// ─────────────────────────────────────────────────────────────────────────
// Featured listings data layer.  *** AUTO-GENERATED by scripts/scrape-listings.ts ***
//
// The FULL portfolio lives on Kate's Domain agent profile:
//   https://www.domain.com.au/real-estate-agent/kate-richards-2035247/
// This array is the curated subset shown on the site. Cards link OUT to
// each listing's Domain page — Domain is never embedded or scraped at runtime.
//
// Domain listing URL pattern: https://www.domain.com.au/{slugified-title}-{id}
// Regenerate with: npm run scrape
// ─────────────────────────────────────────────────────────────────────────

export interface Listing {
  id: string;
  title: string;
  suburb: string;
  price: string;
  beds: number;
  baths: number;
  parking: number;
  image: string;
  url: string;
}
`;

  const body = `
export const listings: Listing[] = ${JSON.stringify(listings, null, 2)};

export const DOMAIN_AGENT_URL =
  ${JSON.stringify(AGENT_URL)};
`;

  return header + body;
}

async function main() {
  console.log("• Fetching Domain agent page (politely)…");
  let html: string;
  try {
    html = await fetchHtml(AGENT_URL);
  } catch (err) {
    console.error("✗ Fetch failed — leaving existing listings.ts untouched.");
    console.error("  ", (err as Error).message);
    process.exit(1);
  }

  const listings = parseListings(html);
  console.log(`• Parsed ${listings.length} listing(s).`);

  // FAIL SAFE: don't clobber good data with an empty/partial scrape.
  if (listings.length === 0) {
    console.error(
      "✗ No listings parsed (Domain markup may have changed). " +
        "Leaving existing listings.ts untouched.",
    );
    if (existsSync(OUT_PATH)) {
      console.error("  Tip: review the selectors in parseListings().");
    }
    process.exit(1);
  }

  const next = renderFile(listings);
  const prev = existsSync(OUT_PATH) ? readFileSync(OUT_PATH, "utf8") : "";
  if (prev === next) {
    console.log("• No changes — listings.ts already up to date.");
    return;
  }

  writeFileSync(OUT_PATH, next, "utf8");
  console.log(`✓ Wrote ${listings.length} listing(s) to src/data/listings.ts`);
  console.log("  Review the diff before committing.");
}

main();
