"use client";

import { motion } from "framer-motion";
import { ExternalLink, Award } from "lucide-react";
import Float from "./Float";
import { certifications } from "@/data";

export default function Certifications() {
  return (
    <section id="certifications" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="mb-16 text-center"
      >
        <h2 className="font-display text-3xl font-medium text-ink-primary sm:text-4xl">
          Certifications &amp; achievements
        </h2>
        <p className="mx-auto mt-3 max-w-md font-body text-ink-secondary">
          Swipe through — each one links out to its verification page.
        </p>
      </motion.div>

      <div className="snap-row -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6">
        {certifications.map((cert, index) => (
          <Float
            key={cert.id}
            yOffset={8}
            duration={5.5 + (index % 3)}
            delay={index * 0.2}
            className="snap-start"
          >
            <div className="group glass-panel flex h-full w-72 shrink-0 flex-col p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-glow-purple-lg sm:w-80">
              <div className="mb-5 flex h-28 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02]">
                <Award className="h-10 w-10 text-signal-purple/70" />
              </div>
              <h3 className="font-display text-base font-medium text-ink-primary">
                {cert.name}
              </h3>
              <p className="mt-1 font-mono text-xs text-ink-secondary">
                {cert.issuer} · {cert.issuedDate}
              </p>
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 flex items-center justify-center gap-2 rounded-full glass px-4 py-2 font-body text-xs font-medium text-ink-primary transition-colors hover:text-signal-cyan"
              >
                Verify
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </Float>
        ))}
      </div>
    </section>
  );
}
