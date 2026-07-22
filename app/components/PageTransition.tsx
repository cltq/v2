"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return (
    <div
      className="h-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition:
          "opacity 0.35s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
    >
      {children}
    </div>
  );
}
