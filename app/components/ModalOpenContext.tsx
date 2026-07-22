"use client";

import { createContext, useContext } from "react";

const ModalOpenContext = createContext(false);

export const ModalOpenProvider = ModalOpenContext.Provider;

export function useModalOpen() {
  return useContext(ModalOpenContext);
}
