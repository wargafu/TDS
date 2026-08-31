/** TDGS download tokens — accès explicite à une ressource téléchargeable. */
export const download = {
  defaults: {
    background: 'var(--tds-download-bg)',
    border: 'var(--tds-download-border)',
    color: 'var(--tds-download-color)',
    accent: 'var(--tds-download-accent)',
  },
} as const;

export type DownloadTokens = typeof download;
export default download;
