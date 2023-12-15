import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { AosInit } from "@/components/scripts/AosInit";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "Ecommerce",
  icons: ["/images/site/favicon.png"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AosInit />
      <body className={`${inter.className} bg-brand-background text-black`}>
        {children}
      </body>
    </html>
  );
}
