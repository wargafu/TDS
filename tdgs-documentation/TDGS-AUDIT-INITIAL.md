# Audit initial du TDGS

> Audit fondé sur l’état réellement observable du dépôt. Ce document ne vaut ni homologation institutionnelle, ni déclaration de conformité.

## Métadonnées

- Date de l’audit : 2026-08-31
- Commit audité : `6755661cdd92775aa320646b4b5a7015a68c9de`
- Branche : `main`, suivie de `origin/main`
- Environnement : Windows PowerShell, Node `v24.16.0`, npm `8.19.2`, pnpm `8.11.0`, Git `2.35.3.windows.1`
- Périmètre : état de travail du dépôt, y compris les fichiers non suivis présents avant cet audit
- Intégrité du travail existant : les modifications Git préexistantes n’ont pas été réécrites ; aucun commit, push ou publication n’a été effectué

## 1. Résumé exécutif

Le dépôt contient une base fonctionnelle de système de design CSS/TypeScript, accompagnée d’un site documentaire Astro/Starlight. Le package cœur se construit, ses tokens et ses exports passent leurs validateurs, les tests existants passent et la documentation statique se génère en 68 pages. Le niveau actuel est toutefois celui d’une base de travail avancée, pas encore celui d’un système de design d’État industrialisé.

Le principal point bloquant est une divergence d’identité non résolue entre le prompt maître et le code : le prompt demande **TDGS**, `@tdgs/core` et les couleurs `#0B3A82`, `#F5C116`, `#D8222A`, alors que le dépôt implémente **TDS**, `@tds-tchad/core` et les valeurs de tokens `#0033A0`, `#FFD100`, `#DA291C`. Cette décision doit être prise avant une migration publique ou une modification d’API ; elle ne doit pas être corrigée silencieusement.

Les autres risques prioritaires sont :

- le job de publication CI est actuellement inatteignable, car le workflow ne déclenche pas les pushes de tags qui conditionnent ce job (`.github/workflows/ci.yml`) ;
- `pnpm lint` ne lance aucune tâche ; la commande réussit donc sans effectuer de lint ;
- `pnpm format:check` échoue sur 114 fichiers, dont des fichiers générés et des ressources de skill qui ne devraient probablement pas relever du formatage du projet ;
- l’accessibilité automatisée vérifiée couvre uniquement `/playground/` avec axe ; aucune preuve comparable n’a été trouvée pour le clavier, les lecteurs d’écran, le zoom, `forced-colors`, le contraste élevé, l’arabe ou le RTL ;
- l’arabe est amorcé dans les tokens et le CSS, mais la documentation reste en français et plusieurs propriétés physiques ne sont pas traitées pour le RTL ;
- les adaptateurs React/Vue et leur couverture de tests sont encore minimaux ; plusieurs attributs natifs, états et comportements documentés ne sont pas alignés avec l’API réellement exposée ;
- le dépôt revendique MIT dans sa documentation, mais aucun fichier `LICENSE` n’a été trouvé à la racine ; les licences et la provenance des assets ne sont donc pas suffisamment matérialisées.

Conclusion : maturité globale indicative **2/5**. Le socle est exploitable pour poursuivre la consolidation, sous réserve de trancher l’identité et de traiter les bloqueurs P0 avant toute promesse de publication ou d’adoption institutionnelle.

## 2. Inventaire vérifié

