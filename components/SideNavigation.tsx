"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GeistMono } from "geist/font/mono";
import { appRoutes } from "@/app/routes";
import { motion } from "framer-motion";

function shouldHighlight(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function SideNavigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop — fixed left sidebar */}
      <nav
        className={`${GeistMono.variable} fixed left-0 top-0 z-50 hidden h-full w-48 flex-col justify-center px-8 font-mono md:flex`}
        aria-label="Main navigation"
      >
        <ul className="flex flex-col gap-4">
          {appRoutes.map((route) => {
            const active = shouldHighlight(route.href, pathname);
            return (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className={`group flex items-center gap-2 text-sm transition-colors duration-200 ${
                    active
                      ? "text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <span
                    className={`transition-colors duration-200 ${
                      active
                        ? "text-white"
                        : "text-zinc-700 group-hover:text-zinc-300"
                    }`}
                  >
                    —
                  </span>
                  <span>{route.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile — bottom pill bar */}
      <nav
        className={`${GeistMono.variable} fixed bottom-6 left-1/2 z-50 -translate-x-1/2 font-mono md:hidden`}
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#0b0b0f]/80 px-3 py-2 backdrop-blur-xl">
          {appRoutes.map((route) => {
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
                    layoutId="nav-pill-mobile"
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
    </>
  );
}
