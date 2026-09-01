import { defineComponent, h } from 'vue';
import { cx } from '../utils/cx';
import { attrClass, controlAttrs } from '../utils/attrs';
import { useGeneratedId } from '../utils/id';

export const Range = defineComponent({
  name: 'TdsRange',
  inheritAttrs: false,
  props: {
    id: { type: String, default: undefined },
    label: { type: String, required: true },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number, default: 1 },
    modelValue: { type: Number, default: undefined },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    const generatedId = useGeneratedId('tds-range');
    const rangeId = props.id ?? generatedId;

    return () => {
      const current = typeof props.modelValue === 'number' ? props.modelValue : Number(props.min);

      return h('div', { class: cx('tds-range', attrClass(attrs)), style: attrs.style }, [
        h('div', { class: 'tds-range__header' }, [
          h('label', { class: 'tds-range__label', for: rangeId }, props.label),
          h('span', { class: 'tds-range__value', 'aria-hidden': 'true' }, String(current)),
        ]),
        h('input', {
          ...controlAttrs(attrs),
          id: rangeId,
          class: 'tds-range__input',
          type: 'range',
          min: props.min,
          max: props.max,
          step: props.step,
          value: props.modelValue,
          onInput: (event: Event) => {
            const value = Number((event.target as HTMLInputElement).value);
            emit('update:modelValue', value);
          },
        }),
      ]);
    };
  },
});
