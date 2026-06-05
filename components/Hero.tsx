"use client";

import { useLang } from "@/contexts/LangContext";

export default function Hero() {
  const { t } = useLang();

  return (
    <section
      className="relative flex items-center"
      style={{ minHeight: "92vh", padding: "90px 0 60px" }}
    >
      {/* Radial light-pocket scrim */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background:
            "radial-gradient(78% 82% at 70% 46%, rgba(4,16,31,.66) 0%, rgba(4,16,31,.42) 36%, rgba(4,16,31,0) 72%)",
        }}
        aria-hidden="true"
      />

      <div className="relative" style={{ maxWidth: "var(--maxw)", margin: "0 auto", padding: "0 28px", zIndex: 1 }}>
        <div style={{ maxWidth: "760px" }}>
          {/* Eyebrow */}
          <span className="wfq-eyebrow">{t("hero", "eyebrow")}</span>

          {/* Headline */}
          <h1
            className="display mt-5 mb-0"
            style={{
              fontFamily: "var(--font-el-messiri)",
              fontWeight: 700,
              fontSize: "clamp(34px, 5.4vw, 68px)",
              lineHeight: 1.25,
              letterSpacing: "-.01em",
              textShadow: "0 2px 44px rgba(4,16,31,.7)",
            }}
          >
            {t("hero", "headline1")}
            <br />
            <em
              style={{ fontStyle: "normal", color: "var(--gold-soft)" }}
            >
              {t("hero", "headline2")}
            </em>
          </h1>

          {/* Lead */}
          <p
            className="mt-[22px] mb-[34px]"
            style={{
              color: "#d6e2ee",
              fontSize: "clamp(15px, 1.5vw, 19px)",
              maxWidth: "58ch",
              textShadow: "var(--shadow-text)",
              fontFamily: "var(--font-tajawal)",
            }}
          >
            {t("hero", "lead")}
          </p>

          {/* CTAs */}
          <div className="flex gap-3.5 flex-wrap">
            <a href="#features" className="btn-gold">
              {t("hero", "ctaDiscover")}
            </a>
            <a href="#pages" className="btn-ghost">
              {t("hero", "ctaBrowse")}
            </a>
          </div>

          {/* Scroll hint */}
          <div
            className="mt-[54px] inline-flex items-center gap-3 text-[13px] whitespace-nowrap"
            style={{ color: "var(--muted)", textShadow: "var(--shadow-text)" }}
          >
            <span
              className="w-[7px] h-[7px] rounded-full flex-none"
              style={{
                background: "var(--cyan)",
                boxShadow: "0 0 10px var(--cyan)",
                animation: "pulse 2.4s ease-in-out infinite",
              }}
            />
            {t("hero", "scroll")}
          </div>
        </div>
      </div>

    </section>
  );
}
