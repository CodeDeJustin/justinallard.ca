import Image from "next/image";
import { BlurImage } from "./BlurImage";
import type { ImgHTMLAttributes } from "react";

const MDXComponents = {
  Image,
  BlurImage,

  img: (props: ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      {...props}
      loading={props.loading ?? "lazy"}
      decoding={props.decoding ?? "async"}
      className={["w-full h-auto rounded-lg", props.className]
        .filter(Boolean)
        .join(" ")}
    />
  ),
};

export default MDXComponents;
