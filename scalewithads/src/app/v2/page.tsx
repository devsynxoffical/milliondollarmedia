import React from "react";
import { FloatingNavbar } from "@/components/redesign/FloatingNavbar";
import { AdGenieHero } from "@/components/redesign/AdGenieHero";
import { EditorialSubhero } from "@/components/redesign/EditorialSubhero";
import { ClientsPartnersSection } from "@/components/redesign/ClientsPartnersSection";
import { FourWaysSection } from "@/components/redesign/FourWaysSection";
import { MarqueeTicker } from "@/components/redesign/MarqueeTicker";
import { WhatWeDoSection } from "@/components/redesign/WhatWeDoSection";
import { SelectedWorkShowcase } from "@/components/redesign/SelectedWorkShowcase";
import { TeamSection } from "@/components/redesign/TeamSection";
import { CreativeCtaSection } from "@/components/redesign/CreativeCtaSection";
import { LusionEndSection } from "@/components/redesign/LusionEndSection";
import { EditorialFooter } from "@/components/redesign/EditorialFooter";

export const metadata = {
  title: "ScaleWithAds | Performance Social Media Ad Agency",
  description:
    "ScaleWithAds helps ambitious brands launch, optimize, and scale hyper-profitable social ad campaigns effortlessly.",
};

export default function RedesignPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-stone-900 font-sans selection:bg-purple-200 selection:text-purple-950">
      <FloatingNavbar />
      <div id="home">
        <AdGenieHero />
      </div>
      <div id="about">
        <EditorialSubhero />
      </div>
      <ClientsPartnersSection />
      <FourWaysSection />
      <MarqueeTicker />
      <WhatWeDoSection />
      <SelectedWorkShowcase />
      <TeamSection />
      <CreativeCtaSection />
      <LusionEndSection />
      <EditorialFooter />
    </main>
  );
}
