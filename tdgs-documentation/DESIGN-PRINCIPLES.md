# Principes de design et identité de marque — TDGS

> Ce document fixe l'intention de design du **Tchad Design System**. Il guide les
> arbitrages de tokens, de composants et de documentation. Il ne constitue ni une
> homologation institutionnelle ni une autorisation d'usage des symboles de
> l'État tchadien.

---

## 1. Principes de design

Cinq principes, dans l'ordre de priorité. En cas de conflit, le principe le plus
haut l'emporte.

### 1.1 Accessible d'abord

L'accessibilité n'est pas une option de fin de projet. Cible **WCAG 2.2 AA** pour
chaque composant : contraste, clavier, focus visible, annonces lecteur d'écran,
taille de cible 24 px, respect de `prefers-reduced-motion` et de
`forced-colors`. Un composant qui n'est pas utilisable au clavier n'est pas
livrable.

### 1.2 Sobre et lisible

Les services publics s'adressent à toute la population, sur tout matériel, sur
tout réseau. Pas d'effet décoratif gratuit, pas d'animation qui retarde la
lecture, pas de densité d'information qui noie l'essentiel. La hiérarchie
visuelle sert la compréhension de la démarche, pas l'esthétique.

### 1.3 Cohérent

Un même élément se comporte partout de la même manière. Les décisions passent par
les **tokens** et par des composants partagés — jamais par des valeurs en dur
recopiées. Deux ministères qui utilisent TDGS doivent produire des interfaces
qui se ressemblent sans se concerter.

### 1.4 Robuste sans JavaScript

Le socle fonctionne en HTML + CSS avec les éléments natifs (`<dialog>`,
`<details>`, `<input>`…). Le JavaScript **améliore** l'expérience (combobox,
toasts, menus) mais ne conditionne jamais l'accès à l'information ou à une
démarche.

### 1.5 Bilingue, français et arabe

Le français (LTR) et l'arabe (RTL) sont deux cibles de première classe. Aucun
texte n'est imposé dans le core : tout libellé passe par une prop ou un slot. Les
styles utilisent des **propriétés logiques** (`margin-inline-start`, jamais
`margin-left`) pour fonctionner dans les deux sens sans duplication.

---

## 2. Couleur

### 2.1 Origine

La palette part des **trois couleurs du drapeau tchadien** — bleu, or, rouge —
complétées d'un **vert** fonctionnel (succès) et d'une échelle de **neutres**.

| Rôle    | Token `500`     | Hex       | Signification                                            |
| ------- | --------------- | --------- | -------------------------------------------------------- |
| Bleu    | `blue.500`      | `#0B3A82` | Action principale, couleur de marque, autorité de l'État |
| Or      | `yellow.500`    | `#F5C116` | Avertissement, accent identitaire                        |
| Rouge   | `red.500`       | `#D8222A` | Erreur, action destructive                               |
| Vert    | `green.500`     | `#006B3C` | Succès, confirmation                                     |
| Neutres | `neutral.0…900` | —         | Texte, fonds, bordures                                   |

Chaque teinte existe en 10 paliers (`50` à `900`). Les valeurs publiées sont
**immuables** : les modifier impose une version majeure.

### 2.2 Architecture à deux niveaux

1. **Palette de base** — valeurs brutes (`--tds-color-blue-500`). Sert à
   _construire_ des composants.
2. **Tokens sémantiques** — intention fonctionnelle (`--tds-semantic-danger-text`,
   `--tds-action-primary`, `--tds-bg-subtle`). Sert à _exprimer un état_.

Règle : dans un composant ou une page, on référence les tokens sémantiques ; on
ne pioche dans la palette de base que pour définir un nouveau token sémantique.

### 2.3 Contraste

- Texte courant : ratio **≥ 4,5:1** ; texte large (≥ 24 px, ou ≥ 18,66 px gras) :
  **≥ 3:1** ; éléments d'interface et focus : **≥ 3:1**.
- **Jamais de texte blanc sur l'or.** L'or exige un texte sombre
  (`neutral.800`/`neutral.900`).
- Les paires de tokens sont vérifiées automatiquement
  (`packages/core/scripts/validate-contrast.mjs`, exécuté en CI). Toute nouvelle
  paire texte/fond doit passer ce contrôle.

### 2.4 Thèmes

Trois thèmes pris en charge : **clair** (défaut), **sombre**, **contraste élevé**
(`forced-colors`). Le thème sombre n'inverse pas mécaniquement : il redéfinit les
tokens sémantiques (`theme.dark`) avec des bleus plus lumineux pour conserver le
contraste. Bascule via `:root[data-tds-theme="dark"]` ou
`@media (prefers-color-scheme: dark)`.

---

## 3. Marque

### 3.1 La marque TDGS

Trois barres verticales **ascendantes** de gauche à droite, dans l'ordre du
drapeau (bleu, or, rouge). Elle évoque la progression et la montée en qualité des
services publics numériques. C'est une marque **propre au projet**, volontairement
distincte des armoiries et du sceau de l'État.

