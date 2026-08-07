import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Inter } from "next/font/google";
import { Header } from "../components/Header";
import { ScrollProgress } from "../components/ScrollProgress";
import "./globals.css";

const display = Space_Grotesk({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Roofing Systems Co. | Double Your Revenue in 90 Days",
  description:
    "Only for $1M+ roofers. We install your complete roofing client acquisition system, offer positioning, Meta Ads, creatives, landing pages, CRM, AI follow-up. You run the appointments and close. Guaranteed in writing.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Roofing Systems Co. | $1M+ Roofers Only",
    description:
      "Double your roofing revenue in 90 days. Complete client acquisition system, fully installed. Backed by a written agreement.",
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
      <body className="min-h-full antialiased">
        <ScrollProgress />
        <Header />
        {children}
      </body>
    </html>
  );
}
