import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { cx } from '../utils/cx';
import { attrClass, controlAttrs } from '../utils/attrs';

export type CardVariant = 'flat' | 'elevated' | 'outlined';

export const Card = defineComponent({
  name: 'TdsCard',
  inheritAttrs: false,
  props: {
    variant: { type: String as PropType<CardVariant>, default: 'flat' },
    href: { type: String, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        props.href ? 'a' : 'div',
        {
          ...controlAttrs(attrs),
          href: props.href,
          class: cx('tds-card', `tds-card--${props.variant}`, attrClass(attrs)),
        },
        slots.default?.()
      );
  },
});

export const CardHeader = defineComponent({
  name: 'TdsCardHeader',
  setup(_props, { slots }) {
    return () => h('div', { class: 'tds-card__header' }, slots.default?.());
  },
});

export const CardBody = defineComponent({
  name: 'TdsCardBody',
  setup(_props, { slots }) {
    return () => h('div', { class: 'tds-card__body' }, slots.default?.());
  },
});

export const CardFooter = defineComponent({
  name: 'TdsCardFooter',
  setup(_props, { slots }) {
    return () => h('div', { class: 'tds-card__footer' }, slots.default?.());
  },
});

export const CardMedia = defineComponent({
  name: 'TdsCardMedia',
  setup(_props, { slots }) {
    return () => h('div', { class: 'tds-card__media' }, slots.default?.());
  },
});

export const CardTitle = defineComponent({
  name: 'TdsCardTitle',
  setup(_props, { slots }) {
    return () => h('h3', { class: 'tds-card__title' }, slots.default?.());
  },
});

export const CardSubtitle = defineComponent({
  name: 'TdsCardSubtitle',
  setup(_props, { slots }) {
    return () => h('p', { class: 'tds-card__subtitle' }, slots.default?.());
  },
});

export const CardDescription = defineComponent({
  name: 'TdsCardDescription',
  setup(_props, { slots }) {
    return () => h('p', { class: 'tds-card__description' }, slots.default?.());
  },
});
