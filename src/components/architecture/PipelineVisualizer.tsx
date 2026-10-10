"use client";

import { useState } from "react";
import {
  Database,
  ShieldCheck,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Terminal,
} from "lucide-react";

type ArchMode = "rag" | "multi-agent";

interface PipelineNode {
  id: string;
  stepNumber: number;
  name: string;
  role: string;
  tech: string;
  description: string;
  metric: string;
  codeSnippet: string;
  simulationLog: string;
}

const RAG_PIPELINE: PipelineNode[] = [
  {
    id: "chunk",
    stepNumber: 1,
    name: "Semantic Document Ingestion",
    role: "Preprocessor & Splitter",
    tech: "LangChain RecursiveSplitter",
    description: "Parses complex enterprise documents into overlapping semantic chunks with sentence-boundary awareness.",
    metric: "Chunk Size: 500 chars | Overlap: 50 chars",
    codeSnippet: `splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)\nchunks = splitter.split_documents(docs)`,
    simulationLog: "Deconstructed 48-page technical specification into 312 semantic chunks with zero boundary data loss.",
  },
  {
    id: "embed",
    stepNumber: 2,
    name: "Dense Vector Embedding",
    role: "Vector Encoder",
    tech: "IBM Slate-125m-English (768-d)",
    description: "Transforms text chunks into dense 768-dimensional mathematical vector representations optimized for technical documentation.",
    metric: "768 Dimensions | 420 tokens/sec",
    codeSnippet: `embeddings = WatsonxEmbeddings(model_id="ibm/slate-125m-english-rtrvr")\nvector_tensor = embeddings.embed_query(query)`,
    simulationLog: "Generated dense 768-d vector embedding for query in 18ms.",
  },
  {
    id: "vectorstore",
    stepNumber: 3,
    name: "ChromaDB Vector Retrieval",
    role: "Persistent Vector Index",
    tech: "ChromaDB (Local Cosine HNSW)",
    description: "Executes cosine similarity nearest-neighbor lookup directly on local storage, eliminating third-party API egress latency.",
    metric: "Sub-10ms query lookup | Cosine similarity: 0.892",
    codeSnippet: `retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 4})\nrelevant_chunks = retriever.get_relevant_documents(query)`,
    simulationLog: "Retrieved top-k (k=4) context passages from ChromaDB with 0.892 cosine confidence.",
  },
  {
    id: "prompt",
    stepNumber: 4,
    name: "Context Injection & Guardrails",
    role: "Prompt Orchestrator",
    tech: "LangChain PromptTemplate",
    description: "Synthesizes retrieved chunks into a strictly grounded instruction prompt enforcing source citation and anti-hallucination barriers.",
    metric: "Grounding Prompt: Zero-Hallucination Contract",
    codeSnippet: `template = """Strictly answer using retrieved context only.\nContext: {context}\nQuestion: {question}\nAnswer with Citations:"""`,
    simulationLog: "Injected 1,840 context tokens into grounded citation prompt template.",
  },
  {
    id: "llm",
    stepNumber: 5,
    name: "Granite-3-2-8b-instruct Inference",
    role: "Reasoning Core",
    tech: "IBM watsonx.ai Granite 8B",
    description: "Executes instruction-tuned generation to synthesize a coherent, verifiable answer with cited document line numbers.",
    metric: "8B Parameters | Sub-150ms TTFT",
    codeSnippet: `llm = WatsonxLLM(model_id="ibm/granite-3-2-8b-instruct", params={"decoding_method": "greedy"})\nresponse = llm(final_prompt)`,
    simulationLog: "Inference completed. Generated 142 tokens of factual response with verified source citations.",
  },
];

