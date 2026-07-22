"use client";

import { useEffect, useState } from "react";

const NAME = "fumi";

export default function TitleUpdater() {
  const [host, setHost] = useState("");

  useEffect(() => {
    setHost(window.location.host);
  }, []);

  useEffect(() => {
    if (!host) return;
    document.title = `${NAME}@${host}`;
  }, [host]);

  return null;
}
