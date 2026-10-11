"use client";

import { AIModel } from "@/types";
import { Plus, Check, Brain, Cpu, Cloud, Server, ExternalLink, Github, Youtube, BookOpen, Sparkles, Calendar } from "lucide-react";

interface ModelCardProps {
  model: AIModel;
  isSelected: boolean;
  onToggle: (model: AIModel) => void;
}

const TYPE_CONFIG = {
  CLOUD: { label: "Cloud", color: "badge-blue", icon: Cloud },
  LOCAL: { label: "Local", color: "badge-emerald", icon: Cpu },
  HYBRID: { label: "Hybrid", color: "badge-violet", icon: Server },
};

const PROVIDER_COLORS: Record<string, string> = {
  Anthropic: "#f97316",
  OpenAI: "#10a37f",
  Google: "#4285f4",
  DeepSeek: "#06b6d4",
  Meta: "#1877f2",
  "Mistral AI": "#ff7000",
  Qwen: "#8b5cf6",
  Microsoft: "#00a4ef",
  xAI: "#ec4899",
  Cohere: "#14b8a6",
  Perplexity: "#6366f1",
};

function formatContext(ctx: number): string {
  if (ctx >= 1000000) return `${(ctx / 1000000).toFixed(1)}M`;
  if (ctx >= 1000) return `${(ctx / 1000).toFixed(0)}K`;
  return ctx.toString();
}

export default function ModelCard({ model, isSelected, onToggle }: ModelCardProps) {
  const typeConfig = TYPE_CONFIG[model.type] || TYPE_CONFIG.CLOUD;
  const TypeIcon = typeConfig.icon;
  const providerColor = PROVIDER_COLORS[model.provider] ?? "#6366f1";

  return (
    <div
      id={`model-${model.id}`}
      className="glass-card p-5 cursor-pointer select-none relative overflow-hidden flex flex-col justify-between transition-all duration-200 hover:scale-[1.01]"
      style={{
        borderColor: isSelected ? "rgba(59, 130, 246, 0.6)" : undefined,
        boxShadow: isSelected
          ? "0 0 0 1px rgba(59,130,246,0.4), 0 8px 30px rgba(0,0,0,0.5)"
          : undefined,
      }}
      onClick={() => onToggle(model)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onToggle(model)}
      aria-pressed={isSelected}
    >
      {/* Selection glow overlay */}
      {isSelected && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.08), transparent)" }}
        />
      )}

      {/* Provider accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: `linear-gradient(90deg, transparent, ${providerColor}, transparent)` }}
      />

      <div>
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner"
              style={{ background: `${providerColor}20`, border: `1px solid ${providerColor}40` }}
            >
              <Brain size={20} style={{ color: providerColor }} />
            </div>
            <div>
              <h3
                className="font-bold text-sm leading-tight text-white group-hover:text-blue-400 transition-colors"
              >
                {model.name}
              </h3>
              <p className="text-xs font-medium mt-0.5" style={{ color: providerColor }}>
                {model.provider}
              </p>
            </div>
          </div>

          {/* Select button */}
          <button
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 cursor-pointer"
            style={{
              background: isSelected ? "var(--color-blue)" : "var(--glass-bg)",
              border: `1px solid ${isSelected ? "var(--color-blue)" : "var(--color-border)"}`,
            }}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(model);
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
        {model.latestUpdate && (
          <div
            className="mb-3 px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-2 border"
            style={{
              background: "rgba(59, 130, 246, 0.08)",
              borderColor: "rgba(59, 130, 246, 0.2)",
              color: "#93c5fd",
            }}
          >
            <Sparkles size={12} className="text-blue-400 flex-shrink-0" />
            <span className="truncate font-medium text-[11px]">{model.latestUpdate}</span>
            {model.updateDate && (
              <span className="ml-auto text-[10px] opacity-75 font-mono whitespace-nowrap">
                {model.updateDate}
              </span>
            )}
          </div>
        )}

        {/* Description */}
        {model.description && (
          <p
            className="text-xs leading-relaxed mb-3 line-clamp-2"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {model.description}
          </p>
        )}

        {/* Stats row */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1.5">
            <TypeIcon size={12} style={{ color: "var(--color-text-muted)" }} />
            <span className={`badge ${typeConfig.color}`}>{typeConfig.label}</span>
          </div>
          <div
            className="flex items-center gap-1 text-xs font-mono"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>ctx:</span>
            <span className="font-semibold" style={{ color: "var(--color-emerald)" }}>
              {formatContext(model.contextWindow)}
            </span>
          </div>
          {model.releaseDate && (
            <div
              className="flex items-center gap-1 text-[11px] font-mono ml-auto"
              style={{ color: "var(--color-text-muted)" }}
            >
              <Calendar size={11} />
              <span>{model.releaseDate}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {model.tags.slice(0, 4).map((tag) => (
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
          {model.githubUrl && (
            <a
              href={model.githubUrl}
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
          {model.youtubeUrl && (
            <a
              href={model.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg flex items-center gap-1.5 text-xs transition-colors hover:text-red-400"
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                color: "#f87171",
              }}
              title="YouTube Launch & Deep Dive Tutorial"
            >
              <Youtube size={12} />
              <span className="text-[11px] font-medium">Video</span>
            </a>
          )}
          {model.docsUrl && (
            <a
              href={model.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg flex items-center gap-1.5 text-xs transition-colors hover:text-white"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "var(--color-text-secondary)",
              }}
              title="Official Documentation & API"
            >
              <BookOpen size={12} />
              <span className="text-[11px] font-medium">Docs</span>
            </a>
          )}
        </div>

        {model.apiSlug && (
          <span
            className="text-[11px] font-mono truncate max-w-[110px]"
            style={{ color: "var(--color-text-code)" }}
            title={model.apiSlug}
          >
            {model.apiSlug}
          </span>
        )}
      </div>
    </div>
  );
}
