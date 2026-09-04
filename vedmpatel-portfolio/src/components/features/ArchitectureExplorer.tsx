"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, ShieldCheck, ArrowRight, Layers, CheckCircle2 } from "lucide-react";

type ArchitectureType = "rag" | "multi-agent";

interface StepDetail {
  id: string;
  name: string;
  role: string;
  tech: string;
  description: string;
  metricsOrInsight: string;
}

const RAG_STEPS: StepDetail[] = [
  {
    id: "ingest",
    name: "1. Ingestion & Chunking",
    role: "Preprocessor",
    tech: "LangChain Character & Token Splitters",
    description: "Deconstructs unstructured PDF/text documents into overlapping semantic chunks to maintain local context boundaries.",
    metricsOrInsight: "Preserves cross-boundary sentence semantics for domain-specific queries.",
  },
  {
    id: "embed",
    name: "2. Vector Embedding",
    role: "Vector Encoder",
    tech: "IBM Slate-125m-English",
    description: "Transforms text chunks into dense 768-dimensional vector representations calibrated for technical document search.",
    metricsOrInsight: "Optimized for dense enterprise English corpus retrieval.",
  },
  {
    id: "store",
    name: "3. Vector Storage & Index",
    role: "Storage & Indexer",
    tech: "ChromaDB (Persistent)",
    description: "Stores embeddings locally with persistent metadata tagging. Performs cosine similarity nearest-neighbor lookup.",
    metricsOrInsight: "Zero cloud-vector egress; sub-10ms local query retrieval.",
  },
  {
    id: "prompt",
    name: "4. Context Injection",
    role: "Prompt Orchestrator",
    tech: "LangChain PromptTemplate",
    description: "Synthesizes the top-k retrieved chunks with explicit provenance constraints and anti-hallucination guardrails.",
    metricsOrInsight: "Strict citation requirements: model cannot cite facts absent from retrieved chunks.",
  },
  {
    id: "infer",
    name: "5. Grounded Inference",
    role: "Reasoning Core",
    tech: "IBM watsonx.ai Granite-3-2-8b-instruct",
    description: "Executes instruction-tuned inference to answer complex technical queries with cited source passages.",
    metricsOrInsight: "Zero-shot accuracy backed by verifiable document provenance.",
  },
];

const MULTI_AGENT_STEPS: StepDetail[] = [
  {
    id: "gateway",
    name: "1. Request Gateway",
    role: "API Gateway",
    tech: "Python Flask REST API",
    description: "Receives user learning prompt from React frontend, validates educational level parameters, and routes to agent worker.",
    metricsOrInsight: "Lightweight, predictable REST dispatch built for 48-hour hackathon concurrency.",
  },
  {
    id: "abc",
    name: "2. Abstract Base Class Driver",
    role: "Provider Abstraction",
    tech: "Python abc.ABC",
    description: "Abstracts model client initialization into a unified interface, decoupling prompt logic from vendor SDKs.",
    metricsOrInsight: "Enables zero-downtime hot-swapping between OpenAI API and Gemini API.",
  },
  {
    id: "teacher",
    name: "3. Primary Teacher Agent",
    role: "Generator Agent",
    tech: "LangChain Orchestrator",
    description: "Generates tailored language learning lessons, conversational roleplay, and cultural context exercises.",
    metricsOrInsight: "Focuses on creative pedagogy and conversational fluency.",
  },
  {
    id: "ta",
    name: "4. Secondary TA Audit Agent",
    role: "Auditor Agent",
    tech: "LangChain Verification Loop",
    description: "Acts as an automated Teaching Assistant, strictly inspecting generated lesson text for grammatical accuracy and target-grade compliance.",
    metricsOrInsight: "Catches and repairs pedagogical hallucinations before delivery.",
  },
  {
    id: "dispatch",
    name: "5. Verified Output Delivery",
    role: "Response Dispatcher",
    tech: "JSON Response Contract",
    description: "Dispatches only multi-agent verified curriculum to student client with confidence metrics.",
    metricsOrInsight: "Two-stage verification barrier eliminates ungrounded translations.",
  },
];

export default function ArchitectureExplorer() {
  const [selectedArch, setSelectedArch] = useState<ArchitectureType>("rag");
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const steps = selectedArch === "rag" ? RAG_STEPS : MULTI_AGENT_STEPS;
  const currentStep = steps[activeStepIndex] || steps[0];

  return (
    <section id="architecture" className="relative w-full py-16 px-6 border-y border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Systems Visualizer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
            How My AI Systems Are Built
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Click through each pipeline node to inspect real architectural decisions, data transformations, and validation safeguards.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-xl bg-slate-200/80 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700">
            <button
              onClick={() => {
                setSelectedArch("rag");
                setActiveStepIndex(0);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-medium transition-all ${
                selectedArch === "rag"
                  ? "bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Smart Doc RAG Pipeline</span>
            </button>

            <button
              onClick={() => {
                setSelectedArch("multi-agent");
                setActiveStepIndex(0);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-medium transition-all ${
                selectedArch === "multi-agent"
                  ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Multi-Agent Verification Pipeline</span>
            </button>
          </div>
        </div>

        {/* Interactive Pipeline Sequence */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 mb-8">
          {steps.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`text-left p-4 rounded-xl border transition-all relative ${
                  isActive
                    ? "bg-white dark:bg-slate-800 border-sky-500 dark:border-sky-400 shadow-md ring-1 ring-sky-500/20"
                    : "bg-white/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                    isActive
                      ? "bg-sky-500 text-white dark:bg-sky-400 dark:text-slate-950"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                  }`}>
                    NODE 0{idx + 1}
                  </span>
                  {idx < steps.length - 1 && (
                    <ArrowRight className="hidden lg:block w-3 h-3 text-slate-400" />
                  )}
                </div>

                <div className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white mb-1 line-clamp-1">
                  {step.name.replace(/^\d+\.\s*/, '')}
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate">
                  {step.tech}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Node Deep-Dive Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedArch}-${currentStep.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-medium text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                    {currentStep.role}
                  </span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {currentStep.tech}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {currentStep.name}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                  {currentStep.description}
                </p>

                <div className="flex items-start gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 p-3 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold">Engineering Impact: </span>
                    {currentStep.metricsOrInsight}
                  </div>
                </div>
              </div>

              {/* Technical specs sidebar */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  System Parameters
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1">
                    <span className="text-slate-500">Pipeline Type</span>
                    <span className="text-slate-900 dark:text-white font-semibold">
                      {selectedArch === "rag" ? "Dense Vector RAG" : "Multi-Agent Loop"}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1">
                    <span className="text-slate-500">Node Status</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Verified Ground Truth</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Runtime</span>
                    <span className="text-slate-900 dark:text-white">Python 3.11+</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
