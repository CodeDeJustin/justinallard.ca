"use client";

import { FlippingText } from "@/components/ui/flipping-text";

export const Hero = () => {
  const hats = [
    "Développeur Full Stack",
    "Automatisation CAO",
    "Intégration PLM",
    "Gestion de projet (PMP)",
    "Scrum (PSM / PSPO)",
  ];

  return (
    <div className="max-w-5xl mx-auto mt-10 md:mt-20 px-8">
      <h1 className="font-bold text-3xl md:text-5xl leading-tight text-zinc-50 max-w-3xl">
        <span className="block">Efficace. Concret. Robuste.</span>
        <span className="block mt-2 text-brand-500">
          <FlippingText words={hats} />
        </span>
      </h1>

      <p className="text-zinc-400 text-sm md:text-base max-w-2xl mt-8 leading-loose tracking-wide">
        Je transforme des besoins réels en solutions qui tiennent la route:
        applications web, outils internes et automatisations qui éliminent le
        travail répétitif. Mon avantage, c’est le profil hybride Full Stack +
        CAO/PLM, soutenu par une rigueur de livraison (PMP, Scrum): cadrage
        clair, exécution propre et décisions qui survivent à la production.
        Bref, moins de “clic-clic-clic”, plus de valeur livrée.
      </p>
    </div>
  );
};
