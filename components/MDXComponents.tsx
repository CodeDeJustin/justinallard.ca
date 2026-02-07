import Image from "next/image";
import type { ImgHTMLAttributes } from "react";
import { BlurImage } from "./BlurImage";

type MDXImageProps = ImgHTMLAttributes<HTMLImageElement>;

const toDimension = (value: number | string | undefined, fallback: number) => {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed;
    }
  }

  return fallback;
};

const MDXComponents = {
  Image,
  BlurImage,

  img: ({
    src,
    alt,
    className,
    loading,
    decoding,
    width,
    height,
    style,
    ...props
  }: MDXImageProps) => {
    if (!src) {
      return null;
    }

    return (
      <Image
        src={src}
        alt={alt ?? ""}
        width={toDimension(width, 1200)}
        height={toDimension(height, 630)}
        sizes="100vw"
        loading={loading}
        decoding={decoding}
        className={["w-full h-auto rounded-lg", className].filter(Boolean).join(" ")}
        style={{ width: "100%", height: "auto", ...style }}
        {...props}
      />
    );
  },
};

export default MDXComponents;
