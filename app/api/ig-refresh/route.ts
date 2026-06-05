import { NextResponse } from "next/server";

/**
 * GET /api/ig-refresh
 *
 * Rafraîchit les deux long-lived tokens Instagram.
 * À appeler manuellement (ou via un cron job) tous les ~50 jours.
 *
 * Retourne les nouveaux tokens — à coller dans .env.local.
 */
export async function GET() {
  const tokens = {
    blue: process.env.IG_TOKEN_BLUE?.trim() || null,
    purple: process.env.IG_TOKEN_PURPLE?.trim() || null,
  };

  const results: Record<string, string | null> = {};

  for (const [key, token] of Object.entries(tokens)) {
    if (!token) {
      results[key] = null;
      continue;
    }

    try {
      const res = await fetch(
        `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
      );
      const json = await res.json();

      if (json.error) {
        results[key] = `ERROR: ${json.error.message}`;
      } else {
        results[key] = json.access_token ?? "unknown";
      }
    } catch (err) {
      results[key] = `FETCH_ERROR: ${String(err)}`;
    }
  }

  return NextResponse.json({
    message: "Copie les nouveaux tokens dans .env.local",
    IG_TOKEN_BLUE: results.blue,
    IG_TOKEN_PURPLE: results.purple,
  });
}