| Domaine | Présence observée | État vérifié | Preuve principale | Écart ou risque |
| --- | --- | --- | --- | --- |
| Monorepo | Oui | 5 répertoires sous `packages/`, 2 applications sous `apps/`, workspace pnpm/Turbo | `pnpm-workspace.yaml`, `turbo.json` | `templates/` ne contient pas de modèles réels ; `packages/tokens` et `packages/docs` sont des placeholders |
| Package cœur | Oui | CSS, tokens JSON/TS/CSS, exports et générateur opérationnels | `packages/core/package.json`, `packages/core/scripts/build.mjs` | Nom réel `@tds-tchad/core`, alors que le prompt demande `@tdgs/core` |
| Adaptateurs React/Vue | Oui dans l’état de travail | Packages présents mais non suivis par Git dans l’état audité ; tests de fumée seulement | `packages/react/`, `packages/vue/` | Leur intégration CI et leur niveau de stabilité ne sont pas démontrés |
| Tokens CSS/JSON/TS | Oui | 93 contrôles de tokens passés ; générateur fonctionnel | `packages/core/tokens-src/`, `generate-tokens.mjs`, `validate-tokens.mjs` | Les tokens de composants sont maintenus séparément et ne sont pas validés par la même chaîne |
| Composants cœur | Oui | 17 familles CSS/token identifiées | `packages/core/src/components/` | Le cœur est CSS-first : il n’expose pas de runtime JS de composants |
| Documentation | Oui | Site Astro/Starlight construit en 68 pages | `apps/docs/`, `pnpm --filter tds-docs build` | Une seule langue (`fr`) ; des liens, noms de variables et formulations divergent du code |
| Tests | Partiels | 256 tests core, 5 React, 4 Vue passés | `packages/*/test/`, sorties Vitest | Peu de tests comportementaux, a11y, RTL, visuels, navigateur et performance |
| CI/CD | Oui | Workflows CI et déploiement présents | `.github/workflows/ci.yml`, `deploy-docs.yml` | CI incomplète, mélange npm/pnpm, publication par tag inatteignable |
| RTL | Partiel | Direction arabe et propriétés logiques présentes dans le socle | `packages/core/src/base.css` | Tests absents ; `input`, `switch`, `tooltip`, `skip-link` et les flèches de liens conservent des propriétés ou glyphes physiques |
| Thèmes | Partiel | Clair/sombre via tokens et `data-tds-theme` | `packages/core/src/tokens/color.css` | Pas de traitement observé pour `forced-colors`, `prefers-contrast` ou un thème contraste élevé dédié |
| Sécurité | Documentation seulement | `tdgs-documentation/SECURITY.md` existe | `tdgs-documentation/SECURITY.md` | Pas de workflow d’audit de dépendances, CodeQL, secret scanning ou vérification de licence repéré ; pas de `SECURITY.md` racine |
| Licences | Insuffisante | README et documentation mentionnent MIT | `README.md`, `apps/docs/src/content/docs/about/mentions-legales.mdx` | Aucun `LICENSE` racine trouvé ; provenance des logos, polices et assets non documentée |
| Gouvernance | Base documentaire | Gouvernance, contribution, sécurité, support et cycle de vie rédigés | `tdgs-documentation/` | Pas de `CODEOWNERS`, ADR, changelog ni mécanisme de release vérifié |

### Inventaire des packages et applications

| Chemin | Manifest | Rôle constaté | Niveau de complétude |
| --- | --- | --- | --- |
| `packages/core` | `@tds-tchad/core@0.1.0` | Tokens, CSS et exports du cœur | Fonctionnel, mais métadonnées npm incomplètes |
| `packages/react` | `@tds-tchad/react@0.1.0` | Adaptateur React | Présent dans l’état de travail ; API et tests à renforcer |
| `packages/vue` | `@tds-tchad/vue@0.1.0` | Adaptateur Vue | Présent dans l’état de travail ; API et tests à renforcer |
| `packages/tokens` | `@tds-tchad/tokens@0.1.0` | Emplacement prévu pour les tokens | Placeholder, scripts `echo`, pas de `src/` |
| `packages/docs` | `@tds-tchad/docs@0.1.0` | Emplacement prévu pour des utilitaires docs | Placeholder, scripts `echo` |
| `apps/docs` | `tds-docs@0.1.0` | Documentation Astro/Starlight | Fonctionnelle ; build statique réussi avec un avertissement |
| `apps/site` | `tds-site@0.1.0` | Site HTML de démonstration | Scripts de build/typecheck placeholders |
| `templates` | aucun package réel | Emplacement de futurs modèles | README seulement, aucun modèle livré |

Le root `package.json` est nommé `tds@0.0.0`, utilise pnpm `8.11.0` et ne décrit pas les packages React, Vue, tokens et docs dans le README principal. Les manifests des packages non privés sont publiables en théorie, même lorsque leur implémentation est un placeholder ; cela constitue un risque de publication accidentelle.

## 3. Composants

