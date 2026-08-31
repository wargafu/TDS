let counter = 0;

export function useGeneratedId(prefix: string): string {
  counter += 1;
  return `${prefix}-${counter}`;
}
