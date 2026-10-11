"use client";

import { useState, useMemo, useRef } from "react";
import { AIModel, MCPServer, Skill, WorkspaceCartItem } from "@/types";
import { MOCK_MODELS, MOCK_MCP_SERVERS, MOCK_SKILLS } from "@/lib/mock-data";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ModelCard from "@/components/ModelCard";
import MCPCard from "@/components/MCPCard";
import SkillCard from "@/components/SkillCard";
import LaunchpadPanel from "@/components/LaunchpadPanel";
import SearchBar from "@/components/SearchBar";
import toast from "react-hot-toast";
import { Brain, Server, Sparkles, Filter } from "lucide-react";

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
          className="w-10 h-10 rounded-xl flex items-center justify-center"
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
          className="ml-auto text-sm font-mono font-semibold px-3 py-1 rounded-full"
          style={{ background: `${accentColor}15`, color: accentColor }}
        >
          {count} items
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
          className="px-3 py-1 rounded-full text-xs font-semibold transition-all duration-150"
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

  // Workspace cart state
  const [cartItems, setCartItems] = useState<WorkspaceCartItem[]>([]);
  const [launchpadOpen, setLaunchpadOpen] = useState(false);

  // Search state
  const [modelSearch, setModelSearch] = useState("");
  const [mcpSearch, setMcpSearch] = useState("");
  const [skillSearch, setSkillSearch] = useState("");

  // Filter state
  const [modelTypeFilter, setModelTypeFilter] = useState("");
  const [mcpCategoryFilter, setMcpCategoryFilter] = useState("");
  const [skillCategoryFilter, setSkillCategoryFilter] = useState("");

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
      return matchesSearch && matchesType;
    });
  }, [modelSearch, modelTypeFilter]);

  const filteredMCP = useMemo(() => {
    return MOCK_MCP_SERVERS.filter((s) => {
      const q = mcpSearch.toLowerCase();
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.description?.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q));
      const matchesCat = !mcpCategoryFilter || s.category === mcpCategoryFilter;
      return matchesSearch && matchesCat;
    });
  }, [mcpSearch, mcpCategoryFilter]);

  const filteredSkills = useMemo(() => {
    return MOCK_SKILLS.filter((s) => {
      const q = skillSearch.toLowerCase();
      const matchesSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.description?.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q));
      const matchesCat = !skillCategoryFilter || s.category === skillCategoryFilter;
      return matchesSearch && matchesCat;
    });
  }, [skillSearch, skillCategoryFilter]);

  // ── Cart handlers ──
  const isInCart = (id: string) => cartItems.some((i) => i.id === id);

  const toggleModel = (model: AIModel) => {
    if (isInCart(model.id)) {
      setCartItems((prev) => prev.filter((i) => i.id !== model.id));
      toast(`Removed ${model.name}`, { icon: "🗑️" });
    } else {
      setCartItems((prev) => [
        ...prev,
        { id: model.id, type: "model", item: model },
      ]);
      toast.success(`Added ${model.name}`);
    }
  };

  const toggleMCP = (server: MCPServer) => {
    if (isInCart(server.id)) {
      setCartItems((prev) => prev.filter((i) => i.id !== server.id));
      toast(`Removed ${server.name}`, { icon: "🗑️" });
    } else {
      setCartItems((prev) => [
        ...prev,
        { id: server.id, type: "mcp", item: server },
      ]);
      toast.success(`Added ${server.name}`);
    }
  };

  const toggleSkill = (skill: Skill) => {
    if (isInCart(skill.id)) {
      setCartItems((prev) => prev.filter((i) => i.id !== skill.id));
      toast(`Removed ${skill.title}`, { icon: "🗑️" });
    } else {
      setCartItems((prev) => [
        ...prev,
        { id: skill.id, type: "skill", item: skill },
      ]);
      toast.success(`Added ${skill.title}`);
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    toast("Workspace cleared", { icon: "🧹" });
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <Navbar
        cartCount={cartItems.length}
        onCartClick={() => setLaunchpadOpen(true)}
      />

      {/* Hero */}
      <Hero onExplore={() => catalogRef.current?.scrollIntoView({ behavior: "smooth" })} />

      {/* Catalog */}
      <main ref={catalogRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {/* ── AI Models Section ─────────────────────────────── */}
        <section className="mb-24">
          <SectionHeader
            id="models"
            icon={Brain}
            title="AI Models"
            description="The latest and most capable LLMs — cloud, local, and hybrid. Click to add to your workspace."
            count={filteredModels.length}
            accentColor="var(--color-blue)"
          />

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <SearchBar
                value={modelSearch}
                onChange={setModelSearch}
                placeholder="Search models, providers, tags..."
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredModels.map((model) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  isSelected={isInCart(model.id)}
                  onToggle={toggleModel}
                />
              ))}
            </div>
          ) : (
            <div
              className="py-16 text-center rounded-2xl"
              style={{ border: "1px dashed var(--color-border)", color: "var(--color-text-muted)" }}
            >
              No models found for &quot;{modelSearch}&quot;
            </div>
          )}
        </section>

        {/* ── MCP Servers Section ───────────────────────────── */}
        <section className="mb-24">
          <SectionHeader
            id="mcp"
            icon={Server}
            title="MCP Servers"
            description="Model Context Protocol servers that give your AI direct access to databases, tools, and services."
            count={filteredMCP.length}
            accentColor="var(--color-emerald)"
          />

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <SearchBar
                value={mcpSearch}
                onChange={setMcpSearch}
                placeholder="Search MCP servers, categories..."
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMCP.map((server) => (
                <MCPCard
                  key={server.id}
                  server={server}
                  isSelected={isInCart(server.id)}
                  onToggle={toggleMCP}
                />
              ))}
            </div>
          ) : (
            <div
              className="py-16 text-center rounded-2xl"
              style={{ border: "1px dashed var(--color-border)", color: "var(--color-text-muted)" }}
            >
              No MCP servers found for &quot;{mcpSearch}&quot;
            </div>
          )}
        </section>

        {/* ── Skills Section ────────────────────────────────── */}
        <section className="mb-24">
          <SectionHeader
            id="skills"
            icon={Sparkles}
            title="AI Skills"
            description="Expert-crafted system prompts that turn any LLM into a specialized AI assistant."
            count={filteredSkills.length}
            accentColor="var(--color-violet)"
          />

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <SearchBar
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSkills.map((skill) => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  isSelected={isInCart(skill.id)}
                  onToggle={toggleSkill}
                />
              ))}
            </div>
          ) : (
            <div
              className="py-16 text-center rounded-2xl"
              style={{ border: "1px dashed var(--color-border)", color: "var(--color-text-muted)" }}
            >
              No skills found for &quot;{skillSearch}&quot;
            </div>
          )}
        </section>

        {/* ── Footer ───────────────────────────────────────── */}
        <footer className="divider pt-8 pb-4 text-center">
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Built with ❤️ by{" "}
            <span className="font-semibold text-gradient-blue">VibeLaunch</span> ·
            Open to the public · No auth required
          </p>
        </footer>
      </main>

      {/* Launchpad Panel */}
      {launchpadOpen && (
        <LaunchpadPanel
          items={cartItems}
          onRemove={removeFromCart}
          onClear={clearCart}
          onClose={() => setLaunchpadOpen(false)}
        />
      )}
    </div>
  );
}
