import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { cx } from '../utils/cx';

export interface NavItem {
  label: string;
  href: string;
  current?: boolean;
}

export const Nav = defineComponent({
  name: 'TdsNav',
  props: {
    items: { type: Array as PropType<NavItem[]>, required: true },
    label: { type: String, default: 'Navigation principale' },
    muted: { type: Boolean, default: false },
  },
  setup(props) {
    return () =>
      h(
        'nav',
        { class: cx('tds-nav', props.muted && 'tds-nav--muted'), 'aria-label': props.label },
        [
          h(
            'ul',
            { class: 'tds-nav__list' },
            props.items.map((item) =>
              h('li', { key: item.href }, [
                h(
                  'a',
                  {
                    href: item.href,
                    class: 'tds-nav__link',
                    'aria-current': item.current ? 'page' : undefined,
                  },
                  item.label
                ),
              ])
            )
          ),
        ]
      );
  },
});
