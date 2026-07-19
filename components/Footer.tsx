"use client";

import { useEffect, useRef } from "react";

const names = ["Yuki", "Fumi", "Reni"];
const ITEM_HEIGHT_EM = 1.2;
const HOLD_MS = 2500;
const SLIDE_MS = 350;
const CYCLE_MS = (HOLD_MS + SLIDE_MS) * names.length;

export default function Footer() {
  const innerRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef(0);
  const startRef = useRef(0);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    function tick(now: number) {
      if (!startRef.current) startRef.current = now;
      const elapsed = (now - startRef.current) % CYCLE_MS;
      const index = Math.floor(elapsed / (HOLD_MS + SLIDE_MS));
      const phaseElapsed = elapsed - index * (HOLD_MS + SLIDE_MS);
      const offset = phaseElapsed > HOLD_MS
        ? (phaseElapsed - HOLD_MS) / SLIDE_MS
        : 0;
      const y = -(index + Math.min(offset, 1)) * ITEM_HEIGHT_EM;
      el!.style.transform = `translateY(${y}em)`;
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <footer className="flex items-center justify-between px-8 py-6 pb-[calc(24px+env(safe-area-inset-bottom,0px))] text-[13px] text-zinc-600">
      <p className="flex items-center gap-2">
        <span>&copy; {new Date().getFullYear()}</span>
        <span className="inline-flex overflow-hidden align-bottom" style={{ height: `${ITEM_HEIGHT_EM}em` }}>
          <span ref={innerRef} className="flex flex-col will-change-transform">
            {[...names, names[0]].map((name, i) => (
              <span key={`${name}-${i}`} className="text-white whitespace-nowrap" style={{ height: `${ITEM_HEIGHT_EM}em`, lineHeight: `${ITEM_HEIGHT_EM}em` }}>
                {name}
              </span>
            ))}
          </span>
        </span>
      </p>
      <p>All rights reserved. Do not use my informations.</p>
    </footer>
  );
}
