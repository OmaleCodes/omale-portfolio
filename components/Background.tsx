"use client";

import { useEffect, useRef } from "react";

/**
 * Deep-void backdrop for the whole page:
 *  1. a static dark base gradient (cheap, no repaint)
 *  2. two large blurred color blobs drifting via CSS keyframes (GPU-composited)
 *  3. a canvas starfield of tiny particles drifting at different speeds
 *
 * All motion respects prefers-reduced-motion and pauses when the tab
 * isn't visible, so it never costs anything the user can't see.
 */
export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Particle = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      hue: "cyan" | "purple";
      alpha: number;
    };

    let particles: Particle[] = [];

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = Math.max(40, Math.min(90, Math.floor((width * height) / 18000)));
      particles = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.4,
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.06,
        hue: Math.random() > 0.6 ? "purple" : "cyan",
        alpha: Math.random() * 0.5 + 0.2,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    let frameId: number;
    let visible = true;
    const onVisibility = () => {
      visible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);

    const draw = () => {
      frameId = requestAnimationFrame(draw);
      if (!visible || prefersReducedMotion) return;

      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -5) p.x = width + 5;
        if (p.x > width + 5) p.x = -5;
        if (p.y < -5) p.y = height + 5;
        if (p.y > height + 5) p.y = -5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle =
          p.hue === "cyan"
            ? `rgba(45, 226, 255, ${p.alpha})`
            : `rgba(177, 138, 255, ${p.alpha})`;
        ctx.fill();
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-void">
      {/* base vertical vignette so content areas read darker top/bottom */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(45,226,255,0.08),transparent_60%)]" />

      {/* drifting mesh blobs */}
      <div
        className="absolute -top-1/4 left-[10%] h-[45vw] w-[45vw] max-h-[560px] max-w-[560px] rounded-full bg-signal-cyan/[0.10] blur-[110px] animate-drift-slow"
        aria-hidden
      />
      <div
        className="absolute bottom-[-15%] right-[5%] h-[40vw] w-[40vw] max-h-[520px] max-w-[520px] rounded-full bg-signal-purple/[0.12] blur-[110px] animate-drift-slow-alt"
        aria-hidden
      />

      {/* particle starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* faint grid to reinforce the "engineering schematic" feel */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(232,238,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(232,238,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden
      />
    </div>
  );
}
