"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

export type Palette = "cool" | "midnight" | "teal";

type AuroraField = {
  set: (cfg: { palette?: Palette; intensity?: number; glow?: number }) => void;
  destroy: () => void;
};

type PaletteCtx = {
  palette: Palette;
  setPalette: (p: Palette) => void;
  registerField: (field: AuroraField) => void;
};

const PaletteContext = createContext<PaletteCtx | null>(null);

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  const [palette, setPaletteState] = useState<Palette>("cool");
  const fieldRef = useRef<AuroraField | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("wfq_palette") as Palette | null;
      if (saved === "cool" || saved === "midnight" || saved === "teal") {
        setPaletteState(saved);
      }
    } catch {}
  }, []);

  function setPalette(p: Palette) {
    setPaletteState(p);
    fieldRef.current?.set({ palette: p });
    try { localStorage.setItem("wfq_palette", p); } catch {}
  }

  function registerField(field: AuroraField) {
    fieldRef.current = field;
  }

  return (
    <PaletteContext.Provider value={{ palette, setPalette, registerField }}>
      {children}
    </PaletteContext.Provider>
  );
}

export function usePalette() {
  const ctx = useContext(PaletteContext);
  if (!ctx) throw new Error("usePalette must be used inside PaletteProvider");
  return ctx;
}
