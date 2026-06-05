import AuroraCanvas from "@/components/AuroraCanvas";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import PagesSection from "@/components/PagesSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      {/* Fixed aurora WebGL layer */}
      <AuroraCanvas />

      {/* Top radial veil */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "radial-gradient(120% 75% at 50% 0%, rgba(4,16,31,0) 30%, rgba(4,16,31,0.42) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Page content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <Nav />
        <main id="top">
          <Hero />
          <PagesSection />
          <FeaturesSection />
        </main>
        <Footer />
      </div>

      {/* Floating theme switcher */}
      <ThemeSwitcher />

      {/* Scroll reveal watcher */}
      <ScrollReveal />
    </>
  );
}
