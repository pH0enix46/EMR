// // //
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (e?: React.MouseEvent) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
// - undefined means “no value given” by default, which works well with TypeScript to check if the context is missing. null is an actual value, so TypeScript won’t warn you if the provider is missing

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  // - mounted = false at first. After component loads in the browser, we set it true. Use it to avoid hydration mismatch between server HTML and browser HTML
  const [isTransitioning, setIsTransitioning] = useState(false); // - // Prevents spam-clicking during theme animation

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const activeTheme = savedTheme || systemTheme;

    // - requestAnimationFrame waits a tiny moment. It makes sure the browser is ready before applying the theme, so no flicker.
    const frame = requestAnimationFrame(() => {
      setTheme(activeTheme);
      setMounted(true);

      // - Apply the theme class to the HTML tag immediately
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(activeTheme);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = async (e?: React.MouseEvent) => {
    if (isTransitioning) return; // - prevent spam clicks

    const nextTheme = theme === "light" ? "dark" : "light";

    // - If browser doesn’t support fancy animation OR user wants less motion. just switch theme normally and exit
    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      updateTheme(nextTheme);
      return;
    }

    setIsTransitioning(true); // - Disable further toggles during transition

    // - Get click position (or use screen center if no click)
    const x = e?.clientX ?? window.innerWidth / 2;
    const y = e?.clientY ?? window.innerHeight / 2;

    // - Calculate how big the circle must grow to cover the whole screen
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    // - Start the smooth theme transition; inside we actually update the theme
    const transition = document.startViewTransition(() => {
      updateTheme(nextTheme);
    });

    transition.ready.then(() => {
      // - Prepare circle animation: start small → grow big
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      // - If going to dark, expanding circle reveals dark (new content)
      // - If going to light, expanding circle reveals light (new content)
      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });

    try {
      await transition.finished; // - Wait for animation to complete
    } catch {
      // - Transition was interrupted or cancelled - safe to ignore
    } finally {
      setIsTransitioning(false); // - unlock toggle when done
    }
  };

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {/* - We hide content until React is ready to avoid flicker; contents wrapper → hides content until ready, without breaking layout */}
      <div
        className="contents"
        style={{ visibility: mounted ? "visible" : "hidden" }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
