/**
 * Couche de composants JavaScript agnostiques de TDGS.
 *
 * Importer `@tdgs/core/elements` enregistre tous les custom elements `tds-*`
 * (effet de bord). Chaque élément améliore un balisage HTML/CSS qui reste
 * fonctionnel sans JavaScript.
 *
 *   import '@tdgs/core/elements';            // enregistre tout
 *   import { toast } from '@tdgs/core/elements';
 */
export { define, prefersReducedMotion, uid, focusable } from './base';

export { TdsIcon } from './icon';
export { TdsDisclosure } from './disclosure';
export { TdsTabs } from './tabs';
export { TdsTooltip } from './tooltip';
export { TdsToastRegion, toast } from './toast';
export type { ToastVariant, ToastOptions } from './toast';
export { TdsCopy } from './copy';
export { TdsBackToTop } from './back-to-top';
export { TdsSortableTable } from './sortable-table';
export { TdsConsent } from './consent';
export type { ConsentChoice, ConsentState } from './consent';

/** Force l'enregistrement (utile après un import de types uniquement). */
export function defineElements(): void {
  /* Les modules ci-dessus s'auto-enregistrent à l'import. */
}
