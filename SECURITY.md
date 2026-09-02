# Politique de sécurité du TDGS

## Versions prises en charge

| Version                 | Support                                        |
| ----------------------- | ---------------------------------------------- |
| Dernière version stable | Correctifs de sécurité                         |
| Version précédente      | Selon la gravité et la capacité de maintenance |
| Versions bêta           | Sans garantie, signalements acceptés           |
| Versions obsolètes      | Non prises en charge                           |

Mettre ce tableau à jour à chaque version majeure.

## Signaler une vulnérabilité

Ne pas ouvrir d’issue publique. Utiliser le canal privé de sécurité du dépôt ou l’adresse institutionnelle qui sera publiée par l’équipe. Inclure : version, impact, reproduction minimale, environnement et proposition éventuelle.

Ne jamais envoyer de secret, pièce d’identité ou donnée citoyenne réelle.

## Traitement cible

1. Accusé de réception.
2. Qualification et gravité.
3. Reproduction dans un environnement isolé.
4. Correctif et tests de non-régression.
5. Publication coordonnée et avis de sécurité.
6. Analyse post-incident pour les événements majeurs.

Les délais précis seront publiés lorsque l’équipe de sécurité et sa capacité opérationnelle seront confirmées.

## Exigences de maintenance

- dépendances minimales et mises à jour ;
- verrouillage reproductible ;
- analyse des dépendances en CI ;
- aucun secret dans le dépôt ou les exemples ;
- politique CSP documentée ;
- provenance et licences des actifs ;
- validation des uploads et des URL dans les composants concernés ;
- publication npm protégée par authentification forte et droits minimaux.
