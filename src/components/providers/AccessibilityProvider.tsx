"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type AccessibilityMode =
  | "none"
  | "high-contrast"
  | "achromatopsia"
  | "protanopia"
  | "deuteranopia"
  | "tritanopia";

interface AccessibilityContextType {
  mode: AccessibilityMode;
  setMode: (mode: AccessibilityMode) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AccessibilityMode>(() => {
    if (typeof window === "undefined") return "none";
    const saved = localStorage.getItem("accessibility-mode") as AccessibilityMode | null;
    return saved && saved !== "none" ? saved : "none";
  });

  useEffect(() => {
    const root = document.documentElement;

    // Clean up previous attributes
    root.removeAttribute("data-contrast");
    root.removeAttribute("data-vision");
    root.style.filter = "";

    if (mode === "high-contrast") {
      root.setAttribute("data-contrast", "high");
    } else if (mode === "achromatopsia") {
      root.setAttribute("data-vision", "achromatopsia");
    } else if (mode === "protanopia" || mode === "deuteranopia" || mode === "tritanopia") {
      root.setAttribute("data-vision", mode);
    }

    if (mode !== "none") {
      localStorage.setItem("accessibility-mode", mode);
    } else {
      localStorage.removeItem("accessibility-mode");
    }
  }, [mode]);

  return (
    <AccessibilityContext.Provider value={{ mode, setMode }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
}
