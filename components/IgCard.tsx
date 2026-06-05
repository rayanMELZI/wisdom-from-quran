"use client";

import Image from "next/image";
import { useLang } from "@/contexts/LangContext";
import type { IgProfile, IgMedia } from "@/lib/instagram";
import { formatCount } from "@/lib/instagram";

type Props = {
  name: string;
  handle: string;
  avatarSrc: string;
  profileUrl: string;
  profile: IgProfile | null;
};

function Thumbnail({ media }: { media: IgMedia }) {
  const src =
    media.media_type === "VIDEO" ? (media.thumbnail_url ?? "") : media.media_url;
  if (!src) return <PlaceholderThumb />;
  return (
    <a
      href={media.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="block overflow-hidden"
      style={{ borderRadius: 10, aspectRatio: "1" }}
    >
      <Image
        src={src}
        alt=""
        width={200}
        height={200}
        className="w-full h-full object-cover"
      />
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

export default function IgCard({ name, handle, avatarSrc, profileUrl, profile }: Props) {
  const { t } = useLang();
  const placeholders = [0, 1, 2];

  return (
    <article
      className="glass reveal"
      style={{ borderRadius: "var(--r-lg)", padding: "24px" }}
    >
      {/* Top row */}
      <div className="flex items-center gap-4">
        <a
          href={profileUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-none block"
          aria-label="شاهد القصة"
          style={{
            width: 74,
            height: 74,
            borderRadius: "50%",
            padding: 3,
            background:
              "conic-gradient(from 210deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5, #feda75)",
            transition: "transform .25s",
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
            {profile ? formatCount(profile.media_count) : "—"}
          </b>
          {t("pages", "statPosts")}
        </div>
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
            {profile ? formatCount(profile.followers_count) : "—"}
          </b>
          {t("pages", "statFollowers")}
        </div>
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
            {t("pages", "statDaily")}
          </b>
          {t("pages", "statPosting")}
        </div>
      </div>

      {/* Thumbnails */}
      <div
        className="grid mb-[18px]"
        style={{ gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}
      >
        {placeholders.map((i) => {
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
          href={profileUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold flex-1 justify-center"
          style={{ padding: "12px 18px" }}
        >
          {t("pages", "follow")}
        </a>
        <a
          href={profileUrl || "#"}
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
