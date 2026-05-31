// ─────────────────────────────────────────────────────────────────────────
// Featured listings data layer.
//
// This is the curated subset of listings shown on the site. The FULL portfolio
// (28 listings at time of writing) lives on Kate's Domain agent profile:
//   https://www.domain.com.au/real-estate-agent/kate-richards-2035247/
//
// Cards link OUT to each listing's Domain page — Domain is never embedded and
// is never scraped at build/runtime. To refresh this list, run the standalone
// helper manually: `npm run scrape` (see scripts/scrape-listings.ts).
//
// Domain listing URL pattern: https://www.domain.com.au/{slugified-title}-{id}
// ─────────────────────────────────────────────────────────────────────────

export interface Listing {
  id: string; // Domain numeric id, e.g. "2020867870"
  title: string; // e.g. "TBC Lakelands Estate, LAKELANDS WA 6180"
  suburb: string;
  price: string; // display string, e.g. "$715,000"
  beds: number;
  baths: number;
  parking: number;
  image: string; // local path or remote url
  url: string; // full Domain listing url (card links out to this)
}

/** Turn a listing title into the slug Domain uses in its listing URLs. */
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[,]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Build the canonical Domain listing URL from a title + numeric id. */
function domainUrl(title: string, id: string): string {
  return `https://www.domain.com.au/${slugify(title)}-${id}`;
}

// Local placeholder imagery (Perth new-home feel). Swap `image` for real
// listing photos any time, or let the scraper repopulate this file.
const heroImg = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=1200&q=80`;

const seeds = [
  "photo-1568605114967-8130f3a36994", // modern house exterior
  "photo-1570129477492-45c003edd2be", // contemporary home
  "photo-1512917774080-9991f1c4c750", // suburban build
  "photo-1600585154340-be6161a56a0c", // bright living
  "photo-1600596542815-ffad4c1539a9", // facade
  "photo-1605276374104-dee2a0ed3cd6", // new build
];

export const listings: Listing[] = [
  {
    id: "2020867870",
    title: "TBC Lakelands Estate, LAKELANDS WA 6180",
    suburb: "Lakelands",
    price: "$715,000",
    beds: 3,
    baths: 2,
    parking: 1,
    image: heroImg(seeds[0]),
    url: domainUrl("TBC Lakelands Estate, LAKELANDS WA 6180", "2020867870"),
  },
  {
    id: "2020867861",
    title: "TBC Brabham Ave, BRABHAM WA 6055",
    suburb: "Brabham",
    price: "$745,000",
    beds: 3,
    baths: 2,
    parking: 1,
    image: heroImg(seeds[1]),
    url: domainUrl("TBC Brabham Ave, BRABHAM WA 6055", "2020867861"),
  },
  {
    id: "2020865729",
    title: "TBC Multan Loop, PIARA WATERS WA 6112",
    suburb: "Piara Waters",
    price: "$1,055,000",
    beds: 4,
    baths: 2,
    parking: 2,
    image: heroImg(seeds[2]),
    url: domainUrl("TBC Multan Loop, PIARA WATERS WA 6112", "2020865729"),
  },
  {
    id: "2020865691",
    title: "TBC Newmarket Dr, HILBERT WA 6112",
    suburb: "Hilbert",
    price: "$865,000",
    beds: 3,
    baths: 2,
    parking: 1,
    image: heroImg(seeds[3]),
    url: domainUrl("TBC Newmarket Dr, HILBERT WA 6112", "2020865691"),
  },
  {
    id: "2020865681",
    title: "TBC Delta Rd, BALDIVIS WA 6171",
    suburb: "Baldivis",
    price: "$855,000",
    beds: 3,
    baths: 2,
    parking: 1,
    image: heroImg(seeds[4]),
    url: domainUrl("TBC Delta Rd, BALDIVIS WA 6171", "2020865681"),
  },
  {
    id: "2020865659",
    title: "TBC Saponara Dr, WANNEROO WA 6065",
    suburb: "Wanneroo",
    price: "$1,115,500",
    beds: 3,
    baths: 2,
    parking: 1,
    image: heroImg(seeds[5]),
    url: domainUrl("TBC Saponara Dr, WANNEROO WA 6065", "2020865659"),
  },
];

/** Kate's public Domain agent profile (full portfolio). */
export const DOMAIN_AGENT_URL =
  "https://www.domain.com.au/real-estate-agent/kate-richards-2035247/";
