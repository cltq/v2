"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Instagram", handle: "uqfumi._", href: "https://instagram.com/uqfumi._" },
  { label: "TikTok", handle: "w.fysk_fumi", href: "https://tiktok.com/@w.fysk_fumi" },
  { label: "EasyDonate", handle: "ivnfumi", href: "https://easydonate.app/ivnfumi" },
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

  return <span className="text-white">{time}</span>;
}

const item = (
  <div className="flex items-center gap-6 whitespace-nowrap text-sm">
    <span className="flex items-center gap-2">
      <Clock />
      <span className="text-zinc-600">Bangkok</span>
    </span>
    <span className="text-zinc-700">//</span>
    {links.map((link) => (
      <span key={link.label} className="flex items-center gap-1.5">
        <span className="text-zinc-500">{link.label}:</span>
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-zinc-300 transition-colors duration-200"
        >
          {link.handle}
        </a>
      </span>
    ))}
    <span className="text-zinc-600 select-none">✦</span>
  </div>
);

export default function InfiniteMarquee() {
  return (
    <div className="group relative overflow-hidden border-t border-white/5 bg-[#020817] py-2">
      <div
        className="flex animate-marquee group-hover:[animation-play-state:paused]"
        style={{ width: "max-content" }}
      >
        <div className="flex shrink-0">{item}</div>
        <div className="flex shrink-0">{item}</div>
      </div>
    </div>
  );
}
