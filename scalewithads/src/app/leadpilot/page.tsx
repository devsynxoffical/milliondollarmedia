import type { Metadata } from "next";
import { FunnelPage } from "../../components/FunnelPage";
import { LEADPILOT_FUNNEL } from "../../lib/funnels";

export const metadata: Metadata = {
  title: LEADPILOT_FUNNEL.metaTitle,
  description: LEADPILOT_FUNNEL.metaDescription,
};

export default function LeadPilotPage() {
  return <FunnelPage funnel={LEADPILOT_FUNNEL} />;
}
