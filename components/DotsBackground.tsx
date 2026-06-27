"use client";

import { useEffect, useRef } from "react";

const SPACING = 48;
const DOT_RADIUS = 1.2;
const CONNECT_DISTANCE = SPACING * 1.5;
const LEFT_ALPHA = 0.16;
const RIGHT_ALPHA = 0.02;
const LINE_ALPHA = 0.06;

export default function DotsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const dotsRef = useRef<{ x: number; y: number }[]>([]);

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

      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;
      const dots: { x: number; y: number }[] = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({ x: c * SPACING, y: r * SPACING });
        }
      }
      dotsRef.current = dots;
    }

    resize();
    window.addEventListener("resize", resize);

    function gradient(x: number, w: number) {
      const t = x / w;
      return LEFT_ALPHA + t * (RIGHT_ALPHA - LEFT_ALPHA);
    }

    function draw() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dots = dotsRef.current;

      ctx!.clearRect(0, 0, w, h);

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i];
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (dx * dx + dy * dy < CONNECT_DISTANCE * CONNECT_DISTANCE) {
            const midX = (a.x + b.x) / 2;
            const alpha = gradient(midX, w) * LINE_ALPHA;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }

      for (let i = 0; i < dots.length; i++) {
        const { x, y } = dots[i];
        const alpha = gradient(x, w);
        ctx!.beginPath();
        ctx!.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx!.fill();
      }
    }

    function animate() {
      draw();
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
