import { Comparison } from "../components/Comparison";
import { Faq } from "../components/Faq";
import { FinalCta } from "../components/FinalCta";
import { Footer } from "../components/Footer";
import { Guarantee } from "../components/Guarantee";
import { Hero } from "../components/Hero";
import { LiveAccess } from "../components/LiveAccess";
import { LogoStrip } from "../components/LogoStrip";
import { Masterclass } from "../components/Masterclass";
import { ProofGallery } from "../components/ProofGallery";
import { Qualification } from "../components/Qualification";
import { Reviews } from "../components/Reviews";
import { System } from "../components/System";

export default function Home() {
  return (
    <main>
      <Hero />
      <LogoStrip />
      <Qualification />
      <Masterclass />
      <System />
      <LiveAccess />
      <ProofGallery />
      <Reviews />
      <Comparison />
      <Guarantee />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}
