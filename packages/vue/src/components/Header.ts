import { defineComponent, h } from 'vue';
import { cx } from '../utils/cx';

export const Header = defineComponent({
  name: 'TdsHeader',
  props: {
    compact: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'header',
        { class: cx('tds-header', props.compact && 'tds-header--compact') },
        slots.default?.()
      );
  },
});

export const HeaderBrand = defineComponent({
  name: 'TdsHeaderBrand',
  props: {
    href: { type: String, default: '/' },
    logoSrc: { type: String, required: true },
    logoAlt: { type: String, required: true },
    title: { type: String, required: true },
    tagline: { type: String, default: undefined },
  },
  setup(props) {
    return () =>
      h('a', { href: props.href, class: 'tds-header__brand' }, [
        h('img', { src: props.logoSrc, alt: props.logoAlt, class: 'tds-header__logo' }),
        h('div', { class: 'tds-header__titles' }, [
          h('span', { class: 'tds-header__title' }, props.title),
          props.tagline ? h('span', { class: 'tds-header__tagline' }, props.tagline) : null,
        ]),
      ]);
  },
});

export const HeaderActions = defineComponent({
  name: 'TdsHeaderActions',
  setup(_props, { slots }) {
    return () => h('div', { class: 'tds-header__actions' }, slots.default?.());
  },
});

export const HeaderStripe = defineComponent({
  name: 'TdsHeaderStripe',
  setup() {
    return () =>
      h('div', { class: 'tds-header__stripe', 'aria-hidden': 'true' }, [
        h('span'),
        h('span'),
        h('span'),
      ]);
  },
});
