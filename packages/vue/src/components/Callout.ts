import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { cx } from '../utils/cx';
import { attrClass, controlAttrs } from '../utils/attrs';

export type CalloutVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export const Callout = defineComponent({
  name: 'TdsCallout',
  inheritAttrs: false,
  props: {
    variant: { type: String as PropType<CalloutVariant>, default: 'neutral' },
    title: { type: String, required: true },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'div',
        {
          ...controlAttrs(attrs),
          class: cx('tds-callout', `tds-callout--${props.variant}`, attrClass(attrs)),
          style: attrs.style,
        },
        [
          slots.icon
            ? h('span', { class: 'tds-callout__icon', 'aria-hidden': 'true' }, slots.icon())
            : null,
          h('div', { class: 'tds-callout__content' }, [
            h('h3', { class: 'tds-callout__title' }, props.title),
            slots.default ? h('div', { class: 'tds-callout__body' }, slots.default()) : null,
          ]),
        ]
      );
  },
});
