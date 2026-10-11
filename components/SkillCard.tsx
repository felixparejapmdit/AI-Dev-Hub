"use client";

import { useState } from "react";
import { Skill } from "@/types";
import {
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
  ArrowRight,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";

interface SkillCardProps {
  skill: Skill;
  onSelect: (skill: Skill) => void;
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

export default function SkillCard({ skill, onSelect }: SkillCardProps) {
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
      className="glass-card p-5 cursor-pointer select-none relative overflow-hidden flex flex-col justify-between transition-all duration-200 hover:scale-[1.01] hover:border-purple-500/50 group"
      onClick={() => onSelect(skill)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect(skill)}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1 transition-all group-hover:h-1.5"
        style={{
          background: "linear-gradient(90deg, transparent, #8b5cf6, transparent)",
        }}
      />

      <div>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner transition-transform group-hover:scale-105"
              style={{
                background: "rgba(139, 92, 246, 0.15)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
              }}
            >
              <CatIcon size={20} style={{ color: "#c084fc" }} />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight text-white group-hover:text-purple-400 transition-colors">
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
                  style={{ color: "var(--color-violet)" }}
                >
                  <TrendingUp size={11} />
                  <span>{formatUseCount(skill.useCount)} uses</span>
                </div>
              </div>
            </div>
          </div>

          {/* Inspect Badge */}
          <div className="flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-white/5 group-hover:bg-purple-500/20 text-neutral-400 group-hover:text-purple-300 border border-white/10 group-hover:border-purple-500/30 transition-all">
            <span>Updates</span>
            <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Latest Update Banner */}
        {skill.latestUpdate && (
          <div
            className="mb-3 px-2.5 py-1.5 rounded-lg text-xs flex items-center gap-2 border transition-all"
            style={{
              background: "rgba(139, 92, 246, 0.08)",
              borderColor: "rgba(139, 92, 246, 0.2)",
              color: "#d8b4fe",
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
            className="text-xs leading-relaxed mb-3 line-clamp-2"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {skill.description}
          </p>
        )}

        {/* Category */}
        <div className="mb-3">
          <span className={`badge ${catConfig.color}`}>{catConfig.label}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {skill.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>

        {/* Prompt snippet preview */}
        <div
          className="rounded-lg p-2.5 mb-3 group/prompt"
          style={{
            background: "rgba(0,0,0,0.4)",
            border: "1px solid var(--color-border)",
          }}
          onClick={handleCopyPrompt}
          title="Click to copy system prompt"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-mono" style={{ color: "var(--color-text-muted)" }}>
              System Prompt
            </span>
            <span
              className="text-[10px] flex items-center gap-1 font-mono transition-opacity opacity-60 group-hover/prompt:opacity-100"
              style={{ color: "var(--color-violet)" }}
            >
              {copied ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
              {copied ? "Copied!" : "Copy"}
            </span>
          </div>
          <p
            className="text-[11px] font-mono leading-relaxed line-clamp-2"
            style={{ color: "var(--color-text-code)" }}
          >
            {promptPreview}
          </p>
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
              title="GitHub Repository & Code"
            >
              <Github size={12} />
              <span className="text-[11px] font-medium">GitHub</span>
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
              title="YouTube Tutorial & Demo"
            >
              <Youtube size={12} />
              <span className="text-[11px] font-medium">Video</span>
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
              title="Documentation & Prompts"
            >
              <BookOpen size={12} />
              <span className="text-[11px] font-medium">Docs</span>
            </a>
          )}
        </div>

        <span className="text-[10px] font-mono text-purple-400 font-semibold">
          Prompt Ready
        </span>
      </div>
    </div>
  );
}
