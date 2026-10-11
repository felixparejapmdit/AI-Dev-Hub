"use client";

import { AIModel } from "@/types";
import { Plus, Check, Brain, Cpu, Cloud, Server, ExternalLink } from "lucide-react";

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
};

function formatContext(ctx: number): string {
  if (ctx >= 1000000) return `${(ctx / 1000000).toFixed(1)}M`;
  if (ctx >= 1000) return `${(ctx / 1000).toFixed(0)}K`;
  return ctx.toString();
}

export default function ModelCard({ model, isSelected, onToggle }: ModelCardProps) {
  const typeConfig = TYPE_CONFIG[model.type];
  const TypeIcon = typeConfig.icon;
  const providerColor = PROVIDER_COLORS[model.provider] ?? "#6366f1";

  return (
    <div
      id={`model-${model.id}`}
      className="glass-card p-5 cursor-pointer select-none relative overflow-hidden"
      style={{
        borderColor: isSelected ? "rgba(59, 130, 246, 0.5)" : undefined,
        boxShadow: isSelected ? "0 0 0 1px rgba(59,130,246,0.3), 0 4px 24px rgba(0,0,0,0.4)" : undefined,
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
          style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.05), transparent)" }}
        />
      )}

      {/* Provider accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${providerColor}80, transparent)` }}
      />

      {/* Header row */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${providerColor}20`, border: `1px solid ${providerColor}30` }}
          >
            <Brain size={18} style={{ color: providerColor }} />
          </div>
          <div>
            <h3
              className="font-semibold text-sm leading-tight"
              style={{ color: "var(--color-text-primary)" }}
            >
              {model.name}
            </h3>
            <p className="text-xs mt-0.5" style={{ color: "var(--color-text-secondary)" }}>
              {model.provider}
            </p>
          </div>
        </div>

        {/* Select button */}
        <button
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
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
            <Check size={12} className="text-white" />
          ) : (
            <Plus size={12} style={{ color: "var(--color-text-muted)" }} />
          )}
        </button>
      </div>

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
          <TypeIcon size={11} style={{ color: "var(--color-text-muted)" }} />
          <span className={`badge ${typeConfig.color}`}>{typeConfig.label}</span>
        </div>
        <div
          className="flex items-center gap-1 text-xs font-mono"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>ctx</span>
          <span className="font-semibold" style={{ color: "var(--color-emerald)" }}>
            {formatContext(model.contextWindow)}
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {model.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="tag-pill">
            {tag}
          </span>
        ))}
      </div>

      {/* API slug */}
      {model.apiSlug && (
        <div
          className="mt-3 pt-3 flex items-center gap-1.5 font-mono text-xs"
          style={{
            borderTop: "1px solid var(--color-border)",
            color: "var(--color-text-code)",
          }}
        >
          <ExternalLink size={10} style={{ color: "var(--color-text-muted)" }} />
          <span className="truncate">{model.apiSlug}</span>
        </div>
      )}
    </div>
  );
}
