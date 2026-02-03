export const uses = [
  {
    name: "Ordinateur de bureau Dell XPS",
    description:
      "Le cœur de mon espace de travail. Configuré pour du développement intensif et de la 3D, avec des performances stables même sur de longues sessions.",
  },
  {
    name: "Trois moniteurs Dell 27 pouces",
    description:
      "Productivité sans pitié: multitâche, debug, CAO et docs en parallèle, sans jongler avec les fenêtres comme en 2009.",
  },
  {
    name: "Webcam + audio Logitech",
    description:
      "Pour des réunions nettes: image propre, son clair, et moins de ‘répète donc?’ en appel.",
  },
  {
    name: "Bureau ergonomique Motionwise (hauteur réglable)",
    description: "Assis ou debout, selon la journée.",
  },
  {
    name: "Ordinateur portable HP Envy",
    description:
      "Pour rester productif en déplacement, sans perdre le rythme quand je sors du bureau.",
  },
  {
    name: "Batteries de secours / onduleurs APC",
    description:
      "Fiabilité d’abord: alimentation protégée et continuité de travail pour éviter les interruptions stupides.",
  },
  {
    name: "Casque PlayStation PULSE 3D (et autres accessoires)",
    description:
      "Petits détails, gros impact: communication plus nette et environnement sonore plus agréable pour travailler concentré.",
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
