"use client";

import React, { useEffect, useMemo, useState } from "react";

type ConsentState = {
  necessary: true;
  analytics: boolean;
  updatedAt: string;
};

const STORAGE_KEY = "ja.cookieConsent.v1";
const COOKIE_NAME = "ja_cookie_consent";

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : null;
}

function setCookie(name: string, value: string) {
  if (typeof document === "undefined") return;

  const isHttps =
    typeof window !== "undefined" && window.location.protocol === "https:";
  const maxAge = 60 * 60 * 24 * 365; // 1 an

  document.cookie =
    `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax` +
    (isHttps ? "; Secure" : "");
}

function readStoredConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (typeof parsed?.analytics !== "boolean") return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeStoredConsent(consent: ConsentState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  // Cookie simplifié pour lecture facile côté serveur si besoin plus tard
  setCookie(COOKIE_NAME, consent.analytics ? "all" : "essential");
}

export function CookieConsent() {
  const [isReady, setIsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const [analytics, setAnalytics] = useState(false);

  const nowIso = useMemo(() => new Date().toISOString(), []);

  useEffect(() => {
    // Client-only: éviter les surprises SSR
    setIsReady(true);

    const cookieMode = getCookie(COOKIE_NAME);
    const stored = readStoredConsent();

    // Si déjà consenti (cookie ou localStorage), on cache
    if (cookieMode || stored) {
      setShowBanner(false);
      if (stored) setAnalytics(stored.analytics);
      return;
    }

    setShowBanner(true);
  }, []);

  const acceptAll = () => {
    const consent: ConsentState = {
      necessary: true,
      analytics: true,
      updatedAt: nowIso,
    };
    writeStoredConsent(consent);
    setAnalytics(true);
    setShowBanner(false);
    setIsOpen(false);
  };

  const refuseOptional = () => {
    const consent: ConsentState = {
      necessary: true,
      analytics: false,
      updatedAt: nowIso,
    };
    writeStoredConsent(consent);
    setAnalytics(false);
    setShowBanner(false);
    setIsOpen(false);
  };

  const saveCustom = () => {
    const consent: ConsentState = {
      necessary: true,
      analytics,
      updatedAt: nowIso,
    };
    writeStoredConsent(consent);
    setShowBanner(false);
    setIsOpen(false);
  };

  if (!isReady || !showBanner) return null;

  return (
    <>
      {/* Bannière */}
      <div className="fixed inset-x-0 bottom-0 z-[999] p-4">
        <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-zinc-900/90 backdrop-blur px-4 py-4 shadow-input">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="md:pr-6">
              <p className="text-sm text-zinc-200 font-semibold">
                Cookies & vie privée
              </p>
              <p className="mt-1 text-sm text-zinc-400 leading-relaxed">
                J’utilise des cookies essentiels pour faire tourner le site. Les
                cookies de mesure d’audience sont optionnels et servent juste à
                comprendre ce qui est utile.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="rounded-xl border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-zinc-200 hover:border-white/20 hover:bg-zinc-800/60 transition"
              >
                Personnaliser
              </button>

              <button
                type="button"
                onClick={refuseOptional}
                className="rounded-xl border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-zinc-200 hover:border-white/20 hover:bg-zinc-800/60 transition"
              >
                Refuser
              </button>

              <button
                type="button"
                onClick={acceptAll}
                className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-400 transition"
              >
                Accepter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal préférences */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Préférences de cookies"
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60"
            aria-label="Fermer"
          />

          <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-zinc-900 p-5 shadow-input">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-base font-semibold text-zinc-100">
                  Préférences de cookies
                </p>
                <p className="mt-1 text-sm text-zinc-400 leading-relaxed">
                  Les essentiels sont toujours actifs. Tu peux
                  activer/désactiver la mesure d’audience.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 hover:border-white/20 hover:bg-zinc-800/60 transition"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-900/60 p-4">
                <div className="pr-4">
                  <p className="text-sm font-semibold text-zinc-200">
                    Essentiels
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Nécessaires au fonctionnement du site (navigation, sécurité,
                    etc.).
                  </p>
                </div>
                <span className="text-xs font-semibold text-zinc-300 bg-zinc-800/60 border border-white/10 rounded-full px-3 py-1">
                  Toujours actif
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-900/60 p-4">
                <div className="pr-4">
                  <p className="text-sm font-semibold text-zinc-200">
                    Mesure d’audience
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Aide à comprendre ce qui marche (sans drama).
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setAnalytics((v) => !v)}
                  className={[
                    "relative h-7 w-12 rounded-full border transition",
                    analytics
                      ? "bg-brand-500 border-brand-500"
                      : "bg-zinc-800 border-white/10",
                  ].join(" ")}
                  aria-pressed={analytics}
                >
                  <span
                    className={[
                      "absolute top-0.5 h-6 w-6 rounded-full bg-white transition",
                      analytics ? "left-5" : "left-0.5",
                    ].join(" ")}
                  />
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-2 sm:justify-end">
              <button
                type="button"
                onClick={refuseOptional}
                className="rounded-xl border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-zinc-200 hover:border-white/20 hover:bg-zinc-800/60 transition"
              >
                Tout refuser (sauf essentiels)
              </button>

              <button
                type="button"
                onClick={saveCustom}
                className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-400 transition"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
