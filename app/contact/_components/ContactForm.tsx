"use client";

import { ContactLinks } from "./ContactLinks";
import { FeatureIconContainer, Grid, cn } from "./ContactFormDecor";
import { useActionState, useEffect, useMemo, useRef } from "react";
import { IconMailFilled } from "@tabler/icons-react";
import {
  sendContact,
  type ContactActionState,
} from "@/lib/actions/send-contact-email";

const initialState: ContactActionState = { status: "idle" };

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    sendContact,
    initialState,
  );

  // Pattern stable (évite le "flicker" de la grille quand state change)
  const gridPattern = useMemo(() => {
    const p: number[][] = [];
    for (let i = 0; i < 5; i++) {
      p.push([
        Math.floor(Math.random() * 4) + 7,
        Math.floor(Math.random() * 6) + 1,
      ]);
    }
    return p;
  }, []);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  return (
    <div className="w-full pb-20">
      <div className="grid grid-cols-1 gap-10 lg:gap-12 lg:grid-cols-[2fr_3fr]">
        {/* Gauche */}
        <div className="flex flex-col">
          <div className="flex items-center gap-4">
            <FeatureIconContainer className="flex items-center justify-center overflow-hidden">
              <IconMailFilled className="h-6 w-6 text-blue-500" />
            </FeatureIconContainer>

            <h1 className="max-w-3xl text-3xl font-bold text-zinc-50 md:text-5xl md:leading-tight">
              Contact
            </h1>
          </div>

          {/* Liens extraits */}
          <ContactLinks />
        </div>

        {/* Droite */}
        <div className="relative mx-auto flex w-full max-w-2xl flex-col items-start gap-4 overflow-hidden rounded-3xl bg-gradient-to-b from-gray-100 to-gray-200 p-4 sm:p-10 dark:from-neutral-900 dark:to-neutral-950">
          <Grid size={20} pattern={gridPattern} />

          <form
            ref={formRef}
            action={formAction}
            className="relative z-20 w-full"
          >
            {/* Honeypot anti-spam  */}
            <div className="hidden">
              <label htmlFor="company_hp">
                Company
                <input
                  id="company_hp"
                  name="company"
                  autoComplete="off"
                  tabIndex={-1}
                />
              </label>
            </div>

            {/* Optionnel: sujet caché pour tes emails (n'affecte pas le UI) */}
            <input
              type="hidden"
              name="subject"
              value="Contact - justinallard.ca"
            />

            <div className="relative z-20 mb-4 w-full">
              <label
                className="mb-2 inline-block text-sm font-medium text-neutral-600 dark:text-neutral-300"
                htmlFor="name"
              >
                Nom
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Ton nom"
                maxLength={120}
                className="shadow-input h-10 w-full rounded-md border border-transparent bg-white pl-4 text-sm text-neutral-700 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-neutral-800 focus:outline-none active:outline-none dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
              />
            </div>

            <div className="relative z-20 mb-4 w-full">
              <label
                className="mb-2 inline-block text-sm font-medium text-neutral-600 dark:text-neutral-300"
                htmlFor="email"
              >
                Courriel
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="tonadresse@courriel.com"
                required
                maxLength={254}
                className="shadow-input h-10 w-full rounded-md border border-transparent bg-white pl-4 text-sm text-neutral-700 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-neutral-800 focus:outline-none active:outline-none dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
              />
            </div>

            <div className="relative z-20 mb-4 w-full">
              <label
                className="mb-2 inline-block text-sm font-medium text-neutral-600 dark:text-neutral-300"
                htmlFor="company"
              >
                Sujet
              </label>
              <input
                id="company"
                name="companyName"
                type="text"
                placeholder="Ton sujet"
                maxLength={200}
                className="shadow-input h-10 w-full rounded-md border border-transparent bg-white pl-4 text-sm text-neutral-700 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-neutral-800 focus:outline-none active:outline-none dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
              />
            </div>

            <div className="relative z-20 mb-4 w-full">
              <label
                className="mb-2 inline-block text-sm font-medium text-neutral-600 dark:text-neutral-300"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Ton message..."
                required
                maxLength={5000}
                className="shadow-input w-full rounded-md border border-transparent bg-white pt-4 pl-4 text-sm text-neutral-700 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-neutral-800 focus:outline-none active:outline-none dark:border-neutral-800 dark:bg-neutral-800 dark:text-white"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className={cn(
                "relative z-10 flex items-center justify-center rounded-md border border-transparent bg-neutral-800 px-4 py-2 text-sm font-medium text-white shadow-[0px_1px_0px_0px_#FFFFFF20_inset] transition duration-200 hover:bg-neutral-900 md:text-sm",
                "disabled:cursor-not-allowed disabled:opacity-60",
              )}
            >
              {isPending ? "Envoi en cours..." : "Envoyer"}
            </button>

            {state.status !== "idle" && (
              <div
                className={cn(
                  "relative z-20 mt-4 w-full rounded-md border px-4 py-3 text-sm",
                  state.status === "success"
                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-200"
                    : "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-200",
                )}
              >
                {state.status === "success" ? "Message envoyé." : state.error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
