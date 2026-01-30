# justinallard.ca

Site portfolio personnel de Justin Allard, construit avec Next.js (App Router), TypeScript et Tailwind CSS.
Objectif : une vitrine rapide, élégante et maintenable pour profil, projets, certifications et articles.

## Aperçu

- Pages : Accueil, Profil, Projets, Certifications, Contact, Matériel, Technologies, Blogues
- Blogues en MDX avec génération statique (SSG)
- UI basée sur Tailwind + composants (incluant Aceternity UI Pro, adapté au contenu du site)

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- MDX (@next/mdx, remark/rehype)
- pnpm

## Prérequis

- Node.js (version LTS recommandée)
- pnpm

## Démarrage rapide

Installer les dépendances :
pnpm install

Lancer en dev :
pnpm dev

Lint :
pnpm lint

Build de production :
pnpm build

Lancer le serveur (après build) :
pnpm start

## Structure du projet

- app/ : routes (App Router) et pages
- components/ : composants UI réutilisables
- content/blogs/ : contenus MDX des articles
- public/ : assets statiques (images, icônes, etc.)
- lib/ : utilitaires, helpers, logique de contenu

## Configuration

Variables d’environnement possibles :

- .env.local (local)
- .env (fallback)

Attention : ne pas committer les fichiers .env\*.

## Déploiement

Le projet est prêt pour un déploiement sur une plateforme type Vercel (recommandé) ou équivalent.

- Build : pnpm build
- Start : pnpm start

## Licence

Non spécifiée (privée par défaut). Ajoute un fichier LICENSE si tu veux ouvrir le code.
