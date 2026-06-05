"use client";

import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import EmblemSvg from "./EmblemSvg";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer style={{ padding: "46px 0 90px", marginTop: 30 }}>
      <div className="wfq-section-wrap">
        <div
          className="flex items-center justify-between gap-5 flex-wrap"
          style={{ borderTop: "1px solid var(--hair)", paddingTop: 28 }}
        >
          {/* Brand */}
          <Link href="#top" className="flex items-center gap-3.5 no-underline">
            <span
              className="w-11 h-11 rounded-[13px] flex-none grid place-items-center border"
              style={{
                background: "radial-gradient(120% 120% at 30% 20%, #16344c, #081726)",
                borderColor: "var(--hair-gold)",
              }}
            >
              <EmblemSvg
                className="w-[26px] h-[26px]"
                style={{ filter: "drop-shadow(0 0 6px rgba(220,194,156,.45))" } as React.CSSProperties}
              />
            </span>
            <span
              className="text-[22px] leading-none tracking-[.01em] whitespace-nowrap"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600, color: "var(--text)" }}
            >
              Wisdom <b style={{ color: "var(--gold-soft)", fontWeight: 600 }}>From</b> Quran
            </span>
          </Link>

          {/* Quranic ayah */}
          <div
            style={{
              fontFamily: 'var(--font-amiri), "Cormorant Garamond", serif',
              color: "var(--muted)",
              fontSize: 19,
            }}
          >
            {t("footer", "ayah")}
          </div>

          {/* Copyright */}
          <div style={{ color: "var(--faint)", fontSize: 13 }}>
            {t("footer", "copy")}
          </div>
        </div>
      </div>
    </footer>
  );
}
