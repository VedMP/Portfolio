"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ArchMode = "rag" | "multi-agent" | "cpp-memory";

interface PipelineStage {
  id: string;
  step: string;
  name: string;
  component: string;
  contract: string;
  description: string;
  decisionNote: string;
}

const TRACKS: Record<
  ArchMode,
  { label: string; context: string; stages: PipelineStage[] }
> = {
  rag: {
    label: "IBM RAG Pipeline",
    context: "Smart Document Assistant · IBM Capstone (2026)",
    stages: [
      {
        id: "chunk",
        step: "01",
        name: "PDF Ingestion",
        component: "LangChain Splitter",
        contract: "Raw PDF → 1000-character chunks (100-character overlap)",
        description:
          "Extracts raw text from uploaded technical PDFs and splits along natural sentence boundaries so dense definitions remain intact.",
        decisionNote:
          "100-character sliding overlap preserves context across chunk boundaries without inflating prompt token counts.",
      },
      {
        id: "embed",
        step: "02",
        name: "Dense Embeddings",
        component: "IBM Slate-125m",
        contract: "Text chunk → Dense semantic embedding vector",
        description:
          "Encodes document chunks into dense vectors using IBM's Slate-125m English retrieval model via watsonx.ai.",
        decisionNote:
          "Calibrated for technical English documentation and aligns tightly with IBM watsonx Granite instruction models.",
      },
      {
        id: "vectorstore",
        step: "03",
        name: "Local Vector Index",
        component: "ChromaDB (On-Disk)",
        contract: "Query vector → Top-k cosine-similar source chunks",
        description:
          "Persists embeddings locally in ChromaDB and retrieves the most semantically relevant passages at query time.",
        decisionNote:
          "Local on-disk storage avoids cloud vector DB egress fees and ensures private PDFs never leave the local workspace.",
      },
      {
        id: "inference",
        step: "04",
        name: "Grounded Inference",
        component: "Granite-3.2-8b-instruct",
        contract: "Retrieved chunks + user question → Context-grounded answer",
        description:
          "Injects retrieved source passages into a constrained LangChain prompt template and renders answers interactively via Gradio.",
        decisionNote:
          "Constraining Granite-3.2-8b-instruct to cite retrieved passages prevents fabricated answers when a fact is missing from the PDF.",
      },
    ],
  },
  "multi-agent": {
    label: "Multi-Agent Loop",
    context: "Polyglot Tutor · HackHive 2026 (36-Hour Sprint)",
    stages: [
      {
        id: "gateway",
        step: "01",
        name: "Flask REST Gateway",
        component: "Python / Flask",
        contract: "HTTP POST → Validated language (1 of 18) & learner level",
        description:
          "Sanitizes client requests from the React interface and routes lesson parameters into the multi-agent backend.",
        decisionNote:
          "Lightweight Flask routing kept iteration cycles fast so the team could ship a working 18-language MVP inside 36 hours.",
      },
      {
        id: "abc",
        step: "02",
        name: "Provider ABC",
        component: "Python abc.ABC",
        contract: "BaseLLMProvider → OpenAI / Gemini concrete drivers",
        description:
          "Encapsulates vendor SDK initialization behind an Abstract Base Class so downstream prompt chains stay provider-agnostic.",
        decisionNote:
          "Enabled hot-swapping between OpenAI and Gemini mid-hackathon when API quotas spiked, with zero route rewrites.",
      },
      {
        id: "teacher",
        step: "03",
        name: "Teacher Agent",
        component: "LangChain Generator",
        contract: "Language + level + topic → Draft curriculum payload",
        description:
          "Generates tailored conversational dialogue, grammar explanations, and vocabulary drills across 18 supported languages.",
        decisionNote:
          "Isolating generation lets the Teacher agent optimize for natural phrasing while leaving strict auditing to a second pass.",
      },
      {
        id: "ta",
        step: "04",
        name: "TA Auditor Loop",
        component: "Verification Agent",
        contract: "Draft lesson → Grammar & level check → Revise or Emit",
        description:
          "Independently evaluates the Teacher's draft for grammatical accuracy and proficiency fit before emitting JSON to the client.",
        decisionNote:
          "Separating generation from verification counters single-pass confirmation bias and catches subtle translation drift.",
      },
    ],
  },
  "cpp-memory": {
    label: "C++ Memory & UML",
    context: "EA Sports College Football Simulation · Forage (Oct 2025)",
    stages: [
      {
        id: "spec",
        step: "01",
        name: "Feature Proposal",
        component: "Technical Design Doc",
        contract: "Subsystem requirements → Concrete object behavior spec",
        description:
          "Scoped gameplay feature requirements and documented interfaces before modifying the existing C++ simulation codebase.",
        decisionNote:
          "Writing explicit contracts upfront prevented mismatched assumptions across interacting game objects.",
      },
      {
        id: "uml",
        step: "02",
        name: "UML Architecture",
        component: "Class & Ownership Map",
        contract: "Domain entities → Inheritance & composition diagram",
        description:
          "Modeled class hierarchies, associations, and ownership boundaries using technical UML diagrams.",
        decisionNote:
          "Favoring clean composition over deep inheritance trees kept entity behaviors modular and testable.",
      },
      {
        id: "audit",
        step: "03",
        name: "Memory Audit",
        component: "Allocation & Layout Review",
        contract: "Legacy collections → Identified fragmentation hotspots",
        description:
          "Inspected object storage patterns for unnecessary dynamic allocations, padding bloat, and pointer chasing.",
        decisionNote:
          "Eliminating hidden reallocations matters directly in real-time game loops where frame-time spikes degrade responsiveness.",
      },
      {
        id: "refactor",
        step: "04",
        name: "Contiguous Refactor",
        component: "C++ std::vector / Structs",
        contract: "Packed structs + reserve() → Cache-friendly traversal",
        description:
          "Replaced inefficient containers with contiguous value-type layouts and pre-reserved buffer capacities.",
        decisionNote:
          "Tighter memory layout improves CPU cache locality and lowers peak heap overhead without sacrificing readability.",
      },
    ],
  },
};

