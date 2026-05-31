import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
      <div className="grid items-start gap-12 md:grid-cols-[1fr_1.2fr]">
        <SectionHeading eyebrow="Who you're working with" title="About Kate" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="space-y-5 text-base leading-relaxed text-muted"
        >
          <p>
            I'm Kate — a Perth-based new home sales consultant with{" "}
            <span className="text-text-primary">New Home Matchmaker</span>. I help
            people find the right house-and-land package without the showroom
            pressure.
          </p>
          <p>
            I come from a high-performance background, and I bring the same focus
            here: do the homework, be straight about pricing, and only put
            options in front of you that genuinely stack up.
          </p>
          <p>
            No fluff, no chasing. Just honest guidance on builders, blocks and
            what your budget really gets you — at whatever pace suits you.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
