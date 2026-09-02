# Contribuer au TDGS

Merci de contribuer à un numérique public tchadien unifié, accessible et fiable.

## Avant de commencer

1. Lire [`GOVERNANCE.md`](GOVERNANCE.md), [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md),
   [`tdgs-documentation/ACCESSIBILITY.md`](tdgs-documentation/ACCESSIBILITY.md) et
   [`tdgs-documentation/COMPONENT-LIFECYCLE.md`](tdgs-documentation/COMPONENT-LIFECYCLE.md).
2. Rechercher une issue existante.
3. Ouvrir une proposition avant tout changement structurant.
4. Ne pas inclure de secret, donnée personnelle réelle ou actif sans licence vérifiée.

## Installation

```bash
pnpm install
pnpm build
pnpm typecheck
pnpm lint
```

Adapter ces commandes uniquement si le dépôt réel les définit autrement.

## Branches et commits

- `feat/nom` : fonctionnalité ou composant ;
- `fix/nom` : correction ;
- `docs/nom` : documentation ;
- `a11y/nom` : accessibilité ;
- `chore/nom` : maintenance.

Utiliser des commits clairs, atomiques et vérifiables.

## Une Pull Request doit contenir

- problème résolu et contexte ;
- captures en clair, sombre, français et arabe si visuel ;
- impact API et migration ;
- tests ajoutés ;
- contrôle clavier et accessibilité ;
- documentation mise à jour ;
- licences des nouvelles ressources ;
- checklist remplie honnêtement.

## Checklist

- [ ] Build, lint et typecheck passent.
- [ ] Tests unitaires et d’interaction passent.
- [ ] Aucun nouvel échec automatique d’accessibilité.
- [ ] Navigation clavier vérifiée.
- [ ] LTR et RTL vérifiés.
- [ ] Thèmes clair, sombre et contraste élevé vérifiés.
- [ ] Mobile 320 CSS px et zoom 200 % vérifiés.
- [ ] Documentation française et arabe actualisée.
- [ ] Changelog ou Changeset ajouté si nécessaire.
- [ ] Aucun changement incompatible non documenté.

## Contributions assistées par IA

Le contributeur reste responsable de tout contenu ou code proposé. Signaler l’assistance substantielle, vérifier les licences, relire les traductions et exécuter réellement les tests.
