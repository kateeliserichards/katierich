import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { listings, DOMAIN_AGENT_URL } from "../data/listings";

function Spec({ value, label }: { value: number; label: string }) {
  return (
    <span className="flex items-center gap-1 text-sm text-text-primary/90">
      <span className="font-semibold">{value}</span>
      <span className="text-xs text-muted">{label}</span>
    </span>
  );
}

export default function FeaturedListings() {
  return (
    <section id="listings" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Current packages"
        title="Featured listings"
        className="mb-12"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((l, i) => (
          <motion.a
            key={l.id}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="gradient-border group relative overflow-hidden rounded-2xl border border-stroke bg-surface"
          >
            {/* image + halftone overlay */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={l.image}
                alt={l.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="halftone absolute inset-0 opacity-40 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />

              {/* hover label */}
              <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="rounded-full bg-bg/80 px-3 py-1.5 text-xs font-medium text-text-primary backdrop-blur">
                  View on Domain — {l.suburb} ↗
                </span>
              </div>

              {/* price chip */}
              <span className="accent-gradient absolute left-4 top-4 rounded-full px-3 py-1 text-sm font-semibold text-white">
                {l.price}
              </span>
            </div>

            <div className="p-5">
              <p className="mb-3 text-sm font-medium leading-snug text-text-primary">
                {l.title}
              </p>
              <div className="flex items-center gap-4">
                <Spec value={l.beds} label="bed" />
                <Spec value={l.baths} label="bath" />
                <Spec value={l.parking} label="car" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      <p className="mt-8 text-xs leading-relaxed text-muted">
        Listings and pricing current as shown on Domain and subject to change.
        Full portfolio on my{" "}
        <a
          href={DOMAIN_AGENT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline-offset-2 hover:underline"
        >
          Domain agent profile
        </a>
        .
      </p>
    </section>
  );
}
