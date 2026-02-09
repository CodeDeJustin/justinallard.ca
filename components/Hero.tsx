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
        Je transforme des besoins concrets en solutions solides: applications
        web, outils internes et automatisations qui coupent dans le répétitif.
        Mon atout, c’est un profil hybride Full Stack + CAO/PLM, soutenu par une
        rigueur de livraison (PMP, Scrum): cadrage clair, exécution propre,
        décisions qui survivent au monde réel. Résultat: moins de friction, plus
        de valeur livrée.
      </p>
    </div>
  );
};
