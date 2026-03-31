import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { PrivacyBanner } from "./components/PrivacyBanner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://appeallettergenerator.com"),
  title: {
    default: "Free Insurance Appeal Letter Generator | Appeal a Denied Claim",
    template: "%s | AppealLetterGenerator.com",
  },
  description:
    "Learn how to appeal a denied insurance claim with our free insurance appeal letter generator. Get professional templates for US, UK, Canada, and Australia. 100% free appeal letter PDF and step-by-step guidance to overturn your medical or health insurance denial.",
  keywords: [
    "how to appeal a denied insurance claim",
    "health insurance claim denied what to do",
    "insurance appeal letter template free",
    "denied health insurance claim appeal process",
    "free health insurance appeal letter sample",
    "what to do if health insurance denies claim",
    "medicare denial appeal letter template",
    "denied claim appeal letter example",
    "health insurance appeal letter pdf free",
    "appeal denied medical claim step by step",
    "how to appeal denied health insurance uk",
    "private health insurance claim rejected appeal",
    "nhs claim denial appeal letter template free",
    "bupa claim denied what to do",
    "free insurance appeal letter template uk",
    "health insurance appeal process uk",
    "appeal denied health insurance claim canada",
    "ohip claim denied appeal letter",
    "free insurance appeal template canada",
    "what to do if insurance denies claim canada",
    "health claim appeal process ontario",
    "private health insurance claim denied appeal au",
    "medibank claim rejection appeal letter",
    "free health fund appeal template australia",
    "how to appeal health insurance denial australia",
    "free appeal letter generator insurance",
    "denied claim appeal toolkit free",
    "sample appeal letter for insurance denial",
    "health insurance appeal success rate",
    "auto insurance claim denied appeal",
    "life insurance denial appeal letter",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://appeallettergenerator.com",
    siteName: "AppealLetterGenerator.com",
    title: "Free Insurance Appeal Letter Generator | Appeal a Denied Claim",
    description:
      "Health insurance claim denied? Use our free appeal letter generator to overturn your denial in 60 seconds. High success rate, 100% free.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AppealLetterGenerator.com - Free Insurance Appeal Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Insurance Appeal Letter Generator",
    description: "Overturn your denied health insurance claim in 60 seconds.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: { google: "your-google-verification-code" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://appeallettergenerator.com" />
      </head>
      <body className="min-h-screen bg-grid" suppressHydrationWarning>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
        <PrivacyBanner />
      </body>
    </html>
  );
}
