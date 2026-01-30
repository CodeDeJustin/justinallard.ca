"use client";

import React from "react";
import { Cloud, type ICloud } from "react-icon-cloud";

/* eslint-disable @next/next/no-img-element */

const items = [
  // STACK WEB / FULL STACK (le coeur)
  { file: "typescript.svg", label: "TypeScript" },
  { file: "react.svg", label: "React" },
  { file: "nextjs.svg", label: "Next.js" },
  { file: "tailwindcss.svg", label: "Tailwind CSS" },
  { file: "nodejs.svg", label: "Node.js" },
  { file: "pnpm.svg", label: "pnpm" },

  // BACKEND / ENTREPRISE (.NET)
  { file: "csharp.svg", label: "C#" },
  { file: "dot-net.svg", label: ".NET" },
  { file: "visualstudio.svg", label: "Visual Studio" },

  // DATA
  { file: "sqlserver.svg", label: "SQL Server" },
  { file: "snowflake.svg", label: "Snowflake" },
  { file: "sqldeveloper.svg", label: "SQL Developer" },

  // MOBILE
  { file: "flutter.svg", label: "Flutter" },
  { file: "dart.svg", label: "Dart" },
  { file: "androidstudio.svg", label: "Android Studio" },

  // LANGAGES (secondaires / contextes)
  { file: "python.svg", label: "Python" },
  { file: "java.svg", label: "Java" },
  { file: "kotlin.svg", label: "Kotlin" },

  // DEV / COLLAB
  { file: "git.svg", label: "Git" },
  { file: "github.svg", label: "GitHub" },
  { file: "jira.svg", label: "Jira" },
  { file: "confluence.svg", label: "Confluence" },

  // CLOUD / CI-CD
  { file: "azure.svg", label: "Azure" },
  { file: "azuredevops.svg", label: "Azure DevOps" },

  // IA (outil)
  { file: "openai.svg", label: "OpenAI" },

  // INGÉNIERIE / CAO / PLM (différenciateur)
  { file: "solidworks.svg", label: "SolidWorks" },
  { file: "ptccreo.svg", label: "PTC Creo" },
  { file: "ptcwindchill.svg", label: "PTC Windchill" },
] as const;

const ICON_SIZE = 50;

const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 0,
    },
  },
  options: {
    clickToFront: 500,
    depth: 1,
    imageScale: 2,
    initial: [0.1, -0.1],
    outlineColour: "#0000",
    reverse: true,
    tooltip: "native",
    tooltipDelay: 0,
    wheelZoom: false,
  } as unknown as ICloud["options"],
};

export function OutilsIconCloud() {
  const icons = React.useMemo(() => {
    return items.map(({ file, label }) => (
      <a
        key={file}
        href="#"
        onClick={(e) => e.preventDefault()}
        title={label}
        aria-label={label}
        style={{ display: "inline-flex" }}
      >
        <img
          src={`/images/logos/${file}`}
          alt={label}
          width={ICON_SIZE}
          height={ICON_SIZE}
          style={{ width: ICON_SIZE, height: ICON_SIZE }}
          draggable={false}
          loading="eager"
        />
      </a>
    ));
  }, []);

  return (
    <div style={{ width: "100%", minHeight: 420 }}>
      <Cloud {...cloudProps}>{icons}</Cloud>
    </div>
  );
}
