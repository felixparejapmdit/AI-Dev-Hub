"use client";

import { Skill } from "@/types";
import { Plus, Check, Sparkles, TrendingUp, BookOpen, Code2, LineChart, Cloud, Lightbulb, Search } from "lucide-react";

interface SkillCardProps {
  skill: Skill;
  isSelected: boolean;
  onToggle: (skill: Skill) => void;
}

const CATEGORY_CONFIG: Record<string, { label: string; color: string; icon: React.ComponentType<{size?: number; style?: React.CSSProperties}> }> = {
  GENERAL: { label: "General", color: "badge-ghost", icon: Sparkles },
  CODING: { label: "Coding", color: "badge-emerald", icon: Code2 },
  WRITING: { label: "Writing", color: "badge-blue", icon: BookOpen },
  ANALYSIS: { label: "Analysis", color: "badge-violet", icon: LineChart },
  DEVOPS: { label: "DevOps", color: "badge-amber", icon: Cloud },
  RESEARCH: { label: "Research", color: "badge-blue", icon: Search },
  CREATIVE: { label: "Creative", color: "badge-violet", icon: Lightbulb },
};

function formatUseCount(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toString();
}

export default function SkillCard({ skill, isSelected, onToggle }: SkillCardProps) {
  const catConfig = CATEGORY_CONFIG[skill.category] ?? CATEGORY_CONFIG.GENERAL;
  const CatIcon = catConfig.icon;

  // Preview of the system prompt (first 100 chars)
  const promptPreview = skill.systemPrompt.slice(0, 120).trim() + "...";

  return (
    <div
      id={`skill-${skill.id}`}
      className="glass-card p-5 cursor-pointer select-none relative overflow-hidden"
      style={{
        borderColor: isSelected ? "rgba(139, 92, 246, 0.5)" : undefined,
        boxShadow: isSelected
          ? "0 0 0 1px rgba(139,92,246,0.3), 0 4px 24px rgba(0,0,0,0.4)"
          : undefined,
      }}
      onClick={() => onToggle(skill)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onToggle(skill)}
      aria-pressed={isSelected}
    >
      {/* Selection overlay */}
      {isSelected && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.05), transparent)" }}
        />
      )}

      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(139,92,246,0.6), transparent)",
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "var(--color-violet-dim)",
              border: "1px solid rgba(139,92,246,0.2)",
            }}
          >
            <CatIcon size={18} style={{ color: "var(--color-violet)" }} />
          </div>
          <div>
            <h3
              className="font-semibold text-sm leading-tight"
              style={{ color: "var(--color-text-primary)" }}
            >
              {skill.title}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              {skill.author && (
                <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                  by {skill.author}
                </span>
              )}
              <div className="flex items-center gap-1">
                <TrendingUp size={10} style={{ color: "var(--color-violet)" }} />
                <span
                  className="text-xs font-mono font-semibold"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {formatUseCount(skill.useCount)} uses
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Select button */}
        <button
          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
          style={{
            background: isSelected ? "var(--color-violet)" : "var(--glass-bg)",
            border: `1px solid ${isSelected ? "var(--color-violet)" : "var(--color-border)"}`,
          }}
          onClick={(e) => {
            e.stopPropagation();
            onToggle(skill);
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
      {skill.description && (
        <p
          className="text-xs leading-relaxed mb-3 font-medium"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {skill.description}
        </p>
      )}

      {/* Category badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className={`badge ${catConfig.color}`}>{catConfig.label}</span>
      </div>

      {/* System prompt preview */}
      <div
        className="px-3 py-2 rounded-lg text-xs leading-relaxed line-clamp-3 font-mono"
        style={{
          background: "rgba(0,0,0,0.3)",
          border: "1px solid var(--color-border)",
          color: "var(--color-text-muted)",
        }}
      >
        {promptPreview}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mt-3">
        {skill.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="tag-pill">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
