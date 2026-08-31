import { defineComponent, h } from 'vue';
import { cx } from '../utils/cx';
import { attrClass, controlAttrs } from '../utils/attrs';

export const Quote = defineComponent({
  name: 'TdsQuote',
  inheritAttrs: false,
  props: {
    author: { type: String, default: undefined },
    source: { type: String, default: undefined },
    sourceHref: { type: String, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'blockquote',
        {
          ...controlAttrs(attrs),
          class: cx('tds-quote', attrClass(attrs)),
          style: attrs.style,
        },
        [
          h('p', { class: 'tds-quote__text' }, slots.default?.()),
          props.author || props.source
            ? h('footer', { class: 'tds-quote__footer' }, [
                props.author ? h('span', { class: 'tds-quote__author' }, props.author) : null,
                props.source
                  ? h('cite', { class: 'tds-quote__source' }, [
                      props.sourceHref
                        ? h('a', { href: props.sourceHref }, props.source)
                        : props.source,
                    ])
                  : null,
              ])
            : null,
        ]
      );
  },
});
