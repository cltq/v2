"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AskModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AskModal({ open, onClose }: AskModalProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }
  }, [open, onClose]);

  function reset() {
    setName("");
    setMessage("");
    setSending(false);
    setSent(false);
  }

  function handleClose() {
    reset();
    onClose();
  }

  async function handleSubmit() {
    if (!message.trim() || sending) return;
    setSending(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      if (res.ok) {
        setSent(true);
        setTimeout(() => handleClose(), 1200);
      }
    } catch {
    } finally {
      setSending(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center font-[family-name:var(--font-chakra-petch)]">
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            aria-hidden="true"
          />

          <motion.div
            className="relative w-full max-w-md rounded-2xl border border-white/20 bg-[#111113]/90 p-8 shadow-[0_0_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
            role="dialog"
            aria-modal="true"
            aria-label="ถามอะไรสักหน่อย"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-base font-medium tracking-tight text-white/90">
                ถามอะไรสักหน่อย
              </h2>
              <button
                onClick={handleClose}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-white/80"
                aria-label="ปิด"
              >
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-3 py-8"
                >
                  <svg
                    className="h-8 w-8 text-white/80"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span className="text-sm text-white/60">ส่งแล้ว</span>
                </motion.div>
              ) : (
                <motion.div key="form" exit={{ opacity: 0 }}>
                  <div className="mb-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="ชื่อ (ถ้าอยากใส่)"
                      className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-white/90 placeholder-zinc-600 outline-none transition-colors focus:border-white/[0.12] focus:bg-white/[0.05]"
                    />
                  </div>

                  <textarea
                    ref={inputRef}
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="อยากถามอะไร?"
                    className="w-full resize-none rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 text-sm leading-relaxed text-white/90 placeholder-zinc-600 outline-none transition-colors focus:border-white/[0.12] focus:bg-white/[0.05]"
                  />

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={handleSubmit}
                      disabled={!message.trim() || sending}
                      className="rounded-lg bg-white/[0.08] px-4 py-1.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/[0.14] disabled:pointer-events-none disabled:opacity-30"
                    >
                      {sending ? "กำลังส่ง..." : "ส่ง"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