La présence dans le tableau signifie qu’un CSS, token ou adaptateur a été trouvé. Elle ne signifie pas que la conformité, la stabilité de l’API ou tous les états ont été démontrés.

| Composant | Code | Documentation | Tests | Clavier / sémantique | RTL / thèmes | Statut recommandé |
| --- | --- | --- | --- | --- | --- | --- |
| Button | CSS, tokens, React, Vue | Oui | Partiels : classes et rendu, pas de matrice d’états | Élément natif `button` ; états visuels présents | RTL peu concerné ; variantes principales référencent des couleurs de palette | Bêta, à renforcer |
| Input/Form | CSS, tokens, TextField/Textarea/Select et contrôles React/Vue | Oui | Partiels ; pas de couverture de champs complète | Labels, erreurs et `aria-describedby` amorcés ; disabled/required non uniformes | RTL incomplet ; `input-icon-disabled` non déclaré ; FileUpload CSS sans API runtime identifiée | Expérimental/bêta |
| Alert | CSS, tokens, React, Vue | Oui | Pas de test dédié identifié | `role="alert"` pour danger, `role="status"` sinon ; fermeture à tester au clavier | Aliases sémantiques clair/sombre présents ; contraste élevé non vérifié | Bêta |
| Badge | CSS, tokens, React, Vue | Oui | Test de fumée limité au point (`dot`) | Non interactif ; rôle/statut à encadrer par l’usage | Couleurs sémantiques, mais dimensions/paddings pas entièrement tokenisés | Bêta |
| Card | CSS, tokens, React, Vue | Oui | Pas de test dédié identifié | Lien interactif disponible ; le niveau de titre React est fixé à `h3` | Principalement logique ; aucun test RTL/contraste | Bêta |
| Link | CSS, tokens, React, Vue | Oui | Pas de test dédié identifié | Ancre native ; ouverture externe automatique sans annonce incluse | Flèches `→` et positionnements non adaptés explicitement au RTL | Bêta |
| Table | CSS, tokens, React, Vue | Oui | Pas de test dédié identifié | Table native ; caption/scope requis par la documentation mais non imposés par l’API | Wrapper horizontal ; tests RTL, zoom et données complexes absents | Bêta |

Constats transverses vérifiés :

- Button CSS accepte `data-loading="true"`, mais les props Button React/Vue observées n’exposent pas de prop `loading` correspondante ; la documentation d’intégration montre une logique de chargement qui n’est pas une capacité clairement portée par le package.
- Les champs React transmettent des attributs natifs, mais la classe CSS de disabled n’est pas automatiquement alignée avec `disabled`. Les champs Vue transmettent moins systématiquement les attributs natifs et les listeners nécessaires.
- Les adaptateurs Vue ignorent plusieurs attributs de type `class`, `disabled` et `aria-*` lorsqu’ils ne sont pas explicitement déclarés ; c’est un risque d’accessibilité et de composition.
- Les cibles de contact ne sont pas uniformes : le bouton atteint 44 px, tandis que pagination, fermeture d’alerte/modal, checkbox/radio et switch présentent des zones visuelles inférieures à cette valeur et nécessitent une vérification de la zone cliquable réelle.
- Le CSS Card permet un bouton dans certains cas, alors que l’API Card React/Vue observée expose surtout `div` et `a`. Le contrat CSS et le contrat des adaptateurs ne sont pas parfaitement alignés.

## 4. Commandes et résultats

Commandes non destructives réellement exécutées dans l’état audité :

