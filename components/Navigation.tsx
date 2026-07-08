"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GeistMono } from "geist/font/mono";
import { appRoutes } from "@/app/routes";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

function shouldHighlight(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  return (
    <>
      {/* Desktop — dynamic island at top center */}
      <nav
        className={`${GeistMono.variable} fixed left-1/2 top-4 z-50 hidden -translate-x-1/2 font-mono md:block`}
      >
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#0b0b0f]/80 pl-4 pr-2 py-1.5 backdrop-blur-xl">
          <img
            src="/icon.png"
            alt="Fumi"
            className="shrink-0 self-center mr-5 w-8 h-8"
          />
          {appRoutes.map((route) => {
            const active = shouldHighlight(route.href, pathname);
            return (
              <Link
                key={route.href}
                href={route.href}
                className={`relative rounded-full px-4 py-1.5 text-sm transition-colors duration-200 ${
                  active
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{route.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile — dynamic island with flyout */}
      <nav
        ref={navRef}
        className={`${GeistMono.variable} fixed bottom-6 left-1/2 z-50 -translate-x-1/2 font-mono md:hidden`}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 flex flex-col gap-0.5 rounded-xl bg-[#0b0b0f]/90 px-1.5 py-1.5 backdrop-blur-xl border border-white/10 min-w-[140px] origin-bottom"
              initial={{ opacity: 0, y: 12, scaleY: 0.85 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: 12, scaleY: 0.85 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              {appRoutes.map((route) => {
                const active = shouldHighlight(route.href, pathname);
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={`relative rounded-lg px-3 py-2 text-sm transition-colors duration-200 ${
                      active
                        ? "text-white"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill-mobile"
                        className="absolute inset-0 rounded-lg bg-white/10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{route.name}</span>
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#0b0b0f]/80 pl-4 pr-2 py-1.5 backdrop-blur-xl">
          <img
            src="/icon.png"
            alt="Fumi"
            className="shrink-0 self-center mr-2 w-8 h-8"
          />
          {appRoutes.slice(0, 1).map((route) => {
            const active = shouldHighlight(route.href, pathname);
            return (
              <Link
                key={route.href}
                href={route.href}
                className={`relative rounded-full px-3 py-1.5 text-sm transition-colors duration-200 ${
                  active
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill-mobile-home"
                    className="absolute inset-0 rounded-full bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{route.name}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setOpen(!open)}
            className="relative rounded-full px-2.5 py-1.5 text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
}
