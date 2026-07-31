import type { Metadata } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import { Header } from "../components/Header";
import "./globals.css";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Roofing Systems Co. | Double Your Revenue in 90 Days",
  description:
    "Only for $1M+ roofers. We run funnel, creatives, ads, and follow-up — you take the sales calls. Double your revenue in 90 days or you don't pay.",
  openGraph: {
    title: "Roofing Systems Co. | $1M+ Roofers Only",
    description:
      "Double your roofing revenue in 90 days. Full system + live access. If we don't perform, you don't pay.",
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
        <Header />
        {children}
      </body>
    </html>
  );
}
