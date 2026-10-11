"use client";

import { useState, useMemo, useRef } from "react";
import { AIModel, MCPServer, Skill } from "@/types";
import { MOCK_MODELS, MOCK_MCP_SERVERS, MOCK_SKILLS } from "@/lib/mock-data";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ModelCard from "@/components/ModelCard";
import MCPCard from "@/components/MCPCard";
import SkillCard from "@/components/SkillCard";
import ResourceDetailModal from "@/components/ResourceDetailModal";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";
import {
  Brain,
  Server,
  Sparkles,
  Filter,
  Layers,
  Terminal,
  Cpu,
  FolderOpen,
  Database,
  Globe,
  MessageSquare,
  Code2,
  Cloud,
  Search,
  LineChart,
  BookOpen,
} from "lucide-react";

// ─── Provider Meta Information ───────────────────────────────────────────────
const PROVIDER_METADATA: Record<
  string,
  { label: string; color: string; desc: string }
> = {
  Anthropic: {
    label: "Anthropic · Claude Family",
    color: "#f97316",
    desc: "Frontier hybrid chain-of-thought thinking and agentic Computer Use.",
  },
  Google: {
    label: "Google · Gemini Family",
    color: "#4285f4",
    desc: "2M-token multimodal architecture with native audio, video, and codebase indexing.",
  },
  "Nous Research": {
    label: "Nous Research · Hermes Family",
    color: "#8b5cf6",
    desc: "Premier open-weights steerable intelligence & function-calling agent models.",
  },
  OpenCode: {
    label: "OpenCode · Autonomous Runtime Family",
    color: "#10b981",
    desc: "Self-executing developer runtime models connected to terminal and project files.",
  },
  DeepSeek: {
    label: "DeepSeek · Reasoning & Code Family",
    color: "#06b6d4",
    desc: "Open-weights reinforcement reasoning models with MIT license.",
  },
  OpenAI: {
    label: "OpenAI · Reasoning & Flagship Family",
    color: "#10a37f",
    desc: "o-series chain-of-thought and multimodal flagship API models.",
  },
  Meta: {
    label: "Meta · Llama Family",
    color: "#1877f2",
    desc: "Open frontier weights running locally on consumer and enterprise GPUs.",
  },
  "Mistral AI": {
    label: "Mistral AI · European Frontier Family",
    color: "#ff7000",
    desc: "Ultra-fast open and commercial models optimized for coding and multilingual tasks.",
  },
  Qwen: {
    label: "Alibaba · Qwen Family",
    color: "#a855f7",
    desc: "Premier open-source coding, math, and general intelligence models.",
  },
  xAI: {
    label: "xAI · Grok Family",
    color: "#ec4899",
    desc: "Frontier reasoning models with real-time knowledge synthesis.",
  },
  Cohere: {
    label: "Cohere · Enterprise RAG Family",
    color: "#14b8a6",
    desc: "Production retrieval-augmented generation and multilingual search embeddings.",
  },
  Perplexity: {
    label: "Perplexity · Live Search Reasoners",
    color: "#6366f1",
    desc: "Live citation grounding and chain-of-thought web verification.",
  },
};

// ─── MCP Category Metadata ───────────────────────────────────────────────────
const MCP_CATEGORY_METADATA: Record<
  string,
  { label: string; color: string; desc: string; icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }> }
