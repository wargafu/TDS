# Référence comparative DSFR

Ce document décrit ce qui a été observé dans le clone local de référence
`reference/dsfr/`. Il sert à guider la maturité du TDGS ; il ne constitue pas une
autorisation de copier le code, les actifs, l'identité ou les marques du DSFR.

## Périmètre inspecté

Le clone a été récupéré depuis `https://github.com/GouvernementFR/dsfr.git` avec
`--depth 1`. La référence observée contient notamment :

- un socle CSS/JavaScript agnostique et des sorties distribuables ;
- une organisation par composants avec styles, scripts, exemples, stories,
  internationalisation et documentation dédiée ;
- un outillage centralisé pour le build, les tests, les exemples, Storybook, la
  documentation et les archives de release ;
- un catalogue plus large que le TDGS actuel, dont `callout`, `notice`, `tag`,
  `tile`, `download`, `select`, `radio`, `range`, `quote`, `password`, `share`
  et d'autres composants.

Le DSFR contient aussi des contraintes d'usage de l'identité et des actifs
françaises. Ces contraintes ne sont pas transposables telles quelles au TDGS.

## Écart et décisions TDGS

| Axe                  | Référence observée                                               | TDGS                                                                            | Décision                                                                                           |
| -------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Identité             | Marianne, marque et polices propres à l'administration française | Identité tchadienne proposée, couleurs TDGS et polices déclarées dans le projet | Conserver l'identité TDGS ; aucune ressource DSFR copiée                                           |
| Architecture         | HTML/CSS/JS et modules par composant                             | `@tdgs/core` indépendant des frameworks, `@tdgs/react`, `@tdgs/vue`             | Garder le socle actuel et ajouter les composants par lots testables                                |
| Tokens               | Variables et couches de styles organisées par composant          | Primitifs générés puis tokens de composant et variables CSS                     | Étendre les trois couches sans valeurs visuelles dispersées                                        |
| Catalogue            | Environ 40 familles repérées dans `src/dsfr/component`           | 35 familles UI après ce lot, plus `Icon`                                        | Prioriser les besoins des services publics tchadiens plutôt que viser une copie numérique          |
| Documentation        | Fiches riches : présentation, démo, design, code, accessibilité  | Fiches Starlight avec présentation, démo, code et accessibilité                 | Conserver une fiche par composant et ajouter les règles éditoriales au besoin                      |
| Démonstration        | Exemples et Storybook                                            | Playground basé sur le CSS réellement buildé                                    | Garder le playground léger et vérifier chaque route en build local et GitHub Pages                 |
| Accessibilité        | Documentation et scripts de vérification intégrés au cycle       | Cible WCAG 2.2 AA, rôles ARIA et tests de bindings                              | Tester le clavier, les annonces, le contraste et les thèmes ; ne pas confondre build et audit a11y |
| Internationalisation | Variantes et ressources localisées dans le projet de référence   | Français LTR et arabe RTL prévus par les tokens et les composants               | Ajouter les textes de composants via props/slots, sans texte français imposé dans le core          |
| Release              | Pipeline de publication et d'archive complet                     | Build, typecheck, lint, tests et CI présents ; publication encore contrôlée     | Stabiliser les API avant de modifier les versions ou publier npm                                   |
| Gouvernance          | Projet maintenu par une équipe institutionnelle identifiée       | Système open source proposé pour les services numériques publics du Tchad       | Maintenir une gouvernance transparente ; aucune homologation officielle revendiquée                |

## Lot implémenté à partir de l'écart

Les sept composants suivants sont maintenant disponibles dans les trois
couches du TDGS :

- `Callout` : contenu éditorial mis en avant ;
- `Notice` : bandeau d'information prioritaire avec annonce et fermeture
  optionnelle ;
- `Tag` : classification ou filtre avec suppression accessible optionnelle ;
- `Tile` : entrée de navigation vers un service ou une rubrique ;
- `Download`, `Quote` et `Summary` : téléchargement explicite, citation
  contextualisée et navigation dans une page.

Chaque composant possède ses tokens TypeScript/JSON, sa feuille CSS préfixée
`tds-`, un export `@tdgs/core`, un binding React, un binding Vue, une fiche de
documentation, un exemple dans le playground et un test de comportement pour
les bindings.

## Prochaines étapes recommandées

1. Ajouter les composants de données et de contenu encore absents (`Combobox`,
   `Transcription`, `Consentement`, `Sidemenu` imbriqué, `Share` enrichi de copie
   de lien) ainsi qu'une documentation dédiée de `Select` et `Radio`.
2. Formaliser une matrice de tests d'accessibilité navigateur pour les patterns
   interactifs et les thèmes clair, sombre, contraste élevé et RTL.
3. Ajouter une génération contrôlée de métadonnées de composants et de pages,
   afin que le catalogue, la sidebar et le playground ne puissent plus diverger.
4. Définir le processus de release public, les changements semver et les
   critères de stabilité avant toute publication npm.
