"use client";
import Link from "next/link";

import { formatDate } from "@/lib/formatDate";
import { Prose } from "@/components/Prose";
import { Container } from "@/components/Container";
import Image from "next/image";

function ArrowLeftIcon(props: any) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BlogLayout({
  children,
  meta,
  isRssFeed = false,
  previousPathname,
}: any) {
  if (isRssFeed) {
    return children;
  }

  return (
    <Container>
      <div className="xl:relative md:mt-20 p-8">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/blogues"
            aria-label="Go back to articles"
            className="group mb-8 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition  lg:absolute lg:-left-5 lg:mb-0 lg:-mt-2 xl:-top-1.5 xl:left-0 xl:mt-0"
          >
            <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 d" />
          </Link>
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-200  sm:text-5xl">
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