> = {
  DEVTOOLS: {
    label: "Developer Runtimes & Version Control",
    color: "#10b981",
    desc: "Interactive shells, Docker management, Git history, and issue tracking.",
    icon: Terminal,
  },
  AI: {
    label: "AI & Model Orchestration Engines",
    color: "#8b5cf6",
    desc: "Function calling dispatchers, local Ollama bridges, and persistent memory.",
    icon: Cpu,
  },
  FILESYSTEM: {
    label: "Local Filesystem & Scoped Access",
    color: "#f59e0b",
    desc: "Safe scoped file reading, writing, and directory tree exploration.",
    icon: FolderOpen,
  },
  DATABASE: {
    label: "Databases & Data Analytics",
    color: "#3b82f6",
    desc: "Direct SQL queries, PostgreSQL, SQLite, and Google BigQuery data lakes.",
    icon: Database,
  },
  WEB: {
    label: "Web Browsing, Scraping & Search",
    color: "#a855f7",
    desc: "Live web indexing, Puppeteer headless automation, and markdown extraction.",
    icon: Globe,
  },
  COMMUNICATION: {
    label: "Workspace & Team Communication",
    color: "#3b82f6",
    desc: "Google Docs, Google Sheets, Gmail drafts, and Slack workspace chatops.",
    icon: MessageSquare,
  },
  CODE: {
    label: "Code Intelligence & Language Servers",
    color: "#10b981",
    desc: "AST type resolution, symbol definitions, and Python Jupyter execution.",
    icon: Code2,
  },
};

// ─── Skill Category Metadata ─────────────────────────────────────────────────
const SKILL_CATEGORY_METADATA: Record<
  string,
  { label: string; color: string; desc: string; icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }> }
> = {
  CODING: {
    label: "Autonomous Engineering, TDD & Architecture",
    color: "#10b981",
    desc: "Test-Driven Development, extended thinking budgeting, bug hunting, and fullstack design.",
    icon: Code2,
  },
  DEVOPS: {
    label: "Agent Computer Use & System Operations",
    color: "#f59e0b",
    desc: "Claude Computer Use GUI navigation, cloud Docker containers, and CI/CD pipelines.",
    icon: Cloud,
  },
  RESEARCH: {
    label: "Long-Context Ingestion & Deep Research",
    color: "#3b82f6",
    desc: "Gemini 2M-token monorepo analysis, video timestamp synthesis, and academic literature review.",
    icon: Search,
  },
  ANALYSIS: {
    label: "Database Schema & Pipeline Optimization",
    color: "#8b5cf6",
    desc: "SQL execution plan tuning, index optimization, and data normalization.",
    icon: LineChart,
  },
  WRITING: {
    label: "Technical Documentation & Specifications",
    color: "#3b82f6",
    desc: "Diátaxis framework developer documentation, OpenAPI specs, and interactive guides.",
    icon: BookOpen,
  },
  GENERAL: {
    label: "Specialized General Directives",
    color: "#ec4899",
    desc: "Universal guidelines and multi-step reasoning frameworks.",
    icon: Sparkles,
  },
};

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({
  id,
  icon: Icon,
  title,
  description,
  count,
  accentColor,
}: {
  id: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  title: string;
  description: string;
  count: number;
  accentColor: string;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
          style={{ background: `${accentColor}20`, border: `1px solid ${accentColor}30` }}
        >
          <Icon size={20} style={{ color: accentColor }} />
        </div>
        <div>
          <h2
            id={id}
            className="text-2xl font-black tracking-tight"
            style={{ color: "var(--color-text-primary)" }}
          >
            {title}
          </h2>
        </div>
        <span
          className="ml-auto text-xs sm:text-sm font-mono font-semibold px-3 py-1 rounded-full"
          style={{ background: `${accentColor}15`, color: accentColor }}
        >
          {count} components
        </span>
      </div>
      <p className="text-sm pl-[52px]" style={{ color: "var(--color-text-secondary)" }}>
        {description}
      </p>
      <div className="divider mt-6" />
    </div>
  );
}

