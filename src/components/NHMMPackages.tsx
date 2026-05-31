import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { packages } from "../data/site";

export default function NHMMPackages() {
  return (
    <section id="packages" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Featured house & land"
        title="NHMM packages"
        className="mb-12"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((p, i) => (
          <motion.a
            key={p.suburb}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="gradient-border group flex flex-col rounded-2xl border border-stroke bg-surface p-7"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full border border-stroke px-3 py-1 text-xs font-medium text-muted">
                {p.config}
              </span>
              <span className="font-display text-2xl italic text-accent">
                {p.price}
              </span>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-text-primary">
              {p.suburb}
            </h3>
            <p className="flex-1 text-sm leading-relaxed text-muted">{p.blurb}</p>
            <span className="mt-5 text-sm font-medium text-accent transition-colors group-hover:text-text-primary">
              View package ↗
            </span>
          </motion.a>
        ))}
      </div>

      <p className="mt-8 text-xs text-muted">Packages via New Home Matchmaker.</p>
    </section>
  );
}
