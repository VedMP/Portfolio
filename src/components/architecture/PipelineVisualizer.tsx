"use client";

import { useState } from "react";

type ArchMode = "rag" | "multi-agent";

interface PipelineStage {
  id: string;
  name: string;
  component: string;
  contract: string;
  description: string;
  decisionNote: string;
}

const RAG_STAGES: PipelineStage[] = [
  {
    id: "chunk",
    name: "Semantic Chunking",
    component: "LangChain Recursive Splitter",
    contract: "PDF / Markdown → 500-token chunks with 50-token overlap",
    description: "Splits enterprise documentation along natural paragraph and sentence boundaries to avoid amputating technical definitions mid-clause.",
    decisionNote: "Overlap ensures that cross-sentence concepts remain semantically coherent during dense vector lookup.",
  },
  {
    id: "embed",
    name: "Dense Embedding",
    component: "IBM Slate-125m-English",
    contract: "Chunk Text → 768-dimensional float32 vector tensor",
    description: "Transforms text into dense embedding vectors calibrated specifically for English technical documentation and technical query matching.",
    decisionNote: "Chosen for its dense indexing efficiency and tight alignment with watsonx Granite models.",
  },
  {
    id: "vectorstore",
    name: "Local Vector Retrieval",
    component: "ChromaDB (Local Cosine Index)",
    contract: "Query Vector → Top-k (k=4) relevant passages",
    description: "Persistent on-disk vector database performing nearest-neighbor cosine similarity search directly inside the application process.",
    decisionNote: "Local persistence eliminates cloud egress latency, eliminates monthly vector DB SaaS costs, and protects sensitive documents.",
  },
  {
    id: "grounding",
    name: "Grounded Prompt Assembly",
    component: "LangChain PromptTemplate",
    contract: "Top-4 Chunks + User Question → Strict Grounding Context",
    description: "Assembles context into a constrained instruction prompt. The prompt strictly instructs the LLM to only cite facts present in the retrieved passages.",
    decisionNote: "If the requested fact is absent from the retrieved chunks, the model is constrained to reply 'Information not found in context' rather than guessing.",
  },
  {
    id: "inference",
    name: "Model Inference",
    component: "watsonx.ai Granite-3-2-8b-instruct",
    contract: "Constrained Prompt → Verified Answer with Citations",
    description: "Instruction-tuned enterprise LLM generates concise, factually grounded answers with line-level source provenance.",
    decisionNote: "Granite 8B provides low inference latency with zero hallucination escape under strict citation constraints.",
  },
];

const MULTI_AGENT_STAGES: PipelineStage[] = [
  {
    id: "gateway",
    name: "Flask REST Gateway",
    component: "Python Flask / REST Dispatcher",
    contract: "HTTP Client Request → Sanitized CEFR Level Parameters",
    description: "Ingests client learning requests, validates proficiency levels (A1 to C2), and routes to the agent orchestration pipeline.",
    decisionNote: "Lightweight microservice architecture built for low overhead during peak 48-hour hackathon concurrency.",
  },
  {
    id: "abc",
    name: "Provider Abstraction",
    component: "Python Abstract Base Class (abc.ABC)",
    contract: "BaseLLMProvider Interface → OpenAI / Gemini Drivers",
    description: "Decouples pedagogical prompt logic from vendor SDKs, wrapping model initialization inside a unified class interface.",
    decisionNote: "Permits seamless runtime failover between OpenAI and Google Gemini APIs without touching downstream agent prompt chains.",
  },
  {
    id: "teacher",
    name: "Primary Instructor Agent",
    component: "LangChain Curriculum Generator",
    contract: "Level & Topic Specs → Draft Learning Module",
    description: "Generates tailored conversational scenarios, cultural notes, and targeted vocabulary drills for the student's target language.",
    decisionNote: "Focuses entirely on creative, natural pedagogy and conversational cadence.",
  },
  {
    id: "ta",
    name: "TA Auditor Agent",
    component: "LangChain Quality Barrier",
    contract: "Draft Module → Grammar & Level Compliance Audit",
    description: "A secondary automated Teaching Assistant agent independently reviews the drafted lesson for grammatical precision and grade-level vocabulary fit.",
    decisionNote: "Eliminates single-pass LLM confirmation bias by subjecting generated lessons to autonomous adversarial audit.",
  },
  {
    id: "delivery",
    name: "Verified Delivery",
    component: "JSON Response Contract",
    contract: "Audited Payload → React Client Delivery",
    description: "Delivers only multi-agent verified curriculum to the student with audit confidence tags.",
    decisionNote: "If the TA catches an error, the module is routed back to the teacher for automated repair before ever reaching the user.",
  },
];

