"use client";

import { useState, createContext, useContext, ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CommandTerminal from "@/components/features/CommandTerminal";

interface TerminalContextType {
  openTerminal: () => void;
  closeTerminal: () => void;
  isTerminalOpen: boolean;
}

const TerminalContext = createContext<TerminalContextType>({
  openTerminal: () => {},
  closeTerminal: () => {},
  isTerminalOpen: false,
});

export const useTerminal = () => useContext(TerminalContext);

export default function ClientShell({ children }: { children: ReactNode }) {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  return (
    <TerminalContext.Provider
      value={{
        openTerminal: () => setIsTerminalOpen(true),
        closeTerminal: () => setIsTerminalOpen(false),
        isTerminalOpen,
      }}
    >
      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />
      <main id="main-content" className="flex-grow">
        {children}
      </main>
      <Footer onOpenTerminal={() => setIsTerminalOpen(true)} />
      <CommandTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </TerminalContext.Provider>
  );
}
