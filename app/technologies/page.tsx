import type { Metadata, ResolvingMetadata } from "next";
import { Container } from "@/components/Container";
import { TechnologiesShowcase } from "@/components/TechnologiesShowcase";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentMetadata = await parent;

  const title = "Technologies | Justin Allard";
  const description =
    "Pile technologique regroupée par domaines: développement, backend & données, outils, mobile et CAO/PLM.";

  const shareImage = "/images/opengraph/JustinAllard_Opengraph.jpg";

  return {
    title,
    description,
    alternates: { canonical: "/technologies" },

    openGraph: {
      ...(parentMetadata.openGraph ?? {}),
      title,
      description,
      url: "/technologies",
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 750,
          alt: "Justin Allard - Technologies",
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

export default function TechnologiesPage() {
  return (
    <Container>
      <div className="max-w-5xl mx-auto px-8 md:mt-20">
        <h1 className="font-bold text-3xl md:text-5xl text-zinc-50">
          Technologies
        </h1>
        <p className="text-zinc-400 mt-6 md:leading-loose max-w-3xl">
          Voici ma pile technologique, regroupée par domaines: développement,
          backend & données, outils, mobile et CAO/PLM. C’est ce que j’utilise
          pour livrer, automatiser et maintenir des solutions concrètes.
        </p>

        <TechnologiesShowcase />
      </div>
    </Container>
  );
}
