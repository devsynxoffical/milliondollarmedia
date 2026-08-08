"use client";

import { usePathname } from "next/navigation";
import { ScrollProgress } from "./ScrollProgress";
import { Header } from "./Header";

export function SiteChrome() {
  const pathname = usePathname();
  if (pathname.startsWith("/axion")) return null;
  return (
    <>
      <ScrollProgress />
      <Header />
    </>
  );
}
