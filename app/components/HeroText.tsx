"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="flex items-center justify-center">
      <p className="text-base text-zinc-400">
        I&apos;m a{" "}
        <AnimatePresence mode="wait">
          <motion.span
            key={roles[index]}
            className="inline-block text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {roles[index]}
          </motion.span>
        </AnimatePresence>
      </p>
    </div>
  );
}
