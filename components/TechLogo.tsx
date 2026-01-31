"use client";

import Image from "next/image";

type TechLogoProps = {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  priority?: boolean;
  mode?: "image" | "mask";
};

export function TechLogo({
  src,
  alt,
  size = 28,
  className = "",
  priority = false,
  mode = "image",
}: TechLogoProps) {
  const isSvg = src.toLowerCase().endsWith(".svg");

  if (mode === "mask") {
    return (
      <span
        role="img"
        aria-label={alt}
        style={{
          width: size,
          height: size,
          backgroundColor: "var(--logo-color, #a1a1aa)", // fallback gris visible
          WebkitMaskImage: `url(${src})`,
          maskImage: `url(${src})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
        className={[
          "inline-block shrink-0",
          "transition-[opacity] duration-200 ease-out",
          className,
        ].join(" ")}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      unoptimized={isSvg}
      draggable={false}
      style={{ width: size, height: size }}
      className={[
        "block shrink-0 object-contain",
        "opacity-70 grayscale brightness-110",
        "transition-[filter,opacity] duration-200 ease-out",
        "hover:opacity-100 hover:grayscale-0 hover:brightness-100",
        "group-hover:opacity-100 group-hover:grayscale-0 group-hover:brightness-100",
        "group-focus-visible:opacity-100 group-focus-visible:grayscale-0 group-focus-visible:brightness-100",
        className,
      ].join(" ")}
    />
  );
}
