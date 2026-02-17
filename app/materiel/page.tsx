import type { Metadata, ResolvingMetadata } from "next";
import { Container } from "@/components/Container";
import { MaterielStickyScroll } from "./_components/MaterielStickyScroll";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentMetadata = await parent;

  const title = "Matériel | Justin Allard";
  const description =
    "Poste de travail pour le développement, la CAO et les tests: une configuration sobre, fiable et optimisée.";

  const shareImage = "/images/opengraph/JustinAllard_Opengraph.jpg";

  return {
    title,
    description,
    alternates: { canonical: "/materiel" },

    openGraph: {
      ...(parentMetadata.openGraph ?? {}),
      title,
      description,
      url: "/materiel",
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

export default function MaterielPage() {
  return (
    <Container>
      <div className="max-w-5xl mx-auto px-8 mt-10 md:mt-20 relative">
        <h1 className="font-bold text-3xl md:text-5xl md:leading-tight text-zinc-50 max-w-3xl">
          Matériel & <span className="text-brand-500">périphériques</span>
        </h1>

        <p className="text-zinc-400 text-sm md:text-base max-w-2xl mt-8 md:leading-loose tracking-wide">
          Mon poste de travail pour le développement, la CAO et les tests: une
          configuration sobre, fiable et optimisée pour rester efficace et
          confortable.
        </p>

        <div className="mt-10">
          <MaterielStickyScroll />
        </div>
      </div>
    </Container>
  );
}
