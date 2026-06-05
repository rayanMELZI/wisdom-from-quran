export type IgMedia = {
  id: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
};

export type IgProfile = {
  username: string;
  media_count: number;
  followers_count: number;
  recent_media: IgMedia[];
};

async function fetchProfile(token: string): Promise<IgProfile | null> {
  try {
    const baseUrl = "https://graph.instagram.com/me";

    const profileRes = await fetch(
      `${baseUrl}?fields=username,media_count,followers_count&access_token=${token}`,
      { next: { revalidate: 3600 } }
    );
    if (!profileRes.ok) return null;
    const profile = await profileRes.json();

    const mediaRes = await fetch(
      `${baseUrl}/media?fields=id,media_type,media_url,thumbnail_url,permalink&limit=6&access_token=${token}`,
      { next: { revalidate: 3600 } }
    );
    const mediaJson = mediaRes.ok ? await mediaRes.json() : { data: [] };
    const recent_media: IgMedia[] = (mediaJson.data ?? []).slice(0, 3);

    return {
      username: profile.username ?? "",
      media_count: profile.media_count ?? 0,
      followers_count: profile.followers_count ?? 0,
      recent_media,
    };
  } catch {
    return null;
  }
}

export async function fetchIgProfiles(): Promise<{
  blue: IgProfile | null;
  purple: IgProfile | null;
}> {
  const tokenBlue = process.env.IG_TOKEN_BLUE;
  const tokenPurple = process.env.IG_TOKEN_PURPLE;

  const [blue, purple] = await Promise.all([
    tokenBlue ? fetchProfile(tokenBlue) : Promise.resolve(null),
    tokenPurple ? fetchProfile(tokenPurple) : Promise.resolve(null),
  ]);

  return { blue, purple };
}

export function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(".0", "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(".0", "") + "K";
  return n.toString();
}
