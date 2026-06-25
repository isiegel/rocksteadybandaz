"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { rockslide } from "../fonts";

const navLinks = [
  { href: "#shows", id: "shows", label: "Shows" },
  { href: "#video", id: "video", label: "Video" },
  { href: "#music", id: "music", label: "Music" },
  { href: "#photos", id: "photos", label: "Photos" },
];

const bookingLink = { href: "#booking", id: "booking", label: "Book" };

export function ShrinkingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Close the mobile menu once the viewport grows to the desktop nav.
  useEffect(() => {
    if (!menuOpen) return;

    const closeOnDesktop = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    window.addEventListener("resize", closeOnDesktop);
    return () => window.removeEventListener("resize", closeOnDesktop);
  }, [menuOpen]);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "h-20 border-b border-white/10 bg-[#060606]/92 shadow-[0_16px_40px_rgba(0,0,0,0.42)] backdrop-blur-md"
          : "h-44 bg-[#060606]/20 backdrop-blur-[2px] md:h-56"
      }`}
    >
      <div
        className={`mx-auto flex h-full max-w-7xl px-4 transition-all duration-500 sm:px-6 lg:px-8 ${
          isScrolled
            ? "items-center justify-between gap-3"
            : "flex-col items-center justify-center gap-3 pt-3"
        }`}
      >
        <a
          href="#top"
          aria-label="Rock Steady home"
          className={`relative block shrink-0 transition-all duration-500 ease-in-out ${
            isScrolled
              ? "h-10 w-40 md:h-12 md:w-56"
              : "h-28 w-48 md:h-40 md:w-80"
          }`}
        >
          <Image
            src="/images/rock-steady-logo.png"
            alt="Rock Steady - It's a Rock Party!"
            fill
            priority
            sizes="(min-width: 768px) 320px, 192px"
            className={`object-contain drop-shadow-[0_0_28px_rgba(255,0,0,0.36)] transition-opacity duration-500 ease-in-out ${
              isScrolled ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            aria-hidden="true"
            className={`${rockslide.className} absolute inset-0 flex items-center whitespace-nowrap text-3xl leading-none text-[#FD0A04] drop-shadow-[0_0_28px_rgba(255,0,0,0.36)] transition-opacity duration-500 ease-in-out md:text-4xl ${
              isScrolled ? "opacity-100" : "opacity-0"
            }`}
          >
            Rock Steady
          </span>
        </a>

        <nav
          aria-label="Main navigation"
          className={`hidden items-center justify-center gap-1 text-[0.7rem] font-black uppercase sm:gap-2 sm:text-xs md:flex ${
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
                className={`rounded-full border px-3 py-2 transition focus:outline-none focus:ring-2 focus:ring-[#ffcf33] ${
                  isActive
                    ? "border-[#ff2b1f] bg-[#ff2b1f] text-white"
                    : "border-white/15 bg-black/35 text-white hover:border-[#ff2b1f] hover:bg-[#ff2b1f]"
                }`}
              >
                {link.label}
              </a>
            );
          })}

          <a
            href={bookingLink.href}
            aria-current={activeId === bookingLink.id ? "true" : undefined}
            className={`rounded-full border px-4 py-2 transition focus:outline-none focus:ring-2 focus:ring-[#ffcf33] ${
              activeId === bookingLink.id
                ? "border-[#ff2b1f] bg-[#ff2b1f] text-white"
                : "border-[#ffcf33] bg-[#ffcf33] text-black hover:border-[#ff2b1f] hover:bg-[#ff2b1f] hover:text-white"
            }`}
          >
            {bookingLink.label}
          </a>
        </nav>

        <div className="absolute right-4 top-4 flex items-center gap-2 sm:right-6 md:hidden">
          <a
            href={bookingLink.href}
            onClick={() => setMenuOpen(false)}
            className="inline-flex h-10 items-center rounded-full bg-[#ffcf33] px-4 text-xs font-black uppercase text-black transition hover:bg-[#ff2b1f] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#ffcf33]"
          >
            {bookingLink.label}
          </a>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white transition hover:border-[#ff2b1f] hover:bg-[#ff2b1f] focus:outline-none focus:ring-2 focus:ring-[#ffcf33]"
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
        id="mobile-menu"
        aria-label="Mobile navigation"
        className={`absolute left-0 top-full w-full origin-top border-b border-white/10 bg-[#060606]/97 backdrop-blur-md transition-all duration-300 md:hidden ${
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
                className={`rounded-2xl border px-4 py-3 transition focus:outline-none focus:ring-2 focus:ring-[#ffcf33] ${
                  isActive
                    ? "border-[#ff2b1f] bg-[#ff2b1f] text-white"
                    : "border-white/12 bg-black/35 text-white hover:border-[#ff2b1f] hover:bg-[#ff2b1f]"
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
