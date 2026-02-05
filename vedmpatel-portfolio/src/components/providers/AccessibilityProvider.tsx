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
        // const savedMode = localStorage.getItem("accessibility-mode") as AccessibilityMode;
        // if (savedMode) {
        //     setMode(savedMode);
        // }
    }, []);

    // Apply filter to body when mode changes
    useEffect(() => {
        const root = document.documentElement;

        // Use requestAnimationFrame for smoother filter transitions on mobile
        const frameId = requestAnimationFrame(() => {
            // Remove all previous filter classes/styles
            root.style.filter = "none";
            root.classList.remove("accessibility-filter-active");

            if (mode !== "none") {
                // Use CSS-only filters for maximum performance
                // These are GPU-accelerated and much lighter than SVG filters
                let filterValue = "";

                switch (mode) {
                    case "protanopia":
                        // Red-blind: shift hues and reduce red saturation
                        filterValue = "sepia(20%) saturate(120%) hue-rotate(-10deg)";
                        break;
                    case "deuteranopia":
                        // Green-blind: shift hues toward yellow/blue
                        filterValue = "sepia(30%) saturate(110%) hue-rotate(20deg)";
                        break;
                    case "tritanopia":
                        // Blue-blind: shift toward red/green spectrum
                        filterValue = "sepia(40%) saturate(130%) hue-rotate(-30deg)";
                        break;
                    case "achromatopsia":
                        // Monochromacy: complete grayscale
                        filterValue = "grayscale(100%)";
                        break;
                    case "high-contrast":
                        // High contrast mode
                        filterValue = "contrast(1.3) brightness(1.05)";
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
