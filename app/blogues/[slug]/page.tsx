import type { Metadata, ResolvingMetadata } from "next";
import { cache } from "react";
import { getAllBlogs, getFileBySlug } from "@/lib/blogs";
import { RenderMDX } from "@/components/RenderMDX";
import { BlogLayout } from "../_components/BlogLayout";

export const dynamicParams = false;

const getBlogBySlug = cache(async (slug: string) =>
  getFileBySlug("blogs", slug),
);

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map(({ slug }: { slug: string }) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const { frontMatter } = await getBlogBySlug(slug);
  const parentMetadata = await parent;

  const title = frontMatter.title;
  const description = frontMatter.description;
  const shareImage =
    typeof frontMatter.image === "string"
      ? frontMatter.image
      : "/images/opengraph/JustinAllard_Opengraph_Blogues.jpg";
  const url = `/blogues/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      ...(parentMetadata.openGraph ?? {}),
      title,
      description,
      url,
      images: [
        {
          url: shareImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage],
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { mdxSource, frontMatter } = await getBlogBySlug(slug);

  return (
    <BlogLayout meta={frontMatter}>
      <RenderMDX mdxSource={mdxSource} />
    </BlogLayout>
  );
}
