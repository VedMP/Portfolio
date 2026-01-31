"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type AccessibilityMode =
    | "none"
    | "protanopia"
    | "deuteranopia"
    | "tritanopia"
    | "achromatopsia"
    | "high-contrast";

interface AccessibilityContextType {
    mode: AccessibilityMode;
    setMode: (mode: AccessibilityMode) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(
    undefined
);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<AccessibilityMode>("none");

    // Load saved preference on mount
    useEffect(() => {
        const savedMode = localStorage.getItem("accessibility-mode") as AccessibilityMode;
        if (savedMode) {
            setMode(savedMode);
        }
    }, []);

    // Apply filter to body when mode changes
    useEffect(() => {
        const root = document.documentElement;

        // Remove all previous filter classes/styles
        root.style.filter = "none";

        if (mode !== "none") {
            // For high contrast, we might want to toggle a class instead/also
            // But for color blindness, SVG filters are best
            root.style.filter = `url(#${mode})`;

            // Save to local storage
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
