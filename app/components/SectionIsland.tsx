"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GeistMono } from "geist/font/mono";
import { homeSections } from "@/app/routes";

export default function SectionIsland() {
  const [activeId, setActiveId] = useState(homeSections[0].id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      }
    };

    const root = document.querySelector("#scroll-container");

    for (const section of homeSections) {
      const el = document.getElementById(section.id);
      if (!el) continue;
      const observer = new IntersectionObserver(handleIntersect, {
        root,
        threshold: 0.4,
      });
      observer.observe(el);
      observers.push(observer);
    }

    return () => {
      for (const obs of observers) obs.disconnect();
    };
  }, []);

  const active = homeSections.find((s) => s.id === activeId) ?? homeSections[0];

  return (
    <nav
      className={`${GeistMono.variable} fixed left-1/2 top-4 z-50 -translate-x-1/2 font-mono hidden md:block`}
    >
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#0b0b0f]/80 px-5 py-2 backdrop-blur-xl">
        <img src="/icon.png" alt="Fumi" className="w-6 h-6 rounded-full shrink-0" />
        <div className="relative h-5 overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.span
              key={active.id}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute inset-x-0 text-sm text-white whitespace-nowrap"
            >
              {active.name}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
