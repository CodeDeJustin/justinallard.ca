import { getAllBlogs, getFileBySlug } from "@/lib/getAllBlogs";
import { RenderMDX } from "@/components/RenderMDX";
import { BlogLayout } from "@/components/BlogLayout";

export async function generateStaticParams() {
  const blogs = await getAllBlogs();
  return blogs.map((b: any) => ({ slug: b.slug }));
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { mdxSource, frontMatter } = await getFileBySlug("blogs", slug);

  return (
    <BlogLayout meta={frontMatter}>
      <RenderMDX mdxSource={mdxSource} />
    </BlogLayout>
  );
}
