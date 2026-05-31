import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = ["Find", "Build", "Move in"];
const DURATION = 2700; // ms, 000 → 100

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [gone, setGone] = useState(false);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let raf = 0;
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const pct = Math.min(100, Math.round((elapsed / DURATION) * 100));
      setProgress(pct);
      if (elapsed < DURATION) {
        raf = requestAnimationFrame(tick);
      } else {
        // brief beat at 100 before revealing the page
        setTimeout(() => setGone(true), 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // rotate the centre word across the load
  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % WORDS.length),
      DURATION / WORDS.length,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          {/* top-left label */}
          <div className="flex items-start justify-between p-6 sm:p-8">
            <span className="text-sm font-medium tracking-wide text-text-primary">
              Katie Rich Homes
            </span>
          </div>

          {/* centre rotating word */}
          <div className="flex flex-1 items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="font-display text-5xl italic text-text-primary sm:text-7xl"
              >
                {WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* progress bar */}
          <div className="px-6 pb-6 sm:px-8 sm:pb-8">
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-stroke">
              <div
                className="accent-gradient h-full rounded-full transition-[width] duration-150 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-3 flex justify-end">
              <span className="font-display text-2xl italic tabular-nums text-muted">
                {String(progress).padStart(3, "0")}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
