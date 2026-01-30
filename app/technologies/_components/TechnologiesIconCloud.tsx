"use client";

import React from "react";
import { Cloud, type ICloud } from "react-icon-cloud";
import { technologies } from "@/constants/technologies";

/* eslint-disable @next/next/no-img-element */

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

export function TechnologiesIconCloud() {
  const icons = React.useMemo(() => {
    return technologies.map(({ file, label }) => (
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
