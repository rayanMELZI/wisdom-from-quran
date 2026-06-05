"use client";

import { usePalette, type Palette } from "@/contexts/PaletteContext";

const orbs: { id: Palette; label: string; glow: string; bg: string }[] = [
  {
    id: "cool",
    label: "بارد",
    glow: "rgba(105,192,230,.6)",
    bg: "radial-gradient(circle at 33% 27%, #d6f3ff, #62c0e8 46%, #1d6d9e 100%)",
  },
  {
    id: "midnight",
    label: "منتصف الليل",
    glow: "rgba(110,140,235,.55)",
    bg: "radial-gradient(circle at 33% 27%, #d4ddff, #6a86e6 46%, #243b88 100%)",
  },
  {
    id: "teal",
    label: "فيروزي",
    glow: "rgba(80,212,190,.55)",
    bg: "radial-gradient(circle at 33% 27%, #cdf7ec, #4fcfb8 46%, #1d7e6f 100%)",
  },
];

export default function ThemeSwitcher() {
  const { palette, setPalette } = usePalette();

  return (
    <>
      <div className="wfq-switcher" role="tablist" aria-label="مزاج الخلفية">
        <div className="wfq-opts">
          {orbs.map((orb) => (
            <button
              key={orb.id}
              onClick={() => setPalette(orb.id)}
              className={`wfq-orb-btn${palette === orb.id ? " on" : ""}`}
              aria-label={orb.label}
              role="tab"
              aria-selected={palette === orb.id}
              style={{ "--glow": orb.glow, "--bg": orb.bg } as React.CSSProperties}
            >
              <i />
            </button>
          ))}
        </div>
        <button className="wfq-jewel" aria-label="تبديل السمة" aria-haspopup="true">
          <span className="wfq-jewel-ic" />
        </button>
      </div>

      <style>{`
        .wfq-switcher {
          position: fixed;
          top: 110px;
          right: max(18px, calc((100vw - 1180px) / 2));
          z-index: 40;
          direction: ltr;
          display: flex;
          align-items: center;
          gap: 0;
          padding: 6px;
          border-radius: 999px;
          background: var(--glass);
          border: 1px solid var(--hair);
          backdrop-filter: blur(18px) saturate(1.25);
          -webkit-backdrop-filter: blur(18px) saturate(1.25);
          box-shadow: 0 14px 34px -20px rgba(0,0,0,.72);
          transition: border-color .22s;
        }
        .wfq-switcher:hover { border-color: var(--hair-gold); }

        .wfq-opts {
          display: flex;
          align-items: center;
          gap: 8px;
          max-width: 0;
          opacity: 0;
          overflow: hidden;
          margin-inline-end: 0;
          transition: max-width .32s cubic-bezier(.2,.7,.3,1), opacity .26s, margin-inline-end .32s;
        }
        .wfq-switcher:hover .wfq-opts,
        .wfq-switcher:focus-within .wfq-opts {
          max-width: 150px;
          opacity: 1;
          margin-inline-end: 8px;
        }

        .wfq-orb-btn {
          position: relative;
          width: 18px; height: 18px;
          padding: 0; border: none;
          cursor: pointer;
          background: transparent;
          border-radius: 50%;
          display: grid; place-items: center;
          flex: none;
        }
        .wfq-orb-btn i {
          width: 16px; height: 16px;
          border-radius: 50%;
          display: block;
          background: var(--bg);
          box-shadow:
            inset 0 1px 2px rgba(255,255,255,.4),
            inset 0 -2px 4px rgba(0,0,0,.35),
            0 2px 5px rgba(0,0,0,.4),
            0 0 8px 0 var(--glow);
          transition: transform .2s, box-shadow .2s;
        }
        .wfq-orb-btn:hover i { transform: scale(1.2); }
        .wfq-orb-btn.on i {
          transform: scale(1.14);
          box-shadow:
            inset 0 1px 2px rgba(255,255,255,.45),
            0 0 0 2px var(--gold-soft),
            0 0 12px 1px var(--glow);
        }

        .wfq-jewel {
          flex: none;
          width: 18px; height: 18px;
          padding: 0; border: none;
          cursor: default;
          background: transparent;
          border-radius: 50%;
          display: grid; place-items: center;
        }
        .wfq-jewel-ic {
          width: 16px; height: 16px;
          border-radius: 50%;
          display: block;
          background: conic-gradient(from 210deg, #69c0e6, #4f7fd6, #3fb8a8, #69c0e6);
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,.22),
            0 2px 5px rgba(0,0,0,.4),
            0 0 8px rgba(105,192,230,.3);
          transition: transform .32s cubic-bezier(.2,.7,.3,1);
        }
        .wfq-switcher:hover .wfq-jewel-ic { transform: rotate(120deg); }
      `}</style>
    </>
  );
}
