"use client";

import { useState, useEffect } from "react";

const roles = ["test1", "test2", "test3"];

export default function HeroText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="inline-flex items-center rounded-full border border-white/40 px-6 py-2 text-lg text-white">
        Hi, I&apos;m fumi
      </div>
      <p className="text-sm text-zinc-400">
        I&apos;m a <span className="text-white">{roles[index]}</span>
      </p>
    </div>
  );
}
