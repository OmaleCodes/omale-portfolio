"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data";

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="mb-16 text-center"
      >
        <h2 className="font-display text-3xl font-medium text-ink-primary sm:text-4xl">
          Things I&apos;ve shipped
        </h2>
        <p className="mx-auto mt-3 max-w-md font-body text-ink-secondary">
          Robotics and AI demos, from simulation to the physical world.
        </p>
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
