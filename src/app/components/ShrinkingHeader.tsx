"use client";

import { useEffect, useRef, useState } from "react";
import { rockslide } from "../fonts";

const navLinks = [
  { href: "#shows", id: "shows", label: "Shows" },
  { href: "#video", id: "video", label: "Video" },
  { href: "#music", id: "music", label: "Music" },
  { href: "#sound", id: "sound", label: "Sound" },
  { href: "#photos", id: "photos", label: "Photos" },
];

const bookingLink = { href: "#booking", id: "booking", label: "Book" };

export function ShrinkingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateHeader = () => {
      setIsScrolled(window.scrollY > 72);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const orderedIds = [...navLinks, bookingLink].map((link) => link.id);
    const sections = orderedIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const visibleIds = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleIds.add(entry.target.id);
          } else {
            visibleIds.delete(entry.target.id);
          }
        });

        // Pick the topmost section currently within the band so overlapping
        // entries in a single callback resolve deterministically.
        const nextActive = orderedIds.find((id) => visibleIds.has(id));
        if (nextActive) {
          setActiveId(nextActive);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // While the mobile menu is open: close it on desktop resize or Escape, lock
  // body scroll, and move focus into the menu (returning it to the toggle on
  // close) so keyboard users aren't stranded behind the overlay.
  useEffect(() => {
    if (!menuOpen) return;

    const closeOnDesktop = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("resize", closeOnDesktop);
    document.addEventListener("keydown", closeOnEscape);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    return () => {
      window.removeEventListener("resize", closeOnDesktop);
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "h-20 border-b border-white/10 bg-[#060606]/80 shadow-[0_16px_40px_rgba(0,0,0,0.42)] backdrop-blur-md"
          : "h-24 bg-[#060606]/20 backdrop-blur-[2px] md:h-28"
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          aria-label="Rock Steady home"
          className={`hero-wordmark ${rockslide.className} block shrink-0 whitespace-nowrap leading-none transition-all duration-500 ease-in-out ${
            isScrolled
              ? "text-3xl md:text-4xl"
              : "text-4xl md:text-6xl lg:text-7xl"
          }`}
        >
          Rock Steady
        </a>

        <nav
          aria-label="Main navigation"
          className={`hidden items-center justify-center gap-1 text-[0.7rem] font-black uppercase sm:gap-2 sm:text-xs lg:flex ${
            isScrolled ? "max-w-[70vw]" : "max-w-full"
          }`}
        >
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`rounded-full border px-3 py-2 transition outline-none focus-visible:ring-2 focus-visible:ring-[#ffcf33] ${
                  isActive
                    ? "border-[var(--rock-steady-red)] bg-[var(--rock-steady-red)] text-white"
                    : "border-white/15 bg-black/35 text-white hover:border-[var(--rock-steady-red)] hover:bg-[var(--rock-steady-red)]"
                }`}
              >
                {link.label}
              </a>
            );
          })}

          <a
            href={bookingLink.href}
            aria-current={activeId === bookingLink.id ? "true" : undefined}
            className={`rounded-full border px-4 py-2 transition outline-none focus-visible:ring-2 focus-visible:ring-[#ffcf33] ${
              activeId === bookingLink.id
                ? "border-[var(--rock-steady-red)] bg-[var(--rock-steady-red)] text-white"
                : "border-[#ffcf33] bg-[#ffcf33] text-black hover:border-[var(--rock-steady-red)] hover:bg-[var(--rock-steady-red)] hover:text-white"
            }`}
          >
            {bookingLink.label}
          </a>
        </nav>

        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <a
            href={bookingLink.href}
            onClick={() => setMenuOpen(false)}
            className="inline-flex h-10 items-center rounded-full bg-[#ffcf33] px-4 text-xs font-black uppercase text-black transition hover:bg-[var(--rock-steady-red)] hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-[#ffcf33]"
          >
            {bookingLink.label}
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white transition hover:border-[var(--rock-steady-red)] hover:bg-[var(--rock-steady-red)] outline-none focus-visible:ring-2 focus-visible:ring-[#ffcf33]"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="h-5 w-5"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav
        ref={menuRef}
        id="mobile-menu"
        aria-label="Mobile navigation"
        inert={!menuOpen}
        className={`absolute left-0 top-full w-full origin-top border-b border-white/10 bg-[#060606]/97 backdrop-blur-md transition-all duration-300 lg:hidden ${
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-2 px-4 py-4 text-sm font-black uppercase sm:px-6">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`rounded-2xl border px-4 py-3 text-center transition outline-none ${
                  isActive
                    ? "border-[var(--rock-steady-red)] bg-[var(--rock-steady-red)] text-white"
                    : "border-white/12 bg-black/35 text-white hover:border-[var(--rock-steady-red)] hover:bg-[var(--rock-steady-red)]"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