export default function PipelineVisualizer() {
  const [mode, setMode] = useState<ArchMode>("rag");
  const [selectedStageIndex, setSelectedStageIndex] = useState(0);

  const track = TRACKS[mode];
  const activeStage = track.stages[selectedStageIndex] || track.stages[0];

  const handleModeChange = (nextMode: ArchMode) => {
    setMode(nextMode);
    setSelectedStageIndex(0);
  };

  return (
    <section
      id="architecture"
      className="py-12 sm:py-14 border-b border-border scroll-mt-8"
    >
      <div className="p-5 sm:p-7 rounded-2xl bg-surface border border-border space-y-6">
        {/* Header + Track Switcher */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent font-semibold mb-1.5">
              Interactive System Traces
            </div>
            <h2 className="font-serif text-3xl sm:text-[2.35rem] leading-[1.08] font-normal text-foreground">
              How the pipelines actually work
            </h2>
            <p className="mt-1.5 text-xs font-mono text-subtle">
              {track.context} — click any stage to inspect data contracts &amp; engineering trade-offs.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="System architecture tracks"
            className="inline-flex flex-wrap gap-1 p-1 rounded-xl bg-surface-subtle border border-border shrink-0"
          >
            {(Object.keys(TRACKS) as ArchMode[]).map((key) => {
              const isSelected = mode === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleModeChange(key)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                    isSelected
                      ? "text-accent-foreground font-semibold"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="arch-active-tab"
                      transition={{ type: "spring", stiffness: 450, damping: 34 }}
                      className="absolute inset-0 rounded-lg bg-accent"
                    />
                  )}
                  <span className="relative z-10">{TRACKS[key].label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive 4-Stage Sequencer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5">
          {track.stages.map((stage, idx) => {
            const isSelected = idx === selectedStageIndex;
            return (
              <button
                key={`${mode}-${stage.id}`}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedStageIndex(idx)}
                className={`relative p-4 rounded-xl text-left transition-all border cursor-pointer ${
                  isSelected
                    ? "border-accent bg-surface-subtle shadow-[inset_0_2px_0_var(--accent)]"
                    : "border-border bg-background hover:border-border-strong"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[11px] font-semibold text-accent">
                    {stage.step}
                  </span>
                  {isSelected && (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
                      Active
                    </span>
                  )}
                </div>
                <div className="text-sm font-semibold text-foreground tracking-tight">
                  {stage.name}
                </div>
                <div className="text-[11px] font-mono text-subtle mt-1 truncate">
                  {stage.component}
                </div>
              </button>
            );
          })}
        </div>

        {/* Stage Specification Inspector */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${mode}-${activeStage.id}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16 }}
            className="p-5 sm:p-6 rounded-xl bg-background border border-border space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border">
              <div className="flex items-baseline gap-2.5">
                <span className="font-mono text-xs text-accent font-semibold">
                  STAGE {activeStage.step}
                </span>
                <h3 className="text-base sm:text-lg font-semibold text-foreground">
                  {activeStage.name}
                </h3>
              </div>
              <span className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-surface-subtle border border-border text-foreground">
                {activeStage.component}
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-surface border border-border border-l-[3px] border-l-accent font-mono text-xs text-foreground overflow-x-auto">
              {activeStage.contract}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                  What Happens Here
                </div>
                <p className="text-muted leading-relaxed text-[13.5px]">
                  {activeStage.description}
                </p>
              </div>
              <div className="space-y-1">
                <div className="font-mono text-[10px] uppercase tracking-wider text-subtle">
                  Engineering Trade-Off
                </div>
                <p className="text-muted leading-relaxed text-[13.5px]">
                  {activeStage.decisionNote}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
