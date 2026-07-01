/**
 * TDS z-index scale.
 *
 * Valeurs verrouillées pour garantir une hiérarchie stable et éviter les z-index arbitraires.
 * Utiliser uniquement ces tokens dans le design system.
 */
export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  toast: 500,
  tooltip: 600
} as const;

export type ZIndexTokens = typeof zIndex;
export default zIndex;
