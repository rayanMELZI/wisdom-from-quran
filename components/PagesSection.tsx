import { Suspense } from "react";
import { fetchIgProfiles } from "@/lib/instagram";
import IgCard from "./IgCard";
import IgCardSkeleton from "./IgCardSkeleton";
import SectionHeader from "./SectionHeader";

// ─── Inner async component (does the actual fetch) ────────────────────────────

async function IgCards() {
  const { blue, purple } = await fetchIgProfiles();

  return (
    <>
      <IgCard
        name="wisdomfrom.quran"
        handle="@wisdomfrom.quran"
        avatarSrc="/ig-blue.png"
        profileUrl="https://www.instagram.com/wisdomfrom.quran/"
        profile={blue}
      />
      <IgCard
        name="حكمة من القرآن"
        handle="@wisdom.quran.ar"
        avatarSrc="/ig-purple.png"
        profileUrl="https://www.instagram.com/wisdom.quran.ar/"
        profile={purple}
      />
    </>
  );
}

// ─── Section (wraps the fetch in Suspense) ────────────────────────────────────

export default function PagesSection() {
  return (
    <section id="pages" style={{ padding: "70px 0" }}>
      <div className="wfq-section-wrap">
        <SectionHeader
          section="pages"
          eyebrowKey="eyebrow"
          titleKey="title"
          leadKey="lead"
        />

        <div
          className="grid gap-[26px] wfq-two-col"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          <Suspense
            fallback={
              <>
                <IgCardSkeleton />
                <IgCardSkeleton />
              </>
            }
          >
            <IgCards />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
