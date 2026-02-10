import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { MaterielStickyScroll } from "./_components/MaterielStickyScroll";

export const metadata: Metadata = { title: "Matériel | Justin Allard" };

export default function MaterielPage() {
  return (
    <Container>
      <div className="max-w-5xl mx-auto px-8 mt-10 md:mt-20 relative">
        <h1 className="font-bold text-3xl md:text-5xl md:leading-tight text-zinc-50 max-w-3xl">
          Matériel & <span className="text-brand-500">périphériques</span>
        </h1>

        <p className="text-zinc-400 text-sm md:text-base max-w-2xl mt-8 md:leading-loose tracking-wide">
          Mon poste de travail pour le développement, la CAO et les tests: une
          configuration sobre, fiable et optimisée pour rester efficace et
          confortable.
        </p>

        <div className="mt-10">
          <MaterielStickyScroll />
        </div>
      </div>
    </Container>
  );
}
