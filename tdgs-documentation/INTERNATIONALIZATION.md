# Internationalisation français–arabe

## Principe

Le français LTR et l’arabe RTL sont des exigences natives du TDGS. Aucun composant stable ne doit dépendre d’une direction unique.

## Règles techniques

- utiliser `lang="fr"` ou `lang="ar"` et `dir="rtl"` pour l’arabe ;
- privilégier les propriétés CSS logiques ;
- conserver un ordre DOM cohérent ;
- ne refléter une icône que si sa signification est directionnelle ;
- localiser dates, nombres, monnaies et pluriels avec les API standards ;
- tester les mélanges arabe/latin et les références techniques ;
- prévoir au moins 30 % d’expansion des libellés ;
- ne jamais mettre du texte important dans une image.

## Typographie

- Source Sans 3 pour le français ;
- Noto Naskh Arabic pour l’arabe ;
- JetBrains Mono pour code et références techniques ;
- fallbacks locaux et métriques documentés ;
- hauteurs de ligne contrôlées séparément si nécessaire.

## Traduction

- conserver un glossaire institutionnel versionné ;
- faire valider les termes juridiques et administratifs par un spécialiste humain ;
- marquer clairement toute traduction en attente ;
- traduire sens et usage, pas uniquement les mots ;
- éviter les chaînes concaténées.

## Checklist RTL

Les tests CSS vérifient les propriétés logiques et les points d'entrée directionnels des
contrôles. Les scénarios manuels et le parcours arabe complet restent à exécuter avant une
déclaration de support de production.

- [ ] navigation et fil d’Ariane ;
- [ ] formulaires et messages d’erreur ;
- [ ] tableaux et pagination ;
- [ ] modales et panneaux ;
- [ ] icônes directionnelles ;
- [ ] textes longs et contenus mixtes ;
- [ ] mobile, zoom et lecteur d’écran.
