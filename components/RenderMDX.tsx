"use client";

import dynamic from "next/dynamic";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import MDXComponents from "@/components/MDXComponents";

const MDXRemote = dynamic(
  () => import("next-mdx-remote").then((m) => m.MDXRemote),
  { ssr: false },
);

export function RenderMDX({
  mdxSource,
}: {
  mdxSource: MDXRemoteSerializeResult;
}) {
  return <MDXRemote components={MDXComponents} {...mdxSource} />;
}
