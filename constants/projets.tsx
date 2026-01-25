import { stack } from "./stack";

export const projects = [
  {
    title: "Site web pour une pizzeria",
    description:
      "Projet fictif réalisé avec Django (Python) : gestion de menu, CRUD, interface simple et dynamique. Déployé sur PythonAnywhere.",
    image: "/images/projects/pizzamama.jpg",
    stack: [
      stack.python,
      stack.django,
      stack.html,
      stack.css,
      stack.javascript,
    ],
    link: "https://justinallard.pythonanywhere.com",
    // Repo associé
    repo: "https://github.com/CodeDeJustin/Pizzamama",
  },
  {
    title: "Site Web (legacy)",
    description:
      "Mon site vitrine legacy, construit volontairement en HTML/CSS/JavaScript “vanille” pour la performance et la simplicité.",
    image: "/images/projects/legacyweb.jpg",
    stack: [stack.html, stack.css, stack.javascript],
    link: "https://justinallard.ca/",
    // Repo associé
    repo: "https://github.com/CodeDeJustin/justinallard.ca",
  },
  {
    title: "justinallard.ca (refonte en cours)",
    description:
      "Refonte complète de mon portfolio avec Next.js, TypeScript et Tailwind. Architecture moderne, composantisée et orientée performance.",
    image: "/images/projects/legacyweb.jpg",
    stack: [stack.nextjs, stack.react, stack.typescript, stack.tailwindcss],
    link: "/",
    // Pour l'instant, même repo que le site (ajuste si ton repo Next est différent)
    repo: "https://github.com/CodeDeJustin/justinallard.ca",
  },
  {
    title: "CPAPorama",
    description:
      'Application mobile Android développée avec Flutter et Dart pour l’analyse et le suivi des données CPAP. Approche "privacy-first", "offline-first".',
    image: "/images/projects/legacyweb.jpg",
    stack: [stack.flutter, stack.kotlin, stack.android],
    // Pas encore de site public: on pointe vers le repo
    link: "https://github.com/CodeDeJustin/cpaporama",
    repo: "https://github.com/CodeDeJustin/cpaporama",
  },
  {
    title: "Video Xtractor",
    description:
      "Outil CLI en Python pour extraire et convertir de l’audio/vidéo depuis des sites web (via yt-dlp + FFmpeg). Inclut une configuration PyInstaller (.spec) pour générer un exécutable Windows.",
    image: "/images/projects/legacyweb.jpg", // placeholder pour l’instant
    stack: [stack.python, stack.vscode],
    link: "https://github.com/CodeDeJustin/video_xtractor",
  },
];
