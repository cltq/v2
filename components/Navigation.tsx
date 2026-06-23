"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GeistMono } from "geist/font/mono";
import { appRoutes } from "@/app/routes";

function shouldHighlight(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = (
    <ul className="space-y-2">
      {appRoutes.map((route) => {
        const active = shouldHighlight(route.href, pathname);
        return (
          <li key={route.href}>
            <Link
              href={route.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 font-mono text-sm transition-colors duration-200 ${
                active ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {active ? (
                <span>一 [ </span>
              ) : (
                <span className="text-zinc-500">—</span>
              )}
              {route.name}
              {active && <span> ]</span>}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <button
        aria-label="Toggle navigation"
        onClick={() => setOpen(!open)}
        className="fixed left-4 top-4 z-50 flex size-9 items-center justify-center rounded border border-white/10 bg-[#020817] text-white md:hidden"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {open ? (
            <path d="M4 4l8 8M12 4l-8 8" />
          ) : (
            <path d="M2 4h12M2 8h12M2 12h12" />
          )}
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`${GeistMono.variable} fixed left-0 top-0 z-50 flex h-screen w-[180px] flex-col items-start justify-center bg-transparent px-4 font-mono transition-transform duration-300 max-md:${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {links}
      </aside>
    </>
  );
}
