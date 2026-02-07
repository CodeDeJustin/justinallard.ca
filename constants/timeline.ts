export type TimelineItem = {
  year: number;
  points: string[];
};

export const timeline: TimelineItem[] = [
  {
    year: 2025,
    points: [
      "Consultant en intégration IA: veille et évaluation d’outils pour productivité (ChatGPT, Codex, Devin, etc.).",
      "Obtention certification PMP (Project Management Professional).",
      "Développeur logiciel chez Harnois Énergies.",
    ],
  },
  {
    year: 2024,
    points: [
      "Développeur chez Logiciels Sys-Thèmes: migration d’un outil CLI vers une interface web (Flexio® ERP).",
      "Backend Java + intégration BD, UI avec Kendo UI, correctifs et tests avant production.",
      "Développement web & mobile, création du site justinallard.ca, certifications PSM I & II, PSPO I, CSWA.",
    ],
  },
  {
    year: 2023,
    points: [
      "Développeur Web et mobile (stage) chez Binder. Développement d'une nouvelle application mobile",
      "Authentification sur app mobile OAuth SvelteKit et conception de l'interface utilisateur.",
      "UI sur Figma, multilingue avec Inlang, documentation technique.",
    ],
  },
  {
    year: 2008,
    points: [
      "Industries Harnois: Programmation et automatisation de la modélisation 3D sur PTC Creo.",
      "Optimisation des workflows et gestion documentaire sous Windchill PLM.",
      "Gestionnaire de projets d’ingénierie (R&D, projets spéciaux, collaboration interdisciplinaire).",
    ],
  },
  {
    year: 2006,
    points: [
      "Les portes Bourassa: coordonnateur de projets, gestion des ressources humaines, optimisation Lean Manufacturing.",
      "Programmation de machines-outils (usinage/sculpture assistée par ordinateur).",
      "Mise en œuvre Kanban/Kaizen/Lean/Six Sigma & création d’un manuel employé RH/procédures.",
    ],
  },
  {
    year: 2002,
    points: [
      "ITI Hydraulik: conception-dessin CAO et coordination de projets.",
      "Calcul de contraintes/tolérances, support technique interne, planification de production.",
      "Contributions: ISO 9001 (processus qualité), CTPAT, francisation de documents techniques, projet marquant (Doha, Qatar).",
    ],
  },
];
