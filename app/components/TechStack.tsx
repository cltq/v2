"use client";

import { motion } from "framer-motion";

const stacks = [
  {
    name: "React",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-2.09c-1.38-.18-2.5-1.3-2.5-2.68 0-1.52 1.23-2.75 2.75-2.75.41 0 .8.09 1.16.26l.59-1.88C12.42 6.92 11.23 6.6 10 6.6V4.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v2.1c1.38.18 2.5 1.3 2.5 2.68 0 1.52-1.23 2.75-2.75 2.75-.41 0-.8-.09-1.16-.26l-.59 1.88c.46.29 1.05.46 1.7.46v2.09c0 .83-.67 1.5-1.5 1.5S11 17.33 11 16.5z",
  },
  {
    name: "Next.js",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.36 14.3L12 11.2V7h-2v5.4l3.76 5.1c.36.49 1.06.59 1.56.2.49-.38.61-1.04.26-1.52l-.16-.08z",
  },
  {
    name: "Python",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-2c-1.5-.2-2.75-1.45-2.75-3S9.5 8.5 11 8.3V6.5c-2.5.2-4.5 2.3-4.5 4.8s2 4.6 4.5 4.8v.4c1.5-.2 2.75-1.45 2.75-3s-1.25-2.8-2.75-3v-.4c2.5-.2 4.5 1.9 4.5 4.4s-2 4.6-4.5 4.8v2h2v-2c1.5.2 2.75 1.45 2.75 3s-1.25 2.8-2.75 3v2h-2z",
  },
  {
    name: "Visual Studio Code",
    icon: "M17.59 3.59c-.38-.38-.89-.59-1.42-.59H7.83c-.53 0-1.04.21-1.42.59L2.59 7.17c-.78.78-.78 2.05 0 2.83l3.82 3.58v4.83c0 .53.21 1.04.59 1.41l1.41 1.42c.38.38.89.59 1.42.59h5.66c.53 0 1.04-.21 1.42-.59l1.41-1.42c.38-.37.59-.88.59-1.41v-4.83l3.82-3.58c.78-.78.78-2.05 0-2.83l-3.82-3.58zM12 15.5l-4-3.5 4-3.5 4 3.5-4 3.5z",
  },
  { name: "Vercel", icon: "M12 2L2 19.5h20L12 2z" },
  {
    name: "Cloudflare",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
  },
  {
    name: "Git",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z",
  },
  {
    name: "Bun",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14H9v-2h2v-2H9v-2h3V8h2v8h-2z",
  },
  {
    name: "Windows",
    icon: "M3 3h8.5v8.5H3V3zm9.5 0H21v8.5h-8.5V3zM3 12.5h8.5V21H3v-8.5zm9.5 0H21V21h-8.5v-8.5z",
  },
  { name: "Arch Linux", icon: "M12 2L2 19.5h20L12 2zm0 4l6.5 11.5h-13L12 6z" },
  {
    name: "Debian",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-5l4-8h-2l-4 8h2z",
  },
];

export default function TechStack() {
  return (
    <div className="flex w-full max-w-2xl flex-wrap justify-center gap-2">
      {stacks.map((item, i) => (
        <motion.div
          key={item.name}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: i * 0.04 }}
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-zinc-300 transition-colors duration-200 hover:border-white/25 hover:text-white"
        >
          <svg className="h-4 w-4 shrink-0 fill-current text-zinc-400" viewBox="0 0 24 24">
            <path d={item.icon} />
          </svg>
          {item.name}
        </motion.div>
      ))}
    </div>
  );
}
