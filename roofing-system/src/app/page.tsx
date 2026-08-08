import { Hero } from "../components/Hero";
import { ScrollMorphHero } from "../components/ScrollMorphHero";
import { TrustBar } from "../components/sections/TrustBar";
import { WhyScale } from "../components/sections/WhyScale";
import { Different } from "../components/sections/Different";
import { FunnelProof } from "../components/sections/FunnelProof";
import { ClientSuccess } from "../components/sections/ClientSuccess";
import { Masterminds } from "../components/sections/Masterminds";
import { Process } from "../components/sections/Process";
import { EverythingIncluded } from "../components/sections/EverythingIncluded";
import { Ownership } from "../components/sections/Ownership";
import { Industries } from "../components/sections/Industries";
import { Comparison } from "../components/sections/Comparison";
import { Guarantee } from "../components/sections/Guarantee";
import { FAQ } from "../components/sections/FAQ";
import { FinalCTA } from "../components/sections/FinalCTA";
import { CTABanner } from "../components/ui/CTABanner";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-base">
      <main>
        <Hero />
        <ScrollMorphHero />
        <TrustBar />
        <WhyScale />
        <Different />
        <FunnelProof />
        <ClientSuccess />
        <Masterminds />
        <CTABanner compact />
        <Process />
        <CTABanner compact />
        <EverythingIncluded />
        <Ownership />
        <Industries />
        <Comparison />
        <Guarantee />
        <CTABanner compact />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
