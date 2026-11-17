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
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch color theme (current: ${
        theme === "teal" ? "Obsidian & Teal" : "Ricotta, Persian Blue & Lobster Red"
      })`}
      className="inline-flex min-h-[44px] items-center gap-2 border border-border bg-bg-subtle/70 px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-accent"
    >
      <span
        aria-hidden="true"
        className="flex items-center gap-1"
      >
        <span
          className="h-3 w-3 rounded-full border border-black/15"
          style={{
            backgroundColor: theme === "teal" ? "#0D2226" : "#1B3350",
          }}
        />
        <span
          className="h-3 w-3 rounded-full border border-black/15"
          style={{
            backgroundColor: theme === "teal" ? "#00A8AD" : "#F03A2A",
          }}
        />
      </span>
      <span>{theme === "teal" ? "Teal Theme" : "Persian & Cream"}</span>
    </button>
  );
}
