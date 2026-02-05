"use client";
import Image from "next/image";

import { formatDate } from "@/lib/formatDate";
import { Prose } from "@/components/Prose";
import { Container } from "@/components/Container";

export function BlogLayout({ children, meta, isRssFeed = false }: any) {
  if (isRssFeed) {
    return children;
  }

  return (
    <Container>
      <div className="xl:relative md:mt-20 p-8">
        <div className="mx-auto max-w-2xl">
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-200 sm:text-5xl">
                {meta.title}
              </h1>

              {meta.image && (
                <div className="mt-6">
                  <Image
                    src={meta.image}
                    alt=""
                    width={1200}
                    height={630}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              )}

              <div className="order-first flex items-center gap-3 text-base text-zinc-400">
                <span className="h-4 w-0.5 rounded-full bg-zinc-200" />

                {meta.author ? (
                  <span>
                    Par <span className="text-zinc-200">{meta.author}</span>
                  </span>
                ) : null}

                <span aria-hidden="true">·</span>

                <time dateTime={meta.date}>{formatDate(meta.date)}</time>
              </div>
            </header>

            <Prose className="mt-8 max-w-none">{children}</Prose>
          </article>
        </div>
      </div>
    </Container>
  );
}
