import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import WhatsAppBtn from "@/components/WhatsAppBtn";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "PicklePerfect | Authentic Homemade Pickles",
  description: "Handcrafted pickles made from secret family recipes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <WhatsAppBtn />
      </body>
    </html>
  );
}
