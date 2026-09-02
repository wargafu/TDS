# Modèles TDGS

Modèles de pages institutionnelles, en **HTML statique**, construits uniquement
avec `@tdgs/core` (`../../packages/core/src/tdgs.css`) et une feuille de
composition partagée (`shared/template.css`). Aucun framework.

| Dossier            | Modèle                                 | Points montrés                                              |
| ------------------ | -------------------------------------- | ----------------------------------------------------------- |
| `citizen-portal/`  | Portail citoyen                        | En-tête, recherche, cartes de démarches, alerte, pied       |
| `admin-dashboard/` | Tableau de bord d'un agent             | Barre latérale, indicateurs, tableau, badges d'état         |
| `content-page/`    | Page éditoriale d'une démarche         | Fil d'Ariane, sommaire, callout, téléchargement, partage    |
| `form-tunnel/`     | Parcours de formulaire (étape 2 sur 3) | Étapes, résumé d'erreurs, champs en erreur, champ optionnel |
| `login/`           | Connexion à l'espace usager            | Panneau centré, champ mot de passe avec bascule             |
| `login-ar/`        | Connexion — **arabe, RTL**             | `dir="rtl"`, police arabe, bandeau et mise en page miroir   |
| `error-page/`      | Page d'erreur 404                      | Message d'état, recherche de secours, retour à l'accueil    |

Chaque modèle : `<!doctype html>`, `<html lang dir>`, un seul `<main id>`, un
lien d'évitement en tête, le bandeau tricolore, un pied institutionnel.

## Validation

```bash
pnpm validate:templates   # contrôles structurels (templates/validate.mjs)
```

Ces contrôles ne remplacent **pas** un audit d'accessibilité réel (axe, clavier,
lecteur d'écran, zoom 200 %, 320 px) — voir
`tdgs-documentation/ACCESSIBILITY.md`.

## Avertissement

Bases de composition, pas des interfaces officiellement validées. Contenus,
données, logos, adresses et liens doivent être revus par le service qui les
adopte. TDGS n'utilise pas les armoiries ni le sceau de l'État.
