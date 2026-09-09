"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certifications" },
];

export default function Navbar() {
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(
      (el): el is Element => !!el
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.1, 0.3, 0.6] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-5 left-1/2 z-50 -translate-x-1/2 px-4 w-full max-w-fit"
    >
      <nav className="glass flex items-center gap-1 rounded-full px-2 py-2 shadow-glow-cyan/40 sm:gap-2 sm:px-3">
        {LINKS.map((link) => {
          const isActive = active === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              className={`relative rounded-full px-3 py-1.5 font-body text-[13px] transition-colors sm:px-4 sm:text-sm ${
                isActive ? "text-void" : "text-ink-secondary hover:text-ink-primary"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-signal-cyan to-signal-purple shadow-glow-cyan"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              {link.label}
            </a>
          );
        })}
      </nav>
    </motion.header>
  );
}
