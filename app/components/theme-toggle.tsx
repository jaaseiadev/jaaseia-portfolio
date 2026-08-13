"use client";

import { MoonIcon, SunIcon } from "@/app/components/icons";

export function ThemeToggle() {
  function toggleTheme() {
    const nextTheme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    localStorage.setItem("portfolio-theme", nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="grid size-8 place-items-center rounded-full border border-border text-muted transition-colors hover:bg-surface hover:text-foreground"
      aria-label="Toggle color theme"
    >
      <SunIcon className="hidden size-3.5 dark:block" />
      <MoonIcon className="size-3.5 dark:hidden" />
    </button>
  );
}
