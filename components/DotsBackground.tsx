"use client";

import { useEffect, useRef } from "react";

export default function DotsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    function draw(t: number) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx!.clearRect(0, 0, w, h);

      const breathe = (Math.sin(t * 0.0008) + 1) / 2;
      const centerX = breathe * w;
      const glowWidth = w * 0.45;

      const grad = ctx!.createRadialGradient(centerX, h / 2, 0, centerX, h / 2, glowWidth);
      grad.addColorStop(0, "rgba(255,255,255,0.045)");
      grad.addColorStop(0.4, "rgba(255,255,255,0.015)");
      grad.addColorStop(1, "rgba(255,255,255,0)");

      ctx!.fillStyle = grad;
      ctx!.fillRect(0, 0, w, h);
    }

    function animate(ts: number) {
      timeRef.current = ts;
      draw(ts);
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ backgroundColor: "#0b0b0f" }}
    />
  );
}
