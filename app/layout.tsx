import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://diningos.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "DiningOS — The AI operating system for restaurants",
  description:
    "DiningOS turns the cameras and systems you already run into one live operational brain — so managers stop reacting and start running the floor.",
  keywords: [
    "restaurant AI",
    "dining room intelligence",
    "restaurant operations",
    "computer vision restaurant",
    "table management",
    "service performance",
  ],
  authors: [{ name: "DiningOS" }],
  openGraph: {
    title: "DiningOS — The AI operating system for restaurants",
    description:
      "Your restaurant, finally readable in real time. One live model of your entire dining room.",
    url: SITE_URL,
    siteName: "DiningOS",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DiningOS — The AI operating system for restaurants",
    description:
      "Your restaurant, finally readable in real time. One live model of your entire dining room.",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b0f14",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-bg font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
