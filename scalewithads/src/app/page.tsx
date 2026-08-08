import { AdsShowcase } from "../components/AdsShowcase";
import { ClientsShowcase } from "../components/ClientsShowcase";
import { Comparison } from "../components/Comparison";
import { Difference } from "../components/Difference";
import { FinalCta } from "../components/FinalCta";
import { Footer } from "../components/Footer";
import { Guarantee } from "../components/Guarantee";
import { LogoMarquee } from "../components/LogoMarquee";
import { Ownership } from "../components/Ownership";
import { Problem } from "../components/Problem";
import { Results } from "../components/Results";
import { Steps } from "../components/Steps";
import { SystemsShowcase } from "../components/SystemsShowcase";
import { TrustBar } from "../components/TrustBar";
import ResponsiveHeroBanner from "../components/ui/responsive-hero-banner";

export default function Home() {
  return (
    <main>
      <ResponsiveHeroBanner />
      <LogoMarquee />
      <TrustBar />
      <ClientsShowcase />
      <Problem />
      <Difference />
      <Steps />
      <Ownership />
      <Comparison />
      <AdsShowcase />
      <SystemsShowcase />
      <Guarantee />
      <Results />
      <FinalCta />
      <Footer />
    </main>
  );
}

