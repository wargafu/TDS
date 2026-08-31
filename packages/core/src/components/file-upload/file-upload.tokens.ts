/** TDGS file upload tokens. */
export const fileUpload = {
  layout: { gap: 'var(--tds-file-upload-gap)' },
  control: {
    background: 'var(--tds-file-upload-bg)',
    border: 'var(--tds-file-upload-border)',
    hoverBorder: 'var(--tds-file-upload-hover-border)',
    focusBorder: 'var(--tds-file-upload-focus-border)',
  },
  message: { error: 'var(--tds-file-upload-error)' },
} as const;

export type FileUploadTokens = typeof fileUpload;
export default fileUpload;
