"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#shows", label: "Shows" },
  { href: "#music", label: "Music" },
  { href: "#photos", label: "Photos" },
  { href: "#booking", label: "Booking" },
];

export function ShrinkingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => {
      setIsScrolled(window.scrollY > 72);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

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
          className={`relative block shrink-0 transition-all duration-500 ${
            isScrolled
              ? "h-14 w-24 md:h-16 md:w-32"
              : "h-28 w-48 md:h-40 md:w-80"
          }`}
        >
          <Image
            src="/images/rock-steady-logo.png"
            alt="Rock Steady - It's a Rock Party!"
            fill
            priority
            sizes={isScrolled ? "128px" : "(min-width: 768px) 320px, 192px"}
            className="object-contain drop-shadow-[0_0_28px_rgba(255,0,0,0.36)]"
          />
        </a>

        <nav
          aria-label="Main navigation"
          className={`flex flex-wrap items-center justify-center gap-1 text-[0.7rem] font-black uppercase sm:gap-2 sm:text-xs ${
            isScrolled ? "max-w-[70vw]" : "max-w-full"
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full border border-white/15 bg-black/35 px-3 py-2 text-white transition hover:border-[#ff2b1f] hover:bg-[#ff2b1f] focus:outline-none focus:ring-2 focus:ring-[#ffcf33]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
