# TDGS — Tchad Design System

> Le système de design officiel pour les services numériques de l'État du Tchad.

[![CI](https://github.com/Notoor/TDGS/actions/workflows/ci.yml/badge.svg)](https://github.com/Notoor/TDGS/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@tdgs/core.svg)](https://www.npmjs.com/package/@tdgs/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## Pourquoi TDGS ?

Les services numériques gouvernementaux du Tchad manquent d'une identité visuelle cohérente. Chaque ministère, chaque plateforme citoyenne développe ses interfaces de manière indépendante — résultat : incohérence, inaccessibilité et perte de confiance des citoyens.

**TDGS** est la réponse systémique : une bibliothèque de tokens et de composants partagés, accessibles par défaut, conformes WCAG 2.1 AA, et prêts pour le français comme pour l'arabe.

Inspiré de [GOV.UK Design System](https://design-system.service.gov.uk/), [DSFR](https://www.systeme-de-design.gouv.fr/) et [USWDS](https://designsystem.digital.gov/).

---

## Ce que TDGS fournit

### 🎨 Design Tokens
| Système | Variables CSS | TypeScript | JSON |
|---|---|---|---|
| Couleurs (bleu, jaune, rouge, vert, neutrals, sémantiques) | ✅ | ✅ | ✅ |
| Typographie (Source Sans 3, Noto Naskh Arabic, JetBrains Mono) | ✅ | ✅ | ✅ |
| Espacement (grille 4px) | ✅ | ✅ | ✅ |
| Arrondis, Ombres, Motion, Z-index | ✅ | ✅ | ✅ |

### 🧩 Composants
| Composant | Classes CSS | Types TS | Accessibilité |
|---|---|---|---|
| Button | `tdgs-button` | `ButtonVariant`, `ButtonSize` | WCAG AA ✅ |
| Input / Form | `tdgs-input`, `tdgs-field` | `InputVariant`, `InputSize` | WCAG AA ✅ |
| Alert | `tdgs-alert` | `AlertVariant` | `role=alert` ✅ |
| Badge | `tdgs-badge` | `BadgeVariant` | WCAG AA ✅ |
| Card | `tdgs-card` | `CardVariant` | ✅ |
| Link | `tdgs-link` | `LinkVariant` | Focus visible ✅ |
| Table | `tdgs-table` | — | `scope`, `caption` ✅ |

---

## Installation

```bash
# pnpm (recommandé)
pnpm add @tdgs/core

# npm
npm install @tdgs/core

# yarn
yarn add @tdgs/core
```

**Node.js 18+ requis.** Le package est distribué en ESM (`"type": "module"`).

---

## Démarrage rapide

### 1. Charger les tokens CSS

```css
/* Dans votre feuille de style principale */
@import "@tdgs/core/base.css";             /* Reset + styles HTML */
@import "@tdgs/core/tokens/color.css";
@import "@tdgs/core/tokens/typography.css";
@import "@tdgs/core/tokens/spacing.css";
@import "@tdgs/core/tokens/radius.css";
@import "@tdgs/core/tokens/shadow.css";
@import "@tdgs/core/tokens/motion.css";
@import "@tdgs/core/tokens/z-index.css";

/* Composants selon vos besoins */
@import "@tdgs/core/components/button/button.css";
@import "@tdgs/core/components/input/input.css";
@import "@tdgs/core/components/alert/alert.css";
@import "@tdgs/core/components/badge/badge.css";
@import "@tdgs/core/components/card/card.css";
@import "@tdgs/core/components/link/link.css";
@import "@tdgs/core/components/table/table.css";
```

### 2. Utiliser les composants en HTML

```html
<!-- Bouton primary -->
<button type="submit" class="tdgs-button tdgs-button--primary tdgs-button--md">
  Valider la demande
</button>

<!-- Champ de formulaire -->
<div class="tdgs-field">
  <label class="tdgs-field__label" for="nom">Nom complet</label>
  <input id="nom" type="text" class="tdgs-input tdgs-input--md" required>
</div>

<!-- Alerte succès -->
<div class="tdgs-alert tdgs-alert--success" role="status">
  <div class="tdgs-alert__content">
    <p class="tdgs-alert__title">Dossier soumis</p>
    <div class="tdgs-alert__body">Référence : REF-2024-001234</div>
  </div>
</div>
```

### 3. Utiliser les tokens TypeScript

```typescript
import { color, spacing, typography } from '@tdgs/core/tokens';
import type { ButtonVariant } from '@tdgs/core/components/button';

const primary = color.blue[500];      // '#0033A0'
const gap = spacing.scale[4];         // '1rem' (16px)
const body = typography.sizes.md;     // '1rem'
```

---

## Structure du monorepo

```
TDGS/
├── packages/
│   └── core/                  ← Package npm principal @tdgs/core
│       ├── src/
│       │   ├── base.css       ← Reset CSS + styles HTML de base
│       │   ├── tokens/        ← Design tokens (TS + JSON + CSS)
│       │   └── components/    ← Tokens + CSS de chaque composant
│       ├── scripts/           ← Build, clean, validation
│       └── package.json
├── apps/
│   ├── docs/                  ← Site de documentation (Astro Starlight)
│   └── site/                  ← Site statique HTML de démonstration
├── templates/                 ← Templates gouvernementaux (à venir)
├── .github/workflows/ci.yml   ← CI/CD GitHub Actions
├── turbo.json                 ← Orchestration Turbo
└── pnpm-workspace.yaml
```

---

## Développement local

### Prérequis

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/) 8+ : `npm install -g pnpm`

### Installation

```bash
git clone https://github.com/Notoor/TDGS.git
cd TDGS
pnpm install
```

### Commandes principales

```bash
# Lancer le site de documentation en local
cd apps/docs && npm run dev
# → http://localhost:4321

# Builder tous les packages
pnpm build

# Vérifier les types TypeScript
pnpm typecheck

# Valider les tokens (53 checks)
pnpm --filter @tdgs/core validate:tokens

# Valider les exports npm (après build)
pnpm --filter @tdgs/core validate:exports

# Lint
pnpm lint

# Formatter le code
pnpm format
```

### Workflow de développement

```bash
# 1. Créer une branche feature
git checkout -b feat/nom-du-composant

# 2. Développer + valider
pnpm --filter @tdgs/core validate:tokens
pnpm build
pnpm typecheck

# 3. Committer
git commit -m "feat: ajouter le composant X"

# 4. Ouvrir une Pull Request vers main
git push origin feat/nom-du-composant
```

---

## Contribuer

**Toute contribution est bienvenue.** TDGS est un bien public numérique pour le Tchad.

### Avant d'ouvrir une PR

- [ ] Les tokens ajoutés existent en `.ts`, `.json` ET `.css`
- [ ] `pnpm --filter @tdgs/core validate:tokens` passe à 0 erreur
- [ ] `pnpm build && pnpm --filter @tdgs/core validate:exports` réussit
- [ ] `pnpm typecheck` → zéro erreur TypeScript
- [ ] Les composants respectent WCAG 2.1 AA (contraste, focus, ARIA)
- [ ] La documentation est mise à jour dans `apps/docs/`

### Types de contributions acceptées

| Type | Processus |
|---|---|
| 🐛 Correction de bug | PR directe avec description du bug |
| ♿ Amélioration accessibilité | PR avec tests AT décrits |
| 🎨 Nouveau token | Ouvrir une issue d'abord |
| 🧩 Nouveau composant | RFC obligatoire — discussion issue |
| 📚 Documentation | PR directe |
| 🌐 Traduction arabe | PR directe — contactez les mainteneurs |

### Ce qui est interdit sans version majeure

- Modifier la valeur d'un token existant
- Supprimer un export public
- Renommer une classe CSS existante

> TDGS suit le versionnement sémantique strict. Les tokens publiés sont **immuables**.

### Guide de contribution complet

→ [docs/guidelines/contributing](/apps/docs/src/content/docs/guidelines/contributing.mdx)

---

## Feuille de route

### v0.1 — Fondations ✅ (actuel)
- [x] 7 systèmes de tokens (couleurs, typo, espacement, radius, shadow, motion, z-index)
- [x] 7 composants (Button, Input, Alert, Badge, Card, Link, Table)
- [x] Build system industriel + CI/CD
- [x] Documentation Astro Starlight (30 pages)

### v0.2 — Composants navigation
- [ ] Header gouvernemental
- [ ] Navigation principale
- [ ] Breadcrumb
- [ ] Pagination
- [ ] Modal / Dialog

### v0.3 — Patterns et templates
- [ ] Template portail citoyen
- [ ] Template tableau de bord administratif
- [ ] Storybook fonctionnel

### v1.0 — Production ready
- [ ] Dark mode complet
- [ ] Système d'icônes SVG
- [ ] Support arabe RTL complet et testé
- [ ] Publication npm `@tdgs/core`

---

## Compatibilité

| Environnement | Support |
|---|---|
| HTML + CSS (sans JS) | ✅ Complet |
| React 18+ | ✅ Via classes CSS |
| Vue 3+ | ✅ Via classes CSS |
| Angular | ✅ Via classes CSS |
| Next.js / Nuxt / Astro | ✅ Via classes CSS |
| Node.js (tokens JSON/JS) | ✅ |
| Navigateurs modernes (2 dernières versions) | ✅ |
| IE11 | ❌ Non supporté |

---

## Stack technique

| Outil | Usage |
|---|---|
| [pnpm](https://pnpm.io/) + [Turbo](https://turbo.build/) | Monorepo et orchestration |
| [TypeScript 5.6](https://www.typescriptlang.org/) | Tokens typés |
| [Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/) | Documentation |
| [GitHub Actions](https://github.com/features/actions) | CI/CD |
| [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) | Qualité du code |

---

## Licence

[MIT](LICENSE) — Libre d'utilisation pour tous les projets, y compris gouvernementaux.

---

## Contact

- **Issues** : [github.com/Notoor/TDGS/issues](https://github.com/Notoor/TDGS/issues)
- **Discussions** : [github.com/Notoor/TDGS/discussions](https://github.com/Notoor/TDGS/discussions)
- **Email** : design-system@gouv.td *(à configurer)*

---

<div align="center">
  Construit pour le Tchad 🇹🇩 — Libre pour tous
</div>
