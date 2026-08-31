# Cycle de vie des composants

## Statuts

| Statut       | Signification                            |
| ------------ | ---------------------------------------- |
| Proposition  | Besoin en analyse                        |
| Expérimental | API et design susceptibles de changer    |
| Bêta         | Utilisable en pilote, retours recherchés |
| Stable       | Contrat complet satisfait                |
| Déprécié     | Remplacement et calendrier publiés       |
| Retiré       | Absent d’une version majeure suivante    |

## Processus

1. Décrire le problème, les usagers et les preuves.
2. Vérifier qu’un composant existant ne répond pas au besoin.
3. Mener recherche UX et analyse de contenu.
4. Concevoir anatomie, comportements, RTL et accessibilité.
5. Prototyper et tester.
6. Implémenter avec tests.
7. Documenter en français et arabe.
8. Publier en expérimental ou bêta.
9. Valider sur des projets pilotes.
10. Stabiliser, réviser ou retirer.

## Définition de stable

- [ ] besoin démontré ;
- [ ] API cohérente ;
- [ ] HTML sémantique ;
- [ ] variantes et états complets ;
- [ ] clavier et technologies d’assistance testés ;
- [ ] clair, sombre et contraste élevé ;
- [ ] LTR et RTL ;
- [ ] 320 CSS px et zoom 200 % ;
- [ ] tests automatiques et visuels ;
- [ ] documentation bilingue ;
- [ ] exemples exacts ;
- [ ] version d’introduction et changelog.

## Dépréciation

Annoncer la raison, le remplacement, un guide de migration et la version prévue de retrait. Une rupture stable exige une version majeure, sauf correction urgente de sécurité.
