"use client";

import { useState } from "react";
import { Menu, X, Zap, ShoppingCart } from "lucide-react";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav
      className="glass sticky top-0 z-50 border-b"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
            >
              <Zap size={16} className="text-white" />
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-lg tracking-tight" style={{ color: "var(--color-text-primary)" }}>
                VibeLaunch
              </span>
              <span
                className="text-xs font-mono px-1.5 py-0.5 rounded"
                style={{
                  background: "var(--color-blue-dim)",
                  color: "var(--color-blue)",
                  border: "1px solid rgba(59,130,246,0.2)",
                }}
              >
                BETA
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
              Models
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
              Skills
            </a>
            <a
              href="#launchpad"
              className="text-sm font-medium transition-colors"
              style={{ color: "var(--color-text-secondary)" }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "var(--color-text-primary)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "var(--color-text-secondary)")
              }
            >
              Launchpad
            </a>
          </div>

          {/* Cart Button */}
          <div className="flex items-center gap-3">
            <button
              id="cart-button"
              onClick={onCartClick}
              className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: cartCount > 0 ? "var(--color-blue-dim)" : "var(--glass-bg)",
                border: `1px solid ${cartCount > 0 ? "rgba(59,130,246,0.3)" : "var(--color-border)"}`,
                color: cartCount > 0 ? "var(--color-blue)" : "var(--color-text-secondary)",
              }}
            >
              <ShoppingCart size={16} />
              <span>Workspace</span>
              {cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white"
                  style={{ background: "var(--color-blue)" }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-lg"
              style={{ color: "var(--color-text-secondary)" }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
          {["#models", "#mcp", "#skills", "#launchpad"].map((href) => (
            <a
              key={href}
              href={href}
              className="text-sm py-2 capitalize"
              style={{ color: "var(--color-text-secondary)" }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {href.replace("#", "")}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
