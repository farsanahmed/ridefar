import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter, JetBrains_Mono } from "next/font/google";
import { BottomNav } from "@/components/site/BottomNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { site } from "@/lib/site";
import "./globals.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Bicycle Parts, MTB Gear & Cycling Equipment in Kenya`,
    template: `%s · ${site.name}`,
  },
  description: "Bicycle parts, MTB upgrades, safety gear and workshop tools. Kenya delivery. M-Pesa payments accepted.",
  keywords: [
    "bicycle parts Kenya",
    "MTB parts",
    "bike shop",
    "cycling accessories",
    "M-Pesa bike parts",
  ],
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: "Bicycle parts, MTB upgrades, safety gear and workshop tools. Kenya delivery. M-Pesa payments accepted.",
    url: "/",
    locale: "en_KE",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: "Bicycle parts, MTB upgrades, safety gear and workshop tools. Kenya delivery. M-Pesa payments accepted.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
