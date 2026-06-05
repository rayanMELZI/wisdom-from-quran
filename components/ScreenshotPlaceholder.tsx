type Props = {
  variant: "auto" | "studio";
};

const configs = {
  auto: {
    bg: "linear-gradient(135deg, rgba(105,192,230,0.08) 0%, rgba(79,127,214,0.12) 50%, rgba(63,184,168,0.06) 100%)",
    accent: "var(--cyan)",
    lines: ["━━━━━━━━━━━━━━━━━━", "━━━━━━━━━━━", "━━━━━━━━━━━━━━━"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M4 12a8 8 0 0 1 13.7-5.6M20 12A8 8 0 0 1 6.3 17.6" stroke="#69c0e6" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M18 3v3.4h-3.4M6 21v-3.4h3.4" stroke="#69c0e6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Auto Quran",
    sublabel: "أوتو قرآن",
  },
  studio: {
    bg: "linear-gradient(135deg, rgba(220,194,156,0.07) 0%, rgba(105,192,230,0.10) 50%, rgba(79,127,214,0.06) 100%)",
    accent: "var(--gold)",
    lines: ["━━━━━━━━━━━━━━━", "━━━━━━━━━━━━━━━━━━", "━━━━━━━━━━"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <rect x="3.5" y="5" width="17" height="14" rx="3" stroke="#dcc29c" strokeWidth="1.6"/>
        <path d="M10.5 9.3 14.5 12l-4 2.7V9.3Z" fill="#dcc29c"/>
      </svg>
    ),
    label: "ChromaQuran",
    sublabel: "كروما قرآن",
  },
};

export default function ScreenshotPlaceholder({ variant }: Props) {
  const cfg = configs[variant];

  return (
    <div
      className="mb-[22px] overflow-hidden flex flex-col items-center justify-center gap-3"
      style={{
        width: "100%",
        height: 170,
        borderRadius: 16,
        background: cfg.bg,
        border: "1px solid var(--hair)",
        position: "relative",
      }}
    >
      {/* Faint grid lines */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(150,185,215,0.05) 19px, rgba(150,185,215,0.05) 20px),
                            repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(150,185,215,0.05) 19px, rgba(150,185,215,0.05) 20px)`,
        }}
      />

      {/* Icon */}
      <div style={{ position: "relative", zIndex: 1 }}>{cfg.icon}</div>

      {/* Label */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <div
          style={{
            fontFamily: "var(--font-el-messiri)",
            fontWeight: 600,
            fontSize: 15,
            color: cfg.accent,
            opacity: 0.7,
          }}
        >
          {cfg.label}
        </div>
        <div
          style={{
            fontFamily: "var(--font-tajawal)",
            fontSize: 12,
            color: "var(--faint)",
            marginTop: 2,
          }}
        >
          {cfg.sublabel}
        </div>
      </div>

      {/* Decorative text lines */}
      <div
        aria-hidden="true"
        style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 4, opacity: 0.15 }}
      >
        {cfg.lines.map((line, i) => (
          <div
            key={i}
            style={{ fontSize: 8, letterSpacing: 2, color: "var(--muted)" }}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