export default function PipelineVisualizer() {
  const [mode, setMode] = useState<ArchMode>("rag");
  const [selectedStageIndex, setSelectedStageIndex] = useState(0);

  const stages = mode === "rag" ? RAG_STAGES : MULTI_AGENT_STAGES;
  const activeStage = stages[selectedStageIndex] || stages[0];

  return (
    <section id="architecture" className="py-16 sm:py-20 border-b border-border">
      <div className="space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
              01 / Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-foreground">
              Systems Architecture Decomposition
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 max-w-3xl leading-relaxed">
              Interactive data contract traces of my core generative AI and multi-agent systems. Click any stage to inspect the technical specification.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="inline-flex rounded-lg border border-border p-1 text-xs font-mono shrink-0 bg-neutral-100/50 dark:bg-neutral-900/50">
            <button
              onClick={() => {
                setMode("rag");
                setSelectedStageIndex(0);
              }}
              className={`px-3 py-1.5 rounded transition-colors ${
                mode === "rag"
                  ? "bg-foreground text-background font-medium shadow-xs"
                  : "text-neutral-500 hover:text-foreground"
              }`}
            >
              Dense Vector RAG
            </button>
            <button
              onClick={() => {
                setMode("multi-agent");
                setSelectedStageIndex(0);
              }}
              className={`px-3 py-1.5 rounded transition-colors ${
                mode === "multi-agent"
                  ? "bg-foreground text-background font-medium shadow-xs"
                  : "text-neutral-500 hover:text-foreground"
              }`}
            >
              Multi-Agent Loop
            </button>
          </div>
        </div>

        {/* Pipeline Step Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {stages.map((stage, idx) => {
            const isSelected = idx === selectedStageIndex;
            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStageIndex(idx)}
                className={`p-3.5 sm:p-4 rounded-lg text-left transition-all border ${
                  isSelected
                    ? "border-foreground bg-neutral-100 dark:bg-neutral-900 font-medium ring-1 ring-foreground/20"
                    : "border-border hover:border-neutral-400 dark:hover:border-neutral-600 bg-background"
                }`}
              >
                <div className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 mb-1.5">
                  0{idx + 1}
                </div>
                <div className="text-xs sm:text-sm text-foreground font-medium tracking-tight">
                  {stage.name}
                </div>
                <div className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 mt-1 truncate">
                  {stage.component}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Card */}
        <div className="p-6 sm:p-8 rounded-xl border border-border bg-neutral-50 dark:bg-neutral-900/40 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border pb-4">
            <div>
              <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                Stage 0{selectedStageIndex + 1} Specification
              </span>
              <h3 className="text-lg sm:text-xl font-medium text-foreground mt-0.5">
                {activeStage.name}
              </h3>
            </div>
            <div className="text-xs font-mono text-neutral-600 dark:text-neutral-300 px-2.5 py-1 rounded bg-neutral-200/60 dark:bg-neutral-800">
              {activeStage.component}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-sm">
            {/* Col 1: Contract & Role */}
            <div className="md:col-span-6 space-y-4">
              <div>
                <span className="font-mono text-neutral-400 dark:text-neutral-500 text-xs uppercase tracking-wide block mb-1">
                  Data Contract
                </span>
                <div className="font-mono text-xs text-foreground bg-background p-3 rounded-lg border border-border overflow-x-auto leading-relaxed">
                  {activeStage.contract}
                </div>
              </div>

              <div>
                <span className="font-mono text-neutral-400 dark:text-neutral-500 text-xs uppercase tracking-wide block mb-1">
                  Functional Role
                </span>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm">
                  {activeStage.description}
                </p>
              </div>
            </div>

            {/* Col 2: Architectural Rationale */}
            <div className="md:col-span-6 space-y-4">
              <div>
                <span className="font-mono text-neutral-400 dark:text-neutral-500 text-xs uppercase tracking-wide block mb-1">
                  Architectural Trade-Off &amp; Rationale
                </span>
                <div className="p-4 rounded-lg bg-background border border-border text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm">
                  {activeStage.decisionNote}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
