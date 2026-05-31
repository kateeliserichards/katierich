import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { NEPTUNE } from "../data/site";

const SERVICES = [
  {
    title: "New Home Sales",
    body: "Matching buyers to house-and-land packages that actually fit — then managing the journey from first chat to handover.",
  },
  {
    title: "House & Land Guidance",
    body: "Straight talk on blocks, builders and inclusions — what's genuinely included, and what only looks like it is.",
  },
  {
    title: "Finance, Sorted",
    body: "Partnered with Neptune Finance so the money side is handled by a licensed broker. No rates or credit advice from me.",
    href: NEPTUNE.base,
  },
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading eyebrow="What I do" title="Services" className="mb-12" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="gradient-border group rounded-2xl border border-stroke bg-surface p-7"
          >
            <div className="accent-gradient mb-5 h-1 w-10 rounded-full" />
            <h3 className="mb-3 text-lg font-semibold text-text-primary">
              {s.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted">{s.body}</p>
            {s.href && (
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-medium text-accent transition-colors hover:text-text-primary"
              >
                About finance ↗
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
