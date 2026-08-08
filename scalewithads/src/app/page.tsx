import { ClientsShowcase } from "../components/ClientsShowcase";
import { Difference } from "../components/Difference";
import { FinalCta } from "../components/FinalCta";
import { Footer } from "../components/Footer";
import { LogoMarquee } from "../components/LogoMarquee";
import { Problem } from "../components/Problem";
import { SystemsShowcase } from "../components/SystemsShowcase";
import { ShortsReelSection } from "../components/ShortsReelSection";
import { TrustBar } from "../components/TrustBar";
import ResponsiveHeroBanner from "../components/ui/responsive-hero-banner";

export default function Home() {
  return (
    <main className="bg-[#070709] text-white">
      <ResponsiveHeroBanner />
      <LogoMarquee />
      <TrustBar />
      <ClientsShowcase />
      <SystemsShowcase />
      <ShortsReelSection />
      <Problem />
      <Difference />
      <FinalCta />
      <Footer />
    </main>
  );
}