```text
git status --short --branch                         OK — arbre déjà modifié, changements conservés
pnpm install --frozen-lockfile                      OK — lockfile à jour ; prepare de core exécuté
pnpm build                                          OK — Turbo : 7 tâches réussies, cache utilisé
pnpm typecheck                                      OK — Turbo : 6 tâches réussies, cache utilisé
pnpm lint                                           OK au niveau processus, mais aucune tâche exécutée
pnpm lint:css                                       OK — Stylelint core
pnpm test                                           OK — Turbo : tests existants réussis, cache utilisé
pnpm --filter @tds-tchad/core validate:tokens      OK — 93 contrôles passés, 0 échec
pnpm --filter @tds-tchad/core validate:exports     OK — 65 exports valides, 0 cassé
pnpm test:a11y                                      OK — /playground/ : 0 violation, 45 règles
pnpm --filter @tds-tchad/core test                  OK — 256/256 tests
pnpm --filter @tds-tchad/react test                 OK — 5/5 tests
pnpm --filter @tds-tchad/vue test                   OK — 4/4 tests
pnpm --filter @tds-tchad/core lint:css              OK — exécution directe
pnpm --filter @tds-tchad/core typecheck             OK — exécution directe
pnpm --filter @tds-tchad/react typecheck            OK — exécution directe
pnpm --filter @tds-tchad/vue typecheck              OK — exécution directe
pnpm --filter tds-docs typecheck                    OK — 9 fichiers, 0 erreur/avertissement/hint
pnpm --filter @tds-tchad/core build                 OK — génération et compilation directes
pnpm --filter tds-docs build                        OK — 68 pages statiques
pnpm format:check                                   ÉCHEC — problèmes de style sur 114 fichiers
git diff --check                                    OK — avertissement CRLF dans input.css uniquement
```

Le build documentaire signale aussi un conflit de priorité entre les routes `/404` et `/[...slug]`, ainsi qu’un avertissement Node `DEP0190`. Ces avertissements ne font pas échouer le build mais doivent être résolus avant de considérer la chaîne comme propre.

Le résultat de `pnpm lint` ne constitue pas une validation de lint : le root script existe, mais aucune tâche package `lint` n’est configurée dans le graphe exécuté. Les résultats Turbo mis en cache sont complétés ci-dessus par les exécutions directes du core, de React, de Vue et de la documentation lorsque cela était nécessaire.

## 5. Accessibilité

### Points positifs observés

- `base.css` fournit une règle globale `:focus-visible` et plusieurs composants ont un état de focus dédié.
- Le bouton dispose d’une hauteur minimale de 44 px.
- Les contrôles utilisent en majorité des éléments HTML natifs.
- Les alertes différencient `role="alert"` pour le danger et `role="status"` pour les messages non urgents dans les adaptateurs observés.
- La règle `prefers-reduced-motion` est présente dans le socle et certains composants.
- L’exécution axe du playground a produit 0 violation sur 45 règles pour l’URL testée.

### Limites démontrées

- Le script `apps/docs/scripts/test-a11y.mjs` vérifie une seule URL (`/playground/`) ; le résultat ne permet pas de conclure pour l’ensemble des 68 pages ni pour chaque composant.
- Aucun scénario automatisé ou artefact de test manuel n’a été trouvé pour NVDA, VoiceOver, clavier complet, zoom/reflow, 320 px, arabe/RTL ou mobile bas de gamme.
- Aucune occurrence exploitable de `forced-colors` ou `prefers-contrast` n’a été trouvée dans le socle audité. Le thème contraste élevé demandé n’est donc pas démontré.
- Les textes du README et de certaines pages parlent encore de WCAG 2.1 AA ou de composants « conformes », tandis que la documentation d’accessibilité décrit plus prudemment une cible et des vérifications partielles. Les formulations doivent être harmonisées vers des résultats réellement prouvés.
- Les contrôles de petite taille et les boutons de fermeture nécessitent une vérification des zones de contact, même lorsque leur contrôle visuel est intentionnellement compact.

La conclusion correcte à ce stade est : **des fondations d’accessibilité sont présentes et un contrôle axe limité passe ; la conformité WCAG 2.2 AA n’est pas établie**.

## 6. Architecture et qualité

### Tokens et styles

Les tokens primitifs sont générés depuis `packages/core/tokens-src/*.json` vers des sorties TypeScript, JSON et CSS. La validation observée couvre 93 contrôles et le scan statique des CSS du core n’a trouvé aucune référence à une variable sans déclaration correspondante.

L’architecture annoncée comme primitive → sémantique → composant n’est cependant pas complètement automatisée : les tokens de composants (`*.tokens.ts`) sont maintenus manuellement et ne sont pas contrôlés par la même validation JSON/TS/CSS que les primitives. La couverture actuelle valide donc surtout la cohérence des primitives.

