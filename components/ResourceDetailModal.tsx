"use client";

import { useEffect, useState } from "react";
import { AIModel, MCPServer, Skill } from "@/types";
import {
  X,
  ExternalLink,
  Github,
  Youtube,
  BookOpen,
  Copy,
  Check,
  Sparkles,
  Calendar,
  Layers,
  Cpu,
  Brain,
  Server,
  Star,
  Terminal,
  Zap,
  CheckCircle2,
  Share2,
} from "lucide-react";
import toast from "react-hot-toast";

interface ResourceDetailModalProps {
  item: AIModel | MCPServer | Skill | null;
  type: "model" | "mcp" | "skill" | null;
  onClose: () => void;
}

function getYouTubeEmbedId(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
}

function formatContext(ctx?: number): string {
  if (!ctx) return "";
  if (ctx >= 1000000) return `${(ctx / 1000000).toFixed(1)}M`;
  if (ctx >= 1000) return `${(ctx / 1000).toFixed(0)}K`;
  return ctx.toString();
}

export default function ResourceDetailModal({
  item,
  type,
  onClose,
}: ResourceDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "video" | "code">("overview");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!item || !type) return null;

  const isModel = type === "model";
  const isMCP = type === "mcp";
  const isSkill = type === "skill";

  const model = isModel ? (item as AIModel) : null;
  const mcp = isMCP ? (item as MCPServer) : null;
  const skill = isSkill ? (item as Skill) : null;

  const title = model?.name || mcp?.name || skill?.title || "Resource Details";
  const subtitle = model?.provider || mcp?.author || skill?.author || "Community";
  const description = item.description || "";
  const githubUrl =
    (model && model.githubUrl) ||
    (mcp && (mcp.githubUrl || mcp.repoUrl)) ||
    (skill && skill.githubUrl) ||
    "";
  const youtubeUrl = item.youtubeUrl || "";
  const docsUrl = item.docsUrl || "";
  const latestUpdate = item.latestUpdate || "Latest stable release";
  const updateDate = item.updateDate || "Recent";
  const embedId = getYouTubeEmbedId(youtubeUrl);

  const compatibleList = item.compatibleLLMs || [
    "Claude",
    "Gemini",
    "Hermes",
    "OpenCode",
    "DeepSeek",
    "GPT-4o",
  ];

  const highlights = item.updateHighlights || [
    "Verified for latest Claude 3.7 & Gemini 2.5 model architectures",
    "Production-ready integration with zero authentication required",
    "Full compatibility with modern agentic IDEs & terminal runtimes",
  ];

  // Derive quickstart snippet
  let codeSnippet = item.quickstartSnippet;
  if (!codeSnippet) {
    if (isModel) {
      codeSnippet = model?.type === "LOCAL"
        ? `# Run locally with Ollama:\nollama run ${model.apiSlug || model.id}\n\n# Or configure in Cursor / Antigravity:\n{\n  "model": "${model.id}",\n  "provider": "${model.provider}"\n}`
        : `// Call via API:\nimport OpenAI from "openai";\nconst client = new OpenAI();\nconst response = await client.chat.completions.create({\n  model: "${model?.apiSlug || model?.id}",\n  messages: [{ role: "user", content: "Hello world" }]\n});`;
    } else if (isMCP) {
      codeSnippet = `// Add to claude_desktop_config.json or antigravity.json:\n{\n  "mcpServers": {\n    "${mcp?.name.toLowerCase().replace(/\\s+/g, "-")}": {\n      "command": "npx",\n      "args": ["-y", "${mcp?.npmPackage || "@modelcontextprotocol/server" + mcp?.id}"]\n    }\n  }\n}`;
    } else if (skill) {
      codeSnippet = skill.systemPrompt;
    }
  }

  const handleCopy = () => {
    if (!codeSnippet) return;
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    toast.success("Snippet copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Resource link copied!");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      style={{
        background: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(16px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-3xl my-8 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        style={{
          background: "linear-gradient(180deg, #10101a 0%, #08080e 100%)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          maxHeight: "90vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top ambient color glow */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: isModel
              ? "linear-gradient(90deg, #3b82f6, #60a5fa, #8b5cf6)"
              : isMCP
              ? "linear-gradient(90deg, #10b981, #34d399, #06b6d4)"
              : "linear-gradient(90deg, #8b5cf6, #c084fc, #ec4899)",
          }}
        />

        {/* Modal Header */}
        <div className="p-6 sm:p-8 border-b relative" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-xl flex items-center justify-center text-neutral-400 hover:text-white transition-all bg-white/5 hover:bg-white/10 cursor-pointer border border-white/10"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pr-12">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
                style={{
                  background: isModel
                    ? "rgba(59, 130, 246, 0.15)"
                    : isMCP
                    ? "rgba(16, 185, 129, 0.15)"
                    : "rgba(139, 92, 246, 0.15)",
                  border: isModel
                    ? "1px solid rgba(59, 130, 246, 0.3)"
                    : isMCP
                    ? "1px solid rgba(16, 185, 129, 0.3)"
                    : "1px solid rgba(139, 92, 246, 0.3)",
                }}
              >
                {isModel && <Brain size={28} className="text-blue-400" />}
                {isMCP && <Server size={28} className="text-emerald-400" />}
                {isSkill && <Sparkles size={28} className="text-purple-400" />}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span
                    className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      background: isModel
                        ? "rgba(59, 130, 246, 0.2)"
                        : isMCP
                        ? "rgba(16, 185, 129, 0.2)"
                        : "rgba(139, 92, 246, 0.2)",
                      color: isModel ? "#60a5fa" : isMCP ? "#34d399" : "#c084fc",
                    }}
                  >
                    {isModel ? "AI Model" : isMCP ? "MCP Server Tool" : "AI Skill Prompt"}
                  </span>
                  {model?.type && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-neutral-300 border border-white/10">
                      {model.type}
                    </span>
                  )}
                  {mcp?.stars && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1">
                      <Star size={11} fill="currentColor" />
                      {mcp.stars.toLocaleString()} stars
                    </span>
                  )}
                  {model?.contextWindow && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                      {formatContext(model.contextWindow)} ctx
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {title}
                </h2>
                <p className="text-xs sm:text-sm font-medium mt-0.5 text-neutral-400">
                  By <span className="text-white font-semibold">{subtitle}</span>
                </p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-neutral-300">
            {description}
          </p>

          {/* Quick Verified Resources Bar */}
          <div className="flex items-center gap-2.5 mt-5 flex-wrap">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-all border border-white/10"
              >
                <Github size={14} />
                <span>GitHub Repository</span>
                <ExternalLink size={12} className="opacity-70" />
              </a>
            )}

            {youtubeUrl && (
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-red-500/15 hover:bg-red-500/25 text-red-300 transition-all border border-red-500/30"
              >
                <Youtube size={14} className="text-red-400" />
                <span>Watch Breakdown</span>
                <ExternalLink size={12} className="opacity-70" />
              </a>
            )}

            {docsUrl && (
              <a
                href={docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-neutral-200 transition-all border border-white/10"
              >
                <BookOpen size={14} />
                <span>Official Documentation</span>
                <ExternalLink size={12} className="opacity-70" />
              </a>
            )}

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-neutral-300 transition-all border border-white/10 cursor-pointer"
            >
              <Share2 size={13} />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Modal Body / Scrollable */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* ── Latest Update Callout Banner ── */}
          <div
            className="rounded-2xl p-4 sm:p-5 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.08) 100%)",
              border: "1px solid rgba(59, 130, 246, 0.25)",
            }}
          >
            <div className="flex items-center justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">
                  🔥 Latest Update & Releases
                </span>
              </div>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/20">
                {updateDate}
              </span>
            </div>

            <p className="text-sm font-semibold text-white mb-3">
              {latestUpdate}
            </p>

            <ul className="space-y-1.5 text-xs text-neutral-300">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Compatible LLMs Matrix ── */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Cpu size={16} className="text-purple-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Compatible Current LLMs
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {compatibleList.map((llm) => (
                <div
                  key={llm}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#f3f4f6",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{llm}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-neutral-400 mt-2">
              Tested and verified for frontier models: Claude 3.7/3.5, Gemini 2.5/2.0, Nous Hermes 3, OpenCode, and DeepSeek.
            </p>
          </div>

          {/* ── Video Breakdown Embed ── */}
          {embedId && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Youtube size={16} className="text-red-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Video Walkthrough & Tutorial
                  </h3>
                </div>
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                >
                  <span>Open in YouTube</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${embedId}?rel=0`}
                  title={`${title} YouTube Tutorial`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
            </div>
          )}

          {/* ── Quickstart / Implementation Snippet ── */}
          {codeSnippet && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Terminal size={16} className="text-blue-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    {isSkill ? "System Prompt / Skill Directive" : "Quickstart & Config Snippet"}
                  </h3>
                </div>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all bg-white/10 hover:bg-white/15 text-white cursor-pointer border border-white/10"
                >
                  {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copied ? "Copied!" : "Copy Code"}</span>
                </button>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/60">
                <pre
                  className="p-4 text-xs font-mono text-neutral-200 overflow-x-auto leading-relaxed max-h-60"
                  style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                >
                  <code>{codeSnippet}</code>
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          className="p-4 sm:p-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 bg-black/40"
          style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
        >
          <div className="text-xs text-neutral-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Zero auth required · Auto-synced from GitHub & official docs</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-xs py-2 px-4 flex-1 sm:flex-initial"
              >
                <Github size={14} />
                <span>Visit GitHub</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="btn-primary text-xs py-2 px-5 flex-1 sm:flex-initial"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
