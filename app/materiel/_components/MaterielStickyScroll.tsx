"use client";

import Image from "next/image";
import { uses } from "@/constants/uses";
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

const usesDescByName = new Map<string, string>(
  uses.map((u) => [u.name, u.description]),
);

const descFrom = (names: string[], fallback = "Détails à venir.") => {
  const parts = names
    .map((n) => usesDescByName.get(n))
    .filter((v): v is string => typeof v === "string" && v.trim().length > 0);

  return parts.length ? parts.join(" ") : fallback;
};

const content: StickyScrollItem[] = [
  {
    title: "Poste principal",
    description: descFrom([
      "Ordinateur de bureau Dell XPS",
      "Trois moniteurs Dell 27 pouces",
      "Bureau ergonomique Motionwise (hauteur réglable)",
    ]),
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
    description: descFrom(["Ordinateur portable HP Envy"]),
    content: (
      <ImageBlock src="/images/materiel/carrousel1.jpg" alt="Poste mobile" />
    ),
  },
  {
    title: "Affichage & ergonomie",
    description: descFrom([
      "Trois moniteurs Dell 27 pouces",
      "Bureau ergonomique Motionwise (hauteur réglable)",
    ]),
    content: (
      <ImageBlock
        src="/images/materiel/carrousel4.jpg"
        alt="Affichage et ergonomie"
      />
    ),
  },
  {
    title: "Audio & visio",
    description: descFrom([
      "Webcam + audio Logitech",
      "Casque PlayStation PULSE 3D (et autres accessoires)",
    ]),
    content: (
      <ImageBlock src="/images/materiel/carrousel2.jpg" alt="Audio et visio" />
    ),
  },
  {
    title: "Périphériques de productivité",
    description: descFrom([
      "Casque PlayStation PULSE 3D (et autres accessoires)",
      "Webcam + audio Logitech",
    ]),
    content: (
      <ImageBlock
        src="/images/materiel/carrousel3.jpg"
        alt="Périphériques de productivité"
      />
    ),
  },
  {
    title: "Réseau & continuité",
    description: descFrom(["Batteries de secours / onduleurs APC"]),
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