Les thèmes clair/sombre utilisent des aliases sémantiques et `data-tds-theme="dark"`, mais plusieurs styles Button utilisent directement des variables de palette bleue/jaune/rouge. Cela limite l’adaptation complète au thème sombre. Les couleurs nationales et les couleurs de danger sont également issues de l’identité actuelle TDS, pas de l’identité demandée dans le prompt maître.

### TypeScript, exports et modularité

Le typecheck strict des packages core, React, Vue et de la documentation passe. Le core expose 65 chemins d’export validés. Sa nature CSS-first est cohérente pour un socle indépendant des frameworks ; les adaptateurs React/Vue sont séparés.

Les manifests core/React/Vue ne déclarent toutefois pas toutes les métadonnées attendues pour une publication mature (`license`, `repository`, `engines`, politique de publication). `packages/tokens`, `packages/docs` et `apps/site` contiennent encore des scripts placeholder. Aucun mécanisme de changesets, changelog ou migration d’API n’a été trouvé.

### Documentation et design–code

La documentation est substantielle et couvre gouvernance, contribution, accessibilité, internationalisation, architecture, cycle de vie et versionnement dans `tdgs-documentation/`. Elle doit néanmoins être réalignée sur le code :

- le README principal parle de TDS, `@tds-tchad` et WCAG 2.1, alors que le prompt maître demande TDGS, `@tdgs` et WCAG 2.2 ;
- `--tds-font-family-arabic` est cité dans la documentation, alors que le token généré observé est `--tds-font-family-ar` ;
- le README pointe notamment vers `docs/communaute/contribution`, alors que la page observée est sous `apps/docs/src/content/docs/communaute/contribution.mdx` ;
- des formulations « officiel », « standard de l’État » ou des noms d’assets comme `tds-logo-official.png` peuvent créer une revendication institutionnelle ambiguë, malgré la présence de disclaimers indiquant que le projet n’est pas homologué ;
- aucune source design Figma/Penpot, dossier `design/`, ADR ou catalogue de décisions design n’a été trouvée dans le dépôt.

La formulation publique à conserver tant qu’aucune validation institutionnelle n’est produite est : **« Système de design open source proposé pour les services numériques publics du Tchad. »**

### CI/CD, reproductibilité et sécurité

`.github/workflows/ci.yml` vérifie principalement `packages/core` et la documentation. React, Vue, `packages/tokens`, `packages/docs`, `apps/site` et `templates` ne sont pas couverts par un job équivalent. Le workflow utilise npm et des package-lock locaux alors que le dépôt est structuré autour de pnpm/Turbo ; la reproductibilité et la source de vérité du lockfile ne sont pas suffisamment claires.

Le workflow contient un job `publish` conditionné par un push de tag `v*`, mais ses déclencheurs déclarés ne comprennent que les pushes sur `main` et les pull requests vers `main`. Dans l’état observé, ce job ne peut donc pas être atteint par le déclenchement prévu. Aucune publication n’a été effectuée pendant l’audit.

Le workflow de déploiement documentaire ne référence pas explicitement `packages/core/tokens-src/**` dans ses chemins, alors qu’une modification des tokens sources peut changer les assets documentaires copiés. Aucun audit de dépendances, scan de secrets, CodeQL, contrôle de licences ou budget de performance n’a été trouvé.

### Performance et compatibilité

Le site documentaire est statique ; le build a produit 68 pages, Pagefind a indexé 66 pages et une seule langue (`fr`). Le build observé indique environ 94,19 kB de JavaScript UI non compressé et 18,26 kB de CSS sur la sortie mesurée, sans budget ni test de régression associé. Aucun test sur téléphone modeste, connexion lente, zoom ou matrice de navigateurs n’a été exécuté.

## 7. Écart vers un système mature

Notation indicative de 0 à 5, fondée sur les preuves disponibles dans ce dépôt ; elle ne constitue pas une certification.

