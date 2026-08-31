# Architecture du TDGS

## Principes

1. Le cœur est indépendant des frameworks.
2. HTML sémantique et CSS assurent le fonctionnement de base.
3. JavaScript progressif est limité aux interactions nécessaires.
4. Une source de tokens génère CSS, JSON et TypeScript.
5. Les adaptateurs de frameworks ne divergent pas du cœur.
6. Chaque paquet a une API explicite et testée.

## Structure cible indicative

```text
apps/
  docs/          documentation et playground
packages/
  core/          CSS, tokens, composants et icônes
  tokens/        espace réservé pour une extraction future
  docs/          espace réservé pour des outils documentaires futurs
  react/         adaptateur optionnel
  vue/           adaptateur optionnel
templates/
  citizen-portal/ portail citoyen statique
  admin-dashboard/ tableau de bord statique
design/          ressources Figma/Penpot
docs/
  adr/           décisions d’architecture
  audits/        rapports vérifiables
```

La structure réelle ne doit changer qu’après audit et plan de migration. Les ressources
Figma/Penpot ne sont pas encore présentes dans ce dépôt.

## Design tokens

- primitifs : valeurs brutes ;
- sémantiques : rôle dans l’interface ;
- composants : décisions locales au composant.

Les références cassées, cycles, doublons et contrastes insuffisants doivent échouer en CI.

## Compatibilité

La matrice de navigateurs doit être dérivée des usages réels et publiée. Le système vise les téléphones modestes, les connexions intermittentes, le mode sombre, le contraste élevé et l’impression.

## ADR

Toute décision structurante reçoit un fichier `docs/adr/NNNN-titre.md` contenant contexte, décision, options, conséquences, statut et date.
