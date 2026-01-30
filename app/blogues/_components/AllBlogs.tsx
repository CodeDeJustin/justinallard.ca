"use client";

import { formatDate } from "@/lib/formatDate";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type BlogMeta = {
  slug: string;
  date: string;
  title: string;
  description: string;
  image?: string;
};

function Blog({
  article,
  hoveredIndex,
  setHoveredIndex,
  idx,
}: {
  article: BlogMeta;
  hoveredIndex: number | null;
  setHoveredIndex: (v: number | null) => void;
  idx: number;
}) {
  return (
    <Link
      href={`/blogues/${article.slug}`}
      onMouseEnter={() => setHoveredIndex(idx)}
      onMouseLeave={() => setHoveredIndex(null)}
      className="relative block rounded-2xl md:p-8 overflow-hidden"
    >
      <AnimatePresence>
        {hoveredIndex === idx && (
          <motion.span
            className="absolute inset-0 h-full w-full bg-zinc-800/[0.8] rounded-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.15 } }}
            exit={{
              opacity: 0,
              scale: 0.9,
              transition: { duration: 0.15, delay: 0.2 },
            }}
          />
        )}
      </AnimatePresence>

      {/* Desktop: grid texte + image alignée à droite */}
      <div className="relative z-50 flex flex-col gap-6 md:grid md:grid-cols-[1fr_18rem] md:gap-10 md:items-start">
        {/* Texte */}
        <div className="min-w-0">
          <small className="md:border-l md:border-zinc-700 md:pl-4 text-zinc-500 block">
            {formatDate(article.date)}
          </small>

          <h2 className="text-zinc-200 font-bold text-lg mt-4">
            {article.title}
          </h2>

          <p className="text-zinc-200 font-normal text-sm mt-4 leading-loose">
            {article.description}
          </p>
        </div>

        {/* Image (droite sur desktop) */}
        {article.image ? (
          <div className="w-full md:w-[18rem] md:justify-self-end">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/10">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(min-width: 768px) 288px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        ) : null}
      </div>
    </Link>
  );
}

export default function AllBlogs({ blogs }: { blogs: BlogMeta[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full">
      {/* IMPORTANT: plus de max-w-3xl ici (c’était le trou noir à droite) */}
      <div className="flex w-full flex-col space-y-16">
        {blogs.map((article, idx) => (
          <Blog
            key={article.slug}
            article={article}
            idx={idx}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        ))}
      </div>
    </div>
  );
}