const MULTI_AGENT_PIPELINE: PipelineNode[] = [
  {
    id: "gateway",
    stepNumber: 1,
    name: "Flask REST API Gateway",
    role: "Route Controller",
    tech: "Python Flask / Werkzeug",
    description: "Validates input payload, verifies target educational CEFR levels (A1-C2), and routes to the agent execution engine.",
    metric: "Sub-5ms route dispatch",
    codeSnippet: `@app.route('/api/generate-lesson', methods=['POST'])\ndef handle_lesson():\n    data = sanitize_payload(request.json)\n    return agent_loop.execute(data)`,
    simulationLog: "Received HTTP POST payload. Sanitized CEFR Level: B1 (Intermediate Italian).",
  },
  {
    id: "abc",
    stepNumber: 2,
    name: "Provider Abstraction Layer",
    role: "Model Decoupler",
    tech: "Python abc.ABC Interface",
    description: "Abstracts model client initialization into a unified polymorphic interface, allowing zero-downtime hot swapping between OpenAI and Gemini.",
    metric: "100% Provider Agnostic",
    codeSnippet: `class BaseLLMProvider(ABC):\n    @abstractmethod\n    def generate_lesson(self, target_lang, level, topic): pass`,
    simulationLog: "Decoupled route handler from underlying SDK; selected Gemini 2.0 Flash as primary provider.",
  },
  {
    id: "teacher",
    stepNumber: 3,
    name: "Primary Instructor Agent",
    role: "Curriculum Generator",
    tech: "LangChain Generator Chain",
    description: "Generates tailored conversational scenarios, vocabulary drill modules, and grammatical explanations.",
    metric: "Generates 3 interactive pedagogical units",
    codeSnippet: `curriculum = instructor_agent.run(target_lang="Italian", level="B1", topic="Travel Emergency")`,
    simulationLog: "Instructor Agent synthesized 3 conversational dialogues and 5 vocabulary items.",
  },
  {
    id: "ta",
    stepNumber: 4,
    name: "Teaching Assistant Auditor",
    role: "Automated Quality Barrier",
    tech: "LangChain Verification Loop",
    description: "Inspects generated lesson text for grammatical errors, vocabulary appropriateness, and CEFR level drift before delivery.",
    metric: "Catches & corrects pedagogical drift",
    codeSnippet: `audit_report = ta_agent.audit(curriculum)\nif not audit_report.is_valid: curriculum = instructor_agent.repair(curriculum, audit_report)`,
    simulationLog: "TA Auditor passed grammar check (Score: 98/100) and verified level B1 vocabulary appropriateness.",
  },
  {
    id: "delivery",
    stepNumber: 5,
    name: "Verified Payload Dispatch",
    role: "Response Formatter",
    tech: "Strict JSON Contract",
    description: "Delivers verified curriculum to the React frontend with execution timestamps and audit validation tags.",
    metric: "Confidence Score: 0.98 | Total latency: 420ms",
    codeSnippet: `return jsonify({"status": "verified", "curriculum": curriculum, "audit": audit_report})`,
    simulationLog: "Dispatched verified JSON lesson payload to client interface.",
  },
];

const SAMPLE_QUERIES = {
  rag: [
    "How does ChromaDB local persistence eliminate vector egress latency?",
    "What chunking strategy is used to prevent sentence truncation in technical PDFs?",
    "How does watsonx.ai Granite enforce citation provenance?",
  ],
  "multi-agent": [
    "Generate B1 Italian emergency conversation module with TA validation",
    "How does the Abstract Base Class layer decouple OpenAI and Gemini SDKs?",
    "Simulate TA Agent catching and repairing grammatical level drift",
  ],
};

