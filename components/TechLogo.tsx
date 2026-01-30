"use client";

import Image from "next/image";

type TechLogoProps = {
  src: string;
  alt: string;
  size?: number;
  className?: string;
  priority?: boolean;
};

export function TechLogo({
  src,
  alt,
  size = 28,
  className = "",
  priority = false,
}: TechLogoProps) {
  const isSvg = src.toLowerCase().endsWith(".svg");

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
