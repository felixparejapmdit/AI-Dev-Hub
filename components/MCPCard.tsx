"use client";

import { useState } from "react";
import { MCPServer } from "@/types";
import {
  Plus,
  Check,
  Terminal,
  Star,
  Database,
  Globe,
  Code2,
  MessageSquare,
  Cpu,
  Wrench,
  FolderOpen,
  Github,
  Youtube,
  BookOpen,
  Copy,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

interface MCPCardProps {
  server: MCPServer;
  isSelected: boolean;
  onToggle: (server: MCPServer) => void;
}

const CATEGORY_CONFIG: Record<
  string,
  { label: string; color: string; icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }> }
> = {
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
  const [copied, setCopied] = useState(false);
  const catConfig = CATEGORY_CONFIG[server.category] ?? CATEGORY_CONFIG.UTILITY;
  const CatIcon = catConfig.icon;

  const handleCopyCmd = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(server.installCommand);
    setCopied(true);
    toast.success("Install command copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id={`mcp-${server.id}`}
      className="glass-card p-5 cursor-pointer select-none relative overflow-hidden flex flex-col justify-between transition-all duration-200 hover:scale-[1.01]"
      style={{
        borderColor: isSelected ? "rgba(16, 185, 129, 0.6)" : undefined,
        boxShadow: isSelected
          ? "0 0 0 1px rgba(16,185,129,0.4), 0 8px 30px rgba(0,0,0,0.5)"
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
          style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.08), transparent)" }}
        />
      )}

      {/* Category accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: "linear-gradient(90deg, transparent, #10b981, transparent)",
        }}
      />

      <div>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner"
              style={{
                background: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
              }}
            >
              <CatIcon size={20} style={{ color: "#34d399" }} />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight text-white">
                {server.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                {server.author && (
                  <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                    by {server.author}
                  </span>
                )}
                <div
                  className="flex items-center gap-1 text-[11px] font-mono"
                  style={{ color: "#fbbf24" }}
                >
                  <Star size={10} fill="#fbbf24" />
                  <span>{formatStars(server.stars)}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 cursor-pointer"
            style={{
              background: isSelected ? "var(--color-emerald)" : "var(--glass-bg)",
              border: `1px solid ${
                isSelected ? "var(--color-emerald)" : "var(--color-border)"
              }`,
            }}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(server);
            }}
            aria-label={isSelected ? "Remove from workspace" : "Add to workspace"}
          >
            {isSelected ? (
              <Check size={14} className="text-white" />
            ) : (
              <Plus size={14} style={{ color: "var(--color-text-muted)" }} />
            )}
          </button>
        </div>

        {/* Latest Update Pill */}
        {server.latestUpdate && (
          <div
            className="mb-3 px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-2 border"
            style={{
              background: "rgba(16, 185, 129, 0.08)",
              borderColor: "rgba(16, 185, 129, 0.2)",
              color: "#6ee7b7",
            }}
          >
            <Sparkles size={12} className="text-emerald-400 flex-shrink-0" />
            <span className="truncate font-medium text-[11px]">{server.latestUpdate}</span>
            {server.updateDate && (
              <span className="ml-auto text-[10px] opacity-75 font-mono whitespace-nowrap">
                {server.updateDate}
              </span>
            )}
          </div>
        )}

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

        {/* Install command snippet with click to copy */}
        <div
          onClick={handleCopyCmd}
          className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg font-mono text-xs overflow-hidden cursor-pointer group hover:border-emerald-500/50 transition-colors"
          style={{
            background: "rgba(0,0,0,0.4)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-code)",
          }}
          title="Click to copy install command"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Terminal size={11} style={{ color: "#34d399", flexShrink: 0 }} />
            <span className="truncate text-[11px]">{server.installCommand}</span>
          </div>
          <button
            className="flex-shrink-0 text-neutral-400 group-hover:text-emerald-400 transition-colors"
            aria-label="Copy install command"
          >
            {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3 mb-3">
          {server.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Resources Bar */}
      <div
        className="pt-3 border-t flex items-center justify-between gap-2"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2">
          {server.repoUrl && (
            <a
              href={server.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg flex items-center gap-1.5 text-xs transition-colors hover:text-white"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "var(--color-text-secondary)",
              }}
              title="GitHub Repository"
            >
              <Github size={12} />
              <span className="text-[11px] font-medium">GitHub</span>
            </a>
          )}
          {server.youtubeUrl && (
            <a
              href={server.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg flex items-center gap-1.5 text-xs transition-colors hover:text-red-400"
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                color: "#f87171",
              }}
              title="YouTube Tutorial / Demo"
            >
              <Youtube size={12} />
              <span className="text-[11px] font-medium">Demo</span>
            </a>
          )}
          {server.docsUrl && (
            <a
              href={server.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg flex items-center gap-1.5 text-xs transition-colors hover:text-white"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "var(--color-text-secondary)",
              }}
              title="Documentation"
            >
              <BookOpen size={12} />
              <span className="text-[11px] font-medium">Docs</span>
            </a>
          )}
        </div>

        {server.npmPackage && (
          <span
            className="text-[11px] font-mono truncate max-w-[120px]"
            style={{ color: "#a5f3fc" }}
          >
            npm:{server.npmPackage.replace("@modelcontextprotocol/server-", "")}
          </span>
        )}
      </div>
    </div>
  );
}
