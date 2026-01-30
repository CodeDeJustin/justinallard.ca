import type { Metadata } from "next";
import { Container } from "@/components/Container";
import AllBlogs from "@/app/blogues/_components/AllBlogs";
import { getAllBlogs } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Blogue | Justin Allard",
};

export default async function BlogsPage() {
  const blogs = (await getAllBlogs()).map((b: any) => {
    const { component, ...meta } = b;
    return meta;
  });

  return (
    <Container>
      <div className="max-w-5xl mx-auto px-8 mt-10 md:mt-20 relative">
        <div>
          <h1 className="font-bold text-3xl md:text-5xl md:leading-tight text-zinc-50 max-w-3xl">
            Blogue&nbsp;:{" "}
            <span className="text-brand-500">notes de terrain</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mt-8 md:leading-loose tracking-wide">
            J’écris sur le leadership, Scrum, la culture d’équipe et la vie
            réelle en entreprise (celle qui ne rentre jamais dans les beaux
            diagrammes). Objectif&nbsp;: partager des idées concrètes, des
            exemples, et quelques prises de position assumées.
          </p>
        </div>

        <div className="mt-20">
          <AllBlogs blogs={blogs} />
        </div>
      </div>
    </Container>
  );
}
