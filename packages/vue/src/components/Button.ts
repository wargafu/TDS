import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { cx } from '../utils/cx';
import { attrClass, controlAttrs } from '../utils/attrs';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

export const Button = defineComponent({
  name: 'TdsButton',
  inheritAttrs: false,
  props: {
    variant: { type: String as PropType<ButtonVariant>, default: 'primary' },
    size: { type: String as PropType<ButtonSize>, default: 'md' },
    type: { type: String as PropType<'button' | 'submit' | 'reset'>, default: 'button' },
    loading: { type: Boolean, default: false },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        'button',
        {
          ...controlAttrs(attrs),
          type: props.type,
          class: cx(
            'tds-button',
            `tds-button--${props.variant}`,
            `tds-button--${props.size}`,
            attrClass(attrs)
          ),
          disabled: props.loading || attrs.disabled || undefined,
          'aria-disabled': props.loading || attrs.disabled || attrs['aria-disabled'] || undefined,
          'aria-busy': props.loading || attrs['aria-busy'] || undefined,
          'data-loading': props.loading || undefined,
        },
        slots.default?.()
      );
  },
});
