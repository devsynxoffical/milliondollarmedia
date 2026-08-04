import type { Metadata } from "next";
import { FunnelPage } from "../../components/FunnelPage";
import { MASTERMIND_FUNNEL } from "../../lib/funnels";

export const metadata: Metadata = {
  title: MASTERMIND_FUNNEL.metaTitle,
  description: MASTERMIND_FUNNEL.metaDescription,
};

export default function PrivateMastermindPage() {
  return <FunnelPage funnel={MASTERMIND_FUNNEL} />;
}
