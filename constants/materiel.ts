export const uses = [
  {
    id: "desktop_xps",
    name: "Ordinateur de bureau Dell XPS",
    description:
      "Poste de travail fixe conçu pour des sessions prolongées de développement logiciel et de modélisation tridimensionnelle. Priorise la stabilité, la constance des performances et le confort lors de charges de travail soutenues.",
  },
  {
    id: "monitors_27",
    name: "Trois moniteurs Dell 27 pouces",
    description:
      "Trois écrans de 27 pouces pour afficher simultanément le code, les messages de diagnostic, la documentation et les vues de conception assistée par ordinateur. Réduit les changements de contexte, améliore l’organisation visuelle et limite la fatigue liée aux basculements fréquents.",
  },
  {
    id: "logitech_av",
    name: "Webcam et audio Logitech",
    description:
      "Ensemble webcam et audio Logitech offrant une image nette et une captation vocale claire. Utile pour les rencontres à distance, les échanges techniques et l’enregistrement de démonstrations, avec une qualité constante d’une séance à l’autre.",
  },
  {
    id: "desk_motionwise",
    name: "Bureau ergonomique Motionwise (hauteur réglable)",
    description:
      "Bureau à hauteur réglable permettant d’alterner entre la position assise et la position debout. Favorise une meilleure posture, un confort durable et une routine de travail plus équilibrée sur de longues périodes.",
  },
  {
    id: "laptop_envy",
    name: "Ordinateur portable HP Envy",
    description:
      "Poste mobile fiable pour travailler hors du bureau, que ce soit en déplacement ou en environnement temporaire. Pratique pour la consultation, la validation, les ajustements et le dépannage lorsque le poste principal n’est pas disponible.",
  },
  {
    id: "ups_apc",
    name: "Batteries de secours et onduleurs APC",
    description:
      "Protection électrique contre les surtensions et les microcoupures, avec maintien temporaire de l’alimentation en cas de panne. Permet de terminer une session proprement, de protéger l’équipement et de réduire les risques de perte de données.",
  },
  {
    id: "headset_pulse3d",
    name: "Casque PlayStation PULSE 3D (et accessoires)",
    description:
      "Casque confortable pour l’écoute et la communication, utile au quotidien. Aide à mieux isoler les bruits ambiants et améliore l’intelligibilité de la voix lors des échanges à distance.",
  },
] as const;

export type UseId = (typeof uses)[number]["id"];
export const usesById = Object.fromEntries(
  uses.map((u) => [u.id, u]),
) as Record<UseId, (typeof uses)[number]>;

export type MaterielContentItem = {
  title: string;
  image: string;
  description: string;
  items?: UseId[];
};

export const materielContent: MaterielContentItem[] = [
  {
    title: "Poste principal",
    image: "/images/materiel/carrousel6.jpg",
    description:
      "Poste de travail fixe pensé pour la productivité et la constance. L’objectif est de soutenir des sessions prolongées en développement logiciel et en conception assistée par ordinateur, tout en maintenant une ergonomie stable et un espace de travail organisé.",
    items: ["desktop_xps", "monitors_27", "desk_motionwise"],
  },
  {
    title: "Poste mobile",
    image: "/images/materiel/carrousel1.jpg",
    description:
      "Poste de secours et de déplacement, utile lorsque le travail doit continuer hors du bureau. Conçu pour rester fonctionnel dans des contextes variés, tout en conservant une expérience de travail cohérente.",
    items: ["laptop_envy"],
  },
  {
    title: "Affichage et ergonomie",
    image: "/images/materiel/carrousel4.jpg",
    description:
      "Organisation visuelle et confort sur la durée. Le multiécran facilite la lecture, la comparaison et le suivi des tâches, tandis que la hauteur réglable du bureau aide à préserver une posture plus saine lors des périodes de travail prolongées.",
    items: ["monitors_27", "desk_motionwise"],
  },
  {
    title: "Audio et visioconférence",
    image: "/images/materiel/carrousel2.jpg",
    description:
      "Communication claire et fiable pour les échanges à distance. L’objectif est de maintenir une qualité sonore et vidéo constante, afin que les discussions techniques et les présentations restent fluides et compréhensibles.",
    items: ["logitech_av"],
  },
  {
    title: "Périphériques de productivité",
    image: "/images/materiel/carrousel3.jpg",
    description:
      "Confort et concentration au quotidien. Un bon casque améliore la clarté des échanges, réduit les distractions et facilite l’attention lors des séances de travail qui exigent de la précision.",
    items: ["headset_pulse3d"],
  },
  {
    title: "Continuité et protection",
    image: "/images/materiel/carrousel5.jpg",
    description:
      "Prévisibilité et protection de l’équipement. Les onduleurs et batteries de secours limitent l’impact des variations électriques, réduisent les interruptions et contribuent à préserver l’intégrité des données.",
    items: ["ups_apc"],
  },
];
