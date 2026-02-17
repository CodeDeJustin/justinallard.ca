import type { Metadata, ResolvingMetadata } from "next";
import { Container } from "@/components/Container";
import ContactForm from "./_components/ContactForm";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const parentMetadata = await parent;

  const title = "Vas-tu m'écrire?";
  const description =
    "Page contact: écris-moi pour une opportunité, un projet ou une collaboration.";

  // On évite de spread parentMetadata.twitter (il contient parfois des null).
  // On force une Twitter Card clean, avec la même image que ton OG.
  const shareImage = "/images/opengraph/JustinAllard_Opengraph_Contact.jpg";

  return {
    title,
    description,
    alternates: { canonical: "/contact" },

    icons: {
      icon: "/icones/red-heart-icon.ico",
    },

    openGraph: {
      // openGraph est généralement safe à étendre, mais on override title/desc/url.
      ...(parentMetadata.openGraph ?? {}),
      title,
      description,
      url: "/contact",
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 800,
          alt: "Justin Allard - Contact",
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

export default function ContactPage() {
  return (
    <Container>
      <div className="max-w-5xl mx-auto px-8 mt-10 md:mt-20 relative">
        <ContactForm />
      </div>
    </Container>
  );
}
