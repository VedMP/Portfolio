"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

interface ToastContextType {
  toast: (message: string, type?: "success" | "error" | "info") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = (
    message: string,
    type: "success" | "error" | "info" = "success"
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000);
    return () => clearTimeout(timer);
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-5 right-5 z-[120] flex flex-col gap-2 pointer-events-none max-w-sm w-[calc(100%-2.5rem)]"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-surface text-foreground shadow-xl border border-border-strong text-xs font-mono"
          >
            <div className="flex items-center gap-2">
              {t.type === "success" && (
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
              )}
              {t.type === "error" && (
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              )}
              {t.type === "info" && (
                <Info className="w-4 h-4 text-muted shrink-0" />
              )}
              <span>{t.message}</span>
            </div>
            <button
              type="button"
              onClick={() =>
                setToasts((prev) => prev.filter((item) => item.id !== t.id))
              }
              aria-label="Dismiss notification"
              className="text-subtle hover:text-foreground p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
