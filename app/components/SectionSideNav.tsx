"use client";

import { useEffect, useState } from "react";
import { homeSections } from "@/app/routes";
import { motion } from "framer-motion";

export default function SectionSideNav() {
  const [activeId, setActiveId] = useState(homeSections[0].id);

  useEffect(() => {
    const root = document.getElementById("scroll-container");
    if (!root) return;

    const observers: IntersectionObserver[] = [];

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveId(id);
          history.replaceState(null, "", `/#${id}`);
        }
      }
    };

    for (const section of homeSections) {
      const el = document.getElementById(section.id);
      if (!el) continue;
      const observer = new IntersectionObserver(handleIntersect, {
        root,
        threshold: 0.6,
      });
      observer.observe(el);
      observers.push(observer);
    }

    return () => {
      for (const obs of observers) obs.disconnect();
    };
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
    history.pushState(null, "", `/#${id}`);
  }

  return (
    <nav
      className="fixed top-0 left-0 z-30 hidden h-full w-48 flex-col justify-center px-8 font-mono md:flex"
      aria-label="Section navigation"
    >
      <ul className="flex flex-col gap-4">
        {homeSections.map((section) => {
          const active = section.id === activeId;
          return (
            <li key={section.id}>
              <button
                onClick={() => scrollTo(section.id)}
                className={`group flex items-center gap-2 text-sm transition-colors duration-200 ${
                  active ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <motion.span
                  className={`transition-colors duration-200 ${
                    active ? "text-white" : "text-zinc-700 group-hover:text-zinc-300"
                  }`}
                  animate={active ? { x: 2 } : { x: 0 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                >
                  —
                </motion.span>
                <span>{section.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
