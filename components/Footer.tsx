"use client";

import { Zap, Github, ArrowRight, ExternalLink, Shield, Sparkles } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="border-t mt-32 relative overflow-hidden"
      style={{
        borderColor: "rgba(255, 255, 255, 0.08)",
        background: "linear-gradient(180deg, rgba(8, 8, 14, 0.6) 0%, rgba(5, 5, 8, 0.98) 100%)",
      }}
    >
      {/* Top subtle glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), rgba(16, 185, 129, 0.5), transparent)",
        }}
      />

      <div className="w-full max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg"
                style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
              >
                <Zap size={18} className="text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  VibeLaunch
                </span>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold"
                  style={{
                    background: "rgba(59, 130, 246, 0.15)",
                    color: "var(--color-blue)",
                    border: "1px solid rgba(59, 130, 246, 0.3)",
                  }}
                >
                  v1.0 BETA
                </span>
              </div>
            </div>

            <p
              className="text-sm max-w-sm mb-6 leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              The open, friction-free hub for modern AI developers. Aggregate 50+ frontier LLM models,
              community MCP servers, and specialized agent prompts with instant config export.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/felixparejapmdit/AI-Dev-Hub"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:bg-white/10"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "var(--color-text-primary)",
                }}
              >
                <Github size={14} />
                <span>Star on GitHub</span>
              </a>

              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono"
                style={{
                  background: "rgba(16, 185, 129, 0.1)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  color: "var(--color-emerald)",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Zero Login Ever</span>
              </div>
            </div>
          </div>

          {/* Links Column 1: Catalog */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4 text-white">
              Catalog
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm" style={{ color: "var(--color-text-secondary)" }}>
              <li>
                <a href="#models" className="hover:text-blue-400 transition-colors">
                  AI Models (50+)
                </a>
              </li>
              <li>
                <a href="#mcp" className="hover:text-emerald-400 transition-colors">
                  MCP Servers (15+)
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-purple-400 transition-colors">
                  AI Skills (6+)
                </a>
              </li>
              <li>
                <a href="#models" className="hover:text-blue-400 transition-colors">
                  Live Registry Updates
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Supported IDEs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4 text-white">
              Export Formats
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm" style={{ color: "var(--color-text-secondary)" }}>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Google Antigravity</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>Cursor (.cursorrules)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                <span>Claude Desktop Config</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Direct JSON & Markdown</span>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4 text-white">
              Resources
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm" style={{ color: "var(--color-text-secondary)" }}>
              <li>
                <a
                  href="https://github.com/felixparejapmdit/AI-Dev-Hub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink size={11} className="opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://modelcontextprotocol.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>MCP Specification</span>
                  <ExternalLink size={11} className="opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://docs.anthropic.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Anthropic Docs</span>
                  <ExternalLink size={11} className="opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://platform.openai.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>OpenAI Docs</span>
                  <ExternalLink size={11} className="opacity-60" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{
            borderColor: "rgba(255, 255, 255, 0.06)",
            color: "var(--color-text-muted)",
          }}
        >
          <div className="flex items-center gap-3">
            <span>© 2026 VibeLaunch · Built for AI Developers & Vibe Coders</span>
            <span>·</span>
            <span>MIT License</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>All Systems Operational</span>
            </div>
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors cursor-pointer bg-transparent border-none text-neutral-400"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
