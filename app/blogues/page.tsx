import type { Metadata, ResolvingMetadata } from "next";
import { Container } from "@/components/Container";
import AllBlogs from "@/app/blogues/_components/AllBlogs";
import { getAllBlogs } from "@/lib/blogs";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentMetadata = await parent;

  const title = "Blogue";
  const description =
    "Notes de terrain sur le leadership, Scrum, la culture d’équipe et la réalité du travail en entreprise.";

  const shareImage = "/images/opengraph/JustinAllard_Opengraph_Blogues.jpg";

  return {
    title,
    description,
    alternates: { canonical: "/blogues" },

    openGraph: {
      ...(parentMetadata.openGraph ?? {}),
      title,
      description,
      url: "/blogues",
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 800,
          alt: "Justin Allard - Blogue",
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

export default async function BlogsPage() {
  const blogs = await getAllBlogs();

  return (
    <Container>
      <div className="max-w-5xl mx-auto px-8 mt-10 md:mt-20 relative">
        <div>
          <h1 className="font-bold text-3xl md:text-5xl md:leading-tight text-zinc-50 max-w-3xl">
            Blogue&nbsp;:{" "}
            <span className="text-brand-500">notes de terrain</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mt-8 md:leading-loose tracking-wide">
            J’écris sur le leadership, Scrum, la culture d’équipe et la réalité
            du travail en entreprise. Objectif: partager des idées concrètes,
            des exemples applicables et des prises de position réfléchies.
          </p>
        </div>

        <div className="mt-20">
          <AllBlogs blogs={blogs} />
        </div>
      </div>
    </Container>
  );
}
