"use client";

import { createContext, useContext, ReactNode } from "react";

interface TransitionContextType {
  navigate: (url: string) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export function TransitionProvider({ children }: { children: ReactNode }) {
  // Expose navigation method
  const navigate = (url: string) => {
    // Dispatch a custom event that Preloader can listen to
    const event = new CustomEvent("start-transition", { detail: { url } });
    window.dispatchEvent(event);
  };

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransition must be used within a TransitionProvider");
  }
  return context;
}
