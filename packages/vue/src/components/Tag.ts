import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { cx } from '../utils/cx';
import { attrClass, controlAttrs } from '../utils/attrs';

export type TagVariant = 'default' | 'info' | 'success' | 'warning' | 'danger';
export type TagSize = 'sm' | 'md';

export const Tag = defineComponent({
  name: 'TdsTag',
  inheritAttrs: false,
  props: {
    variant: { type: String as PropType<TagVariant>, default: 'default' },
    size: { type: String as PropType<TagSize>, default: 'md' },
    dot: { type: Boolean, default: false },
    removable: { type: Boolean, default: false },
    removeLabel: { type: String, default: 'Retirer' },
  },
  emits: ['remove'],
  setup(props, { attrs, slots, emit }) {
    return () =>
      h(
        'span',
        {
          ...controlAttrs(attrs),
          class: cx(
            'tds-tag',
            `tds-tag--${props.variant}`,
            `tds-tag--${props.size}`,
            attrClass(attrs)
          ),
          style: attrs.style,
        },
        [
          props.dot ? h('span', { class: 'tds-tag__dot', 'aria-hidden': 'true' }) : null,
          h('span', {}, slots.default?.()),
          props.removable
            ? h(
                'button',
                {
                  type: 'button',
                  class: 'tds-tag__remove',
                  'aria-label': props.removeLabel,
                  onClick: () => emit('remove'),
                },
                h('span', { 'aria-hidden': 'true' }, '×')
              )
            : null,
        ]
      );
  },
});
