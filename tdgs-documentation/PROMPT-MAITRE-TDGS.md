Tu travailles directement dans mon dépôt existant « TDGS — Tchad Design System ».

Ton objectif est d’améliorer progressivement ce projet pour atteindre le niveau de maturité d’un véritable système de design d’État, comparable au DSFR français sur les aspects suivants : composants, documentation, accessibilité, modèles de pages, gouvernance, tests, internationalisation, versionnement et qualité technique.

Le TDGS doit toutefois conserver une identité propre au Tchad. Il ne faut pas copier le code, l’identité, les composants protégés, les marques ou les polices propriétaires du DSFR.

## DOCUMENTS À LIRE OBLIGATOIREMENT

Avant toute modification, lis entièrement :

- `PROMPT-MAITRE-TDGS.md`
- `README.md`
- `AGENTS.md`, s’il existe
- `CLAUDE.md`, s’il existe
- tous les `package.json`
- `pnpm-workspace.yaml`
- `turbo.json`
- la configuration CI/CD
- tous les fichiers du dossier `tdgs-documentation/`

Les fichiers préparés dans `tdgs-documentation/` sont :

- `README.md`
- `GOVERNANCE.md`
- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`
- `SECURITY.md`
- `SUPPORT.md`
- `ACCESSIBILITY.md`
- `INTERNATIONALIZATION.md`
- `ARCHITECTURE.md`
- `COMPONENT-LIFECYCLE.md`
- `VERSIONING.md`
- `ROADMAP.md`
- `TDGS-AUDIT-INITIAL.md`

Ces documents constituent une base de travail. Tu dois les adapter à la réalité du dépôt, pas simplement les copier sans vérification.

## RÈGLES IMPORTANTES

1. Ne réécris pas entièrement le projet.
2. Ne supprime pas les fonctionnalités existantes.
3. Préserve les changements Git qui ne concernent pas cette mission.
4. Ne prétends jamais qu’une fonctionnalité existe sans l’avoir vérifiée.
5. Ne déclare jamais qu’un test est réussi sans l’avoir réellement exécuté.
6. Ne présente pas encore TDGS comme officiellement homologué par l’État tchadien.
7. Utilise plutôt cette formulation :

   « Système de design open source proposé pour les services numériques publics du Tchad. »

8. L’utilisation du terme « officiel », des armoiries et des symboles de l’État doit rester conditionnée à une validation institutionnelle.
9. Ne copie pas directement le DSFR. Inspire-toi de son niveau d’exigence et de son organisation.
10. Ne fais aucun commit ni push sans mon autorisation.
11. Ne publie aucun package npm sans mon autorisation.
12. Ne modifie pas les versions des packages sans justification.
13. Ne remplace pas une architecture fonctionnelle sans démontrer le bénéfice et proposer une migration.

## IDENTITÉ DU TDGS À PRÉSERVER

Le TDGS doit conserver les éléments suivants :

- nom : `TDGS — Tchad Design System` ;
- bleu institutionnel principal : `#0B3A82` ;
- jaune : `#F5C116` ;
- rouge : `#D8222A` ;
- identité inspirée du Tchad et de ses institutions ;
- grille d’espacement de 4 px ;
- Source Sans 3 pour le français ;
- Noto Naskh Arabic pour l’arabe ;
- JetBrains Mono pour le code et les références ;
- support du français LTR et de l’arabe RTL ;
- thèmes clair, sombre et contraste élevé ;
- accessibilité cible : WCAG 2.2 AA ;
- fonctionnement sur téléphones modestes et connexions lentes ;
- architecture principale indépendante des frameworks ;
- package principal actuel : `@tdgs/core`.

Les couleurs nationales doivent être utilisées avec sobriété. Le rouge institutionnel ne doit pas automatiquement être confondu avec le rouge utilisé pour signaler une erreur.

## MISSION 1 — AUDITER LE DÉPÔT

Commence par inspecter entièrement le dépôt.

Analyse notamment :

- arborescence du monorepo ;
- packages et applications ;
- scripts disponibles ;
- dépendances ;
- design tokens ;
- styles CSS ;
- composants existants ;
- exports npm ;
- TypeScript ;
- documentation ;
- tests ;
- CI/CD ;
- accessibilité ;
- thèmes ;
- RTL ;
- performance ;
- sécurité ;
- licences ;
- cohérence entre le README et le code réel.

Vérifie précisément l’état des composants annoncés :

- Button ;
- Input/Form ;
- Alert ;
- Badge ;
- Card ;
- Link ;
- Table.

Exécute uniquement les commandes non destructives disponibles, par exemple :

```bash
git status
pnpm install
pnpm build
pnpm typecheck
pnpm lint
pnpm test
pnpm --filter @tdgs/core validate:tokens
pnpm --filter @tdgs/core validate:exports
```
