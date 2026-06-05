import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/contexts/LangContext";
import { PaletteProvider } from "@/contexts/PaletteContext";

export const metadata: Metadata = {
  title: "Wisdom From Quran — حكمة من القرآن",
  description:
    "منصّة تجمع صفحاتنا على إنستغرام وأدواتنا: أنشئ مقاطع قرآنية ودَع نشرها يجري تلقائيًا.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=El+Messiri:wght@500;600;700&family=Tajawal:wght@300;400;500;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Amiri:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-el-messiri: 'El Messiri', sans-serif;
            --font-tajawal: 'Tajawal', sans-serif;
            --font-cormorant: 'Cormorant Garamond', serif;
            --font-amiri: 'Amiri', serif;
          }
        `}</style>
      </head>
      <body>
        <LangProvider>
          <PaletteProvider>{children}</PaletteProvider>
        </LangProvider>
      </body>
    </html>
  );
}