### 3.2 Déclinaisons

| Fichier                 | Quand l'utiliser                                                                 |
| ----------------------- | -------------------------------------------------------------------------------- |
| `tdgs-mark.svg`         | Marque seule — favicon, icône d'app, puce de marque à côté d'un titre déjà écrit |
| `tdgs-mark-mono.svg`    | Contexte une seule couleur (gravure, filigrane, tampon)                          |
| `tdgs-logo.svg`         | Lockup horizontal marque + « TDGS », fond clair                                  |
| `tdgs-logo-inverse.svg` | Idem sur fond sombre (texte blanc)                                               |
| `tdgs-logo-stacked.svg` | Format vertical avec descripteur « Tchad Design System »                         |

Sources dans `apps/docs/public/brand/`. Les PNG (favicons, OG) sont **générés**
(`pnpm --filter tds-docs gen:brand`) — ne pas les éditer.

### 3.3 Règles

- **Zone de protection** : au moins la hauteur d'une barre tout autour.
- **Taille minimale** : marque seule 24 px ; lockup 96 px de large.
- **Interdits** : déformer, incliner, recolorer hors palette, ajouter une ombre
  portée, réordonner les barres, combiner avec les symboles de l'État.
- Sur photo ou fond chargé : réserver un cartouche uni.

---

## 4. Typographie

| Usage            | Police                | Repli                                            |
| ---------------- | --------------------- | ------------------------------------------------ |
| Latin (français) | **Source Sans 3**     | `system-ui, Segoe UI, Roboto, Arial, sans-serif` |
| Arabe            | **Noto Naskh Arabic** | `Noto Sans Arabic, system-ui, sans-serif`        |
| Code             | **JetBrains Mono**    | `ui-monospace, SFMono-Regular, Menlo, monospace` |

- Polices **auto-hébergées** en `woff2` sous‑ensembles, `font-display: swap`, avec
  une pile de repli qui ne provoque pas de décalage brutal.
- Échelle typographique : `xs` (12 px) → `5xl` (48 px), pas de tailles
  intermédiaires arbitraires. Interlignage plus généreux pour l'arabe
  (`--tds-default-line-height-ar: 1.6`).
- Styles nommés (`--tds-text-page-title`, `--tds-text-body`, `--tds-text-label`…)
  plutôt que des combinaisons taille/graisse recomposées à la main.
- Graisses utilisées : 400 (courant), 500 (liens), 600 (titres, libellés,
  boutons), 800 (marque). Éviter 300 sous 16 px.

---

## 5. Espacement, rayons, élévation, mouvement

- **Espacement** : grille de **4 px** (`--tds-spacing-1` = 4 px …). Toute marge ou
  gouttière est un multiple de l'échelle.
- **Rayons** : `xs` 2 px, `sm` 4 px (contrôles), `md` 8 px (cartes, surfaces),
  `lg`/`xl` pour les grands blocs, `full` pour les pastilles.
- **Élévation** : `shadow.xs`→`xl`, discrètes ; l'élévation signale la
  superposition (menu, modale), pas la décoration.
- **Mouvement** : `fast` 120 ms (retours d'état), `normal` 200 ms (entrées/sorties
  d'éléments), au‑delà seulement pour de grandes transitions. Toujours neutralisé
  sous `prefers-reduced-motion: reduce`.
- **Focus** : anneau de 2 px, décalé de 2–3 px, couleur `--tds-focus-ring`
  (dérivée de l'action primaire), visible sur tous les fonds.

---

## 6. Voix et ton

- **Clair avant tout.** Phrases courtes, vocabulaire courant, une idée par phrase.
  On explique la démarche, pas le système.
- **Direct et respectueux.** Vouvoiement, pas de familiarité, pas de
  condescendance, pas de jargon administratif inutile.
- **Actif.** « Déposez votre demande » plutôt que « La demande doit être
  déposée ».
- **Honnête sur le statut.** On écrit « proposé », « en phase pilote »,
  « techniquement fonctionnel ». On n'écrit pas « officiel », « homologué » ou
  « conforme WCAG 2.2 AA » tant que les conditions de `STATUS.md` ne sont pas
  remplies.
- **Parité française / arabe.** Les deux versions disent la même chose avec le
  même niveau de formalité ; l'arabe n'est pas une traduction au rabais.
- **Messages d'erreur** : dire ce qui s'est passé, puis quoi faire. Pas de blâme,
  pas de code technique seul.

---

## 7. Anti-patterns

- Recopier une valeur hexadécimale ou un `px` au lieu d'un token.
- Ajouter une couleur hors palette « juste pour cet écran ».
- Rendre une information ou une étape de démarche dépendante du JavaScript.
- Utiliser `margin-left` / `padding-right` physiques dans un composant.
- Employer la couleur seule pour porter un sens (toujours doubler d'un texte ou
  d'une icône).
- Désactiver l'outline de focus sans le remplacer.
- Composer un logo « maison » à partir des armoiries de l'État.
