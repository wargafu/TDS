# État de maturité du TDGS

> TDGS est un système de design open source proposé pour les services numériques publics du
> Tchad. Cet état ne constitue ni une homologation institutionnelle ni une certification.

## Position actuelle

Le dépôt est techniquement fonctionnel et prêt pour des intégrations contrôlées et des projets
pilotes. Le catalogue couvre 21 familles de composants CSS-first, avec des bindings React et Vue,
un utilitaire d'icônes SVG initial, des tokens générés et des templates statiques de portail
citoyen et de tableau de bord administratif.

## Éléments vérifiés dans le dépôt

- build Core, React, Vue et documentation ;
- exports du package core et contenu des tarballs en mode `npm pack --dry-run` ;
- tests unitaires Core, React et Vue ;
- typecheck TypeScript, ESLint, Stylelint et Prettier ;
- validation des tokens, des exports, du site statique et des templates ;
- support CSS des thèmes, `forced-colors`, propriétés logiques et points d'entrée RTL.

## Conditions avant production institutionnelle

- audit indépendant d'accessibilité et tests avec technologies d'assistance ;
- revue de sécurité, des licences, des données et des contenus ;
- validation linguistique française/arabe ;
- validation juridique et institutionnelle de la dénomination, de la marque et des symboles ;
- publication npm autorisée et exécutée depuis une release vérifiée ;
- projets pilotes documentés avec retours des équipes et des usagers.

Tant que ces conditions ne sont pas remplies, utiliser les formulations « proposé », « en phase
pilote » ou « techniquement fonctionnel », et éviter « officiel », « homologué » ou « conforme
WCAG 2.2 AA ».
