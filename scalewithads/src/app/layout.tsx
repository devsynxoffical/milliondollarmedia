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
  title: "Scale with Ads | Done-For-You Ads That Sell",
  description:
    "Done-for-you ads across all industries. Train media agencies to get clients. $50M+ Meta spend. 12 years experience. $10K minimum. We double your revenue in 90 days — in the agreement.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Scale with Ads | Ads That Sell Across Every Industry",
    description:
      "Done-for-you Meta ads + agency training. Two Comma Club Winner. ClickFunnels Awards. $10K minimum. Double revenue in 90 days.",
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
