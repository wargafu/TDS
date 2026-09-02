import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { cx } from '../utils/cx';
import { attrClass } from '../utils/attrs';
import { useGeneratedId } from '../utils/id';

export interface SegmentedOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export const Segmented = defineComponent({
  name: 'TdsSegmented',
  inheritAttrs: false,
  props: {
    label: { type: String, required: true },
    name: { type: String, default: undefined },
    options: { type: Array as PropType<SegmentedOption[]>, required: true },
    modelValue: { type: String, default: undefined },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    const generatedId = useGeneratedId('tds-segmented');
    const groupName = props.name ?? generatedId;

    return () =>
      h(
        'div',
        {
          class: cx('tds-segmented', attrClass(attrs)),
          role: 'radiogroup',
          'aria-label': props.label,
          style: attrs.style,
        },
        props.options.map((option) =>
          h('div', { class: 'tds-segmented__item', key: option.value }, [
            h('input', {
              id: `${groupName}-${option.value}`,
              type: 'radio',
              name: groupName,
              value: option.value,
              class: 'tds-segmented__input',
              checked: props.modelValue === option.value,
              disabled: option.disabled,
              onChange: () => emit('update:modelValue', option.value),
            }),
            h(
              'label',
              { class: 'tds-segmented__label', for: `${groupName}-${option.value}` },
              option.label
            ),
          ])
        )
      );
  },
});
