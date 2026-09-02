import { defineComponent, h } from 'vue';
import { cx } from '../utils/cx';
import { attrClass } from '../utils/attrs';

export const Logo = defineComponent({
  name: 'TdsLogo',
  inheritAttrs: false,
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, default: undefined },
    href: { type: String, default: undefined },
    onDark: { type: Boolean, default: false },
  },
  setup(props, { attrs, slots }) {
    const classes = () => cx('tds-logo', props.onDark && 'tds-logo--on-dark', attrClass(attrs));
    const content = () => [
      h('span', { class: 'tds-logo__mark', 'aria-hidden': 'true' }, slots.mark?.()),
      h('span', { class: 'tds-logo__text' }, [
        h('span', { class: 'tds-logo__title' }, props.title),
        props.subtitle ? h('span', { class: 'tds-logo__subtitle' }, props.subtitle) : null,
      ]),
    ];

    return () =>
      props.href
        ? h('a', { href: props.href, class: classes(), style: attrs.style }, content())
        : h('span', { class: classes(), style: attrs.style }, content());
  },
});