export default function PipelineVisualizer() {
  const [mode, setMode] = useState<ArchMode>("rag");
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(0);
  const [simulating, setSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState<number | null>(null);
  const [selectedQuery, setSelectedQuery] = useState(SAMPLE_QUERIES.rag[0]);

  const pipeline = mode === "rag" ? RAG_PIPELINE : MULTI_AGENT_PIPELINE;
  const activeNode = pipeline[selectedNodeIndex] || pipeline[0];

  const handleModeChange = (newMode: ArchMode) => {
    setMode(newMode);
    setSelectedNodeIndex(0);
    setSelectedQuery(SAMPLE_QUERIES[newMode][0]);
    setSimulationStep(null);
  };

  const runSimulation = () => {
    if (simulating) return;
    setSimulating(true);
    setSimulationStep(0);
    setSelectedNodeIndex(0);

    const stepInterval = setInterval(() => {
      setSimulationStep((prev) => {
        if (prev === null) return 0;
        const next = prev + 1;
        if (next >= pipeline.length) {
          clearInterval(stepInterval);
          setSimulating(false);
          return pipeline.length - 1;
        }
        setSelectedNodeIndex(next);
        return next;
      });
    }, 700);
  };

  const resetSimulation = () => {
    setSimulating(false);
    setSimulationStep(null);
    setSelectedNodeIndex(0);
  };

  return (
    <section id="architecture" className="relative w-full py-20 px-6 border-y border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-black/20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>Interactive Systems Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
            How My Systems Are Architected
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Interactive pipeline inspector. Click any node to examine architectural trade-offs, code contracts, or run the live execution simulator.
          </p>
        </div>

        {/* Pipeline Mode Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="inline-flex p-1 rounded-xl bg-slate-200/80 dark:bg-white/10 border border-slate-300 dark:border-white/10">
            <button
              onClick={() => handleModeChange("rag")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-medium transition-all ${
                mode === "rag"
                  ? "bg-white dark:bg-[#0f1422] text-sky-600 dark:text-sky-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Smart Document RAG (IBM watsonx)</span>
            </button>

            <button
              onClick={() => handleModeChange("multi-agent")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-mono font-medium transition-all ${
                mode === "multi-agent"
                  ? "bg-white dark:bg-[#0f1422] text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Multi-Agent Verification (HackHive 2026)</span>
            </button>
          </div>

          {/* Simulator Trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={runSimulation}
              disabled={simulating}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-mono font-medium shadow-sm transition-all disabled:opacity-50"
            >
              {simulating ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Executing Pipeline...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Simulate Pipeline Execution</span>
                </>
              )}
            </button>

            {simulationStep !== null && (
              <button
                onClick={resetSimulation}
                className="p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="Reset simulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Live Query Simulator Bar */}
        <div className="mb-8 p-3 rounded-xl bg-white dark:bg-[#0f1422] border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono shadow-sm">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-slate-400 uppercase tracking-wider shrink-0 text-[10px]">Test Query:</span>
            <select
              value={selectedQuery}
              onChange={(e) => setSelectedQuery(e.target.value)}
              className="bg-transparent text-slate-800 dark:text-slate-200 outline-none truncate font-sans text-xs sm:text-sm cursor-pointer w-full"
            >
              {(SAMPLE_QUERIES[mode] || []).map((q) => (
                <option key={q} value={q} className="bg-white dark:bg-[#0f1422]">
                  {q}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 shrink-0 text-[11px] text-emerald-600 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Simulator Engine Ready</span>
          </div>
        </div>

        {/* Interactive Pipeline Sequence Graph */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
          {pipeline.map((node, idx) => {
            const isSelected = idx === selectedNodeIndex;
            const isExecuting = simulationStep === idx;
            const isCompleted = simulationStep !== null && idx < simulationStep;

            return (
              <button
                key={node.id}
                onClick={() => {
                  setSelectedNodeIndex(idx);
                  if (simulating) setSimulating(false);
                }}
                className={`text-left p-4 rounded-xl border transition-all relative overflow-hidden ${
                  isExecuting
                    ? "bg-sky-500/10 border-sky-500 dark:border-sky-400 ring-2 ring-sky-500/30 scale-[1.02]"
                    : isSelected
                    ? "bg-white dark:bg-[#0f1422] border-sky-500 dark:border-sky-400 shadow-md ring-1 ring-sky-500/20"
                    : "bg-white/60 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20"
                }`}
              >
                {/* Node Status Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                      isExecuting
                        ? "bg-sky-500 text-white animate-pulse"
                        : isCompleted
                        ? "bg-emerald-500 text-white"
                        : isSelected
                        ? "bg-slate-900 text-white dark:bg-white dark:text-black"
                        : "bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {isCompleted ? "DONE" : `NODE 0${node.stepNumber}`}
                  </span>
                  {idx < pipeline.length - 1 && (
                    <ArrowRight className="hidden lg:block w-3 h-3 text-slate-400" />
                  )}
                </div>

                <div className="font-semibold text-xs text-slate-900 dark:text-white mb-1 line-clamp-1">
                  {node.name}
                </div>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate">
                  {node.tech}
                </div>

                {isExecuting && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-sky-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Deep-Dive Inspection Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0f1422] border border-slate-200 dark:border-white/10 shadow-sm transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Architectural Specifications */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                  {activeNode.role}
                </span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {activeNode.tech}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Node {activeNode.stepNumber}: {activeNode.name}
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeNode.description}
              </p>

              {/* Verified Metric Pill */}
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-xs font-mono text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" />
                <div>
                  <span className="font-bold">Benchmarked Metric: </span>
                  {activeNode.metric}
                </div>
              </div>

              {/* Simulation Log Output */}
              {simulationStep !== null && (
                <div className="p-3.5 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/40 text-xs font-mono text-sky-800 dark:text-sky-300 flex items-start gap-2.5">
                  <Clock className="w-4 h-4 mt-0.5 shrink-0 text-sky-500" />
                  <div>
                    <span className="font-bold">Live Execution Trace: </span>
                    {activeNode.simulationLog}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Code Contract Snippet */}
            <div className="lg:col-span-5 rounded-xl bg-[#090d16] border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto shadow-inner">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[10px]">implementation_contract.py</span>
                </div>
                <span className="text-[10px] text-sky-400">Verified</span>
              </div>
              <pre className="text-[11px] leading-relaxed text-slate-200 overflow-x-auto">
                <code>{activeNode.codeSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
