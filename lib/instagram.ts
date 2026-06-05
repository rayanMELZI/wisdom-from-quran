// ─── Types ────────────────────────────────────────────────────────────────────

export type MediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

export type IgMedia = {
  id: string;
  media_type: MediaType;
  /** URL de l'image (IMAGE / CAROUSEL_ALBUM) */
  media_url: string;
  /** URL de la miniature (VIDEO uniquement) */
  thumbnail_url?: string;
  /** Lien direct vers le post */
  permalink: string;
  timestamp: string;
};

export type IgProfile = {
  id: string;
  username: string;
  /** Nombre total de posts */
  media_count: number;
  /** Nombre de followers */
  followers_count: number;
  /** 3 médias les plus récents */
  recent_media: IgMedia[];
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Formate un nombre : 1200 → "1.2K", 1500000 → "1.5M" */
export function formatCount(n: number): string {
  if (n >= 1_000_000)
    return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toLocaleString();
}

/** Retourne l'URL de la miniature à afficher selon le type de média */
export function getDisplayUrl(media: IgMedia): string {
  if (media.media_type === "VIDEO") {
    return media.thumbnail_url ?? media.media_url;
  }
  return media.media_url;
}

// ─── Fetch helpers ────────────────────────────────────────────────────────────

const IG_API = "https://graph.instagram.com";

/** Champs demandés pour chaque média */
const MEDIA_FIELDS = [
  "id",
  "media_type",
  "media_url",
  "thumbnail_url",
  "permalink",
  "timestamp",
].join(",");

async function fetchProfileData(token: string): Promise<IgProfile | null> {
  try {
    // 1. Infos du profil
    const profileRes = await fetch(
      `${IG_API}/me?fields=id,username,media_count,followers_count&access_token=${token}`,
      {
        next: { revalidate: 3600 }, // ISR — revalide toutes les heures
      }
    );

    if (!profileRes.ok) {
      console.error(
        `[IG] profile fetch failed: ${profileRes.status} ${profileRes.statusText}`
      );
      return null;
    }

    const profile = await profileRes.json();

    if (profile.error) {
      console.error("[IG] API error:", profile.error.message);
      return null;
    }

    // 2. Médias récents (on en prend 6 pour avoir le choix des 3 meilleurs)
    const mediaRes = await fetch(
      `${IG_API}/me/media?fields=${MEDIA_FIELDS}&limit=6&access_token=${token}`,
      {
        next: { revalidate: 3600 },
      }
    );

    let recent_media: IgMedia[] = [];

    if (mediaRes.ok) {
      const mediaJson = await mediaRes.json();
      const items: IgMedia[] = mediaJson.data ?? [];

      // Trier par date décroissante et prendre les 3 premiers
      recent_media = items
        .sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
        .slice(0, 3);
    }

    return {
      id: profile.id ?? "",
      username: profile.username ?? "",
      media_count: profile.media_count ?? 0,
      followers_count: profile.followers_count ?? 0,
      recent_media,
    };
  } catch (err) {
    console.error("[IG] unexpected error:", err);
    return null;
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function fetchIgProfiles(): Promise<{
  blue: IgProfile | null;
  purple: IgProfile | null;
}> {
  const tokenBlue = process.env.IG_TOKEN_BLUE?.trim() || null;
  const tokenPurple = process.env.IG_TOKEN_PURPLE?.trim() || null;

  // Fetch en parallèle
  const [blue, purple] = await Promise.all([
    tokenBlue ? fetchProfileData(tokenBlue) : Promise.resolve(null),
    tokenPurple ? fetchProfileData(tokenPurple) : Promise.resolve(null),
  ]);

  return { blue, purple };
}