// ─── Filter Pills ─────────────────────────────────────────────────────────────
function FilterPills({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt === selected ? "" : opt)}
          className="px-3 py-1 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer"
          style={{
            background: selected === opt ? "var(--color-blue-dim)" : "var(--glass-bg)",
            border: `1px solid ${selected === opt ? "rgba(59,130,246,0.4)" : "var(--color-border)"}`,
            color: selected === opt ? "var(--color-blue)" : "var(--color-text-muted)",
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HomePage() {
  const catalogRef = useRef<HTMLDivElement>(null);

  // Inspector modal state
  const [selectedItem, setSelectedItem] = useState<AIModel | MCPServer | Skill | null>(null);
  const [selectedType, setSelectedType] = useState<"model" | "mcp" | "skill" | null>(null);

  // Global LLM Ecosystem filter
  const [ecosystemFilter, setEcosystemFilter] = useState<string>("");

  // Search state
  const [modelSearch, setModelSearch] = useState("");
  const [mcpSearch, setMcpSearch] = useState("");
  const [skillSearch, setSkillSearch] = useState("");

  // Type & category filters
  const [modelTypeFilter, setModelTypeFilter] = useState("");
  const [modelFamilyFilter, setModelFamilyFilter] = useState("");
  const [mcpCategoryFilter, setMcpCategoryFilter] = useState("");
  const [skillCategoryFilter, setSkillCategoryFilter] = useState("");

  // Handlers to open detail modal
  const handleOpenModel = (model: AIModel) => {
    setSelectedItem(model);
    setSelectedType("model");
  };

  const handleOpenMCP = (server: MCPServer) => {
    setSelectedItem(server);
    setSelectedType("mcp");
  };

  const handleOpenSkill = (skill: Skill) => {
    setSelectedItem(skill);
    setSelectedType("skill");
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setSelectedType(null);
  };

  // ── Filtered Models ──
  const filteredModels = useMemo(() => {
    return MOCK_MODELS.filter((m) => {
      const q = modelSearch.toLowerCase();
      const matchesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.provider.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q));
      const matchesType = !modelTypeFilter || m.type === modelTypeFilter;
      const matchesFamily = !modelFamilyFilter || m.provider === modelFamilyFilter;

      let matchesEco = true;
      if (ecosystemFilter) {
        const ecoLower = ecosystemFilter.toLowerCase();
        matchesEco =
          m.provider.toLowerCase().includes(ecoLower) ||
          m.name.toLowerCase().includes(ecoLower) ||
          m.tags.some((t) => t.toLowerCase().includes(ecoLower)) ||
          (m.compatibleLLMs?.some((c) => c.toLowerCase().includes(ecoLower)) ?? false);
      }

      return matchesSearch && matchesType && matchesFamily && matchesEco;
    });
  }, [modelSearch, modelTypeFilter, modelFamilyFilter, ecosystemFilter]);

  // ── Grouped Models by Family ──
  const groupedModels = useMemo(() => {
    const map = new Map<string, AIModel[]>();
    filteredModels.forEach((m) => {
      const list = map.get(m.provider) || [];
      list.push(m);
      map.set(m.provider, list);
    });

    return Array.from(map.entries()).map(([provider, items]) => {
      const meta = PROVIDER_METADATA[provider] || {
        label: `${provider} Family`,
        color: "#6366f1",
        desc: "Frontier model architectures and specialized runtimes.",
      };
      return { provider, meta, items };
    });
  }, [filteredModels]);

  // ── Filtered MCP ──
  const filteredMCP = useMemo(() => {
    return MOCK_MCP_SERVERS.filter((s) => {
      const q = mcpSearch.toLowerCase();
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.description?.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q));
      const matchesCat = !mcpCategoryFilter || s.category === mcpCategoryFilter;

      let matchesEco = true;
      if (ecosystemFilter) {
        const ecoLower = ecosystemFilter.toLowerCase();
        matchesEco =
          s.tags.some((t) => t.toLowerCase().includes(ecoLower)) ||
          (s.author?.toLowerCase().includes(ecoLower) ?? false) ||
          (s.compatibleLLMs?.some((c) => c.toLowerCase().includes(ecoLower)) ?? false);
      }

      return matchesSearch && matchesCat && matchesEco;
    });
  }, [mcpSearch, mcpCategoryFilter, ecosystemFilter]);

  // ── Grouped MCP by Category ──
  const groupedMCP = useMemo(() => {
    const map = new Map<string, MCPServer[]>();
    filteredMCP.forEach((server) => {
      const list = map.get(server.category) || [];
      list.push(server);
      map.set(server.category, list);
    });

    return Array.from(map.entries()).map(([category, items]) => {
      const meta = MCP_CATEGORY_METADATA[category] || {
        label: `${category} Tools`,
        color: "#10b981",
        desc: "Specialized Model Context Protocol integrations.",
        icon: Terminal,
      };
      return { category, meta, items };
    });
  }, [filteredMCP]);

  // ── Filtered Skills ──
  const filteredSkills = useMemo(() => {
    return MOCK_SKILLS.filter((s) => {
      const q = skillSearch.toLowerCase();
      const matchesSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.description?.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q));
      const matchesCat = !skillCategoryFilter || s.category === skillCategoryFilter;

      let matchesEco = true;
      if (ecosystemFilter) {
        const ecoLower = ecosystemFilter.toLowerCase();
        matchesEco =
          s.tags.some((t) => t.toLowerCase().includes(ecoLower)) ||
          s.title.toLowerCase().includes(ecoLower) ||
          (s.compatibleLLMs?.some((c) => c.toLowerCase().includes(ecoLower)) ?? false);
      }

      return matchesSearch && matchesCat && matchesEco;
    });
  }, [skillSearch, skillCategoryFilter, ecosystemFilter]);

  // ── Grouped Skills by Category ──
  const groupedSkills = useMemo(() => {
    const map = new Map<string, Skill[]>();
    filteredSkills.forEach((skill) => {
      const list = map.get(skill.category) || [];
      list.push(skill);
      map.set(skill.category, list);
    });

    return Array.from(map.entries()).map(([category, items]) => {
      const meta = SKILL_CATEGORY_METADATA[category] || {
        label: `${category} Prompts`,
        color: "#8b5cf6",
        desc: "Expert-engineered agent prompts.",
        icon: Sparkles,
      };
      return { category, meta, items };
    });
  }, [filteredSkills]);

  const ecosystems = [
    { label: "All Ecosystems", value: "" },
    { label: "Claude (Anthropic)", value: "Claude" },
    { label: "Gemini (Google)", value: "Gemini" },
    { label: "Nous Hermes", value: "Hermes" },
    { label: "OpenCode", value: "OpenCode" },
    { label: "DeepSeek", value: "DeepSeek" },
    { label: "OpenAI", value: "OpenAI" },
  ];

  const modelFamilies = [
    "Anthropic",
    "Google",
    "Nous Research",
    "OpenCode",
    "DeepSeek",
    "OpenAI",
    "Meta",
    "Mistral AI",
    "Qwen",
  ];

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <Hero
        onExplore={() => catalogRef.current?.scrollIntoView({ behavior: "smooth" })}
        onSelectEcosystem={(eco) => setEcosystemFilter(eco)}
      />

      {/* Main Catalog */}
      <main ref={catalogRef} className="w-full max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {/* Global LLM Ecosystem Bar */}
        <div
          className="mb-14 p-5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{
            background: "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%)",
            borderColor: "rgba(255, 255, 255, 0.1)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Layers size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Filter by Current LLM Ecosystem</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
                  Live
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                Instantly shows models, MCP tools, and skills categorized for your chosen AI stack.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {ecosystems.map((eco) => {
              const active = ecosystemFilter === eco.value;
              return (
                <button
                  key={eco.value}
                  onClick={() => setEcosystemFilter(eco.value)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold font-mono transition-all cursor-pointer"
                  style={{
                    background: active ? "var(--color-blue)" : "rgba(255, 255, 255, 0.05)",
                    border: `1px solid ${active ? "var(--color-blue)" : "rgba(255, 255, 255, 0.1)"}`,
                    color: active ? "#ffffff" : "var(--color-text-secondary)",
                    boxShadow: active ? "0 0 15px rgba(59, 130, 246, 0.4)" : "none",
                  }}
                >
                  {eco.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── AI Models Section ─────────────────────────────── */}
        <section className="mb-24">
          <SectionHeader
            id="models"
            icon={Brain}
            title="Frontier AI Models"
            description="Categorized by frontier AI family. Every card is visible below with release updates, YouTube guides, and GitHub repos."
            count={filteredModels.length}
            accentColor="var(--color-blue)"
          />

          {/* Filters & Family Selectors */}
          <div className="space-y-4 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <SearchBar
                  id="search-models"
                  value={modelSearch}
                  onChange={setModelSearch}
                  placeholder="Search models, providers (Claude, Gemini, Hermes, OpenCode...)"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={14} style={{ color: "var(--color-text-muted)" }} />
                <FilterPills
                  options={["CLOUD", "LOCAL", "HYBRID"]}
                  selected={modelTypeFilter}
                  onChange={setModelTypeFilter}
                />
              </div>
            </div>

            {/* Quick Family Jump Tabs */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-[11px] font-mono text-neutral-400">Model Family:</span>
              <button
                onClick={() => setModelFamilyFilter("")}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                style={{
                  background: modelFamilyFilter === "" ? "rgba(59, 130, 246, 0.2)" : "rgba(255, 255, 255, 0.04)",
                  border: `1px solid ${modelFamilyFilter === "" ? "rgba(59, 130, 246, 0.4)" : "rgba(255, 255, 255, 0.08)"}`,
                  color: modelFamilyFilter === "" ? "#60a5fa" : "var(--color-text-muted)",
                }}
              >
                All Families
              </button>
              {modelFamilies.map((fam) => {
                const count = MOCK_MODELS.filter((m) => m.provider === fam).length;
                const active = modelFamilyFilter === fam;
                return (
                  <button
                    key={fam}
                    onClick={() => setModelFamilyFilter(active ? "" : fam)}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
                    style={{
                      background: active ? "rgba(59, 130, 246, 0.2)" : "rgba(255, 255, 255, 0.04)",
                      border: `1px solid ${active ? "rgba(59, 130, 246, 0.4)" : "rgba(255, 255, 255, 0.08)"}`,
                      color: active ? "#60a5fa" : "var(--color-text-secondary)",
                    }}
                  >
                    <span>{fam}</span>
                    <span className="opacity-60 text-[10px] font-mono">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Categorized Model Groups */}
          {groupedModels.length > 0 ? (
            <div className="space-y-12">
              {groupedModels.map(({ provider, meta, items }) => (
                <div key={provider} className="relative">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 pb-3 mb-4 border-b" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm"
                      style={{ background: `${meta.color}20`, border: `1px solid ${meta.color}40` }}
                    >
                      <Brain size={16} style={{ color: meta.color }} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                        <span>{meta.label}</span>
                        <span
                          className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: `${meta.color}15`, color: meta.color }}
                        >
                          {items.length} {items.length === 1 ? "model" : "models"}
                        </span>
                      </h3>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {meta.desc}
                      </p>
                    </div>
                  </div>

                  {/* Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                    {items.map((model) => (
                      <ModelCard
                        key={model.id}
                        model={model}
                        onSelect={handleOpenModel}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="py-16 text-center rounded-2xl"
              style={{ border: "1px dashed var(--color-border)", color: "var(--color-text-muted)" }}
            >
              No models found matching your filters.
            </div>
          )}
        </section>

        {/* ── MCP Servers Section ───────────────────────────── */}
        <section className="mb-24">
          <SectionHeader
            id="mcp"
            icon={Server}
            title="Model Context Protocol (MCP) Tools"
            description="Categorized by capability (Execution, AI Engines, Cloud DBs, Web). Every MCP tool is displayed with ready-to-use configs."
            count={filteredMCP.length}
            accentColor="var(--color-emerald)"
          />

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <SearchBar
                id="search-mcp"
                value={mcpSearch}
                onChange={setMcpSearch}
                placeholder="Search MCP tools, categories..."
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={14} style={{ color: "var(--color-text-muted)" }} />
              <FilterPills
                options={["DEVTOOLS", "AI", "FILESYSTEM", "DATABASE", "WEB", "COMMUNICATION"]}
                selected={mcpCategoryFilter}
                onChange={setMcpCategoryFilter}
              />
            </div>
          </div>

          {/* Categorized MCP Groups */}
          {groupedMCP.length > 0 ? (
            <div className="space-y-12">
              {groupedMCP.map(({ category, meta, items }) => {
                const Icon = meta.icon;
                return (
                  <div key={category} className="relative">
                    {/* Category Header */}
                    <div className="flex items-center gap-3 pb-3 mb-4 border-b" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm"
                        style={{ background: `${meta.color}20`, border: `1px solid ${meta.color}40` }}
                      >
                        <Icon size={16} style={{ color: meta.color }} />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                          <span>{meta.label}</span>
                          <span
                            className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: `${meta.color}15`, color: meta.color }}
                          >
                            {items.length} {items.length === 1 ? "tool" : "tools"}
                          </span>
                        </h3>
                        <p className="text-xs text-neutral-400 mt-0.5">
                          {meta.desc}
                        </p>
                      </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                      {items.map((server) => (
                        <MCPCard
                          key={server.id}
                          server={server}
                          onSelect={handleOpenMCP}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className="py-16 text-center rounded-2xl"
              style={{ border: "1px dashed var(--color-border)", color: "var(--color-text-muted)" }}
            >
              No MCP servers found matching your filters.
            </div>
          )}
        </section>

        {/* ── Skills Section ────────────────────────────────── */}
        <section className="mb-24">
          <SectionHeader
            id="skills"
            icon={Sparkles}
            title="Specialized Agent Skills & Prompts"
            description="Categorized by discipline (Engineering & TDD, Reasoning & Architecture, GUI Computer Use). All prompts visible below."
            count={filteredSkills.length}
            accentColor="var(--color-violet)"
          />

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <SearchBar
                id="search-skills"
                value={skillSearch}
                onChange={setSkillSearch}
                placeholder="Search skills, categories..."
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={14} style={{ color: "var(--color-text-muted)" }} />
              <FilterPills
                options={["CODING", "DEVOPS", "RESEARCH", "ANALYSIS", "WRITING"]}
                selected={skillCategoryFilter}
                onChange={setSkillCategoryFilter}
              />
            </div>
          </div>

          {/* Categorized Skill Groups */}
          {groupedSkills.length > 0 ? (
            <div className="space-y-12">
              {groupedSkills.map(({ category, meta, items }) => {
                const Icon = meta.icon;
                return (
                  <div key={category} className="relative">
                    {/* Category Header */}
                    <div className="flex items-center gap-3 pb-3 mb-4 border-b" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm"
                        style={{ background: `${meta.color}20`, border: `1px solid ${meta.color}40` }}
                      >
                        <Icon size={16} style={{ color: meta.color }} />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                          <span>{meta.label}</span>
                          <span
                            className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: `${meta.color}15`, color: meta.color }}
                          >
                            {items.length} {items.length === 1 ? "prompt" : "prompts"}
                          </span>
                        </h3>
                        <p className="text-xs text-neutral-400 mt-0.5">
                          {meta.desc}
                        </p>
                      </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                      {items.map((skill) => (
                        <SkillCard
                          key={skill.id}
                          skill={skill}
                          onSelect={handleOpenSkill}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div
              className="py-16 text-center rounded-2xl"
              style={{ border: "1px dashed var(--color-border)", color: "var(--color-text-muted)" }}
            >
              No skills found matching your filters.
            </div>
          )}
        </section>

      </main>

      {/* ── Footer ───────────────────────────────────────── */}
      <Footer />

      {/* ── Resource & Update Inspector Modal ─────────────── */}
      <ResourceDetailModal
        item={selectedItem}
        type={selectedType}
        onClose={handleCloseModal}
      />
    </div>
  );
}
