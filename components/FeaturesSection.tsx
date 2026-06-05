"use client";

import { useLang } from "@/contexts/LangContext";
import SectionHeader from "./SectionHeader";
import FeatCard from "./FeatCard";
import ScreenshotPlaceholder from "./ScreenshotPlaceholder";

const AutoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M4 12a8 8 0 0 1 13.7-5.6M20 12A8 8 0 0 1 6.3 17.6" stroke="#dcc29c" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M18 3v3.4h-3.4M6 21v-3.4h3.4" stroke="#dcc29c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StudioIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3.5" y="5" width="17" height="14" rx="3" stroke="#69c0e6" strokeWidth="1.6"/>
    <path d="M10.5 9.3 14.5 12l-4 2.7V9.3Z" fill="#69c0e6"/>
  </svg>
);

export default function FeaturesSection() {
  const { t } = useLang();

  return (
    <section id="features" style={{ padding: "70px 0" }}>
      <div className="wfq-section-wrap">
        <SectionHeader
          section="features"
          eyebrowKey="eyebrow"
          titleKey="title"
          leadKey="lead"
        />

        <div
          className="grid gap-[26px] wfq-two-col"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          <FeatCard
            id="auto"
            variant="gold"
            icon={<AutoIcon />}
            badgeKey="autoBadge"
            titleKey="autoTitle"
            descKey="autoDesc"
            bullets={["autoBullet1", "autoBullet2", "autoBullet3"]}
            btnKey="autoBtn"
            btnHref="/auto-quran"
            screenshotPlaceholder={<ScreenshotPlaceholder variant="auto" />}
          />
          <FeatCard
            id="studio"
            variant="ghost"
            icon={<StudioIcon />}
            badgeKey="studioBadge"
            titleKey="studioTitle"
            descKey="studioDesc"
            bullets={["studioBullet1", "studioBullet2", "studioBullet3"]}
            btnKey="studioBtn"
            btnHref="/chroma-quran"
            screenshotPlaceholder={<ScreenshotPlaceholder variant="studio" />}
          />
        </div>

        {/* Pair note */}
        <div
          className="reveal mt-[26px] flex items-center justify-center gap-3 text-center"
          style={{
            color: "var(--faint)",
            fontSize: 14,
            textShadow: "var(--shadow-text)",
            fontFamily: "var(--font-tajawal)",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              height: 1,
              width: 46,
              background: "linear-gradient(90deg, transparent, var(--hair), transparent)",
            }}
          />
          {t("features", "pairNote")}
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              height: 1,
              width: 46,
              background: "linear-gradient(90deg, transparent, var(--hair), transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
