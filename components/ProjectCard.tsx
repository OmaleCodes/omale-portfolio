"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import Float from "./Float";
import type { Project } from "@/data";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
      className="group glass-panel flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-glow-cyan-lg"
    >
      {/* 16:9 video embed placeholder — swap the src in data.ts per project */}
      <div className="relative aspect-video w-full overflow-hidden border-b border-white/[0.08] bg-void-panel">
        <iframe
          src={project.videoEmbedUrl}
          title={`${project.title} demo`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-medium text-ink-primary">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-ink-secondary">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.map((tech, i) => (
            <Float key={tech} yOffset={4} duration={4 + (i % 3)} delay={i * 0.15}>
              <span className="rounded-full glass px-2.5 py-1 font-mono text-[10px] text-ink-secondary sm:text-[11px]">
                {tech}
              </span>
            </Float>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`View ${project.title} source on GitHub`}
            className="flex items-center gap-2 font-mono text-xs text-ink-secondary transition-colors hover:text-signal-cyan"
          >
            <Github className="h-4 w-4" />
            Source
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-signal-cyan transition-colors hover:text-signal-purple"
            >
              Live demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
