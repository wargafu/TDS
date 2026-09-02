# Changesets

Ce dossier est géré par [Changesets](https://github.com/changesets/changesets).

Toute PR qui modifie `@tdgs/core`, `@tdgs/react` ou `@tdgs/vue` de façon visible
pour un consommateur doit inclure un changeset :

```bash
pnpm changeset
```

Les trois packages sont **versionnés ensemble** (`fixed` dans `config.json`) :
un changeset sur l'un fait monter les trois.

- `pnpm changeset` — décrire un changement (patch / minor / major).
- `pnpm changeset:status` — voir ce qui serait publié.
- `pnpm changeset:version` — consommer les changesets, monter les versions et
  générer les `CHANGELOG.md`. À faire dans une PR de release.
- La publication npm elle-même passe par `.github/workflows/release.yml`
  (déclenchement manuel). **Aucune publication n'a encore été effectuée.**
