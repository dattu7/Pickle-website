import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import WhatsAppBtn from "@/components/WhatsAppBtn";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Godavari Pickles",
  description: "Authentic homemade pickles from West Godavari, made with traditional village recipes.",
  icons: {
    icon: '/Round_logo.png',
    shortcut: '/Round_logo.png',
    apple: '/Round_logo.png',
  },
};

import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          {children}
          <WhatsAppBtn />
        </LanguageProvider>
      </body>
    </html>
  );
}
