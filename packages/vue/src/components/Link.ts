import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { cx } from '../utils/cx';
import { attrClass, controlAttrs } from '../utils/attrs';

export type LinkVariant = 'default' | 'muted' | 'danger' | 'external' | 'nav' | 'standalone';

export const Link = defineComponent({
  name: 'TdsLink',
  inheritAttrs: false,
  props: {
    variant: { type: String as PropType<LinkVariant>, default: 'default' },
    href: { type: String, required: true },
    target: { type: String, default: undefined },
    rel: { type: String, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const isExternal = props.variant === 'external';
      return h(
        'a',
        {
          ...controlAttrs(attrs),
          href: props.href,
          class: cx(
            'tds-link',
            props.variant !== 'default' && `tds-link--${props.variant}`,
            attrClass(attrs)
          ),
          target: isExternal ? (props.target ?? '_blank') : props.target,
          rel: isExternal ? (props.rel ?? 'noopener noreferrer') : props.rel,
        },
        slots.default?.()
      );
    };
  },
});
