# Audit d'accessibilité — TDGS

> Suivi de la vérification d'accessibilité, composant par composant. Cible
> **WCAG 2.2 AA**. Ce document n'est **pas** une déclaration de conformité : il
> distingue ce qui est vérifié automatiquement de ce qui reste à tester
> manuellement avec des technologies d'assistance réelles.

## Méthode

Pour être marqué **conforme**, un composant passe les cinq contrôles suivants.

### 1. Contrôle automatisé (axe-core)

- `pnpm --filter tds-docs test:a11y` — axe sur **toutes** les pages du site
  (≈ 90), en thème clair et sur un échantillon en sombre.
- `pnpm --filter tds-docs test:a11y:templates` — axe sur les 7 modèles
  `templates/`.
- `pnpm e2e` (`e2e/a11y.spec.ts`) — axe sur des **états ouverts** : dialogue de
  recherche, menu mobile, terrain de jeu.
- Règles : `wcag2a`, `wcag2aa`, `wcag21aa`, `wcag22aa`.

### 2. Clavier

- Tout est atteignable et actionnable au clavier seul (Tab, Maj+Tab, Entrée,
  Espace, flèches, Échap, Début/Fin selon le motif).
- Ordre de tabulation logique ; focus jamais piégé (hors dialogue modal, qui le
  piège **volontairement** et le rend à la fermeture).
- **Focus visible** sur chaque cible (`--tds-focus-ring`, jamais d'`outline: none`
  sans remplacement).
- Couvert en E2E pour : recherche, menu mobile, onglets (flèches/Début/Fin),
  toast, consentement, tableau triable, lien d'évitement.

### 3. Lecteur d'écran (manuel — **à faire**)

À tester avec **NVDA + Firefox** (Windows) et **VoiceOver + Safari** (macOS/iOS) :

- rôle, nom et valeur annoncés correctement à la prise de focus ;
- changements d'état annoncés (`aria-expanded`, `aria-selected`, `aria-current`,
  `aria-invalid`, régions live) ;
- ordre de lecture cohérent ; contenu masqué (`hidden`, `inert`) ignoré ;
- messages d'erreur reliés au champ (`aria-describedby`) et annoncés.

### 4. Contraste (thèmes clair **et** sombre)

- `pnpm --filter @tdgs/core validate:contrast` — 32 paires texte/fond et
  élément/fond, seuils 4.5 / 3.0, clair + sombre.
- Aucune valeur de couleur en dur non adaptée au thème dans le CSS composant
  (vérifié en phase 4 ; garde-fou : test `RTL readiness` + revue).
- Texte large ≥ 3:1, texte courant ≥ 4.5:1, éléments d'interface ≥ 3:1.

### 5. Cible, zoom, RTL, mouvement

- Taille de cible ≥ **24 × 24 px** (WCAG 2.2, 2.5.8).
- Utilisable à **320 px** de large et à **zoom 200 %** sans perte de contenu.
- Rendu correct en `dir="rtl"` (propriétés logiques ; page `/rtl-preview/`).
- `prefers-reduced-motion: reduce` respecté ; `forced-colors: active` géré.

---

## Matrice de suivi

