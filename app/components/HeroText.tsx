"use client";

import { useState, useEffect } from "react";

const roles = ["Developer", "Photographer", "Normal Person"];
const charWidth = 9.6;

function textWidth(text: string): number {
  return text.length * charWidth + 8;
}

export default function HeroText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <p className="text-base text-zinc-400">
        I&apos;m a{" "}
        <span
          className="relative inline-flex items-center justify-center h-[1.5em] align-middle overflow-hidden"
          style={{
            width: textWidth(roles[index]),
            transition: "width 0.25s ease-out",
          }}
        >
          <span
            key={index}
            className="absolute text-white left-1/2 whitespace-nowrap"
            style={{
              animation: "heroTextIn 0.25s ease-out forwards",
              transform: "translateX(-50%)",
            }}
          >
            {roles[index]}
          </span>
        </span>
      </p>
    </div>
  );
}
