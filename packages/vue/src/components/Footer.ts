import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { cx } from '../utils/cx';

export const Footer = defineComponent({
  name: 'TdsFooter',
  setup(_props, { slots }) {
    return () => h('footer', { class: cx('tds-footer') }, slots.default?.());
  },
});

export const FooterTop = defineComponent({
  name: 'TdsFooterTop',
  setup(_props, { slots }) {
    return () => h('div', { class: 'tds-footer__top' }, slots.default?.());
  },
});

export const FooterBottom = defineComponent({
  name: 'TdsFooterBottom',
  setup(_props, { slots }) {
    return () => h('div', { class: 'tds-footer__bottom' }, slots.default?.());
  },
});

export const FooterBrand = defineComponent({
  name: 'TdsFooterBrand',
  setup(_props, { slots }) {
    return () => h('div', { class: 'tds-footer__brand' }, slots.default?.());
  },
});

export const FooterNav = defineComponent({
  name: 'TdsFooterNav',
  props: {
    label: { type: String, default: 'Liens du pied de page' },
  },
  setup(props, { slots }) {
    return () =>
      h('nav', { class: 'tds-footer__nav', 'aria-label': props.label }, slots.default?.());
  },
});

export interface FooterLinkItem {
  label: string;
  href: string;
}

export const FooterNavGroup = defineComponent({
  name: 'TdsFooterNavGroup',
  props: {
    title: { type: String, required: true },
    links: { type: Array as PropType<FooterLinkItem[]>, required: true },
  },
  setup(props) {
    return () =>
      h('div', { class: 'tds-footer__nav-group' }, [
        h('div', { class: 'tds-footer__nav-title' }, props.title),
        ...props.links.map((link) =>
          h('a', { key: link.href, href: link.href, class: 'tds-footer__link' }, link.label)
        ),
      ]);
  },
});

export const FooterLink = defineComponent({
  name: 'TdsFooterLink',
  props: {
    href: { type: String, required: true },
  },
  setup(props, { slots }) {
    return () => h('a', { href: props.href, class: 'tds-footer__link' }, slots.default?.());
  },
});

export const FooterLegal = defineComponent({
  name: 'TdsFooterLegal',
  setup(_props, { slots }) {
    return () => h('div', { class: 'tds-footer__legal' }, slots.default?.());
  },
});