Légende : ✅ vérifié · 🟡 partiel · ⬜ à faire.
Colonnes : **Axe** (auto) · **Clav.** (clavier) · **Contr.** (contraste C+S) ·
**LE** (lecteur d'écran, manuel).

<!-- DÉBUT MATRICE (une ligne par composant du manifeste — voir validate-manifest.mjs) -->

| Composant     | Nom                     | Statut | Motif a11y                                     | Axe | Clav. | Contr. | LE  |
| ------------- | ----------------------- | ------ | ---------------------------------------------- | --- | ----- | ------ | --- |
| `button`      | Button                  | Stable | `<button>` natif, focus visible, états         | ✅  | ✅    | ✅     | ⬜  |
| `badge`       | Badge                   | Stable | Texte explicite, variantes sémantiques         | ✅  | ✅    | ✅     | ⬜  |
| `card`        | Card                    | Stable | Titre structuré, zone cliquable unique         | ✅  | ✅    | ✅     | ⬜  |
| `link`        | Link                    | Stable | Libellé explicite, focus visible               | ✅  | ✅    | ✅     | ⬜  |
| `logo`        | Bloc de marque          | Stable | Marque décorative, variante fond sombre        | ✅  | ✅    | ✅     | ⬜  |
| `input`       | Input                   | Stable | Label lié, erreurs via `aria-describedby`      | ✅  | 🟡    | ✅     | ⬜  |
| `search`      | Recherche               | Stable | `role=search`, libellé obligatoire             | ✅  | ✅    | ✅     | ⬜  |
| `file-upload` | Dépôt de fichier        | Stable | `input[type=file]`, erreurs associées          | ✅  | 🟡    | ✅     | ⬜  |
| `password`    | Mot de passe            | Stable | Bascule afficher/masquer annoncée              | ✅  | ✅    | ✅     | ⬜  |
| `range`       | Curseur de plage        | Stable | `input[type=range]` natif, valeur accessible   | ✅  | ✅    | ✅     | ⬜  |
| `segmented`   | Contrôle segmenté       | Stable | `radiogroup` natif, navigation clavier         | ✅  | ✅    | ✅     | ⬜  |
| `header`      | Header                  | Stable | landmark `banner`, lien d'évitement            | ✅  | ✅    | ✅     | ⬜  |
| `nav`         | Navigation              | Stable | `aria-current=page`, menu mobile               | ✅  | ✅    | ✅     | ⬜  |
| `breadcrumb`  | Breadcrumb              | Stable | `nav[aria-label]`, `aria-current=page`         | ✅  | ✅    | ✅     | ⬜  |
| `pagination`  | Pagination              | Stable | `nav[aria-label]`, `aria-current`              | ✅  | ✅    | ✅     | ⬜  |
| `skip-link`   | Skip Link               | Stable | Premier élément focusable                      | ✅  | ✅    | ✅     | ⬜  |
| `footer`      | Footer                  | Stable | landmark `contentinfo`                         | ✅  | ✅    | ✅     | ⬜  |
| `sidemenu`    | Menu latéral            | Stable | `aria-current=page`, sections dépliables       | ✅  | 🟡    | ✅     | ⬜  |
| `dropdown`    | Menu déroulant          | Stable | Disclosure : bouton `aria-expanded` + liste    | ✅  | ✅    | ✅     | ⬜  |
| `alert`       | Alert                   | Stable | `role=alert` / `status`                        | ✅  | ✅    | ✅     | ⬜  |
| `table`       | Table                   | Stable | `scope`, `caption` ; tri annoncé (`aria-sort`) | ✅  | ✅    | ✅     | ⬜  |
| `accordion`   | Accordion               | Stable | `<details>`/`<summary>` natif, zéro JS         | ✅  | ✅    | ✅     | ⬜  |
| `callout`     | Callout                 | Stable | Titre structuré, variantes sémantiques         | ✅  | ✅    | ✅     | ⬜  |
| `notice`      | Notice                  | Stable | `role=status`/`alert`, fermeture accessible    | ✅  | ✅    | ✅     | ⬜  |
| `tag`         | Tag                     | Stable | Texte explicite, suppression accessible        | ✅  | ✅    | ✅     | ⬜  |
| `tile`        | Tile                    | Stable | Lien unique, focus visible                     | ✅  | ✅    | ✅     | ⬜  |
| `download`    | Téléchargement          | Stable | Lien explicite + métadonnées                   | ✅  | ✅    | ✅     | ⬜  |
| `quote`       | Citation                | Stable | `blockquote` + `cite`                          | ✅  | ✅    | ✅     | ⬜  |
| `summary`     | Sommaire                | Stable | `nav[aria-label]`, liste ordonnée              | ✅  | ✅    | ✅     | ⬜  |
| `share`       | Partage                 | Stable | Liens libellés ; copie de lien annoncée        | ✅  | ✅    | ✅     | ⬜  |
| `modal`       | Modal                   | Stable | `<dialog>` natif, piège de focus, `Esc`        | ✅  | ✅    | ✅     | ⬜  |
| `tabs`        | Tabs                    | Stable | WAI-ARIA APG, roving tabindex                  | ✅  | ✅    | ✅     | ⬜  |
| `tooltip`     | Tooltip                 | Stable | `aria-describedby`, `Esc`, repli CSS           | ✅  | 🟡    | ✅     | ⬜  |
| `stepper`     | Étapes                  | Stable | `aria-current=step`                            | ✅  | ✅    | ✅     | ⬜  |
| `progress`    | Progression             | Stable | `role=progressbar`, valeurs ARIA               | ✅  | ✅    | ✅     | ⬜  |
| `toast`       | Toast                   | Bêta   | Région live polie, focus non volé              | ✅  | ✅    | ✅     | ⬜  |
| `consent`     | Bandeau de consentement | Bêta   | `role=dialog` non modal, choix explicite       | ✅  | ✅    | ✅     | ⬜  |

<!-- FIN MATRICE -->

## État global (phase 4)

**Fait**

- Axe sur 100 % des pages doc + 7 modèles + états ouverts — 0 violation
  (clair + échantillon sombre).
- E2E clavier : lien d'évitement, thème, menu mobile (`Esc` + retour focus),
  recherche (piège + `Esc` + retour focus), onglets APG, toast, consentement,
  tableau triable.
- `forced-colors: active` : géré dans le chrome de la doc + blocs
  `@media (forced-colors)` de chaque composant.
- Contraste : validateur 32/32 clair + sombre ; **revue et correction** des
  fuites de couleur en dur non adaptées au thème (`input`, `range`, `segmented`,
  `share`, `tag`, `table`, `breadcrumb`, `summary`).
- RTL : propriétés logiques (test `RTL readiness` durci), page `/rtl-preview/`,
  modèle `login-ar`, miroir d'icônes directionnelles.

**Reste (colonne LE)**

- **Tests lecteur d'écran manuels** (NVDA, VoiceOver) sur les 37 composants —
  aucun réalisé à ce jour.
- Clavier manuel approfondi pour `input`/`file-upload`/`sidemenu`/`tooltip`
  (🟡 : couverts par axe + structure, pas par un test d'interaction dédié).
- Audit indépendant (RGAA / tierce partie) avant toute mention de conformité —
  voir `tdgs-documentation/STATUS.md`.
