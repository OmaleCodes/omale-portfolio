"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatProps {
  children: ReactNode;
  className?: string;
  /** vertical bob distance in px */
  yOffset?: number;
  /** subtle horizontal drift in px — set 0 to disable */
  xOffset?: number;
  /** one full bob cycle, in seconds */
  duration?: number;
  /** stagger start time so nearby elements don't bob in lockstep */
  delay?: number;
}

/**
 * Wraps children in a slow, continuous "anti-gravity" bob loop.
 * Kept as its own layer (separate from any hover transform) so the
 * looping animation and hover lift never fight over the same transform.
 */
export default function Float({
  children,
  className,
  yOffset = 12,
  xOffset = 0,
  duration = 5,
  delay = 0,
}: FloatProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -yOffset, 0],
        x: xOffset ? [0, xOffset, 0] : undefined,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
