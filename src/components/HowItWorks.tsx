import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const STEPS = [
  {
    n: "01",
    title: "Quick chat",
    body: "A few questions over text or WhatsApp — budget, area, must-haves. No call required.",
  },
  {
    n: "02",
    title: "Get matched",
    body: "I come back with 2–3 tailored house-and-land packages that genuinely fit the brief.",
  },
  {
    n: "03",
    title: "Refine & decide",
    body: "We narrow it down — tweak the block, the build, the numbers — until it's right.",
  },
  {
    n: "04",
    title: "Colours, finance & build",
    body: "Selections, finance via Neptune, and into build. I stay on it through to handover.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-6xl px-6 py-24 sm:py-32"
    >
      <SectionHeading eyebrow="The process" title="How it works" className="mb-4" />
      <p className="mb-12 text-sm text-muted">
        No face-to-face sales pitch unless you want one.
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.n}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="gradient-border rounded-2xl border border-stroke bg-surface p-6"
          >
            <span className="font-display text-3xl italic text-accent">
              {step.n}
            </span>
            <h3 className="mb-2 mt-3 text-base font-semibold text-text-primary">
              {step.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted">{step.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
