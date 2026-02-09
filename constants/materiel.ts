export const uses = [
  {
    name: "Ordinateur de bureau Dell XPS",
    description:
      "Station de travail stable pour développement intensif et charges 3D, pensée pour la constance sur de longues sessions.",
  },
  {
    name: "Trois moniteurs Dell 27 pouces",
    description:
      "Triple affichage pour garder code, logs, documentation et CAO visibles en même temps, avec moins de changements de contexte.",
  },
  {
    name: "Webcam + audio Logitech",
    description:
      "Audio et vidéo clairs pour les appels: communication plus fluide et moins de répétitions.",
  },
  {
    name: "Bureau ergonomique Motionwise (hauteur réglable)",
    description:
      "Hauteur réglable pour alterner assis et debout, et rester confortable sur la durée.",
  },
  {
    name: "Ordinateur portable HP Envy",
    description:
      "Poste mobile fiable pour travailler en déplacement sans casser le rythme.",
  },
  {
    name: "Batteries de secours / onduleurs APC",
    description:
      "Protection électrique et continuité: moins d’interruptions, plus de tranquillité.",
  },
  {
    name: "Casque PlayStation PULSE 3D (et autres accessoires)",
    description:
      "Confort et concentration au quotidien, avec une communication plus nette en réunion.",
  },
] as const;

const usesDescByName = new Map<string, string>(
  uses.map((u) => [u.name, u.description]),
);

const descFrom = (names: string[], fallback = "Détails à venir.") => {
  const parts = names
    .map((n) => usesDescByName.get(n))
    .filter((v): v is string => typeof v === "string" && v.trim().length > 0)
    .map((s) => s.trim().replace(/\s+/g, " "))
    .map((s) => (/[.!?]$/.test(s) ? s : `${s}.`));

  return parts.length ? parts.slice(0, 2).join(" ") : fallback;
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
    description: descFrom(["Webcam + audio Logitech"]),
  },
  {
    title: "Périphériques de productivité",
    image: "/images/materiel/carrousel3.jpg",
    description: descFrom([
      "Casque PlayStation PULSE 3D (et autres accessoires)",
    ]),
  },
  {
    title: "Réseau & continuité",
    image: "/images/materiel/carrousel5.jpg",
    description: descFrom(["Batteries de secours / onduleurs APC"]),
  },
];
