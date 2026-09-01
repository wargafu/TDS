import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { cx } from '../utils/cx';
import { attrClass } from '../utils/attrs';

export interface SidemenuItem {
  id: string;
  label: string;
  href: string;
  current?: boolean;
}

export const Sidemenu = defineComponent({
  name: 'TdsSidemenu',
  inheritAttrs: false,
  props: {
    title: { type: String, default: undefined },
    ariaLabel: { type: String, default: undefined },
    inline: { type: Boolean, default: false },
    items: { type: Array as PropType<SidemenuItem[]>, required: true },
  },
  setup(props, { attrs }) {
    return () =>
      h(
        'nav',
        {
          class: cx('tds-sidemenu', props.inline && 'tds-sidemenu--inline', attrClass(attrs)),
          'aria-label': props.ariaLabel ?? props.title,
          style: attrs.style,
        },
        [
          props.title ? h('p', { class: 'tds-sidemenu__title' }, props.title) : null,
          h('ul', { class: 'tds-sidemenu__list' }, [
            props.items.map((item) =>
              h('li', { class: 'tds-sidemenu__item', key: item.id }, [
                h(
                  'a',
                  {
                    class: 'tds-sidemenu__link',
                    href: item.href,
                    'aria-current': item.current ? 'page' : undefined,
                  },
                  item.label
                ),
              ])
            ),
          ]),
        ]
      );
  },
});
