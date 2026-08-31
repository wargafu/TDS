import { defineComponent, h } from 'vue';
import { cx } from '../utils/cx';

export const Accordion = defineComponent({
  name: 'TdsAccordion',
  setup(_props, { slots }) {
    return () => h('div', { class: cx('tds-accordion') }, slots.default?.());
  },
});

export const AccordionItem = defineComponent({
  name: 'TdsAccordionItem',
  props: {
    title: { type: String, required: true },
    defaultOpen: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    return () =>
      h('details', { class: 'tds-accordion__item', open: props.defaultOpen }, [
        h('summary', { class: 'tds-accordion__trigger' }, [
          props.title,
          h(
            'svg',
            {
              class: 'tds-accordion__icon',
              'aria-hidden': 'true',
              viewBox: '0 0 16 16',
              fill: 'none',
              stroke: 'currentColor',
              'stroke-width': 2,
            },
            [h('path', { d: 'M4 6l4 4 4-4' })]
          ),
        ]),
        h('div', { class: 'tds-accordion__content' }, slots.default?.()),
      ]);
  },
});
