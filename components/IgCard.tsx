"use client";

import Image from "next/image";
import { useLang } from "@/contexts/LangContext";
import type { IgProfile, IgMedia, MediaType } from "@/lib/instagram";
import { formatCount, getDisplayUrl } from "@/lib/instagram";

// ─── Media type badge ─────────────────────────────────────────────────────────

function MediaTypeBadge({ type }: { type: MediaType }) {
  if (type === "IMAGE") return null;

  const isVideo = type === "VIDEO";

  return (
    <div
      className="absolute top-1.5 right-1.5 flex items-center justify-center"
      style={{
        width: 20,
        height: 20,
        borderRadius: 4,
        background: "rgba(4,16,31,0.72)",
        backdropFilter: "blur(4px)",
      }}
      aria-label={isVideo ? "Vidéo" : "Carousel"}
    >
      {isVideo ? (
        // Play icon
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2.5 2 L8 5 L2.5 8 Z" fill="#69c0e6" />
        </svg>
      ) : (
        // Carousel / stack icon
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <rect x="1" y="3" width="6" height="6" rx="1" stroke="#dcc29c" strokeWidth="1" />
          <rect x="3" y="1" width="6" height="6" rx="1" stroke="#dcc29c" strokeWidth="1" />
        </svg>
      )}
    </div>
  );
}

// ─── Single thumbnail ─────────────────────────────────────────────────────────

function Thumbnail({ media }: { media: IgMedia }) {
  const src = getDisplayUrl(media);

  return (
    <a
      href={media.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="relative block overflow-hidden"
      style={{ borderRadius: 10, aspectRatio: "1" }}
    >
      <Image
        src={src}
        alt={media.media_type === "VIDEO" ? "Reel" : "Post"}
        fill
        sizes="120px"
        className="object-cover transition-transform duration-300"
        style={{ transform: "scale(1)" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        }}
      />
      <MediaTypeBadge type={media.media_type} />
    </a>
  );
}

function PlaceholderThumb() {
  return (
    <div
      style={{
        borderRadius: 10,
        aspectRatio: "1",
        background: "rgba(105,192,230,0.06)",
        border: "1px solid var(--hair)",
      }}
    />
  );
}

// ─── Main card ────────────────────────────────────────────────────────────────

type Props = {
  name: string;
  handle: string;
  avatarSrc: string;
  profileUrl: string;
  profile: IgProfile | null;
};

export default function IgCard({
  name,
  handle,
  avatarSrc,
  profileUrl,
  profile,
}: Props) {
  const { t } = useLang();

  return (
    <article
      className="glass reveal"
      style={{ borderRadius: "var(--r-lg)", padding: "24px" }}
    >
      {/* Top row */}
      <div className="flex items-center gap-4">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Voir le profil Instagram"
          className="flex-none block transition-transform duration-300"
          style={{
            width: 74,
            height: 74,
            borderRadius: "50%",
            padding: 3,
            background:
              "conic-gradient(from 210deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5, #feda75)",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.transform = "scale(1)")
          }
        >
          <Image
            src={avatarSrc}
            alt={name}
            width={68}
            height={68}
            className="w-full h-full object-cover"
            style={{
              borderRadius: "50%",
              border: "2.5px solid var(--navy-900)",
              boxSizing: "border-box",
              display: "block",
            }}
          />
        </a>

        <div className="flex-1 min-w-0 text-start">
          <div
            style={{
              fontFamily: "var(--font-el-messiri)",
              fontWeight: 600,
              fontSize: 19,
              color: "var(--text)",
            }}
          >
            {name}
          </div>
          <div style={{ fontSize: 13, color: "var(--gold)" }}>{handle}</div>
          <div style={{ fontSize: 13, color: "var(--faint)", marginTop: 2 }}>
            {t("pages", "tagline")}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-[22px] my-[18px]">
        <StatItem
          value={profile ? formatCount(profile.media_count) : "—"}
          label={t("pages", "statPosts")}
        />
        <StatItem
          value={profile ? formatCount(profile.followers_count) : "—"}
          label={t("pages", "statFollowers")}
        />
        <StatItem
          value={t("pages", "statDaily")}
          label={t("pages", "statPosting")}
        />
      </div>

      {/* Thumbnails grid */}
      <div
        className="grid mb-[18px]"
        style={{ gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}
      >
        {[0, 1, 2].map((i) => {
          const media = profile?.recent_media[i];
          return media ? (
            <Thumbnail key={media.id} media={media} />
          ) : (
            <PlaceholderThumb key={i} />
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-2.5">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold flex-1 justify-center"
          style={{ padding: "12px 18px" }}
        >
          {t("pages", "follow")}
        </a>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost flex-1 justify-center"
          style={{ padding: "12px 18px" }}
        >
          {t("pages", "visit")}
        </a>
      </div>
    </article>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ fontSize: 13, color: "var(--muted)" }}>
      <b
        style={{
          display: "block",
          fontFamily: "var(--font-el-messiri)",
          fontSize: 20,
          color: "var(--text)",
          fontWeight: 600,
        }}
      >
        {value}
      </b>
      {label}
    </div>
  );
}
