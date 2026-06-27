"use client";

import { useEffect, useRef } from "react";

const SPACING = 48;
const DOT_RADIUS = 1;
const CURSOR_RADIUS = 150;
const CONNECT_DISTANCE = SPACING * 1.5;
const BASE_ALPHA = 0.04;
const ACTIVE_ALPHA = 0.18;
const LINE_ALPHA = 0.08;

export default function DotsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const dotsRef = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight / 2;
    mouse.current = { x: initialX, y: initialY };
    current.current = { x: initialX, y: initialY };

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

    function draw() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cx = current.current.x;
      const cy = current.current.y;
      const dots = dotsRef.current;

      ctx!.clearRect(0, 0, w, h);

      const active: number[] = [];
      for (let i = 0; i < dots.length; i++) {
        const dx = dots[i].x - cx;
        const dy = dots[i].y - cy;
        if (dx * dx + dy * dy < CURSOR_RADIUS * CURSOR_RADIUS) {
          active.push(i);
        }
      }

      for (let i = 0; i < active.length; i++) {
        for (let j = i + 1; j < active.length; j++) {
          const a = dots[active[i]];
          const b = dots[active[j]];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (dx * dx + dy * dy < CONNECT_DISTANCE * CONNECT_DISTANCE) {
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(255,255,255,${LINE_ALPHA})`;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }

      for (let i = 0; i < dots.length; i++) {
        const { x, y } = dots[i];
        const dx = x - cx;
        const dy = y - cy;
        const distSq = dx * dx + dy * dy;

        let alpha = BASE_ALPHA;
        let radius = DOT_RADIUS;

        if (distSq < CURSOR_RADIUS * CURSOR_RADIUS) {
          const t = 1 - Math.sqrt(distSq) / CURSOR_RADIUS;
          alpha = BASE_ALPHA + t * (ACTIVE_ALPHA - BASE_ALPHA);
          radius = DOT_RADIUS * (1 + t * 0.4);
        }

        ctx!.beginPath();
        ctx!.arc(x, y, radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx!.fill();
      }
    }

    function animate() {
      current.current.x += (mouse.current.x - current.current.x) * 0.45;
      current.current.y += (mouse.current.y - current.current.y) * 0.45;
      draw();
      rafRef.current = requestAnimationFrame(animate);
    }

    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
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
