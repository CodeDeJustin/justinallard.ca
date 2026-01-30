import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ProjectsGrid } from "@/components/ProjectsGrid";

export const metadata: Metadata = { title: "Projets | Justin Allard" };

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
