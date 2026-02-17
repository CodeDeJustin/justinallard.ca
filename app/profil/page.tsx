import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Timeline } from "@/components/Timeline";
import { SocialLinks } from "@/components/SocialLinks";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentMetadata = await parent;

  const title = "Profil";
  const description =
    "Développeur logiciel Full Stack avec un profil hybride CAO/PLM et gestion de projets.";

  const shareImage = "/images/opengraph/JustinAllard_Opengraph.jpg";

  return {
    title,
    description,
    alternates: { canonical: "/profil" },

    openGraph: {
      ...(parentMetadata.openGraph ?? {}),
      title,
      description,
      url: "/profil",
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 750,
          alt: "Justin Allard - Portfolio",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage],
    },
  };
}

export default function ProfilPage() {
  return (
    <Container>
      <div className="max-w-5xl mx-auto px-8 md:mt-20 relative flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10 justify-between">
        <div>
          <h1 className="font-bold text-3xl md:text-5xl md:leading-tight text-zinc-50 max-w-3xl">
            Je m'appelle <span className="text-brand-500">Justin Allard</span>.
          </h1>

          <h2 className="mt-4 text-zinc-200 text-xl md:text-2xl font-semibold leading-snug max-w-3xl">
            Développeur, gestionnaire de projets et concepteur (automatisation)
            CAO.
          </h2>

          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mt-8 md:leading-loose tracking-wide">
            Passionné par la programmation et l’automatisation, je conçois des
            solutions concrètes, robustes et agréables à utiliser. Je combine
            une approche technique (Full Stack) avec une rigueur de livraison
            (PMP, PSM II, PSPO I) pour transformer des besoins réels en produits
            qui tiennent la route.
          </p>

          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mt-4 md:leading-loose tracking-wide">
            Mon parcours inclut aussi l’automatisation CAO et l’intégration PLM
            (PTC Creo, Windchill), ce qui me rend à l’aise autant côté “écran et
            API” que côté ingénierie et processus.
          </p>
        </div>

        <div className="order-first md:order-last">
          <Image
            src="/images/JustinAllard.jpg"
            width={250}
            height={250}
            alt="Avatar de Justin Allard"
            className="rounded-2xl"
            priority
          />

          <SocialLinks className="flex flex-row justify-start md:justify-center space-x-2 mt-2" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 mt-10 relative">
        <p className="text-zinc-400 text-sm md:text-base mt-8 md:leading-loose tracking-wide">
          Voici un aperçu chronologique de mon parcours, entre développement
          logiciel, modélisation, intégration, automatisation et gestion de
          projets.
        </p>

        <Timeline />
      </div>
    </Container>
  );
}
