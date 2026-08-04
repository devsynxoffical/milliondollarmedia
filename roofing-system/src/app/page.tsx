import { Clients } from "../components/Clients";
import { Comparison } from "../components/Comparison";
import { Contact } from "../components/Contact";
import { Faq } from "../components/Faq";
import { FinalCta } from "../components/FinalCta";
import { Footer } from "../components/Footer";
import { Guarantee } from "../components/Guarantee";
import { Hero } from "../components/Hero";
import { LatestMasterminds } from "../components/LatestMasterminds";
import { LogoStrip } from "../components/LogoStrip";
import { Masterclass } from "../components/Masterclass";
import { ProofGallery } from "../components/ProofGallery";
import { Qualification } from "../components/Qualification";
import { Reviews } from "../components/Reviews";
import { StatsBand } from "../components/StatsBand";
import { System } from "../components/System";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBand />
      <System />
      <LogoStrip />
      <Qualification />
      <ProofGallery />
      <Clients />
      <Guarantee />
      <Masterclass />
      <Comparison />
      <Reviews />
      <Contact />
      <LatestMasterminds />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}
