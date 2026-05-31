// Shared site constants — links, copy fragments, external URLs.

export const SITE = {
  name: "Katie Rich Homes",
  domain: "katierich.com.au",
  instagram: "https://www.instagram.com/katierichhomes",
  instagramHandle: "@katierichhomes",
  email: "kate@newhomematchmaker.com.au",
};

// New Home Matchmaker (the business Kate sells for).
export const NHMM_URL = "https://www.newhomematchmaker.com.au";

// Neptune Finance — Kate's mortgage-broker mentor's brokerage.
export const NEPTUNE = {
  base: "https://www.neptunefinance.com.au",
  discoveryCall:
    "https://www.neptunefinance.com.au/book-a-free-15-minute-discovery-call",
  calculators: "https://www.neptunefinance.com.au/calculators",
  contact: "https://www.neptunefinance.com.au/contact",
};

// Featured NHMM house-and-land packages (curated subset).
export interface Package {
  suburb: string;
  config: string; // e.g. "4 x 2"
  price: string;
  blurb: string;
  url: string;
}

export const packages: Package[] = [
  {
    suburb: "Duncraig",
    config: "4 x 2",
    price: "$949,990",
    blurb:
      "Established northern-suburbs pocket — leafy streets, great schools, close to the coast.",
    url: NHMM_URL,
  },
  {
    suburb: "Lake Coogee",
    config: "4 x 2",
    price: "$879,990",
    blurb:
      "Family living minutes from the water, with parks and the lake reserve on the doorstep.",
    url: NHMM_URL,
  },
  {
    suburb: "Alkimos",
    config: "4 x 2",
    price: "$849,990",
    blurb:
      "Growing coastal community to the north — beaches, new amenities and strong value.",
    url: NHMM_URL,
  },
];
