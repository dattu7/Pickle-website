import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import WhatsAppBtn from "@/components/WhatsAppBtn";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Godavari Pickles | Authentic West Godavari Tastes",
  description: "Authentic homemade pickles from West Godavari, made with traditional village recipes.",
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
