# Marque TDGS

Actifs de marque du **Tchad Design System**. Fichiers sources : les `.svg`. Les
`.png` (favicons, icônes PWA, image Open Graph) sont **générés** — ne pas les
retoucher à la main, relancer :

```bash
pnpm --filter tds-docs gen:brand
```

## Fichiers

| Fichier                         | Usage                                                                 |
| ------------------------------- | --------------------------------------------------------------------- |
| `tdgs-mark.svg`                 | Marque seule (3 barres). Icône d'application, favori, puce de marque. |
| `tdgs-mark-mono.svg`            | Marque monochrome (`currentColor`). Impression 1 couleur, filigranes. |
| `tdgs-logo.svg`                 | Lockup horizontal (marque + « TDGS »). En-têtes sur fond clair.       |
| `tdgs-logo-stacked.svg`         | Lockup vertical avec descripteur. Espaces carrés, pieds de page.      |
| `tdgs-logo-inverse.svg`         | Lockup horizontal pour fonds sombres (texte blanc).                   |
| `og-image.svg` → `og-image.png` | Aperçu réseaux sociaux / partage (1200×630).                          |
| `../favicon.svg`                | Favori vectoriel (marque sur carré blanc arrondi).                    |

## Règles d'usage

- **Zone de protection** : au moins la hauteur d'une barre autour du lockup.
- **Taille minimale** : 24 px pour la marque seule, 96 px de large pour le lockup.
- **Couleurs** : bleu `#0B3A82`, or `#F5C116`, rouge `#D8222A` (ordre du drapeau
  tchadien). Sur fond sombre, utiliser `tdgs-logo-inverse.svg`.
- **Interdits** : ne pas déformer, recolorer hors palette, incliner, ajouter
  d'ombre portée, ni recomposer les barres.
- TDGS est une initiative indépendante : ne pas combiner la marque avec les
  armoiries ou le sceau de l'État tchadien.

Voir `tdgs-documentation/DESIGN-PRINCIPLES.md` pour le détail.
