import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { Header } from "../components/Header";
import "./globals.css";

const display = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700", "800"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Scale With Ads™ | Done-For-You Client Acquisition System",
  description:
    "We install our proprietary Scale With Ads™ Client Acquisition System into your business and double your revenue in 90 days — or we work at no management fee until we do. Backed by a written agreement. For $10K+/month businesses.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Scale With Ads™ | Double Your Revenue In 90 Days",
    description:
      "Complete done-for-you client acquisition system: Meta Ads, creatives, landing pages, CRM, AI automations, and qualification. Double revenue in 90 days — in writing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="min-h-full">
        <Header />
        {children}
      </body>
    </html>
  );
}
