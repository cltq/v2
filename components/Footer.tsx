"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
  { name: "Next.js", href: "https://nextjs.org", desc: "React framework" },
  { name: "React", href: "https://react.dev", desc: "UI library" },
  { name: "TypeScript", href: "https://typescriptlang.org", desc: "Type-safe JavaScript" },
  { name: "Tailwind CSS", href: "https://tailwindcss.com", desc: "Utility-first CSS" },
  { name: "Framer Motion", href: "https://framer.com/motion", desc: "Animation library" },
  { name: "Geist Mono", href: "https://vercel.com/font", desc: "Monospace font" },
  { name: "Turndown", href: "https://github.com/mixmark-io/turndown", desc: "HTML to Markdown" },
  { name: "Bun", href: "https://bun.sh", desc: "JavaScript runtime" },
  { name: "ESLint", href: "https://eslint.org", desc: "Code linter" },
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
        <div className="hidden md:flex items-center justify-self-start">
          <button
            ref={btnRef}
            onClick={() => setOpen(true)}
            className="flex items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
            aria-label="View all projects"
          >
            <span className="text-zinc-700">//</span>
            <span>Next.js</span>
          </button>
        </div>
        <div className="flex md:hidden justify-self-start">
          <button
            ref={btnRef}
            onClick={() => setOpen(true)}
            className="flex items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
            aria-label="View all projects"
          >
            <span className="text-zinc-700">//</span>
            <span>Next.js</span>
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
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="absolute flex flex-col gap-3 rounded-xl border border-white/10 bg-[#0b0b0f]/95 p-6 backdrop-blur-xl min-w-[260px] max-w-[320px] origin-bottom"
              style={{
                left: typeof window !== "undefined" && window.innerWidth < 768
                  ? pos.left
                  : "2rem",
                bottom: typeof window !== "undefined" && window.innerWidth < 768
                  ? "calc(56px + env(safe-area-inset-bottom, 0px) + 50px)"
                  : "calc(52px + env(safe-area-inset-bottom, 0px))",
                transform: typeof window !== "undefined" && window.innerWidth < 768
                  ? "translateX(-50%)"
                  : "none",
              }}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[13px] text-zinc-400">projects</span>
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
                {projects.map((p) => (
                  <a
                    key={p.name}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-baseline justify-between gap-3 text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
                  >
                    <span>{p.name}</span>
                    <span className="text-[10px] text-zinc-700 group-hover:text-zinc-500 transition-colors duration-200">{p.desc}</span>
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
