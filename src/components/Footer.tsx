import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useHlsVideo, HERO_VIDEO_SRC } from "../hooks/useHlsVideo";
import { SITE } from "../data/site";
import logo from "../assets/logo.png";

const MARQUEE_TEXT = "YOUR NEW HOME STARTS HERE • ";

export default function Footer() {
  const videoRef = useHlsVideo(HERO_VIDEO_SRC);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // GSAP marquee
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        xPercent: -50,
        repeat: -1,
        duration: 30,
        ease: "none",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* background video, flipped vertically + heavier overlay */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full scale-y-[-1] object-cover"
      />
      <div className="absolute inset-0 bg-black/65" />
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-bg to-transparent" />

      <div className="relative z-10">
        {/* marquee */}
        <div className="overflow-hidden border-y border-stroke/60 py-6">
          <div ref={marqueeRef} className="flex w-max whitespace-nowrap">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="font-display text-3xl italic text-text-primary/80 sm:text-4xl"
              >
                {MARQUEE_TEXT}
              </span>
            ))}
          </div>
        </div>

        {/* contact CTA */}
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
          <h2 className="font-display text-4xl italic sm:text-5xl">
            <span className="swoosh-underline">Let's find your match.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-text-primary/80">
            Send a message and tell me roughly what you're after. No call, no
            pressure — I'll come back with a couple of options.
          </p>
          {/* TODO: business email — swap SITE.email for the real address. */}
          <a
            href={`mailto:${SITE.email}`}
            className="accent-gradient mt-8 inline-block rounded-full px-8 py-4 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            Get in touch ↗
          </a>
        </div>

        {/* footer bar */}
        <div className="border-t border-stroke/60 bg-bg/70 backdrop-blur">
          <div className="mx-auto max-w-6xl px-6 py-12">
            <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
              <img src={logo} alt="Katie Rich Homes" className="h-8 w-auto" />

              <div className="flex items-center gap-6">
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-text-primary"
                >
                  Instagram {SITE.instagramHandle}
                </a>
                <span className="flex items-center gap-2 text-sm text-text-primary/80">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                  </span>
                  Available for new clients
                </span>
              </div>
            </div>

            {/* compliance block */}
            <div className="mt-10 space-y-2 border-t border-stroke/60 pt-8 text-xs leading-relaxed text-muted">
              <p>
                Kate Richards — Sales Representative, New Home Matchmaker, 2A
                Gemstone Blvd, Carine WA 6020.
              </p>
              <p>
                Finance services provided by Neptune Finance Australia Pty Ltd
                (ACN 665 738 303), Australian Credit Licence 384324. Information
                on this site is general only and not credit assistance or
                financial advice.
              </p>
              {/* TODO: add Kate's credit rep authorisation details once issued. */}
              <p className="pt-4 text-muted/70">
                © {new Date().getFullYear()} Katie Rich Homes · katierich.com.au
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