| Capacité | Note 0–5 | Éléments vérifiés | Action prioritaire |
| --- | ---: | --- | --- |
| Fondations | 3 | Tokens générés, CSS modulaire, thèmes clair/sombre partiels | Résoudre l’identité, compléter les tokens sémantiques/composants et le contraste élevé |
| Composants | 2 | 17 familles core et adaptateurs React/Vue présents | Stabiliser les contrats, états, attributs natifs et composants réellement livrés |
| Accessibilité | 2 | Focus, HTML natif et axe playground passant | Mettre en place une matrice clavier/lecteurs d’écran/zoom/RTL/contraste |
| Bilinguisme/RTL | 1 | Direction arabe et quelques propriétés logiques | Livrer le parcours arabe, corriger les propriétés physiques et tester chaque composant |
| Documentation | 3 | Site de 68 pages et guides de gouvernance | Corriger les liens, variables, versions et revendications non démontrées |
| Modèles | 1 | `templates/README.md` et exemples documentaires | Construire des modèles réutilisables avec critères a11y/performance |
| Tests/CI | 2 | Tests core/adapters, build et validateurs | Rendre lint réel, couvrir tous les packages, corriger le job tag et ajouter les contrôles de sécurité |
| Gouvernance | 2 | Documents de gouvernance et cycle de vie présents | Ajouter propriétaires, CODEOWNERS, ADR, release process et décisions traçables |
| Design–code | 1 | Tokens et documentation de composants | Publier la source design et une synchronisation versionnée, sans dépendance propriétaire obligatoire |
| Adoption | 0 | Aucune adoption de production vérifiable dans le dépôt | Définir des pilotes et indicateurs sans les présenter comme adoption institutionnelle |

## 8. Risques

| Risque | Probabilité | Impact | Mesure recommandée |
| --- | --- | --- | --- |
| Identité et namespace non alignés (`TDGS` / `TDS`, `@tdgs` / `@tds-tchad`) | Élevée | Élevé | Décision documentée, puis plan de migration compatible et stratégie d’alias |
| Revendication institutionnelle non validée | Moyenne | Élevé | Employer la formulation proposée ; retirer ou renommer les formulations ambiguës après validation |
| Usage non autorisé de symboles ou assets | Moyenne | Élevé | Documenter la provenance/licence et conditionner tout symbole officiel à une validation institutionnelle |
| Conformité accessibilité surévaluée | Élevée | Élevé | Remplacer les assertions par des résultats testés et étendre la matrice a11y |
| RTL et contraste élevé incomplets | Élevée | Élevé | Corriger les propriétés physiques, ajouter `forced-colors`/contraste et tests bidirectionnels |
| Publication CI inatteignable ou mal contrôlée | Élevée | Élevé | Corriger les triggers, ajouter des garde-fous et tester le chemin de release sans publier |
| Publication accidentelle de placeholders | Moyenne | Élevé | Passer les placeholders en privés ou bloquer explicitement leur publication |
| Rupture d’API lors d’un renommage | Élevée | Élevé | ADR, période de dépréciation, alias et guide de migration avant changement majeur |
| Licences non matérialisées | Élevée | Élevé | Ajouter la licence autorisée et les notices/provenances des dépendances et assets |
| Documentation divergente du code | Élevée | Moyen | Vérifications de liens, d’exemples et de variables dans CI |

## 9. Priorités

### P0 — bloqueurs de confiance et de release

- Décider officiellement, au niveau du projet, si la cible est `TDGS`/`@tdgs/core` avec l’identité du prompt maître ou si la base `TDS`/`@tds-tchad` est conservée. Ne pas renommer ni changer les couleurs sans plan de migration et justification.
- Corriger le déclenchement et les garde-fous du job de publication CI avant toute release ; ne pas publier pendant ce travail.
- Ajouter la licence réelle et la provenance des assets, ou corriger les affirmations de licence si la décision n’est pas encore prise.
- Remplacer les formulations pouvant laisser croire à une homologation par la formulation open source proposée et maintenir le disclaimer institutionnel.

### P1 — qualité technique et accessibilité

- Rendre le lint effectif pour chaque package et cadrer `.prettierignore` afin d’exclure les sorties générées et les ressources hors projet ; traiter ensuite les 114 fichiers signalés.
- Aligner les APIs React/Vue et le CSS : `disabled`, `required`, `aria-*`, `loading`, attributs restants, FileUpload et niveaux de titres.
- Ajouter des tests dédiés Button, Input/Form, Alert, Badge, Card, Link et Table : états, clavier, erreurs, noms accessibles, thèmes, RTL et zones de contact.
- Ajouter un mode et une campagne `forced-colors`/contraste élevé ; corriger les propriétés physiques RTL et l’écart `--tds-font-family-arabic`/`--tds-font-family-ar`.
- Étendre CI aux adaptateurs, à la documentation, aux placeholders et aux contrôles de sécurité/licence ; choisir une stratégie de lockfile reproductible.

