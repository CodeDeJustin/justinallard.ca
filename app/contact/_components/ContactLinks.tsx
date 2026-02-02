"use client";

import Image from "next/image";
import type { ReactNode } from "react";

type ContactLink = {
  label: string;
  href: string;
  subtitle?: string;
  icon: ReactNode;
};

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

function LogoIcon({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={40}
      height={40}
      unoptimized
      className={cn("h-10 w-10 object-contain", className)}
    />
  );
}

const CONTACT_LINKS: ContactLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/justinallard-pmp",
    subtitle: "linkedin.com",
    icon: <LogoIcon src="/images/contacts/linkedin.svg" alt="LinkedIn" />,
  },
  {
    label: "Credly",
    href: "https://www.credly.com/users/justin-allard",
    subtitle: "credly.com",
    icon: <LogoIcon src="/images/contacts/credly.svg" alt="Credly" />,
  },
  {
    label: "GitHub",
    href: "https://github.com/CodeDeJustin",
    subtitle: "github.com",
    icon: (
      <LogoIcon
        src="/images/contacts/github.svg"
        alt="GitHub"
        className="dark:invert dark:brightness-150 dark:contrast-150"
      />
    ),
  },
  {
    label: "Messenger",
    href: "https://m.me/justin.allard2",
    subtitle: "Messenger",
    icon: <LogoIcon src="/images/contacts/messenger.svg" alt="Messenger" />,
  },
  {
    label: "Medium",
    href: "https://medium.com/@justinallard",
    subtitle: "medium.com",
    icon: (
      <LogoIcon
        src="/images/contacts/medium.svg"
        alt="Medium"
        className="dark:invert dark:brightness-150 dark:contrast-150"
      />
    ),
  },
  {
    label: "GrabCAD",
    href: "https://grabcad.com/justin.allard-3",
    subtitle: "grabcad.com",
    icon: (
      <LogoIcon
        src="/images/contacts/grabcad.svg"
        alt="GrabCAD"
        className="dark:invert dark:brightness-150 dark:contrast-150"
      />
    ),
  },
];

function IconArrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 17L17 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 7h8v8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkCard({ item }: { item: ContactLink }) {
  const isExternal = item.href.startsWith("http");
  return (
    <a
      href={item.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="group relative rounded-2xl bg-gradient-to-b from-white/15 to-white/5 p-px transition hover:from-sky-500/30 hover:to-indigo-500/10"
    >
      <div className="relative flex h-full items-start gap-3 rounded-2xl border border-white/5 bg-zinc-950/60 p-4 transition group-hover:border-white/10">
        <div className="flex h-10 w-10 items-center justify-center">
          {item.icon}
        </div>

        <div className="min-w-0">
          <div className="text-sm font-semibold text-zinc-100">
            {item.label}
          </div>
          {item.subtitle ? (
            <div className="mt-1 truncate text-xs text-zinc-400">
              {item.subtitle}
            </div>
          ) : null}
        </div>

        <div
          className="ml-auto text-zinc-500 transition group-hover:text-zinc-300"
          aria-hidden
        >
          <IconArrow />
        </div>
      </div>
    </a>
  );
}

export function ContactLinks() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4">
      {CONTACT_LINKS.map((item) => (
        <LinkCard key={item.label} item={item} />
      ))}
    </div>
  );
}
