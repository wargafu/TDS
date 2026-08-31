import { defineComponent, h } from 'vue';
import { cx } from '../utils/cx';
import { attrClass, controlAttrs } from '../utils/attrs';

export const Download = defineComponent({
  name: 'TdsDownload',
  inheritAttrs: false,
  props: {
    href: { type: String, required: true },
    label: { type: String, required: true },
    description: { type: String, default: undefined },
    meta: { type: String, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'a',
        {
          ...controlAttrs(attrs),
          href: props.href,
          class: cx('tds-download', attrClass(attrs)),
          style: attrs.style,
        },
        [
          h('span', { class: 'tds-download__icon', 'aria-hidden': 'true' }, slots.icon?.() ?? '↓'),
          h('span', { class: 'tds-download__content' }, [
            h('span', { class: 'tds-download__label' }, props.label),
            props.description
              ? h('span', { class: 'tds-download__description' }, props.description)
              : null,
            props.meta ? h('span', { class: 'tds-download__meta' }, props.meta) : null,
          ]),
        ]
      );
  },
});
