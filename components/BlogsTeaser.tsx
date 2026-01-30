import Link from "next/link";
import AllBlogs from "@/app/blogues/_components/AllBlogs";

type BlogMeta = {
  slug: string;
  date: string;
  title: string;
  description: string;
  image?: string;
};

export function BlogsTeaser({ blogs }: { blogs: BlogMeta[] }) {
  return (
    <section className="max-w-5xl mx-auto px-8 mt-40">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl text-white font-bold">
            Derniers articles
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Notes, apprentissages et petites trouvailles.
          </p>
        </div>

        <Link
          href="/blogues"
          className="text-sm text-brand-500 hover:text-brand-400 whitespace-nowrap"
        >
          Voir tout
        </Link>
      </div>

      <div className="mt-10">
        <AllBlogs blogs={blogs} />
      </div>
    </section>
  );
}
