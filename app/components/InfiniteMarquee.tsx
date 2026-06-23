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

function Items({ prefix }: { prefix: string }) {
  return (
    <>
      <span key={`${prefix}-clock`} className="flex items-center gap-1.5">
        <Clock />
        <span className="text-zinc-600">Bangkok</span>
      </span>
      <span key={`${prefix}-s1`} className="text-zinc-700">//</span>
      {links.map((link) => (
        <span key={`${prefix}-${link.label}`} className="flex items-center gap-1.5">
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
      <span key={`${prefix}-star`} className="text-zinc-600 select-none">✦</span>
    </>
  );
}

export default function InfiniteMarquee() {
  return (
    <div className="group overflow-hidden pb-2 max-md:pl-14">
      <div
        className="flex items-center gap-6 animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap text-sm"
        style={{ width: "max-content" }}
      >
        <Items prefix="a" />
        <Items prefix="b" />
      </div>
    </div>
  );
}
