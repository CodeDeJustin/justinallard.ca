export type TechnologieItem = {
  file: string;
  label: string;
};

export const technologiesSections = [
  {
    title: "Développement (Core)",
    items: [
      { file: "typescript.svg", label: "TypeScript" },
      { file: "react.svg", label: "React" },
      { file: "nextjs.svg", label: "Next.js" },
      { file: "tailwindcss.svg", label: "Tailwind CSS" },
      { file: "nodejs.svg", label: "Node.js" },
      { file: "pnpm.svg", label: "pnpm" },
      { file: "python.svg", label: "Python" },
      { file: "java.svg", label: "Java" },
    ],
  },
  {
    title: "Backend & Données",
    items: [
      { file: "csharp.svg", label: "C#" },
      { file: "dot-net.svg", label: ".NET" },
      { file: "sqlserver.svg", label: "SQL Server" },
      { file: "snowflake.svg", label: "Snowflake" },
      { file: "sqldeveloper.svg", label: "SQL Developer" },
    ],
  },
  {
    title: "Outils & Collaboration",
    items: [
      { file: "visualstudio.svg", label: "Visual Studio" },
      { file: "vscode.svg", label: "VS Code" },
      { file: "git.svg", label: "Git" },
      { file: "GitHub_Invertocat_White.svg", label: "GitHub" },
      { file: "jira.svg", label: "Jira" },
      { file: "confluence.svg", label: "Confluence" },
      { file: "azure.svg", label: "Azure" },
      { file: "azuredevops.svg", label: "Azure DevOps" },
      { file: "openai.svg", label: "OpenAI" },
    ],
  },
  {
    title: "Mobile",
    items: [
      { file: "flutter.svg", label: "Flutter" },
      { file: "dart.svg", label: "Dart" },
      { file: "kotlin.svg", label: "Kotlin" },
      { file: "androidstudio.svg", label: "Android Studio" },
    ],
  },
  {
    title: "Ingénierie / CAO / PLM",
    items: [
      { file: "solidworks.svg", label: "SolidWorks" },
      { file: "ptccreo.svg", label: "PTC Creo" },
      { file: "ptcwindchill.svg", label: "PTC Windchill" },
    ],
  },
] as const satisfies ReadonlyArray<{
  title: string;
  items: ReadonlyArray<TechnologieItem>;
}>;

// Liste “flat” réutilisable (ex: IconCloud)
export const technologies: TechnologieItem[] = technologiesSections.flatMap(
  (s) => [...s.items],
);

// --- TEASER: sélection explicite ---
export const technologiesTeaserSelection = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "C#",
  ".NET",
  "SQL Server",
  "Azure",
  "Tailwind CSS",
  "Python",
  "GitHub",
  "SolidWorks",
] as const;

// Map avec clé string
const teaserOrder = new Map<string, number>(
  technologiesTeaserSelection.map((label, i) => [label, i]),
);

export const technologiesTeaser: TechnologieItem[] = technologies
  .filter((t) => teaserOrder.has(t.label))
  .sort(
    (a, b) =>
      (teaserOrder.get(a.label) ?? 999) - (teaserOrder.get(b.label) ?? 999),
  );
