"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const FONT_KEY = "tenant-a11y-font-level";
const CONTRAST_KEY = "tenant-a11y-contrast";

// Font-size steps mapped to a root-font-size multiplier. Everything in the app
// is sized in rem, so scaling the root font-size scales the whole UI.
const FONT_LEVELS = [-1, 0, 1, 2] as const;
type FontLevel = (typeof FONT_LEVELS)[number];
const FONT_SCALE: Record<FontLevel, number> = { [-1]: 0.9, 0: 1, 1: 1.15, 2: 1.3 };
const MIN_LEVEL: FontLevel = -1;
const MAX_LEVEL: FontLevel = 2;

interface AccessibilityContextValue {
  fontLevel: FontLevel;
  canDecrease: boolean;
  canIncrease: boolean;
  decreaseFont: () => void;
  increaseFont: () => void;
  resetFont: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

function applyFont(level: FontLevel) {
  document.documentElement.style.fontSize = `${FONT_SCALE[level] * 100}%`;
}

function applyContrast(on: boolean) {
  document.documentElement.classList.toggle("a11y-contrast", on);
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [fontLevel, setFontLevel] = useState<FontLevel>(0);
  const [highContrast, setHighContrast] = useState(false);

  // Restore persisted preferences after mount (avoids SSR hydration mismatch).
  useEffect(() => {
    const storedFont = Number(window.localStorage.getItem(FONT_KEY));
    if (FONT_LEVELS.includes(storedFont as FontLevel)) {
      setFontLevel(storedFont as FontLevel);
      applyFont(storedFont as FontLevel);
    }
    const storedContrast = window.localStorage.getItem(CONTRAST_KEY) === "true";
    if (storedContrast) {
      setHighContrast(true);
      applyContrast(true);
    }
  }, []);

  const changeFont = useCallback((next: FontLevel) => {
    setFontLevel(next);
    applyFont(next);
    window.localStorage.setItem(FONT_KEY, String(next));
  }, []);

  const decreaseFont = useCallback(
    () => setFontLevel((prev) => {
      const next = Math.max(MIN_LEVEL, prev - 1) as FontLevel;
      applyFont(next);
      window.localStorage.setItem(FONT_KEY, String(next));
      return next;
    }),
    []
  );

  const increaseFont = useCallback(
    () => setFontLevel((prev) => {
      const next = Math.min(MAX_LEVEL, prev + 1) as FontLevel;
      applyFont(next);
      window.localStorage.setItem(FONT_KEY, String(next));
      return next;
    }),
    []
  );

  const resetFont = useCallback(() => changeFont(0), [changeFont]);

  const toggleHighContrast = useCallback(() => {
    setHighContrast((prev) => {
      const next = !prev;
      applyContrast(next);
      window.localStorage.setItem(CONTRAST_KEY, String(next));
      return next;
    });
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{
        fontLevel,
        canDecrease: fontLevel > MIN_LEVEL,
        canIncrease: fontLevel < MAX_LEVEL,
        decreaseFont,
        increaseFont,
        resetFont,
        highContrast,
        toggleHighContrast,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return ctx;
}
