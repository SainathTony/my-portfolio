import React from "react";
import { Navigation } from "./Navigation";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { useTheme } from "../hooks/useTheme";

interface LayoutProps {
  children: React.ReactNode;
}

const sectionIds = [
  "hero",
  "about",
  "skills",
  "experience",
  "projects",
  "contact",
];

export function Layout({ children }: LayoutProps) {
  const { activeSection, scrollToSection } = useScrollSpy(sectionIds, 80);
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        isDark={isDark}
        onThemeToggle={toggleTheme}
      />
      <main className="relative">{children}</main>
    </div>
  );
}
