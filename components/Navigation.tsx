"use client";

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

  return (
    <>
      <aside
        className={`${GeistMono.variable} fixed left-0 top-0 z-50 hidden h-svh w-[180px] flex-col items-start justify-center bg-transparent px-4 font-mono md:flex`}
      >
        <ul className="space-y-1">
          {appRoutes.map((route) => (
            <li key={route.href}>
              <Link
                href={route.href}
                className={`font-mono text-sm transition-colors duration-200 ${
                  shouldHighlight(route.href, pathname)
                    ? "text-white"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                <span className="inline-block w-4 text-center">
                  {shouldHighlight(route.href, pathname) ? "一" : "―"}
                </span>{" "}
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <nav
        className={`${GeistMono.variable} fixed bottom-0 left-0 z-50 flex h-14 w-full items-center justify-center gap-8 font-mono text-sm md:hidden pb-[env(safe-area-inset-bottom,0px)]`}
      >
        {appRoutes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`transition-colors duration-200 ${
              shouldHighlight(route.href, pathname)
                ? "text-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {route.name}
          </Link>
        ))}
      </nav>
    </>
  );
}
