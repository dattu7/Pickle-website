import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import WhatsAppBtn from "@/components/WhatsAppBtn";

const outfit = Outfit({ subsets: ["latin"], weight: ["300","400","500","600","700","800","900"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Godavari Pickles – Authentic Homemade Pickles",
  description: "Authentic homemade pickles from West Godavari, made with traditional village recipes. Farm-fresh, no preservatives, pan-India delivery.",
  icons: {
    icon: '/Round_logo.png',
    shortcut: '/Round_logo.png',
    apple: '/Round_logo.png',
  },
  keywords: ["Godavari pickles", "homemade pickles", "traditional pickles", "avakaya", "Telugu pickles", "no preservatives"],
  openGraph: {
    title: "Godavari Pickles – Authentic Homemade Pickles",
    description: "Farm-fresh, traditional village-recipe pickles delivered across India.",
    type: "website",
  },
};

import { Viewport } from 'next';
export const viewport: Viewport = {
  themeColor: '#00c853',
};

import { LanguageProvider } from "@/context/LanguageContext";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className={outfit.className}>
        <LanguageProvider>
          {children}
          <WhatsAppBtn />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
