import type { Metadata } from "next";
import { AxionStudioPage } from "../../components/axion/AxionStudioPage";

export const metadata: Metadata = {
  title: "Axion Studio | We craft digital experiences",
  description:
    "Strategy-led creatives, delivering results in digital and beyond.",
};

export default function Page() {
  return <AxionStudioPage />;
}
