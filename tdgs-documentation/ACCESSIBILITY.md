# Accessibilité du TDGS

## Engagement

Le TDGS vise WCAG 2.2 niveau AA. Cette cible concerne le code, la documentation, les modèles et les pratiques éditoriales. Elle ne garantit pas automatiquement la conformité d’un service qui utilise le TDGS.

## Exigences minimales

- HTML natif et sémantique ;
- usage ARIA seulement lorsque nécessaire ;
- navigation complète au clavier et focus visible ;
- contraste AA, information jamais transmise uniquement par la couleur ;
- reflow à 320 CSS px et zoom à 200 % ;
- cibles tactiles d’au moins 44 × 44 CSS px lorsque possible ;
- support de `prefers-reduced-motion` et `forced-colors` ;
- erreurs associées aux champs et résumé d’erreurs ;
- textes alternatifs et transcriptions ;
- fonctionnement LTR et RTL.

## Validation d’un composant

- [ ] structure et nom accessible ;
- [ ] parcours clavier documenté ;
- [ ] focus visible et logique ;
- [ ] états désactivé, erreur, chargement et lecture seule ;
- [ ] zoom, reflow et tactile ;
- [ ] thèmes et contraste élevé ;
- [ ] tests automatiques axe-core ;
- [ ] test manuel NVDA avec Firefox ou Chrome ;
- [ ] test manuel VoiceOver avec Safari ;
- [ ] test en français et arabe.

Une case ne peut être cochée que si le test a réellement été exécuté. Les résultats manuels doivent indiquer la date, la version, l’environnement et le testeur.

## Déclaration

Publier une déclaration d’accessibilité pour le site documentaire lui-même, avec état de conformité, méthode d’audit, contenus non accessibles, contact et voie de recours adaptés au cadre tchadien validé.

## Limites connues

Les limites sont publiées par version. Aucun résultat automatique ne suffit à déclarer une conformité complète.
