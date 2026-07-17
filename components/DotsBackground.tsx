"use client";

import { useEffect, useRef } from "react";

const SPACING = 80;
const DOT_RADIUS = 1.8;
const CONNECT_DISTANCE = SPACING * 1.5;
const BASE_ALPHA = 0.03;
const PEAK_ALPHA = 0.18;
const LINE_ALPHA = 0.06;
const BREATH_SPEED = 0.0008;
const MAX_RADIUS_RATIO = 0.6;

export default function DotsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const dotsRef = useRef<{ x: number; y: number }[]>([]);
  const gridRef = useRef<Map<string, number[]>>(new Map());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function buildGrid() {
      const grid = new Map<string, number[]>();
      const dots = dotsRef.current;
      for (let i = 0; i < dots.length; i++) {
        const gx = Math.floor(dots[i].x / CONNECT_DISTANCE);
        const gy = Math.floor(dots[i].y / CONNECT_DISTANCE);
        const key = `${gx},${gy}`;
        const arr = grid.get(key);
        if (arr) arr.push(i);
        else grid.set(key, [i]);
      }
      gridRef.current = grid;
    }

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
      buildGrid();
    }

    resize();
    window.addEventListener("resize", resize);

    function draw(t: number) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dots = dotsRef.current;
      const grid = gridRef.current;
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.sqrt(cx * cx + cy * cy) * MAX_RADIUS_RATIO;

      const breath = Math.sin(t * BREATH_SPEED) * 0.5 + 0.5;
      const currentRadius = maxR * (0.4 + breath * 0.6);

      ctx!.clearRect(0, 0, w, h);

      const drawn = new Set<string>();

      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        const gx = Math.floor(a.x / CONNECT_DISTANCE);
        const gy = Math.floor(a.y / CONNECT_DISTANCE);

        for (let ddx = -1; ddx <= 1; ddx++) {
          for (let ddy = -1; ddy <= 1; ddy++) {
            const key = `${gx + ddx},${gy + ddy}`;
            const cell = grid.get(key);
            if (!cell) continue;
            for (let k = 0; k < cell.length; k++) {
              const j = cell[k];
              if (j <= i) continue;
              const b = dots[j];
              const dx = a.x - b.x;
              const dy = a.y - b.y;
              if (dx * dx + dy * dy < CONNECT_DISTANCE * CONNECT_DISTANCE) {
                const pairKey = i < j ? `${i}:${j}` : `${j}:${i}`;
                if (!drawn.has(pairKey)) {
                  drawn.add(pairKey);
                  const mx = (a.x + b.x) / 2;
                  const my = (a.y + b.y) / 2;
                  const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
                  const g = Math.max(0, 1 - dist / currentRadius);
                  const alpha = (BASE_ALPHA + g * g * (PEAK_ALPHA - BASE_ALPHA)) * LINE_ALPHA;
                  ctx!.beginPath();
                  ctx!.moveTo(a.x, a.y);
                  ctx!.lineTo(b.x, b.y);
                  ctx!.strokeStyle = `rgba(255,255,255,${alpha})`;
                  ctx!.lineWidth = 1;
                  ctx!.stroke();
                }
              }
            }
          }
        }
      }

      for (let i = 0; i < dots.length; i++) {
        const { x, y } = dots[i];
        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
        const g = Math.max(0, 1 - dist / currentRadius);
        const alpha = BASE_ALPHA + g * g * (PEAK_ALPHA - BASE_ALPHA);
        ctx!.beginPath();
        ctx!.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx!.fill();
      }
    }

    function animate(ts: number) {
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
