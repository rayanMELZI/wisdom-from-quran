"use client";

import { useLang } from "@/contexts/LangContext";

type Props = {
  id: "auto" | "studio";
  variant: "gold" | "ghost";
  icon: React.ReactNode;
  badgeKey: "autoBadge" | "studioBadge";
  titleKey: "autoTitle" | "studioTitle";
  descKey: "autoDesc" | "studioDesc";
  bullets: ["autoBullet1" | "studioBullet1", "autoBullet2" | "studioBullet2", "autoBullet3" | "studioBullet3"];
  btnKey: "autoBtn" | "studioBtn";
  btnHref: string;
  screenshotPlaceholder: React.ReactNode;
};

export default function FeatCard({
  id,
  variant,
  icon,
  badgeKey,
  titleKey,
  descKey,
  bullets,
  btnKey,
  btnHref,
  screenshotPlaceholder,
}: Props) {
  const { t } = useLang();

  return (
    <article
      id={id}
      className="glass reveal flex flex-col"
      style={{ borderRadius: "var(--r-lg)", padding: 30 }}
    >
      {/* Screenshot placeholder */}
      {screenshotPlaceholder}

      {/* Icon + badge */}
      <div className="flex items-center gap-3.5 mb-1.5">
        <span
          className="w-[50px] h-[50px] flex-none grid place-items-center"
          style={{
            borderRadius: 15,
            border: "1px solid var(--hair)",
            background: "rgba(255,255,255,.03)",
          }}
          aria-hidden="true"
        >
          {icon}
        </span>
        <span
          className="text-xs font-medium"
          style={{
            color: "var(--gold)",
            border: "1px solid var(--hair-gold)",
            padding: "4px 12px",
            borderRadius: 999,
          }}
        >
          {t("features", badgeKey)}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-el-messiri)",
          fontWeight: 600,
          fontSize: 24,
          lineHeight: 1.25,
          margin: "14px 0 0",
          color: "var(--text)",
        }}
      >
        {t("features", titleKey)}
      </h3>

      {/* Description */}
      <p
        style={{
          color: "var(--muted)",
          margin: "12px 0 18px",
          fontSize: 15,
          fontFamily: "var(--font-tajawal)",
        }}
      >
        {t("features", descKey)}
      </p>

      {/* Bullet list */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 22px",
        }}
      >
        {bullets.map((bulletKey) => (
          <li
            key={bulletKey}
            className="relative"
            style={{
              paddingInlineStart: 24,
              margin: "9px 0",
              color: "var(--text)",
              fontSize: 14.5,
              opacity: 0.92,
              fontFamily: "var(--font-tajawal)",
            }}
          >
            <span
              className="absolute"
              style={{
                insetInlineStart: 0,
                top: 9,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--cyan), var(--cyan-deep))",
              }}
              aria-hidden="true"
            />
            {t("features", bulletKey)}
          </li>
        ))}
      </ul>

      {/* CTA button */}
      <a
        href={btnHref}
        className={variant === "gold" ? "btn-gold" : "btn-ghost"}
        style={{ alignSelf: "flex-start", marginTop: "auto" }}
      >
        {t("features", btnKey)}
      </a>
    </article>
  );
}
