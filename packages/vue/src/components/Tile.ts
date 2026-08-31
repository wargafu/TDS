import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { cx } from '../utils/cx';
import { attrClass, controlAttrs } from '../utils/attrs';

export type TileVariant = 'default' | 'elevated';

export const Tile = defineComponent({
  name: 'TdsTile',
  inheritAttrs: false,
  props: {
    href: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: undefined },
    variant: { type: String as PropType<TileVariant>, default: 'default' },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'a',
        {
          ...controlAttrs(attrs),
          href: props.href,
          class: cx('tds-tile', `tds-tile--${props.variant}`, attrClass(attrs)),
          style: attrs.style,
        },
        [
          slots.icon
            ? h('span', { class: 'tds-tile__icon', 'aria-hidden': 'true' }, slots.icon())
            : null,
          h('span', { class: 'tds-tile__content' }, [
            h('span', { class: 'tds-tile__title' }, props.title),
            props.description
              ? h('span', { class: 'tds-tile__description' }, props.description)
              : null,
            slots.default ? h('span', { class: 'tds-tile__body' }, slots.default()) : null,
          ]),
          h('span', { class: 'tds-tile__arrow', 'aria-hidden': 'true' }, '→'),
        ]
      );
  },
});
