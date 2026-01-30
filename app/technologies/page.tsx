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
          Les technologies, c’est dans les projets. Ici, c’est le quotidien:
          environnement, IDE, outils et workflow.
        </p>

        <TechnologiesShowcase />
      </div>
    </Container>
  );
}
