"use client";

import { useEffect, useRef } from "react";

const SPACING = 48;
const DOT_RADIUS = 1.2;
const CONNECT_DISTANCE = SPACING * 1.5;
const BASE_ALPHA = 0.03;
const PEAK_ALPHA = 0.2;
const WAVE_WIDTH = 0.35;
const LINE_ALPHA = 0.08;
const SPEED = 0.06;

export default function DotsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const timeRef = useRef(0);
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

    function glow(dx: number, waveWidth: number) {
      const t = 1 - Math.abs(dx) / waveWidth;
      return t > 0 ? t * t : 0;
    }

    function draw(t: number) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dots = dotsRef.current;
      const wavePos = ((t * SPEED) % (w + w * WAVE_WIDTH)) - w * WAVE_WIDTH * 0.5;
      const waveWidth = w * WAVE_WIDTH;

      ctx!.clearRect(0, 0, w, h);

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i];
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (dx * dx + dy * dy < CONNECT_DISTANCE * CONNECT_DISTANCE) {
            const midX = (a.x + b.x) / 2;
            const g = glow(midX - wavePos, waveWidth);
            const alpha = (BASE_ALPHA + g * (PEAK_ALPHA - BASE_ALPHA)) * LINE_ALPHA;
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
        const g = glow(x - wavePos, waveWidth);
        const alpha = BASE_ALPHA + g * (PEAK_ALPHA - BASE_ALPHA);
        ctx!.beginPath();
        ctx!.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx!.fill();
      }
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
