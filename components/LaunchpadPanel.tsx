"use client";

import { useState } from "react";
import { WorkspaceCartItem, TargetPlatform, GeneratedConfig } from "@/types";
import {
  X,
  Download,
  Trash2,
  Zap,
  Brain,
  Server,
  Sparkles,
  ChevronRight,
  Copy,
  Check,
  Plus,
} from "lucide-react";
import toast from "react-hot-toast";
import { MOCK_MODELS, MOCK_MCP_SERVERS, MOCK_SKILLS } from "@/lib/mock-data";

interface LaunchpadPanelProps {
  items: WorkspaceCartItem[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onClose: () => void;
  onLoadTemplate?: (templateItems: WorkspaceCartItem[]) => void;
}

const PLATFORMS: { id: TargetPlatform; label: string; desc: string; color: string }[] = [
  {
    id: "antigravity",
    label: "Antigravity",
    desc: "Google's AI dev platform",
    color: "#3b82f6",
  },
  {
    id: "cursor",
    label: "Cursor",
    desc: ".cursorrules format",
    color: "#8b5cf6",
  },
  {
    id: "claude",
    label: "Claude",
    desc: "Claude Desktop config",
    color: "#f97316",
  },
];

function ItemTypeIcon({ type }: { type: string }) {
  if (type === "model") return <Brain size={14} style={{ color: "var(--color-blue)" }} />;
  if (type === "mcp") return <Server size={14} style={{ color: "var(--color-emerald)" }} />;
  return <Sparkles size={14} style={{ color: "var(--color-violet)" }} />;
}

export default function LaunchpadPanel({
  items,
  onRemove,
  onClear,
  onClose,
  onLoadTemplate,
}: LaunchpadPanelProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<TargetPlatform>("antigravity");
  const [generatedConfig, setGeneratedConfig] = useState<GeneratedConfig | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (items.length === 0) {
      toast.error("Add at least one item to your workspace first.");
      return;
    }

    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, platform: selectedPlatform }),
      });

      if (!res.ok) throw new Error("Generation failed");

      const config: GeneratedConfig = await res.json();
      setGeneratedConfig(config);
      toast.success("Config generated successfully!");
    } catch {
      toast.error("Failed to generate config. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedConfig) return;

    const blob = new Blob([generatedConfig.content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = generatedConfig.filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${generatedConfig.filename}`);
  };

  const handleCopy = async () => {
    if (!generatedConfig) return;
    await navigator.clipboard.writeText(generatedConfig.content);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const getItemName = (item: WorkspaceCartItem): string => {
    const i = item.item as unknown as Record<string, unknown>;
    return (i.name as string) || (i.title as string) || "Unknown";
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
    >
      {/* Backdrop */}
      <div className="flex-1" onClick={onClose} />

      {/* Panel */}
      <div
        id="launchpad-panel"
        className="w-full max-w-lg md:max-w-xl h-full overflow-y-auto flex flex-col shadow-2xl relative"
        style={{
          background: "#08080f",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Panel Header */}
        <div
          className="flex items-center justify-between p-6 sticky top-0 z-10"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "#08080f",
            backdropFilter: "blur(24px)",
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
            >
              <Zap size={16} className="text-white" />
            </div>
            <div>
              <h2
                className="font-bold text-base"
                style={{ color: "var(--color-text-primary)" }}
              >
                Launchpad
              </h2>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                {items.length} item{items.length !== 1 ? "s" : ""} in workspace
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text-secondary)",
            }}
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 p-6 flex flex-col gap-6">
          {/* Workspace Items */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                Workspace Items
              </h3>
              {items.length > 0 && (
                <button
                  onClick={onClear}
                  className="text-xs flex items-center gap-1 transition-colors cursor-pointer"
                  style={{ color: "var(--color-text-muted)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#ef4444")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)")
                  }
                >
                  <Trash2 size={12} />
                  Clear all
                </button>
              )}
            </div>

            {items.length === 0 ? (
              <div
                className="text-center py-6 px-4 rounded-xl flex flex-col items-center"
                style={{
                  border: "1px dashed var(--color-border)",
                  background: "rgba(255,255,255,0.01)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
                  style={{ background: "rgba(59,130,246,0.1)", color: "var(--color-blue)" }}
                >
                  <Zap size={20} />
                </div>
                <p className="text-sm font-semibold mb-1" style={{ color: "var(--color-text-primary)" }}>
                  Your workspace is empty
                </p>
                <p className="text-xs mb-4 max-w-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  Click &quot;+&quot; on cards in the catalog, or load a pre-configured starter stack below:
                </p>
                {onLoadTemplate && (
                  <div className="w-full flex flex-col gap-2">
                    <button
                      onClick={() =>
                        onLoadTemplate([
                          { id: MOCK_MODELS[0].id, type: "model", item: MOCK_MODELS[0] },
                          { id: MOCK_MCP_SERVERS[2].id, type: "mcp", item: MOCK_MCP_SERVERS[2] },
                          { id: MOCK_SKILLS[0].id, type: "skill", item: MOCK_SKILLS[0] },
                        ])
                      }
                      className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer hover:brightness-110"
                      style={{
                        background: "rgba(59,130,246,0.12)",
                        border: "1px solid rgba(59,130,246,0.3)",
                        color: "#60a5fa",
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <Zap size={13} />
                        Full-Stack AI Engineer Stack
                      </span>
                      <span className="opacity-80">+ Load</span>
                    </button>
                    <button
                      onClick={() =>
                        onLoadTemplate([
                          { id: MOCK_MODELS[2].id, type: "model", item: MOCK_MODELS[2] },
                          { id: MOCK_MCP_SERVERS[3].id, type: "mcp", item: MOCK_MCP_SERVERS[3] },
                          { id: MOCK_SKILLS[5].id, type: "skill", item: MOCK_SKILLS[5] },
                        ])
                      }
                      className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-between transition-all cursor-pointer hover:brightness-110"
                      style={{
                        background: "rgba(16,185,129,0.12)",
                        border: "1px solid rgba(16,185,129,0.3)",
                        color: "#34d399",
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles size={13} />
                        Deep Research & Analysis Stack
                      </span>
                      <span className="opacity-80">+ Load</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                    style={{
                      background: "var(--glass-bg)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <ItemTypeIcon type={item.type} />
                    <span
                      className="flex-1 text-sm truncate"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {getItemName(item)}
                    </span>
                    <span
                      className="text-xs font-mono capitalize"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {item.type}
                    </span>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="w-6 h-6 flex items-center justify-center rounded-lg transition-colors"
                      style={{ color: "var(--color-text-muted)" }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "#ef4444")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "var(--color-text-muted)")
                      }
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Platform Selection */}
          <section id="launchpad">
            <h3
              className="text-sm font-semibold mb-3"
              style={{ color: "var(--color-text-primary)" }}
            >
              Target Platform
            </h3>
            <div className="flex flex-col gap-2">
              {PLATFORMS.map((p) => (
                <button
                  key={p.id}
                  id={`platform-${p.id}`}
                  onClick={() => {
                    setSelectedPlatform(p.id);
                    setGeneratedConfig(null);
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200"
                  style={{
                    background:
                      selectedPlatform === p.id ? `${p.color}15` : "var(--glass-bg)",
                    border: `1px solid ${
                      selectedPlatform === p.id ? `${p.color}40` : "var(--color-border)"
                    }`,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background:
                        selectedPlatform === p.id ? p.color : "var(--color-text-muted)",
                    }}
                  />
                  <div className="flex-1">
                    <div
                      className="text-sm font-semibold"
                      style={{
                        color:
                          selectedPlatform === p.id ? p.color : "var(--color-text-primary)",
                      }}
                    >
                      {p.label}
                    </div>
                    <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                      {p.desc}
                    </div>
                  </div>
                  {selectedPlatform === p.id && (
                    <ChevronRight size={14} style={{ color: p.color }} />
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Generate Button */}
          <button
            id="generate-button"
            onClick={handleGenerate}
            disabled={isGenerating || items.length === 0}
            className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              color: "white",
              boxShadow: "0 4px 20px rgba(59,130,246,0.3)",
            }}
          >
            {isGenerating ? (
              <>
                <div
                  className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
                />
                Generating...
              </>
            ) : (
              <>
                <Zap size={16} />
                Generate Config
              </>
            )}
          </button>

          {/* Generated Config Output */}
          {generatedConfig && (
            <section className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {generatedConfig.filename}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    id="copy-config-button"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={{
                      background: "var(--glass-bg)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={handleDownload}
                    id="download-config-button"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                    style={{
                      background: "var(--color-emerald)",
                      color: "white",
                    }}
                  >
                    <Download size={12} />
                    Download
                  </button>
                </div>
              </div>
              <pre
                className="p-4 rounded-xl text-xs font-mono leading-relaxed overflow-auto max-h-80 whitespace-pre-wrap"
                style={{
                  background: "rgba(0,0,0,0.5)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-code)",
                }}
              >
                {generatedConfig.content}
              </pre>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
