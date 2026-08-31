import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { cx } from '../utils/cx';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const Breadcrumb = defineComponent({
  name: 'TdsBreadcrumb',
  props: {
    items: { type: Array as PropType<BreadcrumbItem[]>, required: true },
    label: { type: String, default: "Fil d'Ariane" },
  },
  setup(props) {
    return () =>
      h('nav', { class: cx('tds-breadcrumb'), 'aria-label': props.label }, [
        h(
          'ol',
          { class: 'tds-breadcrumb__list' },
          props.items.map((item, index) => {
            const isCurrent = index === props.items.length - 1;
            return h('li', { class: 'tds-breadcrumb__item', key: `${item.label}-${index}` }, [
              isCurrent || !item.href
                ? h(
                    'span',
                    {
                      class: 'tds-breadcrumb__current',
                      'aria-current': isCurrent ? 'page' : undefined,
                    },
                    item.label
                  )
                : h('a', { href: item.href, class: 'tds-breadcrumb__link' }, item.label),
            ]);
          })
        ),
      ]);
  },
});
