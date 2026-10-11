"use client";

import { useState } from "react";
import { Menu, X, Zap, Github, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

interface NavbarProps {
  onRefreshFeed?: () => void;
}

export default function Navbar({ onRefreshFeed }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    toast.loading("Fetching latest updates from GitHub & registries...", { id: "refresh-toast" });
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Feed updated! All models, MCPs & skills verified.", { id: "refresh-toast" });
      if (onRefreshFeed) onRefreshFeed();
    }, 800);
  };

  return (
    <nav
      className="glass sticky top-0 z-50 border-b"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="w-full max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md"
              style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
            >
              <Zap size={16} className="text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight" style={{ color: "var(--color-text-primary)" }}>
                VibeLaunch
              </span>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold"
                style={{
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "#34d399",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                }}
              >
                LIVE REGISTRY
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#models"
              className="text-sm font-medium transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--color-text-primary)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--color-text-secondary)")
              }
            >
              Models (50+)
            </a>
            <a
              href="#mcp"
              className="text-sm font-medium transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--color-text-primary)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--color-text-secondary)")
              }
            >
              MCP Servers
            </a>
            <a
              href="#skills"
              className="text-sm font-medium transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--color-text-primary)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--color-text-secondary)")
              }
            >
              Skills & Prompts
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10 cursor-pointer"
              title="Refresh latest updates from registries"
            >
              <RefreshCw size={12} className={isRefreshing ? "animate-spin text-blue-400" : ""} />
              <span>Auto-Synced</span>
            </button>

            <a
              href="https://github.com/felixparejapmdit/AI-Dev-Hub"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all bg-white/10 hover:bg-white/15 text-white border border-white/10"
            >
              <Github size={14} />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-lg"
              style={{ color: "var(--color-text-secondary)" }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-t px-4 py-4 flex flex-col gap-3"
          style={{ borderColor: "var(--color-border)" }}
        >
          {["#models", "#mcp", "#skills"].map((href) => (
            <button
              key={href}
              className="text-sm py-2 capitalize text-left bg-transparent border-none cursor-pointer"
              style={{ color: "var(--color-text-secondary)" }}
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.querySelector(href);
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {href.replace("#", "")}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleRefresh();
            }}
            className="text-sm py-2 text-left bg-transparent border-none cursor-pointer text-blue-400 flex items-center gap-2"
          >
            <RefreshCw size={13} />
            <span>Check for Updates</span>
          </button>
        </div>
      )}
    </nav>
  );
}
