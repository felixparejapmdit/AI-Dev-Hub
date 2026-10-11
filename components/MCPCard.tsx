"use client";

import { MCPServer } from "@/types";
import { Plus, Check, Terminal, Star, Database, Globe, Code2, MessageSquare, Cpu, Wrench, FolderOpen } from "lucide-react";

interface MCPCardProps {
  server: MCPServer;
  isSelected: boolean;
  onToggle: (server: MCPServer) => void;
}

const CATEGORY_CONFIG: Record<string, { label: string; color: string; icon: React.ComponentType<{size?: number; style?: React.CSSProperties}> }> = {
  DATABASE: { label: "Database", color: "badge-blue", icon: Database },
  FILESYSTEM: { label: "Filesystem", color: "badge-amber", icon: FolderOpen },
  WEB: { label: "Web", color: "badge-violet", icon: Globe },
  CODE: { label: "Code", color: "badge-emerald", icon: Code2 },
  COMMUNICATION: { label: "Comms", color: "badge-blue", icon: MessageSquare },
  AI: { label: "AI", color: "badge-violet", icon: Cpu },
  UTILITY: { label: "Utility", color: "badge-ghost", icon: Wrench },
  DEVTOOLS: { label: "DevTools", color: "badge-emerald", icon: Terminal },
};

function formatStars(stars: number): string {
  if (stars >= 1000) return `${(stars / 1000).toFixed(1)}k`;
  return stars.toString();
}

export default function MCPCard({ server, isSelected, onToggle }: MCPCardProps) {
  const catConfig = CATEGORY_CONFIG[server.category] ?? CATEGORY_CONFIG.UTILITY;
  const CatIcon = catConfig.icon;

  return (
    <div
      id={`mcp-${server.id}`}
      className="glass-card p-5 cursor-pointer select-none relative overflow-hidden"
      style={{
        borderColor: isSelected ? "rgba(16, 185, 129, 0.5)" : undefined,
        boxShadow: isSelected
          ? "0 0 0 1px rgba(16,185,129,0.3), 0 4px 24px rgba(0,0,0,0.4)"
          : undefined,
      }}
      onClick={() => onToggle(server)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onToggle(server)}
      aria-pressed={isSelected}
    >
      {/* Selection overlay */}
      {isSelected && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.05), transparent)" }}
        />
      )}

      {/* Category accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(16,185,129,0.6), transparent)",
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "var(--color-emerald-dim)",
              border: "1px solid rgba(16,185,129,0.2)",
            }}
          >
            <CatIcon size={18} style={{ color: "var(--color-emerald)" }} />
          </div>
          <div>
            <h3
              className="font-semibold text-sm leading-tight"
              style={{ color: "var(--color-text-primary)" }}
            >
              {server.name}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              {server.author && (
                <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                  by {server.author}
                </span>
              )}
              <div className="flex items-center gap-1">
                <Star
                  size={10}
                  style={{ color: "var(--color-amber)", fill: "var(--color-amber)" }}
                />
                <span
                  className="text-xs font-mono font-semibold"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {formatStars(server.stars)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Select button */}
        <button
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
          style={{
            background: isSelected ? "var(--color-emerald)" : "var(--glass-bg)",
            border: `1px solid ${isSelected ? "var(--color-emerald)" : "var(--color-border)"}`,
          }}
          onClick={(e) => {
            e.stopPropagation();
            onToggle(server);
          }}
          aria-label={isSelected ? "Remove from workspace" : "Add to workspace"}
        >
          {isSelected ? (
            <Check size={12} className="text-white" />
          ) : (
            <Plus size={12} style={{ color: "var(--color-text-muted)" }} />
          )}
        </button>
      </div>

      {/* Description */}
      {server.description && (
        <p
          className="text-xs leading-relaxed mb-3 line-clamp-2"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {server.description}
        </p>
      )}

      {/* Category badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`badge ${catConfig.color}`}>{catConfig.label}</span>
      </div>

      {/* Install command */}
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-xs overflow-hidden"
        style={{
          background: "rgba(0,0,0,0.3)",
          border: "1px solid var(--color-border)",
          color: "var(--color-text-code)",
        }}
      >
        <Terminal size={11} style={{ color: "var(--color-text-muted)", flexShrink: 0 }} />
        <span className="truncate">{server.installCommand}</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mt-3">
        {server.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="tag-pill">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
