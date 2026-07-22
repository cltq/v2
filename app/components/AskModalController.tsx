"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import AskModal from "@/components/AskModal";

export default function AskModalController() {
  const pathname = usePathname();
  const router = useRouter();
  const isOpen = pathname === "/ask";

  const close = useCallback(() => {
    router.push("/");
  }, [router]);

  return <AskModal open={isOpen} onClose={close} />;
}
