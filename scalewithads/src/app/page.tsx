import { ClientsShowcase } from "../components/ClientsShowcase";
import { Difference } from "../components/Difference";
import { FinalCta } from "../components/FinalCta";
import { Footer } from "../components/Footer";
import { LogoMarquee } from "../components/LogoMarquee";

import { Results } from "../components/Results";
import { SystemsShowcase } from "../components/SystemsShowcase";
import { ShortsReelSection } from "../components/ShortsReelSection";
import { TrainingSection } from "../components/TrainingSection";
import { TrustBar } from "../components/TrustBar";
import ResponsiveHeroBanner from "../components/ui/responsive-hero-banner";
import { AgencyHelpSection } from "../components/AgencyHelpSection";
import { AgencyStatsLocations } from "../components/AgencyStatsLocations";
import { DetailedAgencyBox } from "../components/DetailedAgencyBox";
import TunnelBackground from "../components/ui/TunnelBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-transparent text-white overflow-hidden">
      <TunnelBackground />

      {/* Hero Section */}
      <ResponsiveHeroBanner />

      {/* Video Reel Showcase (Placed directly after Hero, matching Social Shepherd layout) */}
      <ShortsReelSection />

      {/* Trust & Marquee */}
      <LogoMarquee />
      <TrustBar />

      {/* Interactive Agency Section: "How We Help" (Social Shepherd Style) */}
      <AgencyHelpSection />

      {/* Core Agency Systems & Proof */}
      <ClientsShowcase />
      <SystemsShowcase />

      {/* Agency Locations & Stats Banner */}
      <AgencyStatsLocations />

      {/* Problem / Solution & Comparison */}

      <Difference />
      <Results />
      <TrainingSection />

      {/* Detailed Agency Value Proposition Box */}
      <DetailedAgencyBox />



      <FinalCta />
      <Footer />
    </main>
  );
}

