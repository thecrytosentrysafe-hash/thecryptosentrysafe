"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  showSendModal: boolean;
  showReceiveModal: boolean;
  openSendModal: () => void;
  closeSendModal: () => void;
  openReceiveModal: () => void;
  closeReceiveModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [showSendModal, setShowSendModal] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        showSendModal,
        showReceiveModal,
        openSendModal: () => setShowSendModal(true),
        closeSendModal: () => setShowSendModal(false),
        openReceiveModal: () => setShowReceiveModal(true),
        closeReceiveModal: () => setShowReceiveModal(false),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
