"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const roles = ["Developer", "Photographer", "Normal Person"];

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
        <span className="relative inline-flex items-center justify-center min-w-[140px] h-[1.5em] align-middle">
          <AnimatePresence mode="wait">
            <motion.span
              key={roles[index]}
              className="absolute text-white left-1/2 -translate-x-1/2 whitespace-nowrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {roles[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      </p>
    </div>
  );
}