### P2 — industrialisation

- Ajouter visual regression, tests navigateur et budgets de performance sur pages et composants.
- Livrer la documentation arabe et les modèles de pages réels dans `templates/`.
- Mettre en place changesets/changelog, `CODEOWNERS`, ADR et une procédure de release auditable.
- Résoudre l’avertissement de route `/404` et l’avertissement Node du build documentaire.

### P3 — adoption contrôlée

- Définir des pilotes publics, critères de contribution et indicateurs d’usage.
- Publier une source design–code traçable et des exemples d’intégration indépendants des frameworks.
- Évaluer les besoins de support long terme, compatibilité navigateur et fonctionnement sur équipements/connectivités modestes.

## 10. Décision du premier lot recommandé

Le premier lot devrait être un lot de **fiabilisation du socle et de clarification d’identité**, sans réécriture d’architecture et sans publication.

### Périmètre proposé

1. Rédiger une décision d’architecture/identité qui tranche le nom public, le namespace, les couleurs, le statut institutionnel et la stratégie de migration.
2. Corriger les assertions documentaires et les liens/variables connus, sans présenter le système comme officiel ou homologué.
3. Corriger le workflow CI pour rendre les validations et le chemin de release cohérents, sans exécuter de publication.
4. Ajouter les premiers tests comportementaux et d’accessibilité sur Button et Input/Form, puis reproduire le modèle sur Alert, Badge, Card, Link et Table.
5. Corriger les attributs natifs des adaptateurs et les premiers écarts RTL/contraste élevé.

### Critères d’acceptation

- Une décision versionnée explique la coexistence éventuelle de TDS et TDGS et fournit une migration réversible.
- Aucun texte public audité ne revendique une homologation ; les références à l’État et aux symboles sont explicitement conditionnelles.
- `pnpm lint` exécute effectivement des tâches ; le formatage est borné aux sources maintenues ; les résultats sont visibles en CI.
- Les 7 composants ciblés disposent de tests documentés pour rendu, états principaux, clavier/sémantique et au moins un scénario clair/sombre et LTR/RTL pertinent.
- Les champs exposent et testent correctement `disabled`, `required`, `aria-*`, les erreurs et les attributs restants.
- Les validations tokens/exports, typecheck, build, tests et a11y sont exécutées sans dépendre uniquement du cache et leurs résultats sont publiés dans la CI.
- Le workflow de publication est vérifiable en mode simulation et reste bloqué tant qu’une autorisation explicite de publication n’est pas donnée.

### Définition de terminé

Le lot sera terminé lorsque les critères ci-dessus seront démontrés par des fichiers, des tests exécutés et des sorties CI, avec une liste explicite des limites restantes. Aucun changement de version, commit, push ou publication ne fait partie de ce lot sans autorisation séparée.

## Addendum — décision de nommage

À la suite de l’audit, la décision de nommage a été prise :

- nom public : **TDGS — Tchad Design System** ;
- package cœur : `@tdgs/core` ;
- adaptateur React : `@tdgs/react` ;
- adaptateur Vue : `@tdgs/vue`.

La migration ciblée des manifests, dépendances workspace, alias TypeScript, imports, workflows CI et exemples documentaires a été appliquée sans changement de version, commit, push ou publication. Les classes CSS historiques `tds-*` sont conservées pour éviter une rupture d’API distincte de cette décision.

Validations post-migration confirmées : `@tdgs/core` passe les 93 contrôles de tokens et les 65 contrôles d’exports ; les tests core/React/Vue passent respectivement à `256/256`, `5/5` et `4/4` ; les typechecks core/React/Vue et la documentation passent ; le build documentaire produit 68 pages ; le contrôle axe du playground passe avec 0 violation sur 45 règles. L’avertissement de route `/404` et l’avertissement Node `DEP0190` restent à traiter.
