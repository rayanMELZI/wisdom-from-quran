"use client";

import { useLang } from "@/contexts/LangContext";
import { dict } from "@/lib/i18n";

type Props = {
  section: keyof typeof dict;
  eyebrowKey: string;
  titleKey: string;
  leadKey: string;
};

export default function SectionHeader({ section, eyebrowKey, titleKey, leadKey }: Props) {
  const { t } = useLang();

  return (
    <div className="wfq-section-head reveal">
      <span className="wfq-eyebrow">
        {t(section as never, eyebrowKey as never)}
      </span>
      <h2 className="wfq-section-title">
        {t(section as never, titleKey as never)}
      </h2>
      <p className="wfq-section-lead">
        {t(section as never, leadKey as never)}
      </p>
    </div>
  );
}
