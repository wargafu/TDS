/** TDGS search field tokens. */
export const search = {
  layout: {
    gap: 'var(--tds-search-gap)',
    controlGap: 'var(--tds-search-control-gap)',
  },
  control: {
    background: 'var(--tds-search-bg)',
    border: 'var(--tds-search-border)',
    text: 'var(--tds-search-text)',
    placeholder: 'var(--tds-search-placeholder)',
    focusBorder: 'var(--tds-search-focus-border)',
  },
  submit: {
    background: 'var(--tds-search-submit-bg)',
    hoverBackground: 'var(--tds-search-submit-hover-bg)',
    text: 'var(--tds-search-submit-text)',
  },
} as const;

export type SearchTokens = typeof search;
export default search;
