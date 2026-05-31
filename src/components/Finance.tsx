import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { NEPTUNE } from "../data/site";

// COMPLIANCE: This section deliberately contains NO borrowing-power /
// repayment calculators and NO "get approved" / credit-advice copy under
// Kate's name. All credit content lives on Neptune's own site, behind the
// links below.
//
// COMPLIANCE: Insert Kate's own Credit Representative number here once she is
// authorised, and confirm the exact required wording with Neptune Finance
// before any credit-related content goes live under her name.
// e.g. const KATE_CREDIT_REP = "Credit Representative Number XXXXXX";

const LINKS = [
  { label: "Book a Discovery Call", href: NEPTUNE.discoveryCall, solid: true },
  { label: "Calculators", href: NEPTUNE.calculators, solid: false },
  { label: "Contact Neptune", href: NEPTUNE.contact, solid: false },
];

export default function Finance() {
  return (
    <section id="finance" className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
      <div className="gradient-border rounded-3xl border border-stroke bg-surface p-8 sm:p-12">
        <SectionHeading eyebrow="The money side" title="Finance" className="mb-6" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            Finance is handled by my mentor,{" "}
            <span className="text-text-primary">Chris Herbert</span>, at{" "}
            <span className="text-text-primary">Neptune Finance</span> — a
            licensed mortgage brokerage. For anything to do with borrowing,
            repayments or approvals, you're in good hands with Chris and his
            team, directly on Neptune's own pages.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  l.solid
                    ? "accent-gradient rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
                    : "rounded-full border border-stroke px-6 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-accent"
                }
              >
                {l.label} ↗
              </a>
            ))}
          </div>

          <p className="mt-8 text-xs leading-relaxed text-muted">
            Information here is general only and is not credit assistance or
            financial advice. Finance services are provided by Neptune Finance.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
