import type { Metadata } from "next";
import { Container } from "@/components/Container";
import ContactForm from "./_components/ContactForm";

export const metadata: Metadata = {
  title: "Vas-tu m'écrire?",
  icons: {
    icon: "/icones/red-heart-icon.ico",
  },
};

export default function ContactPage() {
  return (
    <Container>
      <div className="max-w-5xl mx-auto px-8 mt-10 md:mt-20 relative">
        <ContactForm />
      </div>
    </Container>
  );
}
