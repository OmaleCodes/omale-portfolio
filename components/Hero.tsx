"use client";

import { motion } from "framer-motion";
import { Download, Github, InstagramIcon, Linkedin, TicketCheckIcon, X, type LucideIcon } from "lucide-react";
import Float from "./Float";
import { heroData, socialLinks, type SocialPlatform } from "@/data";

// Kaggle has no official Lucide glyph, so it gets a small inline mark
// sized and stroked to match the surrounding lucide-react icons.
function KaggleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H4.887c-.234 0-.352-.117-.352-.352V.353c0-.235.118-.353.352-.353h3.049c.234 0 .351.118.351.353v14.343l6.288-6.363c.187-.187.351-.28.492-.28h3.239c.164 0 .259.061.283.183.023.121-.007.235-.09.341l-6.622 6.474 6.878 8.507c.093.109.116.201.07.301" />
    </svg>
  );
}

const ICONS: Record<SocialPlatform, LucideIcon | typeof KaggleMark> = {
  github: Github,
  linkedin: Linkedin,
  X: X,
  Instagram: InstagramIcon,
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-32 pb-20 text-center"
    >
      {/* orbiting ring — the "hero image" stand-in: a small satellite tracing
          a slow orbit around a core node, nodding to both AI (network node)
          and robotics (orbital mechanics) without depicting a literal robot */}
      <Float yOffset={16} duration={7} className="mb-10">
        <div className="relative h-28 w-28 sm:h-32 sm:w-32">
          <div className="absolute inset-0 rounded-full border border-signal-cyan/30" />
          <div className="absolute inset-3 rounded-full border border-signal-purple/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-4 w-4 rounded-full bg-gradient-to-br from-signal-cyan to-signal-purple shadow-glow-cyan" />
          </div>
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute -top-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-signal-cyan shadow-glow-cyan" />
          </motion.div>
          <motion.div
            className="absolute inset-3"
            animate={{ rotate: -360 }}
            transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 rounded-full bg-signal-purple shadow-glow-purple" />
          </motion.div>
        </div>
      </Float>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="font-display text-4xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-signal-cyan via-ink-primary to-signal-purple drop-shadow-[0_0_35px_rgba(45,226,255,0.25)] sm:text-6xl"
      >
        {heroData.greeting}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        className="mt-5 font-mono text-sm tracking-wide text-ink-secondary sm:text-base"
      >
        {heroData.tagline}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
        className="mt-6 max-w-xl font-body text-base leading-relaxed text-ink-secondary sm:text-lg"
      >
        {heroData.subline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
        className="mt-10 flex flex-col items-center gap-6 sm:flex-row"
      >
        <Float yOffset={6} duration={4.5}>
          <a
            href={heroData.resumeUrl}
            download
            className="group flex items-center gap-2 rounded-full glass px-6 py-3 font-body text-sm font-medium text-ink-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-cyan-lg"
          >
            <Download className="h-4 w-4 text-signal-cyan transition-transform duration-300 group-hover:-translate-y-0.5" />
            Download CV
          </a>
        </Float>

        <div className="flex items-center gap-3">
          {socialLinks.map((social) => {
            const Icon = ICONS[social.platform];
            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="group grid h-11 w-11 place-items-center rounded-full glass text-ink-secondary transition-all duration-300 hover:-translate-y-1 hover:text-signal-cyan hover:shadow-glow-cyan"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
