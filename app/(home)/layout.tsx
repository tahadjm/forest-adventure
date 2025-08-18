import type React from "react";
import { Poppins } from "next/font/google";
import "../globals.css";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Forest Adventure",
    template: "%s | Forest Adventure",
  },
  description: "Book activities, enjoy climbing, laser tag, quads, and more at Adventure Park.",
  keywords: ["climbing", "adventure park", "laser tag", "quad", "archery", "Annaba"],
  openGraph: {
    title: "Forest Adventure",
    description: "Book and enjoy outdoor activities at Adventure Park Annaba.",
    url: "https://yourdomain.com",
    siteName: "Adventure Park",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adventure Park",
    description: "Book outdoor activities at Adventure Park Annaba.",
    images: ["https://yourdomain.com/twitter-image.jpg"],
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["italic", "normal"],
  variable: "--font-poppins",
});

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${poppins.className} min-h-screen flex flex-col`}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-16">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
