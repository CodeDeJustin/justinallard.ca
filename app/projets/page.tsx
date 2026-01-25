import { Container } from "@/components/Container";
import { Projets } from "@/components/Projets";

export const metadata = { title: "Projets | Justin Allard" };

export default function ProjetsPage() {
  return (
    <Container>
      <div className="max-w-5xl mx-auto px-8 mt-10 md:mt-20 relative">
        <h1 className="font-bold text-3xl md:text-5xl md:leading-tight text-zinc-50 max-w-3xl">
          Mon <span className="text-cyan-500">portfolio</span>
        </h1>
        <p className="text-zinc-400 text-sm md:text-base max-w-2xl mt-8 md:leading-loose tracking-wide">
          Une sélection de projets “legacy” qui montrent mon parcours, mes choix
          techniques et ce que j’aime construire quand personne ne me retient.
        </p>
      </div>

      <Projets />
    </Container>
  );
}
