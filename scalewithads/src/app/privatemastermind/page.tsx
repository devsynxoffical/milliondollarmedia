import type { Metadata } from "next";
import { MastermindFunnelPage } from "../../components/MastermindFunnelPage";
import { MASTERMIND_FUNNEL } from "../../lib/funnels";

export const metadata: Metadata = {
  title: MASTERMIND_FUNNEL.metaTitle,
  description: MASTERMIND_FUNNEL.metaDescription,
};

export default function PrivateMastermindPage() {
  return <MastermindFunnelPage funnel={MASTERMIND_FUNNEL} />;
}
