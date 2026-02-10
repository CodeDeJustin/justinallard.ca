// import "../styles/globals.css";
// import type { Metadata } from "next";
// import Script from "next/script";
// import Navbar from "@/components/Navbar/Navbar";
// import { Footer } from "@/components/Footer";
// import { Contact } from "@/components/Contact";
// import { TabAttention } from "@/components/TabAttention";
// import AuroraBackground from "@/components/AuroraBackground";

// export const metadata: Metadata = {
//   title: "Justin Allard",
//   description:
//     "Développeur logiciel Full Stack avec un profil hybride CAO/PLM et gestion de projets.",
//   metadataBase: new URL("https://justinallard.ca"),
//   icons: {
//     icon: "/icones/coffee-icon.ico",
//   },
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="fr-CA">
//       <body className="min-h-screen antialiased bg-zinc-900 overflow-x-hidden">
//         <Script
//           id="cookieyes"
//           src="https://cdn-cookieyes.com/client_data/cc5706dbc70897eafe23e0e6/script.js"
//           strategy="beforeInteractive"
//         />

//         <div className="relative min-h-screen">
//           <AuroraBackground />

//           <div className="relative z-10 flex min-h-screen flex-col">
//             <TabAttention />
//             <Navbar />

//             <main className="flex-1">{children}</main>

//             <Footer />
//             <Contact />
//           </div>
//         </div>
//       </body>
//     </html>
//   );
// }

import "../styles/globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { TabAttention } from "@/components/TabAttention";
import AuroraBackground from "@/components/AuroraBackground";

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
      <body className="min-h-screen antialiased bg-zinc-900 overflow-x-hidden">
        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/cc5706dbc70897eafe23e0e6/script.js"
          strategy="beforeInteractive"
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
