"use client";

import dynamic from "next/dynamic";
import MDXComponents from "@/components/MDXComponents";

const MDXRemote = dynamic(
  () => import("next-mdx-remote").then((m) => m.MDXRemote),
  { ssr: false },
);

export function RenderMDX({ mdxSource }: { mdxSource: any }) {
  return <MDXRemote components={MDXComponents} {...mdxSource} />;
}
