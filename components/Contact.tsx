"use client";

import {
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  sendContact,
  type ContactActionState,
} from "@/lib/actions/send-contact-email";

type FieldErrors = { email?: string; message?: string };

const initialState: ContactActionState = { status: "idle" };

export const Contact = () => {
  const [open, setOpen] = useState(false);
  const [panelKey, setPanelKey] = useState(0);

  const dropIn: Variants = {
    hidden: { y: "4vh", opacity: 0 },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.2,
        type: "spring",
        damping: 25,
        stiffness: 400,
      },
    },
    exit: { y: "4vh", opacity: 0 },
  };

  function handleButtonClick() {
    setOpen((v) => {
      const next = !v;
      // Remonte le panel pour remettre l'état (success/error) à zéro à chaque ouverture.
      if (next) setPanelKey((k) => k + 1);
      return next;
    });
  }

  return (
    <AnimatePresence initial={false} onExitComplete={() => null}>
      <div className="fixed bottom-10 right-4 z-[99999] flex flex-col items-end md:right-10">
        {open && <ContactPanel key={panelKey} dropIn={dropIn} />}

        <button
          onClick={handleButtonClick}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-700 shadow-lg transition duration-200 hover:scale-105 hover:shadow-xl"
          aria-label={
            open
              ? "Fermer le formulaire de contact"
              : "Ouvrir le formulaire de contact"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6 text-zinc-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
        </button>
      </div>
    </AnimatePresence>
  );
};

function ContactPanel({ dropIn }: { dropIn: Variants }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    sendContact,
    initialState,
  );
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();

    // Même niveau de validation que côté server (simple, suffisant)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const next: FieldErrors = {};
    if (!email) next.email = "Oups! L’email est requis.";
    else if (!emailRegex.test(email))
      next.email = "Entre une adresse email valide.";

    if (!message) next.message = "Oups! Le message est requis.";

    if (Object.keys(next).length > 0) {
      e.preventDefault();
      setErrors(next);
      return;
    }

    setErrors({});
  }

  return (
    <motion.div
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="mx-4 mb-4 w-80 max-w-[calc(100vw-2rem)] flex flex-col overflow-hidden rounded-xl bg-zinc-800 shadow-2xl md:mx-0"
    >
      <div className="bg-zinc-700 px-4 py-3">
        <h2 className="text-sm font-bold text-zinc-200 md:text-xl">
          Une question? Laisse-moi un message 👇
        </h2>
        <small className="mt-1 hidden text-xs text-zinc-400 md:block">
          Ça prend moins de 10 secondes. Vas-y, je lis vraiment. 😉
        </small>
      </div>

      <div className="flex flex-col bg-zinc-800 p-6">
        <form ref={formRef} action={formAction} onSubmit={onSubmit}>
          {/* Honeypot anti-spam (même mécanique que /contact) */}
          <div className="hidden">
            <label>
              Company
              <input name="company" autoComplete="off" tabIndex={-1} />
            </label>
          </div>

          {/* Champs optionnels pour la Server Action */}
          <input type="hidden" name="name" value="" readOnly />
          <input
            type="hidden"
            name="subject"
            value="Message via la bulle de contact"
            readOnly
          />

          <label className="mb-2 text-sm font-normal text-zinc-400">
            Adresse email
          </label>
          <input
            type="email"
            name="email"
            onChange={() => setErrors((p) => ({ ...p, email: undefined }))}
            className="mb-1 w-full rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1 text-zinc-400 placeholder:text-sm focus:border-gray-400 focus:outline-none"
            placeholder="toi@exemple.com"
            required
            maxLength={254}
          />
          <small className="h-4 min-h-4 font-semibold text-red-500">
            {errors.email || ""}
          </small>

          <label className="mb-2 text-sm font-normal text-zinc-400">
            Message
          </label>
          <textarea
            rows={3}
            name="message"
            onChange={() => setErrors((p) => ({ ...p, message: undefined }))}
            className="mb-1 w-full rounded-md border border-zinc-700 bg-zinc-800 px-2 py-1 text-zinc-400 placeholder:text-sm focus:border-gray-400 focus:outline-none"
            placeholder="Je voulais te jaser de…"
            required
            maxLength={5000}
          />
          <small className="mb-4 h-4 min-h-4 font-semibold text-red-500">
            {errors.message || ""}
          </small>

          <button
            type="submit"
            disabled={isPending}
            className="mb-4 w-full rounded-md border-2 border-zinc-800 bg-zinc-700 px-4 py-2 text-sm font-normal text-zinc-100 transition duration-200 hover:shadow-none disabled:opacity-60"
          >
            {isPending ? "Envoi..." : "Envoyer"}
          </button>

          <small className="mb-0 min-h-6">
            {state.status === "success" ? (
              <p className="text-sm font-semibold text-green-500">Envoyé!</p>
            ) : null}

            {state.status === "error" ? (
              <p className="text-sm font-semibold text-red-500">
                {state.error || "Quelque chose a planté."}
              </p>
            ) : null}
          </small>
        </form>
      </div>
    </motion.div>
  );
}
