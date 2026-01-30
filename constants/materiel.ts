import { uses } from "@/constants/uses";

const usesDescByName = new Map<string, string>(
  uses.map((u) => [u.name, u.description]),
);

const descFrom = (names: string[], fallback = "Détails à venir.") => {
  const parts = names
    .map((n) => usesDescByName.get(n))
    .filter((v): v is string => typeof v === "string" && v.trim().length > 0);

  return parts.length ? parts.join(" ") : fallback;
};

export type MaterielContentItem = {
  title: string;
  image: string;
  description: string;
};

export const materielContent: MaterielContentItem[] = [
  {
    title: "Poste principal",
    image: "/images/materiel/carrousel6.jpg",
    description: descFrom([
      "Ordinateur de bureau Dell XPS",
      "Trois moniteurs Dell 27 pouces",
      "Bureau ergonomique Motionwise (hauteur réglable)",
    ]),
  },
  {
    title: "Poste mobile",
    image: "/images/materiel/carrousel1.jpg",
    description: descFrom(["Ordinateur portable HP Envy"]),
  },
  {
    title: "Affichage & ergonomie",
    image: "/images/materiel/carrousel4.jpg",
    description: descFrom([
      "Trois moniteurs Dell 27 pouces",
      "Bureau ergonomique Motionwise (hauteur réglable)",
    ]),
  },
  {
    title: "Audio & visio",
    image: "/images/materiel/carrousel2.jpg",
    description: descFrom([
      "Webcam + audio Logitech",
      "Casque PlayStation PULSE 3D (et autres accessoires)",
    ]),
  },
  {
    title: "Périphériques de productivité",
    image: "/images/materiel/carrousel3.jpg",
    description: descFrom([
      "Casque PlayStation PULSE 3D (et autres accessoires)",
      "Webcam + audio Logitech",
    ]),
  },
  {
    title: "Réseau & continuité",
    image: "/images/materiel/carrousel5.jpg",
    description: descFrom(["Batteries de secours / onduleurs APC"]),
  },
];
