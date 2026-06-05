import { fetchIgProfiles } from "@/lib/instagram";
import IgCard from "./IgCard";
import SectionHeader from "./SectionHeader";

// Server component — fetches IG data at build/revalidation time
export default async function PagesSection() {
  const { blue, purple } = await fetchIgProfiles();

  return (
    <section
      className="block"
      id="pages"
      style={{ padding: "70px 0" }}
    >
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
        </div>
      </div>

    </section>
  );
}
