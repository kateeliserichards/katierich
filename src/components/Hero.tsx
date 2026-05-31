import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useHlsVideo, HERO_VIDEO_SRC } from "../hooks/useHlsVideo";
import logo from "../assets/logo.png";

const ROLE_WORDS = ["choose", "design", "build", "settle into"];

function scrollTo(href: string) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Hero() {
  const videoRef = useHlsVideo(HERO_VIDEO_SRC);
  const rootRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  // role line cycles every 2s
  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % ROLE_WORDS.length),
      2000,
    );
    return () => clearInterval(id);
  }, []);

  // GSAP entrance / name-reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-reveal]",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.2,
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={rootRef} className="relative min-h-screen overflow-hidden">
      {/* HLS background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* dim overlay + bottom fade into bg */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-bg" />

      {/* content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <p
          data-hero-reveal
          className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-text-primary/80"
        >
          New Home Sales · Perth WA
        </p>

        {/* headline: large logo image + display fallback line */}
        <img
          data-hero-reveal
          src={logo}
          alt="katierich"
          className="mb-2 w-[min(90vw,560px)] drop-shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
        />
        <h1
          data-hero-reveal
          className="font-display text-3xl italic text-text-primary sm:text-4xl"
        >
          Find your match.
        </h1>

        {/* role line */}
        <p
          data-hero-reveal
          className="mt-6 text-lg text-text-primary/90 sm:text-xl"
        >
          Helping you{" "}
          <span
            key={roleIndex}
            className="animate-role-fade-in inline-block font-medium text-accent"
          >
            {ROLE_WORDS[roleIndex]}
          </span>{" "}
          your new home.
        </p>

        <p
          data-hero-reveal
          className="mt-5 max-w-xl text-sm leading-relaxed text-text-primary/70 sm:text-base"
        >
          I match buyers to the right builder and block — no pushy sales pitch.
          It all happens over text or WhatsApp, on your timeline.
        </p>

        <div data-hero-reveal className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => scrollTo("#listings")}
            className="accent-gradient rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            View listings
          </button>
          <button
            onClick={() => scrollTo("#how-it-works")}
            className="rounded-full border border-stroke bg-bg/40 px-6 py-3 text-sm font-semibold text-text-primary backdrop-blur transition-colors hover:border-accent"
          >
            How it works
          </button>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-text-primary/40 p-1">
          <span className="animate-scroll-down h-2 w-1 rounded-full bg-text-primary/70" />
        </div>
      </div>
    </section>
  );
}
