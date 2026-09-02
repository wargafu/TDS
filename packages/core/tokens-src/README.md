# Source des tokens — `packages/core/tokens-src/`

**Source unique de vérité** pour les tokens primitifs du TDGS. Ces fichiers
JSON sont écrits à la main ; les sorties sont **générées** — ne jamais éditer
`src/tokens/*` directement.

## Fichiers source

| Fichier           | Contenu                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| `color.json`      | Échelles (`scales`), `semantic` / `semanticDark`, `theme.light` / `theme.dark` (références `{scale, shade}`) |
| `typography.json` | Familles, tailles, interlignages, graisses, styles nommés                                                    |
| `spacing.json`    | Échelle 4 px (`scale`) + équivalents `px`                                                                    |
| `radius.json`     | Rayons plats                                                                                                 |
| `shadow.json`     | Élévations plates                                                                                            |
| `motion.json`     | Durées + courbes d'accélération                                                                              |
| `z-index.json`    | Couches d'empilement nommées                                                                                 |
| `focus.json`      | Anneau de focus partagé (`ring-*`)                                                                           |

## Pipeline

```text
tokens-src/*.json
      │  scripts/generate-tokens.mjs   (déclenché par `pnpm generate:tokens`
      │                                 et automatiquement par `pnpm build`)
      ▼
src/tokens/<name>.ts     ← export TypeScript typé (`as const`)
src/tokens/<name>.json    ← forme résolue (références → valeurs littérales)
src/tokens/<name>.css     ← variables `--tds-*` (clair par défaut, blocs
                             `:root[data-tds-theme="dark"]` + media-query)
      │  scripts/build.mjs → tsc + copie
      ▼
dist/tokens/<name>.{js,d.ts,json,css}   ← ce qui est publié
```

## Garde-fous

- `scripts/validate-tokens.mjs` — existence et non-vacuité des 3 couches.
- `scripts/validate-contrast.mjs` — 32 paires texte/fond et élément/fond contre
  WCAG 2.2 AA (dans `pnpm validate`, donc CI).
- `test/token-consistency.test.ts` — le CSS `:root` (clair) correspond exactement
  à l'export TS.
- **Immuabilité** : modifier la valeur d'un token publié impose une version
  majeure (voir `tdgs-documentation/VERSIONING.md`).

## Format

Le schéma est propre au projet (pas encore DTCG strict). Une migration DTCG
n'est justifiée que le jour où un outil externe (Figma Tokens, Style Dictionary)
consomme réellement la source — voir le plan de refonte, phases écartées.
