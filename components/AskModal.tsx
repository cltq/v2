"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AskModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AskModal({ open, onClose }: AskModalProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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
    setImage(null);
    setImagePreview(null);
    setSending(false);
    setSent(false);
  }

  function handleClose() {
    reset();
    onClose();
  }

  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) return;
    setImage(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit() {
    if (!message.trim() || sending) return;
    setSending(true);

    const body = new FormData();
    body.set("name", name);
    body.set("message", message);
    if (image) body.set("image", image);

    try {
      const res = await fetch("/api/ask", { method: "POST", body });
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

                    <div className="mt-3">
                      {imagePreview ? (
                        <div className="relative inline-block">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="h-20 rounded-lg object-cover ring-1 ring-white/[0.08]"
                          />
                          <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
                          >
                            <svg
                              className="h-2.5 w-2.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-2 rounded-lg border border-dashed border-white/[0.08] px-3 py-2 text-xs text-zinc-500 transition-colors hover:border-white/[0.15] hover:text-zinc-300"
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
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                          </svg>
                          แนบรูป
                        </button>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageSelect}
                      />
                    </div>

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
