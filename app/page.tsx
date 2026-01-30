import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { ProjectsTeaser } from "@/components/ProjectsTeaser";
import { BlogsTeaser } from "@/components/BlogsTeaser";
import { HomeTechSetup } from "@/components/HomeTechSetup";
import { getAllBlogs } from "@/lib/blogs";
import { Experience } from "@/components/Experience";
import Link from "next/link";

export default async function Page() {
  const blogs = (await getAllBlogs()).slice(0, 4).map((b: any) => {
    const { component, ...meta } = b;
    return meta;
  });

  return (
    <Container>
      <Hero />
      <HomeTechSetup />
      <Experience />
      <ProjectsTeaser />
      <BlogsTeaser blogs={blogs} />
    </Container>
  );
}
