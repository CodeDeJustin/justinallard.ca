"use client";

import Image from "next/image";
import { materielContent } from "@/constants/materiel";
import {
  StickyScroll,
  type StickyScrollItem,
} from "@/components/ui/sticky-scroll-reveal";

function ImageBlock({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 384px"
        priority={priority}
      />
    </div>
  );
}

const content: StickyScrollItem[] = materielContent.map((item, idx) => ({
  title: item.title,
  description: item.description,
  content: (
    <ImageBlock src={item.image} alt={item.title} priority={idx === 0} />
  ),
}));

export function MaterielStickyScroll() {
  return (
    <div className="w-full py-6">
      <StickyScroll content={content} />
    </div>
  );
}
