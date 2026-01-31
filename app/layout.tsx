import "../styles/globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { TabAttention } from "@/components/TabAttention";

export const metadata: Metadata = {
  title: "Justin Allard",
  description:
    "Développeur logiciel Full Stack avec un profil hybride CAO/PLM et gestion de projets.",
  metadataBase: new URL("https://justinallard.ca"),
  icons: {
    icon: "/icones/coffee-icon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr-CA">
      <body className="min-h-screen antialiased bg-zinc-900">
        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/cc5706dbc70897eafe23e0e6/script.js"
          strategy="beforeInteractive"
        />

        <TabAttention />
        <Navbar />
        {children}
        <Footer />
        <Contact />
      </body>
    </html>
  );
}
