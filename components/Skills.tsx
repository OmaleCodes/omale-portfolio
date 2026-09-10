"use client";

import { motion } from "framer-motion";
import Float from "./Float";
import { skillClusters, type Skill } from "@/data";

function SkillBadge({ skill, accent, index }: { skill: Skill; accent: "cyan" | "purple"; index: number }) {
  const glow = accent === "cyan" ? "hover:shadow-glow-cyan-lg" : "hover:shadow-glow-purple-lg";
  const dot = accent === "cyan" ? "bg-signal-cyan" : "bg-signal-purple";

  return (
    <Float
      yOffset={9 + (index % 3) * 2}
      xOffset={index % 2 === 0 ? 5 : -5}
      duration={5 + (index % 4)}
      delay={index * 0.25}
    >
      <div
        className={`group flex items-center gap-2 rounded-full glass px-4 py-2 font-mono text-xs text-ink-primary transition-all duration-300 hover:-translate-y-1.5 sm:text-sm ${glow}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
        {skill.name}
      </div>
    </Float>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="mb-16 text-center"
      >
        <h2 className="font-display text-3xl font-medium text-ink-primary sm:text-4xl">
          What I build with
        </h2>
        <p className="mx-auto mt-3 max-w-md font-body text-ink-secondary">
          Three layers, stacked from silicon to software.
        </p>
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {skillClusters.map((cluster) => (
          <div
            key={cluster.id}
            className="glass-panel relative overflow-hidden p-7"
          >
            <div
              className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl ${
                cluster.accent === "cyan" ? "bg-signal-cyan/10" : "bg-signal-purple/10"
              }`}
            />
            <h3 className="font-display text-lg font-medium text-ink-primary">
              {cluster.title}
            </h3>
            <p className="mt-1 mb-6 font-body text-sm text-ink-secondary">
              {cluster.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {cluster.skills.map((skill, i) => (
                <SkillBadge key={skill.name} skill={skill} accent={cluster.accent} index={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
