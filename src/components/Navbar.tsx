import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Listings", href: "#listings" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function scrollTo(href: string) {
  const el = document.querySelector(href);
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed left-1/2 top-4 z-50 -translate-x-1/2">
      <div
        className={`flex items-center gap-1 rounded-full border border-stroke px-2 py-2 backdrop-blur-md transition-colors sm:gap-2 ${
          scrolled ? "bg-surface/80" : "bg-surface/40"
        }`}
      >
        {/* logo image inside a red gradient ring */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#home");
          }}
          className="accent-gradient ml-1 grid h-9 w-9 place-items-center rounded-full p-[2px]"
          aria-label="Katie Rich Homes — home"
        >
          <span className="grid h-full w-full place-items-center overflow-hidden rounded-full bg-bg">
            <img src={logo} alt="Katie Rich Homes" className="h-5 w-auto" />
          </span>
        </a>

        <ul className="hidden items-center gap-1 px-2 sm:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(l.href);
                }}
                className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:text-text-primary"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#contact");
          }}
          className="gradient-border rounded-full bg-bg px-4 py-1.5 text-sm font-medium text-text-primary transition-colors hover:bg-surface"
        >
          Get in touch ↗
        </a>
      </div>
    </nav>
  );
}
