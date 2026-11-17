"use client";

import { useEffect, useState } from "react";

type ThemeName = "teal" | "persian";

const STORAGE_KEY = "site-theme-preview";

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeName>("teal");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "persian" || saved === "teal") {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const toggleTheme = () => {
    const next: ThemeName = theme === "teal" ? "persian" : "teal";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <div className="fixed bottom-5 left-5 z-40">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch color theme (current: ${
          theme === "teal"
            ? "Obsidian & Teal"
            : "Ricotta, Persian Blue & Lobster Red"
        })`}
        className="inline-flex min-h-[40px] items-center gap-2 border border-border-dark bg-bg-dark/95 px-3.5 py-2 text-xs font-semibold text-[#F4F7F8] shadow-[0_16px_40px_rgba(0,0,0,0.32)] backdrop-blur-md transition-colors hover:border-accent"
      >
        <span aria-hidden="true" className="flex items-center gap-1">
          <span
            className="h-3 w-3 rounded-full border border-white/25"
            style={{
              backgroundColor: theme === "teal" ? "#0D2226" : "#1B3350",
            }}
          />
          <span
            className="h-3 w-3 rounded-full border border-white/25"
            style={{
              backgroundColor: theme === "teal" ? "#00A8AD" : "#F03A2A",
            }}
          />
        </span>
        <span>
          Theme: {theme === "teal" ? "Teal" : "Persian & Cream"}
        </span>
      </button>
    </div>
  );
}
