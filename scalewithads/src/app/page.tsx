import { ClientsShowcase } from "../components/ClientsShowcase";
import { Difference } from "../components/Difference";
import { FinalCta } from "../components/FinalCta";
import { Footer } from "../components/Footer";
import { LogoMarquee } from "../components/LogoMarquee";
import { Problem } from "../components/Problem";
import { Results } from "../components/Results";
import { SystemsShowcase } from "../components/SystemsShowcase";
import { ShortsReelSection } from "../components/ShortsReelSection";
import { TrainingSection } from "../components/TrainingSection";
import { TrustBar } from "../components/TrustBar";
import ResponsiveHeroBanner from "../components/ui/responsive-hero-banner";
import { AgencyHelpSection } from "../components/AgencyHelpSection";
import { AgencyStatsLocations } from "../components/AgencyStatsLocations";
import { DetailedAgencyBox } from "../components/DetailedAgencyBox";
import SwarmCursor from "../components/ui/SwarmCursor";
import ParticleText from "../components/ui/ParticleText";
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
      <Problem />
      <Difference />
      <Results />
      <TrainingSection />

      {/* Detailed Agency Value Proposition Box */}
      <DetailedAgencyBox />

      {/* --- NEW COMPONENTS SHOWCASE --- */}
      <section className="relative w-full border-b border-white/10 flex flex-col md:flex-row backdrop-blur-sm bg-black/40">
        {/* SwarmCursor Showcase */}
        <div className="w-full md:w-1/2 relative border-r border-white/10" style={{ height: 400 }}>
          <SwarmCursor className="w-full h-full absolute inset-0" color="#fff" accentColor="#ed1c24">
            <span className="text-white text-lg font-bold tracking-widest uppercase opacity-50">Move Mouse Here</span>
          </SwarmCursor>
        </div>

        {/* ParticleText Showcase */}
        <div className="w-full md:w-1/2 relative" style={{ height: 400 }}>
          <ParticleText
            text="Launch Faster"
            particleSize={2}
            density={4}
            color="#ffffff"
            highlightColor="#ed1c24"
            scatter={180}
            gatherDuration={1600}
            stagger={420}
            pointerRepel={40}
            repelRadius={120}
            idleDrift={0.7}
            trigger="hover"
            fontSize="clamp(3rem, 10vw, 6rem)"
            fontWeight={800}
            fontFamily="inherit"
            glow
          />
        </div>
      </section>

      <FinalCta />
      <Footer />
    </main>
  );
}

