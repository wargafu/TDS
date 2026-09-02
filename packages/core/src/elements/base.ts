/**
 * Utilitaires communs aux custom elements TDGS.
 *
 * Tous les éléments suivent l'amélioration progressive : le balisage HTML +
 * CSS fonctionne seul ; l'élément « améliore » l'expérience s'il est chargé.
 * Aucune dépendance de runtime, sûr côté serveur (gardes `typeof`).
 */

/** Enregistre `tag` s'il ne l'est pas déjà, sans échouer côté serveur. */
export function define(tag: string, ctor: CustomElementConstructor): void {
  if (typeof customElements === 'undefined') return;
  if (!customElements.get(tag)) customElements.define(tag, ctor);
}

/** L'utilisateur a demandé une réduction des animations. */
export function prefersReducedMotion(): boolean {
  return (
    typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/** Génère un identifiant unique et stable pour la durée de vie de la page. */
let idCounter = 0;
export function uid(prefix = 'tds'): string {
  idCounter += 1;
  return `${prefix}-${idCounter}-${Math.random().toString(36).slice(2, 7)}`;
}

/** Retourne les éléments focusables contenus dans `root`. */
export function focusable(root: ParentNode): HTMLElement[] {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => el.offsetParent !== null || el === document.activeElement);
}
