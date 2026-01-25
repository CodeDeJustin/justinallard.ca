"use client";

import Image from "next/image";
import React from "react";
import {
  StickyScroll,
  type StickyScrollItem,
} from "@/components/ui/sticky-scroll-reveal";

function ImageBlock({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 384px"
        priority={priority}
      />
    </div>
  );
}

const content: StickyScrollItem[] = [
  {
    title: "Poste principal",
    description:
      "Mon setup principal pour dev/CAO au quotidien. Stable, confortable, et prêt pour des sessions longues.",
    content: (
      <ImageBlock
        src="/images/materiel/carrousel6.jpg"
        alt="Poste principal"
        priority
      />
    ),
  },
  {
    title: "Poste mobile",
    description:
      "Quand je dois être flexible: machine principale en mode portable, sans sacrifier l’efficacité.",
    content: (
      <ImageBlock src="/images/materiel/carrousel1.jpg" alt="Poste mobile" />
    ),
  },
  {
    title: "Affichage & ergonomie",
    description:
      "Écrans, disposition, confort. Parce que se battre avec son poste de travail, c’est une perte de temps.",
    content: (
      <ImageBlock
        src="/images/materiel/carrousel4.jpg"
        alt="Affichage et ergonomie"
      />
    ),
  },
  {
    title: "Audio & visio",
    description:
      "Éclairage/caméra et configuration pour des appels clairs (et éviter le look “témoin dans un interrogatoire”).",
    content: (
      <ImageBlock src="/images/materiel/carrousel2.jpg" alt="Audio et visio" />
    ),
  },
  {
    title: "Périphériques de productivité",
    description:
      "Clavier, souris et tout ce qui rend le poste agréable et rapide. Les petits gains s’additionnent.",
    content: (
      <ImageBlock
        src="/images/materiel/carrousel3.jpg"
        alt="Périphériques de productivité"
      />
    ),
  },
  {
    title: "Réseau & continuité",
    description:
      "Stabilité et continuité: onduleur, alimentation protégée et réseau fiable. Moins d’interruptions, plus de livrables.",
    content: (
      <ImageBlock
        src="/images/materiel/carrousel5.jpg"
        alt="Réseau et continuité"
      />
    ),
  },
];

export function MaterielStickyScroll() {
  return (
    <div className="w-full py-6">
      <StickyScroll content={content} />
    </div>
  );
}
