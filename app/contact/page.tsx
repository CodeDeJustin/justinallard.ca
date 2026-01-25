import { Container } from "@/components/Container";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact | Justin Allard",
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
