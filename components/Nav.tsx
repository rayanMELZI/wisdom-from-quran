"use client";

import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import EmblemSvg from "./EmblemSvg";

export default function Nav() {
  const { t, toggle, lang } = useLang();

  return (
    <header className="sticky top-0 z-30">
      <div
        className="glass flex items-center justify-between gap-6 mx-auto my-[18px] px-[18px] py-3 rounded-full"
        style={{ maxWidth: "var(--maxw)" }}
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
          <span>
            <span
              className="block text-[22px] leading-none tracking-[.01em] whitespace-nowrap"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 600, color: "var(--text)" }}
            >
              Wisdom <b style={{ color: "var(--gold-soft)", fontWeight: 600 }}>From</b> Quran
            </span>
            <span
              className="block text-xs mt-[3px]"
              style={{ fontFamily: "var(--font-tajawal)", color: "var(--muted)" }}
            >
              حكمة من القرآن
            </span>
          </span>
        </Link>

        {/* Center nav links — hidden ≤880px */}
        <nav className="hidden items-center gap-[30px]" style={{ display: "none" }}
          id="nav-links-desktop">
          {(
            [
              ["#pages", t("nav", "pages")],
              ["#features", t("nav", "features")],
              ["#auto", t("nav", "auto")],
              ["#studio", t("nav", "studio")],
            ] as [string, string][]
          ).map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="text-[15px] font-normal whitespace-nowrap transition-colors duration-200 no-underline"
              style={{
                color: "var(--muted)",
                textShadow: "var(--shadow-text)",
                fontFamily: "var(--font-tajawal)",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--muted)")}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right: lang toggle + CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="text-sm font-semibold px-[18px] py-[11px] rounded-full cursor-pointer flex-none whitespace-nowrap transition-all duration-200"
            style={{
              fontFamily: "var(--font-tajawal)",
              color: "var(--gold-soft)",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--hair-gold)",
            }}
            aria-label="Switch language"
          >
            {t("nav", "langSwitch")}
          </button>
          <a
            href="#features"
            className="px-[26px] py-[14px] rounded-full text-[15px] font-medium whitespace-nowrap transition-all duration-200 no-underline"
            style={{
              fontFamily: "var(--font-tajawal)",
              color: "#1b1206",
              background: "linear-gradient(135deg, var(--gold-soft), var(--gold) 55%, #c7a877)",
              boxShadow: "0 14px 34px -16px rgba(220,194,156,.55), inset 0 1px 0 rgba(255,255,255,.4)",
            }}
          >
            {t("nav", "start")}
          </a>
        </div>
      </div>

      {/* Desktop nav injected via CSS (avoids hydration issues with hidden) */}
      <style>{`
        @media (min-width: 881px) {
          #nav-links-desktop { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
