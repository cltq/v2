"use client";

import { useState, useEffect, useRef } from "react";

const roles = ["Developer", "Photographer", "Normal Person"];

export default function HeroText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const current = roles[roleIndex];

  useEffect(() => {
    const speed = deleting ? 50 : 100;

    if (!deleting && charIndex === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 1500);
      return () => clearTimeout(timeoutRef.current!);
    }

    if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setCharIndex((prev) => prev + (deleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timeoutRef.current!);
  }, [charIndex, deleting, current.length, roleIndex]);

  return (
    <div className="flex items-center justify-center">
      <p className="text-base text-zinc-400">
        I&apos;m a{" "}
        <span className="text-white font-medium">
          {current.slice(0, charIndex)}
        </span>
        <span className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-0.5 animate-blink" />
      </p>
    </div>
  );
}
