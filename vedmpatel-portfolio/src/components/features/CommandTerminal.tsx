"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from "lucide-react";
import { PERSONAL_INFO, PROJECTS, SKILL_GROUPS } from "@/core/data";

interface CommandTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export default function CommandTerminal({ isOpen, onClose }: CommandTerminalProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: "welcome",
      output: (
        <div className="text-slate-400 space-y-1">
          <div>VED PATEL SYSTEMS CONSOLE v2.0 (Cloudflare Edge Runtime)</div>
          <div>Type <span className="text-sky-400 font-bold">help</span> to list available commands.</div>
        </div>
      ),
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [commandList, setCommandList] = useState<string[]>([]);
  const [isMaximized, setIsMaximized] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Scroll to bottom on new output
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Handle global Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or toggle
        }
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCommand = async (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    setCommandList((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    let output: React.ReactNode = null;

    switch (trimmed) {
      case "help":
        output = (
          <div className="space-y-1 text-xs">
            <div className="text-sky-400 font-semibold mb-1">AVAILABLE COMMANDS:</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div><span className="text-emerald-400 font-bold">bio</span> — Background summary</div>
              <div><span className="text-emerald-400 font-bold">gpa</span> — Academic standing</div>
              <div><span className="text-emerald-400 font-bold">skills</span> — Verified tech stack</div>
              <div><span className="text-emerald-400 font-bold">projects</span> — Key architecture specs</div>
              <div><span className="text-emerald-400 font-bold">telemetry</span> — Cloudflare Edge status</div>
              <div><span className="text-emerald-400 font-bold">resume</span> — Open verified resume</div>
              <div><span className="text-emerald-400 font-bold">clear</span> — Wipe terminal output</div>
              <div><span className="text-emerald-400 font-bold">exit</span> — Close terminal</div>
            </div>
          </div>
        );
        break;

      case "bio":
        output = (
          <div className="text-xs space-y-1">
            <div className="text-white font-semibold">{PERSONAL_INFO.name}</div>
            <div className="text-slate-300">{PERSONAL_INFO.subheadline}</div>
            <div className="text-slate-400">Location: {PERSONAL_INFO.location}</div>
          </div>
        );
        break;

      case "gpa":
        output = (
          <div className="text-xs space-y-1">
            <div className="text-emerald-400 font-bold">ACADEMIC STANDING:</div>
            <div>Institution: <span className="text-white">{PERSONAL_INFO.institution}</span></div>
            <div>Degree: <span className="text-white">{PERSONAL_INFO.degree}</span></div>
            <div>Cumulative GPA: <span className="text-emerald-400 font-bold">{PERSONAL_INFO.gpa}</span></div>
            <div>Honors: <span className="text-sky-400">{PERSONAL_INFO.academicStanding}</span></div>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="text-xs space-y-2">
            {SKILL_GROUPS.map((g) => (
              <div key={g.name}>
                <span className="text-sky-400 font-semibold">{g.name}: </span>
                <span className="text-slate-300">{g.skills.join(", ")}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="text-xs space-y-2">
            {PROJECTS.map((p, i) => (
              <div key={p.id} className="border-b border-slate-800 pb-1">
                <div className="text-white font-semibold">[{i + 1}] {p.title}</div>
                <div className="text-slate-400">{p.subtitle}</div>
                <div className="text-sky-400">Stack: {p.tags.join(" • ")}</div>
              </div>
            ))}
          </div>
        );
        break;

      case "telemetry":
        try {
          const res = await fetch("/api/telemetry");
          if (res.ok) {
            const data = await res.json();
            output = (
              <div className="text-xs space-y-1 font-mono text-emerald-400">
                <div>CLOUDFLARE EDGE TELEMETRY:</div>
                <div>Colocation PoP: {data.colo} ({data.city}, {data.country})</div>
                <div>Transport: {data.httpProtocol} / {data.tlsCipher}</div>
                <div>Edge Uptime: {data.edgeUptime} | Cache: {data.cacheStatus}</div>
              </div>
            );
          } else {
            output = <div className="text-xs text-amber-400">Edge telemetry offline (Static Preview Mode)</div>;
          }
        } catch {
          output = <div className="text-xs text-amber-400">Edge telemetry query completed (Local Preview)</div>;
        }
        break;

      case "resume":
        window.open(PERSONAL_INFO.resumePath, "_blank");
        output = <div className="text-xs text-sky-400">Opening {PERSONAL_INFO.resumePath}...</div>;
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "exit":
        onClose();
        return;

      default:
        output = (
          <div className="text-xs text-rose-400">
            command not found: {trimmed}. Type <span className="text-sky-400 font-bold">help</span> for valid commands.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: trimmed, output }]);
    setInputVal("");
  };

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandList.length > 0) {
        const nextIndex = historyIndex === -1 ? commandList.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(commandList[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandList.length) {
          setHistoryIndex(nextIndex);
          setInputVal(commandList[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInputVal("");
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className={`w-full bg-[#090d16] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col font-mono transition-all duration-200 ${
          isMaximized ? "h-[96vh] max-w-[98vw]" : "h-[560px] max-w-3xl"
        }`}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0d121f] border-b border-slate-800 text-slate-400 text-xs">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors"
                title="Close"
              />
              <button
                onClick={() => setHistory([])}
                className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors"
                title="Clear"
              />
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors"
                title="Toggle Maximize"
              />
            </div>
            <span className="ml-2 font-medium text-slate-300 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-sky-400" />
              <span>ved@edge: ~ (vedmpatel.me)</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="p-1 text-slate-400 hover:text-white transition-colors hidden sm:block"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output Area */}
        <div
          ref={scrollRef}
          onClick={() => inputRef.current?.focus()}
          className="flex-1 p-4 overflow-y-auto space-y-3 text-xs sm:text-sm text-slate-200 cursor-text"
        >
          {history.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-emerald-400 font-semibold">ved@edge:~$</span>
                <span className="text-white font-medium">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}

          {/* Active Command Input Line */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-emerald-400 font-semibold">ved@edge:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDownInput}
              className="flex-1 bg-transparent text-white outline-none border-none p-0 focus:ring-0 font-mono text-xs sm:text-sm"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>

        {/* Terminal Footer Bar */}
        <div className="px-4 py-2 bg-[#0d121f] border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>Press <kbd className="text-slate-300">Enter</kbd> to run</span>
            <span><kbd className="text-slate-300">↑↓</kbd> history</span>
            <span><kbd className="text-slate-300">Esc</kbd> close</span>
          </div>
          <span className="hidden sm:inline text-sky-400 font-semibold">Cloudflare Edge Live</span>
        </div>
      </div>
    </div>
  );
}
