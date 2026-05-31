import { motion } from "framer-motion";

interface Props {
  eyebrow?: string;
  title: string;
  className?: string;
}

/**
 * Section heading with the logo's red gradient swoosh underline.
 * `title` renders in the display (Instrument Serif) italic face.
 */
export default function SectionHeading({ eyebrow, title, className = "" }: Props) {
  return (
    <div className={className}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-accent"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="font-display text-4xl italic leading-tight sm:text-5xl"
      >
        <span className="swoosh-underline">{title}</span>
      </motion.h2>
    </div>
  );
}
