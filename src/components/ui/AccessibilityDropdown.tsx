"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Check, ChevronDown } from "lucide-react";
import { useAccessibility, AccessibilityMode } from "@/components/providers/AccessibilityProvider";

const modes: { id: AccessibilityMode; label: string }[] = [
    { id: "none", label: "Normal Vision" },
    { id: "protanopia", label: "Protanopia (Red-Blind)" },
    { id: "deuteranopia", label: "Deuteranopia (Green-Blind)" },
    { id: "tritanopia", label: "Tritanopia (Blue-Blind)" },
    { id: "achromatopsia", label: "Achromatopsia (Mono)" },
    { id: "high-contrast", label: "High Contrast" },
];

export default function AccessibilityDropdown() {
    const { mode, setMode } = useAccessibility();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
                aria-label="Accessibility settings"
                aria-expanded={isOpen}
            >
                <Eye className="w-5 h-5" />
                <span className="text-xs font-medium hidden md:inline-block">View</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50"
                    >
                        <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                Color Mode
                            </span>
                        </div>

                        <div className="max-h-64 overflow-y-auto">
                            {modes.map((m) => (
                                <button
                                    key={m.id}
                                    onClick={() => {
                                        setMode(m.id);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${mode === m.id
                                            ? "text-blue-600 dark:text-blue-400 font-medium"
                                            : "text-slate-700 dark:text-slate-300"
                                        }`}
                                >
                                    {m.label}
                                    {mode === m.id && <Check className="w-4 h-4" />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
