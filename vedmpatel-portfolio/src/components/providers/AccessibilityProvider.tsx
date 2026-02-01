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

        // Use requestAnimationFrame for smoother filter transitions on mobile
        const frameId = requestAnimationFrame(() => {
            // Remove all previous filter classes/styles
            root.style.filter = "none";
            root.style.willChange = "auto";
            root.classList.remove("accessibility-filter-active");

            if (mode !== "none") {
                // Use native CSS filters for better performance where possible
                let filterValue = "";

                switch (mode) {
                    case "achromatopsia":
                        // Native CSS grayscale is much faster than SVG filter
                        filterValue = "grayscale(100%)";
                        break;
                    case "high-contrast":
                        // Native CSS contrast is faster than SVG
                        filterValue = "contrast(1.2) brightness(1.1)";
                        break;
                    default:
                        // Color blindness simulations still need SVG matrix transforms
                        // Add will-change hint for GPU acceleration
                        root.style.willChange = "filter";
                        filterValue = `url(#${mode})`;
                        break;
                }

                root.style.filter = filterValue;
                root.classList.add("accessibility-filter-active");

                // Save to local storage
                localStorage.setItem("accessibility-mode", mode);
            } else {
                localStorage.removeItem("accessibility-mode");
            }
        });

        // Cleanup on unmount or mode change
        return () => cancelAnimationFrame(frameId);
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
