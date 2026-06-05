"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePalette, type Palette } from "@/contexts/PaletteContext";

declare global {
  interface Window {
    AuroraField: {
      mount: (
        canvas: HTMLCanvasElement,
        opts: {
          intensity?: number;
          glow?: number;
          goldMix?: number;
          palette?: Palette;
        }
      ) => {
        set: (cfg: { palette?: Palette; intensity?: number; glow?: number }) => void;
        destroy: () => void;
      } | null;
    };
  }
}

export default function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { palette, registerField } = usePalette();
  const mounted = useRef(false);

  function initAurora() {
    if (mounted.current || !canvasRef.current || !window.AuroraField) return;
    mounted.current = true;

    let savedPalette: Palette = "cool";
    try {
      const s = localStorage.getItem("wfq_palette") as Palette | null;
      if (s === "cool" || s === "midnight" || s === "teal") savedPalette = s;
    } catch {}

    const field = window.AuroraField.mount(canvasRef.current, {
      intensity: 0.5,
      glow: 0.35,
      goldMix: 0.85,
      palette: savedPalette,
    });

    if (field) registerField(field);

    return () => field?.destroy();
  }

  useEffect(() => {
    // If aurora.js was already loaded (e.g. fast refresh), init immediately
    if (window.AuroraField) initAurora();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Script
        src="/aurora.js"
        strategy="afterInteractive"
        onLoad={initAurora}
      />
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-screen h-screen pointer-events-none"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      />
    </>
  );
}
