"use client";

import { useState } from "react";
import { Skill } from "@/types";
import {
  Plus,
  Check,
  Sparkles,
  TrendingUp,
  BookOpen,
  Code2,
  LineChart,
  Cloud,
  Lightbulb,
  Search,
  Github,
  Youtube,
  Copy,
} from "lucide-react";
import toast from "react-hot-toast";

interface SkillCardProps {
  skill: Skill;
  isSelected: boolean;
  onToggle: (skill: Skill) => void;
}

const CATEGORY_CONFIG: Record<
  string,
  { label: string; color: string; icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }> }
> = {
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
  const [copied, setCopied] = useState(false);
  const catConfig = CATEGORY_CONFIG[skill.category] ?? CATEGORY_CONFIG.GENERAL;
  const CatIcon = catConfig.icon;

  const promptPreview = skill.systemPrompt.slice(0, 110).trim() + "...";

  const handleCopyPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(skill.systemPrompt);
    setCopied(true);
    toast.success("System prompt copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id={`skill-${skill.id}`}
      className="glass-card p-5 cursor-pointer select-none relative overflow-hidden flex flex-col justify-between transition-all duration-200 hover:scale-[1.01]"
      style={{
        borderColor: isSelected ? "rgba(139, 92, 246, 0.6)" : undefined,
        boxShadow: isSelected
          ? "0 0 0 1px rgba(139,92,246,0.4), 0 8px 30px rgba(0,0,0,0.5)"
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
          style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.08), transparent)" }}
        />
      )}

      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: "linear-gradient(90deg, transparent, #8b5cf6, transparent)",
        }}
      />

      <div>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner"
              style={{
                background: "rgba(139, 92, 246, 0.15)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
              }}
            >
              <CatIcon size={20} style={{ color: "#a78bfa" }} />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight text-white">
                {skill.title}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                {skill.author && (
                  <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                    by {skill.author}
                  </span>
                )}
                <div
                  className="flex items-center gap-1 text-[11px] font-mono"
                  style={{ color: "#a78bfa" }}
                >
                  <TrendingUp size={10} />
                  <span>{formatUseCount(skill.useCount)} uses</span>
                </div>
              </div>
            </div>
          </div>

          <button
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 cursor-pointer"
            style={{
              background: isSelected ? "var(--color-violet)" : "var(--glass-bg)",
              border: `1px solid ${
                isSelected ? "var(--color-violet)" : "var(--color-border)"
              }`,
            }}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(skill);
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
        {skill.latestUpdate && (
          <div
            className="mb-3 px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-2 border"
            style={{
              background: "rgba(139, 92, 246, 0.08)",
              borderColor: "rgba(139, 92, 246, 0.2)",
              color: "#c4b5fd",
            }}
          >
            <Sparkles size={12} className="text-purple-400 flex-shrink-0" />
            <span className="truncate font-medium text-[11px]">{skill.latestUpdate}</span>
            {skill.updateDate && (
              <span className="ml-auto text-[10px] opacity-75 font-mono whitespace-nowrap">
                {skill.updateDate}
              </span>
            )}
          </div>
        )}

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

        {/* System prompt preview with click to copy */}
        <div
          onClick={handleCopyPrompt}
          className="p-2.5 rounded-lg text-xs leading-relaxed font-mono relative group cursor-pointer hover:border-purple-500/50 transition-colors"
          style={{
            background: "rgba(0,0,0,0.4)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-secondary)",
          }}
          title="Click to copy full system prompt"
        >
          <div className="flex items-center justify-between mb-1 pb-1 border-b border-white/5 text-[10px] text-neutral-400">
            <span>System Prompt</span>
            <span className="flex items-center gap-1 group-hover:text-purple-300">
              {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
              {copied ? "Copied" : "Copy"}
            </span>
          </div>
          <p className="line-clamp-2 text-[11px]">{promptPreview}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3 mb-3">
          {skill.tags.slice(0, 4).map((tag) => (
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
          {skill.githubUrl && (
            <a
              href={skill.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg flex items-center gap-1.5 text-xs transition-colors hover:text-white"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "var(--color-text-secondary)",
              }}
              title="GitHub Prompt Repository & Source"
            >
              <Github size={12} />
              <span className="text-[11px] font-medium">Source</span>
            </a>
          )}
          {skill.youtubeUrl && (
            <a
              href={skill.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded-lg flex items-center gap-1.5 text-xs transition-colors hover:text-red-400"
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                color: "#f87171",
              }}
              title="YouTube Tutorial / Guide"
            >
              <Youtube size={12} />
              <span className="text-[11px] font-medium">Guide</span>
            </a>
          )}
          {skill.docsUrl && (
            <a
              href={skill.docsUrl}
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

        <span
          className="text-[11px] font-mono capitalize"
          style={{ color: "var(--color-text-muted)" }}
        >
          {skill.category.toLowerCase()}
        </span>
      </div>
    </div>
  );
}
