"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  id?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  id = "search-input",
  value,
  onChange,
  placeholder = "Search...",
}: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search
        size={17}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors"
        style={{ color: "var(--color-text-muted)" }}
      />
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        suppressHydrationWarning
        autoComplete="off"
        spellCheck="false"
        className="input-glass w-full"
        style={{
          paddingLeft: "42px",
          paddingRight: "36px",
          height: "44px",
          fontSize: "14px",
        }}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-md transition-opacity hover:opacity-100 cursor-pointer"
          style={{ color: "var(--color-text-muted)" }}
          aria-label="Clear search"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}
