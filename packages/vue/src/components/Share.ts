import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { cx } from '../utils/cx';
import { attrClass } from '../utils/attrs';

export interface ShareLink {
  network: string;
  label: string;
  href: string;
}

export const Share = defineComponent({
  name: 'TdsShare',
  inheritAttrs: false,
  props: {
    title: { type: String, default: undefined },
    iconOnly: { type: Boolean, default: false },
    links: { type: Array as PropType<ShareLink[]>, required: true },
  },
  setup(props, { attrs }) {
    return () =>
      h('div', { class: cx('tds-share', attrClass(attrs)), style: attrs.style }, [
        props.title ? h('p', { class: 'tds-share__title' }, props.title) : null,
        h('ul', { class: 'tds-share__list' }, [
          props.links.map((link) =>
            h('li', { class: 'tds-share__item', key: `${link.network}-${link.href}` }, [
              h(
                'a',
                {
                  class: cx(
                    'tds-share__link',
                    `tds-share__link-${link.network}`,
                    props.iconOnly && 'tds-share__link-icon'
                  ),
                  href: link.href,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                },
                props.iconOnly ? undefined : h('span', link.label)
              ),
            ])
          ),
        ]),
      ]);
  },
});
