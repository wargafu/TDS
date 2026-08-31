import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { cx } from '../utils/cx';

export type BadgeVariant = 'default' | 'info' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'sm' | 'md';

export const Badge = defineComponent({
  name: 'TdsBadge',
  props: {
    variant: { type: String as PropType<BadgeVariant>, default: 'default' },
    size: { type: String as PropType<BadgeSize>, default: 'md' },
    square: { type: Boolean, default: false },
    dot: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'span',
        {
          class: cx(
            'tds-badge',
            `tds-badge--${props.variant}`,
            `tds-badge--${props.size}`,
            props.square && 'tds-badge--square'
          ),
        },
        [
          props.dot ? h('span', { class: 'tds-badge__dot', 'aria-hidden': 'true' }) : null,
          slots.default?.(),
        ]
      );
  },
});
