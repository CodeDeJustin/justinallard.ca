import "../styles/globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Navbar from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { TabAttention } from "@/components/TabAttention";
import AuroraBackground from "@/components/AuroraBackground";

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://justinallard.ca"),

  title: {
    default: "Justin Allard",
    template: "%s | Justin Allard",
  },
  description:
    "Développeur logiciel Full Stack avec un profil hybride CAO/PLM et gestion de projets.",

  applicationName: "Justin Allard",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Justin Allard",
    "Développeur Full Stack",
    "Next.js",
    "TypeScript",
    "CAO",
    "PLM",
    "Portfolio",
  ],
  authors: [{ name: "Justin Allard", url: "https://justinallard.ca" }],
  creator: "Justin Allard",
  publisher: "Justin Allard",
  category: "Technology",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  icons: {
    icon: "/icones/coffee-icon.ico",
  },

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: "/",
    siteName: "Justin Allard",
    locale: "fr_CA",
    title: "Justin Allard",
    description:
      "Développeur logiciel Full Stack avec un profil hybride CAO/PLM et gestion de projets.",
    images: [
      {
        url: "/images/opengraph/JustinAllard_Opengraph.jpg",
        width: 1200,
        height: 750,
        alt: "Justin Allard",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Justin Allard",
    description:
      "Développeur logiciel Full Stack avec un profil hybride CAO/PLM et gestion de projets.",
    images: ["/images/opengraph/JustinAllard_Opengraph.jpg"],
  },

};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Justin Allard",
  url: "https://justinallard.ca",
  image: [
    "https://justinallard.ca/images/JustinAllard.jpg",
    "https://justinallard.ca/images/JustinAllard_Avatar.jpg",
    "https://justinallard.ca/images/JustinAllardProfil.jpg",
    "https://justinallard.ca/images/opengraph/JustinAllard_Opengraph.jpg",
    "https://justinallard.ca/images/opengraph/JustinAllard_Opengraph_Blogues.jpg",
    "https://justinallard.ca/images/opengraph/JustinAllard_Opengraph_Certifications.jpg",
    "https://justinallard.ca/images/opengraph/JustinAllard_Opengraph_Contact.jpg",
    "https://justinallard.ca/images/opengraph/JustinAllard_Opengraph_Projets.jpg",
  ],
  jobTitle: "Developpeur logiciel Full Stack",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr-CA">
      <body className="min-h-screen antialiased bg-zinc-900 overflow-x-hidden">
        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/cc5706dbc70897eafe23e0e6/script.js"
          strategy="beforeInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <div className="relative min-h-screen">
          <AuroraBackground />
          <TabAttention />
          <Navbar />
          {children}
          <Footer />
          <Contact />
        </div>
      </body>
    </html>
  );
}
