"use client";

import clsx from "clsx";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type BlurImageProps = Omit<ImageProps, "src" | "alt"> & {
  src?: ImageProps["src"];
  alt?: string;
};

export const BlurImage = ({ src, alt, className, ...rest }: BlurImageProps) => {
  const [isLoading, setLoading] = useState(true);

  const blurDataURL =
    rest.placeholder === "blur" &&
    typeof src === "object" &&
    src !== null &&
    "blurDataURL" in src
      ? (src as { blurDataURL?: string }).blurDataURL
      : undefined;

  return (
    <Image
      className={clsx(
        "transition duration-500",
        isLoading ? "blur-sm scale-100" : "blur-0 scale-100",
        className,
      )}
      onLoad={() => setLoading(false)}
      src={src as ImageProps["src"]}
      alt={alt ?? "Avatar"}
      loading={rest.loading ?? "lazy"}
      decoding={rest.decoding ?? "async"}
      blurDataURL={blurDataURL}
      {...rest}
    />
  );
};
