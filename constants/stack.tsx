import React from "react";
import { TechLogo } from "@/components/TechLogo";

export type StackItem = {
  name: string;
  id: string;
  icon: React.ReactNode;
};

export const stack: Record<string, StackItem> = {
  nextjs: {
    name: "Next.js",
    id: "nextjs",
    icon: <TechLogo src="/images/logos/nextjs.svg" alt="Next.js" />,
  },
  react: {
    name: "React",
    id: "react",
    icon: <TechLogo src="/images/logos/react.svg" alt="React" />,
  },
  tailwindcss: {
    name: "Tailwind CSS",
    id: "tailwindcss",
    icon: <TechLogo src="/images/logos/tailwindcss.svg" alt="Tailwind CSS" />,
  },
  typescript: {
    name: "TypeScript",
    id: "typescript",
    icon: <TechLogo src="/images/logos/typescript.svg" alt="TypeScript" />,
  },
  html: {
    name: "HTML",
    id: "html",
    icon: <TechLogo src="/images/logos/html5.svg" alt="HTML" />,
  },
  css: {
    name: "CSS",
    id: "css",
    icon: <TechLogo src="/images/logos/css3.svg" alt="CSS" />,
  },
  javascript: {
    name: "JavaScript",
    id: "javascript",
    icon: <TechLogo src="/images/logos/javascript.svg" alt="JavaScript" />,
  },
  python: {
    name: "Python",
    id: "python",
    icon: <TechLogo src="/images/logos/python.svg" alt="Python" />,
  },
  django: {
    name: "Django",
    id: "django",
    icon: <TechLogo src="/images/logos/django-plain.svg" alt="Django" />,
  },
  flutter: {
    name: "Flutter",
    id: "flutter",
    icon: <TechLogo src="/images/logos/flutter.svg" alt="Flutter" />,
  },
  dart: {
    name: "Dart",
    id: "dart",
    icon: <TechLogo src="/images/logos/dart.svg" alt="Dart" />,
  },
  android: {
    name: "Android",
    id: "android",
    icon: <TechLogo src="/images/logos/androidstudio.svg" alt="Android" />,
  },
  kotlin: {
    name: "Kotlin",
    id: "kotlin",
    icon: <TechLogo src="/images/logos/kotlin.svg" alt="Kotlin" />,
  },
  vue: {
    name: "Vue.js",
    id: "vue",
    icon: <TechLogo src="/images/logos/vue.svg" alt="Vue.js" />,
  },
  csharp: {
    name: "C#",
    id: "csharp",
    icon: <TechLogo src="/images/logos/csharp.svg" alt="C#" />,
  },
  vscode: {
    name: "VS Code",
    id: "vscode",
    icon: <TechLogo src="/images/logos/vscode.svg" alt="VS Code" />,
  },
  visualstudio: {
    name: "Visual Studio",
    id: "visualstudio",
    icon: <TechLogo src="/images/logos/visualstudio.svg" alt="Visual Studio" />,
  },
  filezilla: {
    name: "FileZilla",
    id: "filezilla",
    icon: <TechLogo src="/images/logos/filezilla.svg" alt="FileZilla" />,
  },
  chatgpt: {
    name: "ChatGPT",
    id: "chatgpt",
    icon: <TechLogo src="/images/logos/openai.svg" alt="ChatGPT" />,
  },
};
