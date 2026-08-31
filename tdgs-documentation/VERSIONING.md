# Versionnement et publication

## SemVer

Le TDGS suit `MAJEUR.MINEUR.CORRECTIF` :

- MAJEUR : incompatibilité publique ;
- MINEUR : fonctionnalité rétrocompatible ;
- CORRECTIF : correction rétrocompatible.

Les composants expérimentaux peuvent évoluer plus vite, avec avertissement explicite.

## Avant publication

- [ ] Changeset ou entrée de changement ;
- [ ] changelog généré et relu ;
- [ ] build, lint, typecheck et tests réussis ;
- [ ] exports npm validés ;
- [ ] accessibilité automatique sans erreur critique ;
- [ ] scénarios manuels requis documentés ;
- [ ] documentation et exemples synchronisés ;
- [ ] licences et dépendances vérifiées ;
- [ ] guide de migration pour toute dépréciation ou rupture.

## Canaux

- `latest` : version stable ;
- `next` : préversion testable ;
- versions archivées de la documentation pour les majeures prises en charge.

## Compatibilité

Les APIs publiques incluent classes CSS, variables, exports, attributs, événements et structure DOM documentée. Tout changement de contrat doit être analysé comme une rupture potentielle.

## Publication

La publication doit être reproductible, protégée par authentification forte, permissions minimales et provenance lorsque disponible. Ne jamais publier depuis un poste ou une branche non vérifiée.
