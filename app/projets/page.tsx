import type { Metadata, ResolvingMetadata } from "next";
import { Container } from "@/components/Container";
import { ProjectsGrid } from "@/components/ProjectsGrid";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentMetadata = await parent;

  const title = "Projets | Justin Allard";
  const description =
    "Sélection de projets qui reflètent mon parcours, mes choix techniques et ce que j’aime construire.";

  const shareImage = "/images/opengraph/JustinAllard_Opengraph_Projets.jpg";

  return {
    title,
    description,
    alternates: { canonical: "/projets" },

    openGraph: {
      ...(parentMetadata.openGraph ?? {}),
      title,
      description,
      url: "/projets",
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 800,
          alt: "Justin Allard - Projets",
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

export default function ProjetsPage() {
  return (
    <Container>
      <div className="max-w-5xl mx-auto px-8 mt-10 md:mt-20 relative">
        <h1 className="font-bold text-3xl md:text-5xl md:leading-tight text-zinc-50 max-w-3xl">
          Mes <span className="text-brand-500">projets</span>
        </h1>
        <p className="text-zinc-400 text-sm md:text-base max-w-2xl mt-8 md:leading-loose tracking-wide">
          Une sélection de projets qui reflètent mon parcours, mes choix
          techniques et ce que j’aime construire quand j’ai carte blanche.
        </p>
      </div>

      <ProjectsGrid />
    </Container>
  );
}
