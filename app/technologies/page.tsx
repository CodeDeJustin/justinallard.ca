import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { TechnologiesShowcase } from "@/components/TechnologiesShowcase";

export const metadata: Metadata = {
  title: "Technologies | Justin Allard",
};

export default function TechnologiesPage() {
  return (
    <Container>
      <div className="max-w-5xl mx-auto px-8 md:mt-20">
        <h1 className="font-bold text-3xl md:text-5xl text-zinc-50">
          Technologies
        </h1>
        <p className="text-zinc-400 mt-6 md:leading-loose max-w-3xl">
          Voici mon stack, regroupé par domaines: développement, backend &
          données, outils, mobile, et CAO/PLM. C’est ce que j’utilise pour
          livrer, automatiser et maintenir des solutions solides.
        </p>

        <TechnologiesShowcase />
      </div>
    </Container>
  );
}
