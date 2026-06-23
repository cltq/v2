"use client";

import { useEffect, useRef, useState } from "react";

export default function GridBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const rafIdRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const initialX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
    const initialY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
    mouseRef.current = { x: initialX, y: initialY };
    currentRef.current = { x: initialX, y: initialY };

    let running = false;

    const animateLoop = () => {
      if (!el) return;

      currentRef.current.x += (mouseRef.current.x - currentRef.current.x) * 0.45;
      currentRef.current.y += (mouseRef.current.y - currentRef.current.y) * 0.45;

      el.style.setProperty("--x", `${currentRef.current.x}px`);
      el.style.setProperty("--y", `${currentRef.current.y}px`);

      rafIdRef.current = requestAnimationFrame(animateLoop);
    };

    const handleMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      if (!running) {
        running = true;
        setActive(true);
        rafIdRef.current = requestAnimationFrame(animateLoop);
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 bg-[#0b0b0f]"
      style={{
        ["--x" as string]: "50%",
        ["--y" as string]: "50%",
        contain: "strict",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          animation: "gridFadeIn 0.8s ease-out forwards",
          opacity: 0,
          willChange: "opacity",
        }}
      />

      {active && (
        <>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
              maskImage: `radial-gradient(circle 160px at var(--x) var(--y), white, transparent 70%)`,
              WebkitMaskImage: `radial-gradient(circle 160px at var(--x) var(--y), white, transparent 70%)`,
              willChange: "mask-image",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.16) 2px, transparent 2px),
                linear-gradient(90deg, rgba(255,255,255,0.16) 2px, transparent 2px)
              `,
              backgroundSize: "48px 48px",
              maskImage: `radial-gradient(circle 100px at var(--x) var(--y), white, transparent 70%)`,
              WebkitMaskImage: `radial-gradient(circle 100px at var(--x) var(--y), white, transparent 70%)`,
              willChange: "mask-image",
            }}
          />
        </>
      )}
    </div>
  );
}
