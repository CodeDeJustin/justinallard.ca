"use client";

import Image from "next/image";
import {
  useId,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
  type SVGProps,
} from "react";

type Status = "idle" | "sending" | "success" | "error";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

type ContactLink = {
  label: string;
  href: string;
  subtitle?: string;
  icon: ReactNode;
};

function LogoIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={40}
      height={40}
      unoptimized
      className="h-10 w-10 object-contain"
    />
  );
}

const CONTACT_LINKS: ContactLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/justinallard-pmp",
    subtitle: "in/justinallard-pmp",
    icon: <LogoIcon src="/images/logos/linkedin.svg" alt="LinkedIn" />,
  },
  {
    label: "Credly",
    href: "https://www.credly.com/users/justin-allard",
    subtitle: "credly.com/users/justin-allard",
    icon: <LogoIcon src="/images/logos/credly.svg" alt="Credly" />,
  },
  {
    label: "GitHub",
    href: "https://github.com/CodeDeJustin",
    subtitle: "github.com/CodeDeJustin",
    icon: <LogoIcon src="/images/logos/github.svg" alt="GitHub" />,
  },
  {
    label: "Messenger",
    href: "https://m.me/justin.allard2",
    subtitle: "m.me/justin.allard2",
    icon: <LogoIcon src="/images/logos/messenger.svg" alt="Messenger" />,
  },
  {
    label: "Medium",
    href: "https://medium.com/@justinallard",
    subtitle: "medium.com/@justinallard",
    icon: <LogoIcon src="/images/logos/medium.svg" alt="Medium" />,
  },
  {
    label: "GrabCAD",
    href: "https://grabcad.com/justin.allard-3",
    subtitle: "grabcad.com/justin.allard-3",
    icon: <LogoIcon src="/images/logos/grabcad.svg" alt="GrabCAD" />,
  },
];

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState<string>("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    if (status !== "idle") {
      setStatus("idle");
      setServerMsg("");
    }
  }

  function validate(): boolean {
    const next: FieldErrors = {};

    const email = form.email.trim();
    const message = form.message.trim();

    if (!email) next.email = "Email requis.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Email invalide.";

    if (!message) next.message = "Message requis.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    if (!validate()) return;

    setStatus("sending");
    setServerMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim() || undefined,
          email: form.email.trim(),
          subject: form.subject.trim() || undefined,
          message: form.message.trim(),
        }),
      });

      const json = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !json?.ok) {
        setStatus("error");
        setServerMsg(json?.error || "Erreur lors de l’envoi.");
        return;
      }

      setStatus("success");
      setServerMsg("Reçu par l’API. (Envoi email = plus tard.)");
      setForm((prev) => ({ ...prev, subject: "", message: "" }));
    } catch {
      setStatus("error");
      setServerMsg("Erreur réseau. Réessaie.");
    }
  }

  return (
    <div className="w-full pb-20">
      <div className="grid grid-cols-1 gap-10 lg:gap-12 lg:grid-cols-[2fr_3fr]">
        {/* Gauche */}
        <div className="flex flex-col">
          <h1 className="font-bold text-3xl md:text-5xl md:leading-tight text-zinc-50 max-w-3xl">
            Contact
          </h1>

          <div className="mt-8 grid grid-cols-1 gap-4">
            {CONTACT_LINKS.map((item) => (
              <LinkCard key={item.label} item={item} />
            ))}
          </div>
        </div>

        {/* Droite */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-neutral-900 to-neutral-950 p-4 sm:p-8">
          {/* effet grid Aceternity-ish (sans dépendance) */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 opacity-35">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_55%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(99,102,241,0.14),transparent_55%)]" />
            </div>

            <GridOverlay size={22} />
          </div>

          <form onSubmit={onSubmit} className="relative z-10">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-zinc-50">Écris-moi</h2>
              <p className="mt-2 text-sm text-zinc-400">
                MVP: ça poste vers l’API, point.
              </p>
            </div>

            <Field label="Nom" htmlFor="name" error={errors.name}>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Ton Nom"
                className={inputClass(errors.name)}
              />
            </Field>

            <Field label="Email" htmlFor="email" error={errors.email}>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="toi@exemple.com"
                className={inputClass(errors.email)}
                required
              />
            </Field>

            <Field
              label="Sujet"
              htmlFor="subject"
              hint="Optionnel"
              error={errors.subject}
            >
              <input
                id="subject"
                type="text"
                value={form.subject}
                onChange={(e) => update("subject", e.target.value)}
                placeholder="Tu as envie de parler de quel sujet?"
                className={inputClass(errors.subject)}
              />
            </Field>

            <Field label="Message" htmlFor="message" error={errors.message}>
              <textarea
                id="message"
                rows={6}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Ce que tu veux me dire..."
                className={textareaClass(errors.message)}
                required
              />
            </Field>

            <button
              type="submit"
              disabled={status === "sending"}
              className={[
                "mt-2 inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition",
                "border border-transparent bg-white text-black hover:bg-white/90",
                "disabled:cursor-not-allowed disabled:opacity-60",
              ].join(" ")}
            >
              {status === "sending" ? "Envoi..." : "Envoyer"}
            </button>

            {status !== "idle" && (
              <div
                className={[
                  "mt-4 rounded-2xl border px-4 py-3 text-sm",
                  status === "success"
                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-200"
                    : status === "error"
                      ? "border-red-500/20 bg-red-500/10 text-red-200"
                      : "border-white/10 bg-white/5 text-zinc-200",
                ].join(" ")}
              >
                {serverMsg ||
                  (status === "success"
                    ? "Message envoyé."
                    : status === "error"
                      ? "Erreur lors de l’envoi."
                      : "")}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

function LinkCard({ item }: { item: ContactLink }) {
  return (
    <a
      href={item.href}
      target={item.href.startsWith("http") ? "_blank" : undefined}
      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
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

function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative z-10 mb-4">
      <div className="mb-2 flex items-center justify-between">
        <label htmlFor={htmlFor} className="text-sm font-medium text-zinc-200">
          {label}
        </label>
        {hint ? <span className="text-xs text-zinc-500">{hint}</span> : null}
      </div>

      {children}

      {error ? <p className="mt-2 text-xs text-red-200">{error}</p> : null}
    </div>
  );
}

function inputClass(error?: string) {
  return [
    "shadow-input h-10 w-full rounded-md border border-transparent px-4 text-sm outline-none",
    "bg-white/5 text-zinc-100 placeholder:text-zinc-500",
    "focus:ring-2 focus:ring-white/20 focus:outline-none active:outline-none",
    "dark:border-neutral-800 dark:bg-neutral-800 dark:text-white",
    error ? "ring-2 ring-red-500/20" : "",
  ].join(" ");
}

function textareaClass(error?: string) {
  return [
    "shadow-input w-full rounded-md border border-transparent px-4 py-3 text-sm outline-none",
    "bg-white/5 text-zinc-100 placeholder:text-zinc-500",
    "focus:ring-2 focus:ring-white/20 focus:outline-none active:outline-none",
    "dark:border-neutral-800 dark:bg-neutral-800 dark:text-white",
    error ? "ring-2 ring-red-500/20" : "",
  ].join(" ");
}

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

type Square = [number, number];

function GridOverlay({ size = 22 }: { size?: number }) {
  const patternId = useId();

  const squares = useMemo<Square[]>(() => {
    const rand = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    // Stable pour la session (useMemo), donc pas d’effet “ça bouge” au moindre re-render.
    return Array.from(
      { length: 6 },
      () => [rand(6, 12), rand(1, 10)] as Square,
    );
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 opacity-20 [mask-image:linear-gradient(white,transparent)]">
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full">
        <defs>
          <pattern
            id={patternId}
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
            x={-12}
            y={4}
          >
            <path
              d={`M.5 ${size}V.5H${size}`}
              fill="none"
              stroke="rgba(255,255,255,0.10)"
            />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill={`url(#${patternId})`} />

        {squares.map(([x, y], idx) => (
          <rect
            key={`${x}-${y}-${idx}`}
            x={x * size}
            y={y * size}
            width={size + 1}
            height={size + 1}
            fill="rgba(56,189,248,0.10)"
          />
        ))}
      </svg>
    </div>
  );
}
