"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { dict, type Lang } from "@/lib/i18n";

type LangCtx = {
  lang: Lang;
  t: <S extends keyof typeof dict, K extends keyof (typeof dict)[S]>(
    section: S,
    key: K
  ) => string;
  toggle: () => void;
};

const LangContext = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("wfq_lang") as Lang | null;
      if (saved === "ar" || saved === "en") setLang(saved);
    } catch {}
  }, []);

  function t<S extends keyof typeof dict, K extends keyof (typeof dict)[S]>(
    section: S,
    key: K
  ): string {
    const entry = dict[section][key] as { ar: string; en: string };
    return entry[lang];
  }

  function toggle() {
    setLang((prev) => {
      const next: Lang = prev === "ar" ? "en" : "ar";
      try { localStorage.setItem("wfq_lang", next); } catch {}
      return next;
    });
  }

  return (
    <LangContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
