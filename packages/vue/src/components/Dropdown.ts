import { defineComponent, h, ref } from 'vue';
import { cx } from '../utils/cx';
import { attrClass } from '../utils/attrs';

export const Dropdown = defineComponent({
  name: 'TdsDropdown',
  inheritAttrs: false,
  props: {
    label: { type: String, required: true },
    align: { type: String, default: 'start' },
  },
  setup(props, { attrs, slots }) {
    const open = ref(false);

    return () =>
      h(
        'div',
        {
          class: cx(
            'tds-dropdown',
            props.align === 'end' ? 'tds-dropdown--right' : undefined,
            attrClass(attrs)
          ),
          style: attrs.style,
          'data-open': open.value,
        },
        [
          h(
            'button',
            {
              type: 'button',
              class: 'tds-button tds-button--tertiary tds-button--md',
              'aria-haspopup': 'menu',
              'aria-expanded': open.value,
              onClick: () => {
                open.value = !open.value;
              },
            },
            [slots.trigger?.() ?? props.label, h('span', { 'aria-hidden': 'true' }, ' ▾')]
          ),
          h('ul', { class: 'tds-dropdown__menu', role: 'menu' }, slots.default?.()),
        ]
      );
  },
});
