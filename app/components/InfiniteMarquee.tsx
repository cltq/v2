"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Instagram", handle: "uqfumi._", href: "https://instagram.com/uqfumi._", hover: "hover:text-pink-400" },
  { label: "TikTok", handle: "w.fysk_fumi", href: "https://tiktok.com/@w.fysk_fumi", hover: "hover:text-cyan-400" },
  { label: "EasyDonate", handle: "ivnfumi", href: "https://easydonate.app/ivnfumi", hover: "hover:text-emerald-400" },
];

function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Bangkok",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(formatter.format(now));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="flex items-center gap-1.5">
      <span className="font-mono text-white">{time}</span>
      {/* <span className="text-zinc-600">Bangkok</span> */}
    </span>
  );
}

function Items() {
  return (
    <span className="flex items-center gap-6 whitespace-nowrap">
      <Clock />
      <span className="text-zinc-700">//</span>
      {links.map((link) => (
        <span key={link.label} className="flex items-center gap-1.5">
          <span className="text-zinc-500">{link.label}:</span>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-white ${link.hover} transition-colors duration-200`}
          >
            {link.handle}
          </a>
        </span>
      ))}
      <span className="text-zinc-700 text-xs">+</span>
    </span>
  );
}

export default function InfiniteMarquee() {
  return (
    <div className="group overflow-hidden">
      <div
        className="flex w-max items-center animate-marquee group-hover:[animation-play-state:paused] text-[13px] will-change-transform"
        aria-hidden="true"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <Items key={i} />
        ))}
      </div>
    </div>
  );
}
