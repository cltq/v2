"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tech = [
  { name: "Next.js", href: "https://nextjs.org" },
  { name: "TypeScript", href: "https://typescriptlang.org" },
  { name: "Tailwind CSS", href: "https://tailwindcss.com" },
  { name: "Framer Motion", href: "https://framer.com/motion" },
  { name: "Bun", href: "https://bun.sh" },
  { name: "Geist Mono", href: "https://vercel.com/font" },
];

export default function Footer() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ left: 0 });

  useEffect(() => {
    if (open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({ left: rect.left + rect.width / 2 });
    }
  }, [open]);

  return (
    <>
      <footer className="grid grid-cols-3 items-center px-8 py-4 text-[10px] text-zinc-600">
        <div className="hidden md:flex items-center gap-2 justify-self-start">
          <span className="text-zinc-700">//</span>
          {tech.map((t, i) => (
            <span key={t.name}>
              <a
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
              >
                {t.name}
              </a>
              {i < tech.length - 1 && <span className="text-zinc-700 ml-2">·</span>}
            </span>
          ))}
        </div>
        <div className="flex md:hidden justify-self-start">
          <button
            ref={btnRef}
            onClick={() => setOpen(true)}
            className="text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
            aria-label="View sources"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </div>
        <p className="text-center justify-self-center">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-zinc-500">Fumi</span>
        </p>
        <div />
      </footer>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="absolute flex flex-col gap-3 rounded-xl border border-white/10 bg-[#0b0b0f]/95 p-6 backdrop-blur-xl min-w-[200px] origin-bottom"
              style={{ left: pos.left, bottom: "calc(56px + env(safe-area-inset-bottom, 0px) + 50px)", transform: "translateX(-50%)" }}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[13px] text-zinc-400">sources</span>
                <button
                  onClick={() => setOpen(false)}
                  className="text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
                  aria-label="Close"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <div className="h-px bg-white/5" />
              <div className="flex flex-col gap-2">
                {tech.map((t) => (
                  <a
                    key={t.name}
                    href={t.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
                  >
                    {t.name}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
