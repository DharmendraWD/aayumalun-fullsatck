"use client";

import { useEffect, useState } from "react";
import { HiMoon, HiSun } from "react-icons/hi";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") || "dark";
    setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";

    // Check if the browser supports the View Transitions API
    if (!document.startViewTransition) {
      updateTheme(next);
      return;
    }

    // Modern "Cross-fade" Transition
    document.startViewTransition(() => updateTheme(next));
  };

  const updateTheme = (next) => {
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  if (!mounted) return <div className="w-10 h-10" />;

  return (
    <button
      aria-label="Toggle Theme"
      onClick={toggle}
      className="relative h-10 w-10 flex items-center justify-center rounded-full 
                 bg-gray-200/50 dark:bg-white/10 backdrop-blur-md border 
                 border-black/5 dark:border-white/10 shadow-sm
                 hover:scale-110 active:scale-95 transition-all duration-300
                 group overflow-hidden z-50"
    >
      <div className="relative h-6 w-6">
        {theme === 'dark' ? (
          <HiSun className="h-6 w-6 text-yellow-500 transition-transform duration-500 animate-in zoom-in rotate-45" />
        ) : (
          <HiMoon className="h-6 w-6 text-blue-600 transition-transform duration-500 animate-in zoom-in -rotate-12" />
        )}
      </div>
    </button>
  );
}