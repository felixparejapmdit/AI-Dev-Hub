"use client";

import { useState } from "react";
import { MCPServer } from "@/types";
import {
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
  ArrowRight,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";

interface MCPCardProps {
  server: MCPServer;
  onSelect: (server: MCPServer) => void;
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

export default function MCPCard({ server, onSelect }: MCPCardProps) {
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
      className="glass-card p-5 cursor-pointer select-none relative overflow-hidden flex flex-col justify-between transition-all duration-200 hover:scale-[1.01] hover:border-emerald-500/50 group"
      onClick={() => onSelect(server)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect(server)}
    >
      {/* Category accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1 transition-all group-hover:h-1.5"
        style={{
          background: "linear-gradient(90deg, transparent, #10b981, transparent)",
        }}
      />

      <div>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner transition-transform group-hover:scale-105"
              style={{
                background: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
              }}
            >
              <CatIcon size={20} style={{ color: "#34d399" }} />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight text-white group-hover:text-emerald-400 transition-colors">
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
                  <Star size={11} fill="currentColor" />
                  <span>{formatStars(server.stars)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Inspect Badge */}
          <div className="flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-white/5 group-hover:bg-emerald-500/20 text-neutral-400 group-hover:text-emerald-300 border border-white/10 group-hover:border-emerald-500/30 transition-all">
            <span>Updates</span>
            <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Latest Update Pill */}
        {server.latestUpdate && (
          <div
            className="mb-3 px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-2 border transition-all"
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

        {/* Category & NPM */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`badge ${catConfig.color}`}>{catConfig.label}</span>
          {server.npmPackage && (
            <span
              className="text-[11px] font-mono truncate"
              style={{ color: "var(--color-text-code)" }}
            >
              {server.npmPackage}
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {server.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>

        {/* Install command snippet */}
        <div
          className="rounded-lg p-2 flex items-center justify-between gap-2 mb-3 group/cmd"
          style={{
            background: "rgba(0,0,0,0.4)",
            border: "1px solid var(--color-border)",
          }}
          onClick={handleCopyCmd}
          title="Click to copy install command"
        >
          <div className="flex items-center gap-1.5 min-w-0">
            <Terminal size={11} style={{ color: "var(--color-text-muted)" }} />
            <code
              className="text-[11px] truncate font-mono"
              style={{ color: "var(--color-emerald)" }}
            >
              {server.installCommand}
            </code>
          </div>
          <button
            type="button"
            className="p-1 rounded transition-opacity opacity-60 group-hover/cmd:opacity-100 flex-shrink-0 cursor-pointer"
            style={{ color: "var(--color-text-muted)" }}
            aria-label="Copy install command"
          >
            {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
          </button>
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
              title="GitHub Repository & Code"
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
              title="YouTube Tutorial & Demo"
            >
              <Youtube size={12} />
              <span className="text-[11px] font-medium">Video</span>
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
              title="Official MCP Documentation"
            >
              <BookOpen size={12} />
              <span className="text-[11px] font-medium">Docs</span>
            </a>
          )}
        </div>

        <span
          className="text-[10px] font-mono text-emerald-400 font-semibold"
        >
          MCP Certified
        </span>
      </div>
    </div>
  );
}
