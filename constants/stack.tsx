import React from "react";
import {
  TbBrandNextjs,
  TbBrandReact,
  TbBrandTailwind,
  TbBrandTypescript,
  TbBrandHtml5,
  TbBrandCss3,
  TbBrandJavascript,
  TbBrandPython,
  TbBrandDjango,
  TbBrandFlutter,
  TbBrandAndroid,
  TbBrandKotlin,
  TbBrandVue,
  TbBrandCSharp,
  TbBrandVscode,
  TbBrandVisualStudio,
  TbBrandFilezilla,
  TbBrandOpenai,
} from "react-icons/tb";

export type StackItem = {
  name: string;
  id: string;
  color: string; // couleur brand (hex)
  icon: React.ReactNode; // doit hériter de currentColor
};

export const stack: Record<string, StackItem> = {
  nextjs: {
    name: "Next.js",
    id: "nextjs",
    color: "#FFFFFF",
    icon: <TbBrandNextjs className="h-5 w-5 stroke-1" />,
  },
  react: {
    name: "React",
    id: "react",
    color: "#61DAFB",
    icon: <TbBrandReact className="h-5 w-5 stroke-1" />,
  },
  tailwindcss: {
    name: "Tailwind CSS",
    id: "tailwindcss",
    color: "#06B6D4",
    icon: <TbBrandTailwind className="h-5 w-5 stroke-1" />,
  },
  typescript: {
    name: "TypeScript",
    id: "typescript",
    color: "#3178C6",
    icon: <TbBrandTypescript className="h-5 w-5 stroke-1" />,
  },
  html: {
    name: "HTML",
    id: "html",
    color: "#E34F26",
    icon: <TbBrandHtml5 className="h-5 w-5 stroke-1" />,
  },
  css: {
    name: "CSS",
    id: "css",
    color: "#1572B6",
    icon: <TbBrandCss3 className="h-5 w-5 stroke-1" />,
  },
  javascript: {
    name: "JavaScript",
    id: "javascript",
    color: "#F7DF1E",
    icon: <TbBrandJavascript className="h-5 w-5 stroke-1" />,
  },
  python: {
    name: "Python",
    id: "python",
    color: "#3776AB",
    icon: <TbBrandPython className="h-5 w-5 stroke-1" />,
  },
  django: {
    name: "Django",
    id: "django",
    color: "#092E20",
    icon: <TbBrandDjango className="h-5 w-5 stroke-1" />,
  },
  flutter: {
    name: "Flutter",
    id: "flutter",
    color: "#02569B",
    icon: <TbBrandFlutter className="h-5 w-5 stroke-1" />,
  },
  android: {
    name: "Android",
    id: "android",
    color: "#3DDC84",
    icon: <TbBrandAndroid className="h-5 w-5 stroke-1" />,
  },
  kotlin: {
    name: "Kotlin",
    id: "kotlin",
    color: "#7F52FF",
    icon: <TbBrandKotlin className="h-5 w-5 stroke-1" />,
  },
  vue: {
    name: "Vue.js",
    id: "vue",
    color: "#42B883",
    icon: <TbBrandVue className="h-5 w-5 stroke-1" />,
  },
  csharp: {
    name: "C#",
    id: "csharp",
    color: "#512BD4",
    icon: <TbBrandCSharp className="h-5 w-5 stroke-1" />,
  },
  vscode: {
    name: "VS Code",
    id: "vscode",
    color: "#007ACC",
    icon: <TbBrandVscode className="h-5 w-5 stroke-1" />,
  },
  visualstudio: {
    name: "Visual Studio",
    id: "visualstudio",
    color: "#5C2D91",
    icon: <TbBrandVisualStudio className="h-5 w-5 stroke-1" />,
  },
  filezilla: {
    name: "FileZilla",
    id: "filezilla",
    color: "#BF0000",
    icon: <TbBrandFilezilla className="h-5 w-5 stroke-1" />,
  },
  chatgpt: {
    name: "ChatGPT",
    id: "chatgpt",
    color: "#10A37F",
    icon: <TbBrandOpenai className="h-5 w-5 stroke-1" />,
  },
};
