import Image from "next/image";
import Link from "next/link";
import { BsTerminal } from "react-icons/bs";
import { projects, type Project } from "@/constants/projets";

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

function ProjectCard({ project }: { project: Project }) {
  const external = isExternal(project.link);

  const CardInner = (
    <>
      <div className="flex items-start gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-zinc-800">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="80px"
            quality={95}
            className="object-cover object-center"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-zinc-100 font-semibold tracking-wide truncate">
            {project.title}
          </h3>
          <p className="mt-2 text-zinc-400 text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
        {project.stack.slice(0, 4).map((s, i) => (
          <span
            key={`stack-${project.title}-${i}`}
            title={s.name}
            className="opacity-80"
          >
            {s.icon}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-4 flex items-center gap-2 text-zinc-500 group-hover:text-brand-500">
        <BsTerminal className="h-3 w-3 stroke-1.5" />
        <span className="text-xs">Consulter le projet</span>
      </div>
    </>
  );

  const className =
    "group rounded-3xl border border-white/10 bg-zinc-800 p-4 h-full " +
    "hover:border-white/20 transition " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 " +
    "focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 flex flex-col";

  if (external) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className={className}
      >
        {CardInner}
      </a>
    );
  }

  return (
    <Link href={project.link} className={className}>
      {CardInner}
    </Link>
  );
}

export function ProjectsTeaser({ count = 3 }: { count?: number }) {
  const items = projects.slice(0, count);

  return (
    <section className="max-w-5xl mx-auto px-8 mt-20 md:mt-40">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl text-white font-bold">
            Aperçu de mes projets
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mt-4 leading-loose tracking-wide">
            Une sélection courte, juste pour donner le ton. Le détail est sur la
            page Projets.
          </p>
        </div>

        <Link
          href="/projets"
          className="text-sm text-brand-500 hover:text-brand-400 whitespace-nowrap"
        >
          Voir tout
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {items.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </section>
  );
}
