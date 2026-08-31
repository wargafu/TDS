import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { cx } from '../utils/cx';
import { attrClass, controlAttrs } from '../utils/attrs';

export interface SummaryItem {
  label: string;
  href: string;
}

export const Summary = defineComponent({
  name: 'TdsSummary',
  inheritAttrs: false,
  props: {
    items: { type: Array as PropType<SummaryItem[]>, required: true },
    title: { type: String, default: 'Sommaire' },
    label: { type: String, default: 'Sommaire de la page' },
  },
  setup(props, { attrs }) {
    return () =>
      h(
        'nav',
        {
          ...controlAttrs(attrs),
          class: cx('tds-summary', attrClass(attrs)),
          style: attrs.style,
          'aria-label': props.label,
        },
        [
          h('p', { class: 'tds-summary__title' }, props.title),
          h(
            'ol',
            { class: 'tds-summary__list' },
            props.items.map((item) =>
              h('li', { key: item.href }, [
                h('a', { class: 'tds-summary__link', href: item.href }, item.label),
              ])
            )
          ),
        ]
      );
  },
});
