"use client";

import { ArrowRight, Zap, Shield, GitBranch } from "lucide-react";

interface HeroProps {
  onExplore: () => void;
}

const STATS = [
  { label: "AI Models", value: "50+" },
  { label: "MCP Servers", value: "200+" },
  { label: "Skills", value: "100+" },
  { label: "No Login", value: "Ever" },
];

export default function Hero({ onExplore }: HeroProps) {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden grid-texture">
      {/* Ambient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{
            background: "var(--color-blue-dim)",
            border: "1px solid rgba(59,130,246,0.2)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "var(--color-emerald)" }}
          />
          <span className="text-xs font-semibold font-mono" style={{ color: "var(--color-blue)" }}>
            AI Dev Hub · VibeLaunch v1.0
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-gradient-hero text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-6"
        >
          Your AI Dev
          <br />
          Environment,{" "}
          <span className="text-gradient-blue">Launched</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Discover the best LLM models, MCP servers, and AI skills. Build your
          perfect dev stack and export a config file — no login, no friction.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            id="hero-explore-button"
            onClick={onExplore}
            className="btn-primary text-base px-8 py-3.5"
          >
            Explore Catalog
            <ArrowRight size={18} />
          </button>
          <a
            href="#launchpad"
            className="btn-ghost text-base px-8 py-3.5"
          >
            <Zap size={18} />
            Open Launchpad
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="glass-card px-4 py-5 text-center"
            >
              <div
                className="text-3xl font-black mb-1 text-gradient-blue"
              >
                {stat.value}
              </div>
              <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {[
            { icon: Shield, text: "No Authentication Required" },
            { icon: GitBranch, text: "Open Source Friendly" },
            { icon: Zap, text: "Instant Config Export" },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              <Icon size={14} style={{ color: "var(--color-blue)" }} />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
