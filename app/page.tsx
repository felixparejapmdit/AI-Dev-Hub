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
import { Brain, Server, Sparkles, Filter, Layers } from "lucide-react";

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

  // ── Filtered lists ──
  const filteredModels = useMemo(() => {
    return MOCK_MODELS.filter((m) => {
      const q = modelSearch.toLowerCase();
      const matchesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.provider.toLowerCase().includes(q) ||
        m.tags.some((t) => t.toLowerCase().includes(q));
      const matchesType = !modelTypeFilter || m.type === modelTypeFilter;

      let matchesEco = true;
      if (ecosystemFilter) {
        const ecoLower = ecosystemFilter.toLowerCase();
        matchesEco =
          m.provider.toLowerCase().includes(ecoLower) ||
          m.name.toLowerCase().includes(ecoLower) ||
          m.tags.some((t) => t.toLowerCase().includes(ecoLower)) ||
          (m.compatibleLLMs?.some((c) => c.toLowerCase().includes(ecoLower)) ?? false);
      }

      return matchesSearch && matchesType && matchesEco;
    });
  }, [modelSearch, modelTypeFilter, ecosystemFilter]);

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

  const ecosystems = [
    { label: "All Ecosystems", value: "" },
    { label: "Claude (Anthropic)", value: "Claude" },
    { label: "Gemini (Google)", value: "Gemini" },
    { label: "Nous Hermes", value: "Hermes" },
    { label: "OpenCode", value: "OpenCode" },
    { label: "DeepSeek", value: "DeepSeek" },
    { label: "OpenAI", value: "OpenAI" },
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
                Instantly shows models, MCP tools, and skills compatible with your preferred AI environment.
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
            description="Continuously updated LLMs for cloud APIs, local Ollama, and agent runtimes. Click any card to inspect release updates, YouTube guides, and GitHub repos."
            count={filteredModels.length}
            accentColor="var(--color-blue)"
          />

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
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

          {/* Grid */}
          {filteredModels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
              {filteredModels.map((model) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  onSelect={handleOpenModel}
                />
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
            description="Community & official MCP servers granting models direct filesystem, database, and terminal capabilities. Click to view install command and docs."
            count={filteredMCP.length}
            accentColor="var(--color-emerald)"
          />

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
                options={["DATABASE", "FILESYSTEM", "WEB", "DEVTOOLS", "COMMUNICATION"]}
                selected={mcpCategoryFilter}
                onChange={setMcpCategoryFilter}
              />
            </div>
          </div>

          {/* Grid */}
          {filteredMCP.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
              {filteredMCP.map((server) => (
                <MCPCard
                  key={server.id}
                  server={server}
                  onSelect={handleOpenMCP}
                />
              ))}
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
            description="Expert-tuned system directives for Claude Computer Use, Gemini Multimodal, Hermes Tool Calling, and OpenCode Autonomous Engineering."
            count={filteredSkills.length}
            accentColor="var(--color-violet)"
          />

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
                options={["CODING", "WRITING", "ANALYSIS", "DEVOPS", "RESEARCH"]}
                selected={skillCategoryFilter}
                onChange={setSkillCategoryFilter}
              />
            </div>
          </div>

          {/* Grid */}
          {filteredSkills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
              {filteredSkills.map((skill) => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  onSelect={handleOpenSkill}
                />
              ))}
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
