"use client";

import { ArrowRight, Sparkles, Github, Shield, Zap, Flame } from "lucide-react";
import { MOCK_MODELS, MOCK_MCP_SERVERS, MOCK_SKILLS } from "@/lib/mock-data";

interface HeroProps {
  onExplore: () => void;
  onSelectEcosystem?: (ecosystem: string) => void;
}

export default function Hero({ onExplore, onSelectEcosystem }: HeroProps) {
  const stats = [
    { label: "Frontier AI Models", value: `${MOCK_MODELS.length}` },
    { label: "MCP Server Tools", value: `${MOCK_MCP_SERVERS.length}` },
    { label: "Specialized Skills", value: `${MOCK_SKILLS.length}` },
    { label: "Auth / Login", value: "Zero Required" },
  ];

  const featuredEcosystems = [
    { name: "Claude 3.7", tag: "Claude", color: "#f97316" },
    { name: "Gemini 2.5", tag: "Gemini", color: "#4285f4" },
    { name: "Nous Hermes 3", tag: "Hermes", color: "#8b5cf6" },
    { name: "OpenCode", tag: "OpenCode", color: "#10b981" },
    { name: "DeepSeek R1/V3", tag: "DeepSeek", color: "#06b6d4" },
  ];

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 overflow-hidden grid-texture">
      {/* Ambient gradient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <div className="relative w-full max-w-5xl mx-auto text-center">
        {/* Live sync pill badge */}
        <div
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
          style={{
            background: "rgba(59, 130, 246, 0.1)",
            border: "1px solid rgba(59, 130, 246, 0.25)",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold font-mono tracking-wide" style={{ color: "var(--color-blue)" }}>
            LIVE FEED · CLAUDE, GEMINI, OPENCODE, HERMES & MORE
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-gradient-hero text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-6">
          The Real-Time AI Hub for{" "}
          <span className="text-gradient-blue">Modern Devs & Vibe Coders</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-base sm:text-xl max-w-3xl mx-auto mb-8 leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Discover continuously updated tools, MCP servers, prompts, and models ready for{" "}
          <strong className="text-white">Claude</strong>, <strong className="text-white">Gemini</strong>,{" "}
          <strong className="text-white">OpenCode</strong>, and <strong className="text-white">Hermes</strong>. Click any card to
          instantly see the latest releases, GitHub repos, and YouTube video tutorials.
        </p>

        {/* Fast Ecosystem Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-2xl mx-auto">
          <span className="text-xs font-mono text-neutral-400 mr-1 flex items-center gap-1">
            <Flame size={13} className="text-amber-400" />
            Jump into:
          </span>
          {featuredEcosystems.map((eco) => (
            <button
              key={eco.name}
              onClick={() => {
                if (onSelectEcosystem) onSelectEcosystem(eco.tag);
                onExplore();
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all hover:scale-105 cursor-pointer flex items-center gap-1.5"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "#f3f4f6",
              }}
            >
              <span className="w-2 h-2 rounded-full" style={{ background: eco.color }} />
              <span>{eco.name}</span>
            </button>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            id="hero-explore-button"
            onClick={onExplore}
            className="btn-primary text-base px-8 py-3.5 flex items-center gap-2"
          >
            <span>Browse All Components</span>
            <ArrowRight size={18} />
          </button>

          <a
            href="https://github.com/felixparejapmdit/AI-Dev-Hub"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost text-base px-8 py-3.5 flex items-center gap-2"
          >
            <Github size={18} />
            <span>Star on GitHub</span>
          </a>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card px-4 py-5 text-center">
              <div className="text-3xl font-black mb-1 text-gradient-blue">
                {stat.value}
              </div>
              <div className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Trust features */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400">
          <div className="flex items-center gap-1.5">
            <Zap size={14} className="text-emerald-400" />
            <span>Daily Automated Registry Sync</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-blue-400" />
            <span>Direct YouTube & GitHub Embeds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield size={14} className="text-purple-400" />
            <span>Zero Sign-In or Accounts</span>
          </div>
        </div>
      </div>
    </section>
  );
}
