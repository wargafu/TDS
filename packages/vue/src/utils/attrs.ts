export type ComponentAttrs = Record<string, unknown>;

export function attrClass(attrs: ComponentAttrs): string | undefined {
  return typeof attrs.class === 'string' ? attrs.class : undefined;
}

export function describedBy(
  attrs: ComponentAttrs,
  ...ids: Array<string | undefined>
): string | undefined {
  const externalId =
    typeof attrs['aria-describedby'] === 'string' ? attrs['aria-describedby'] : undefined;
  return [externalId, ...ids].filter(Boolean).join(' ') || undefined;
}

export function controlAttrs(attrs: ComponentAttrs): ComponentAttrs {
  const rest = { ...attrs };
  delete rest.class;
  delete rest.style;
  return rest;
}

export function callEventHandler(handler: unknown, event: Event): void {
  if (typeof handler === 'function') {
    handler(event);
    return;
  }

  if (Array.isArray(handler)) {
    handler.forEach((entry) => {
      if (typeof entry === 'function') entry(event);
    });
  }
}
