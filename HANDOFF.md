\# HANDOFF – justinallard.ca (refonte via template)



\## Contexte

\- Projet: refonte de justinallard.ca à partir du template DevPro Portfolio (Aceternity UI Pro) + Tailwind Plus.

\- Ce n’est PAS une migration 1:1 du vieux site. L’ancien site sert seulement de référence de contenu/idéation.

\- Environnement: Windows + PowerShell, VS Code, pnpm.

\- Chemin projet: C:\\Dev\\justinallard.ca



\## État actuel (OK)

\- pnpm install + pnpm dev fonctionnent.

\- package-lock.json supprimé (on garde pnpm-lock.yaml).

\- Git local initialisé + .gitignore (node\_modules, .next, .env\*, .vscode).

\- 1er commit fait (base template, local only). Aucun push / aucun remote.



\## Décisions

\- On respecte l’architecture du template tant qu’on n’a pas décidé de la changer.

\- On avance étape par étape (1 objectif / 1-3 commandes PowerShell).

\- Pas de refactor massif.



\## Points de vigilance repérés

\- Risque de Footer/Contact en double: layout vs Container (à valider).

\- Beaucoup de composants: on touche seulement ce qui est branché par app/layout.tsx et app/page.tsx.

\- Blog/MDX présent: à garder ou retirer plus tard (décision à prendre, pas maintenant).



\## Prochain objectif proposé (une seule étape)

Choisir ce qu’on garde sur la Home:

\- garder: Hero + sections portfolio

\- décider: LatestRepos / AllBlogs / Uses / Experience / Contact

Puis modifier une seule section à la fois en remplaçant le contenu par celui de Justin (branding + texte).



