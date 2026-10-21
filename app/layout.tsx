import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontBody, fontDisplay, fontMono } from "@/lib/fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { generateOrganizationJsonLd } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: `${siteConfig.siteName} | Precision Equipment & Technical Instruments`,
    template: `%s | ${siteConfig.siteName}`,
  },
  description: siteConfig.siteDescription,
  applicationName: siteConfig.siteName,
  authors: [{ name: siteConfig.siteName }],
  generator: "Next.js",
  keywords: [
    "Optics",
    "GPS",
    "Night Vision",
    "Thermal",
    "Geological Equipment",
    "Camping Equipment",
    "Weather Station",
    "Camera Trap",
    "Survey Equipment",
    "Field Instruments",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.siteName} | Precision Equipment Showcase`,
    description: siteConfig.siteDescription,
    url: siteConfig.domain,
    siteName: siteConfig.siteName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.siteName,
    description: siteConfig.siteDescription,
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = generateOrganizationJsonLd();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fontBody.variable} ${fontDisplay.variable} ${fontMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-text-primary selection:bg-accent-muted selection:text-accent font-sans">
        <Header />
        <main id="main-content" className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
