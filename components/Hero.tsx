"use client";

import { LinkPreview } from "./LinkPreview";
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
        Je construis des produits et des outils qui tiennent la route: du web
        moderne côté Full Stack, et des automatismes côté CAO/PLM quand le
        “clic-clic-clic” devient une perte de temps monumentale. J’aime les
        systèmes simples, les livraisons propres, et les décisions qui survivent
        à la production.
      </p>

      <div className="mt-8 text-zinc-400 text-sm md:text-base max-w-2xl leading-loose tracking-wide">
        Tu peux voir ce que je publie sur{" "}
        <LinkPreview
          className="text-zinc-200 font-bold hover:text-brand-500 transition duration-150 outline-none"
          url="https://github.com/CodeDeJustin"
        >
          GitHub
        </LinkPreview>{" "}
        et mes notes sur{" "}
        <LinkPreview
          className="text-zinc-200 font-bold hover:text-brand-500 transition duration-150 outline-none"
          url="https://medium.com/@justinallard"
        >
          Medium
        </LinkPreview>
        .
      </div>
    </div>
  );
};
