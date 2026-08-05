import { Comparison } from "../components/Comparison";
import { Difference } from "../components/Difference";
import { Faq } from "../components/Faq";
import { FinalCta } from "../components/FinalCta";
import { Footer } from "../components/Footer";
import { Guarantee } from "../components/Guarantee";
import { Hero } from "../components/Hero";
import { Included } from "../components/Included";
import { Ownership } from "../components/Ownership";
import { Problem } from "../components/Problem";
import { Results } from "../components/Results";
import { Steps } from "../components/Steps";
import { TrustBar } from "../components/TrustBar";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <Problem />
      <Difference />
      <Results />
      <Steps />
      <Included />
      <Ownership />
      <Comparison />
      <Guarantee />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}
