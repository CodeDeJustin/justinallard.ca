import type { Metadata, ResolvingMetadata } from "next";
import { Container } from "@/components/Container";
import { CertificationsGrid } from "./_components/CertificationsGrid";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentMetadata = await parent;

  const title = "Certifications";
  const description =
    "Certifications et attestations: repères de méthode et de rigueur (PMP, PSM II, PSPO I, CSWA, etc.).";

  const shareImage =
    "/images/opengraph/JustinAllard_Opengraph_Certifications.jpg";

  return {
    title,
    description,
    alternates: { canonical: "/certifications" },

    openGraph: {
      ...(parentMetadata.openGraph ?? {}),
      title,
      description,
      url: "/certifications",
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 800,
          alt: "Justin Allard - Certifications",
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

export default function CertificationsPage() {
  return (
    <Container>
      <div className="max-w-5xl mx-auto px-8 mt-10 md:mt-20 relative">
        <h1 className="font-bold text-3xl md:text-5xl md:leading-tight text-zinc-50 max-w-3xl">
          Certifications & <span className="text-brand-500">attestations</span>
        </h1>

        <p className="text-zinc-400 text-sm md:text-base max-w-2xl mt-8 md:leading-loose tracking-wide">
          Des repères de méthode et de rigueur. Les certifications ne font pas
          le travail, mais elles accélèrent la compréhension quand on doit
          livrer ensemble.
        </p>

        <CertificationsGrid />
      </div>
    </Container>
  );
}
