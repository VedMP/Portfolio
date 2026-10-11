"use client";

import { useState, useRef, useEffect } from "react";
import { Eye, Check, ChevronDown } from "lucide-react";
import { useAccessibility, AccessibilityMode } from "@/components/providers/AccessibilityProvider";

const modes: { id: AccessibilityMode; label: string }[] = [
  { id: "none", label: "Default" },
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
        className="p-1.5 rounded text-neutral-500 dark:text-neutral-400 hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center gap-1"
        aria-label="Vision accessibility settings"
        aria-expanded={isOpen}
      >
        <Eye className="w-4 h-4" />
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 py-1.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg z-50 text-xs font-mono">
          <div className="px-3 py-1.5 border-b border-neutral-100 dark:border-neutral-800 mb-1">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400">
              Color Filter
            </span>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {modes.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setMode(m.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${
                  mode === m.id
                    ? "text-neutral-900 dark:text-neutral-100 font-medium bg-neutral-50 dark:bg-neutral-800/60"
                    : "text-neutral-600 dark:text-neutral-400"
                }`}
              >
                <span>{m.label}</span>
                {mode === m.id && <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-neutral-100" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
