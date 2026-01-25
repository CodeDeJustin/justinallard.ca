import { Container } from "@/components/Container";
import { OutilsIconCloud } from "@/components/OutilsIconCloud";

export const metadata = {
  title: "Outils | Justin Allard",
};

export default function OutilsPage() {
  return (
    <Container>
      <div className="max-w-5xl mx-auto px-8 md:mt-20">
        <h1 className="font-bold text-3xl md:text-5xl text-zinc-50">Outils</h1>
        <p className="text-zinc-400 mt-6 md:leading-loose max-w-3xl">
          Les technologies, c’est dans les projets. Ici, c’est le quotidien:
          environnement, IDE, outils et workflow (incluant l’assistance IA, sans
          la confondre avec une dépendance).
        </p>

        <div className="mt-10">
          <OutilsIconCloud />
        </div>
      </div>
    </Container>
  );
}
