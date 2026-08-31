import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { cx } from '../utils/cx';
import { useGeneratedId } from '../utils/id';
import { attrClass, callEventHandler, controlAttrs, describedBy } from '../utils/attrs';
import type { FieldSize } from '../types';

export const TextField = defineComponent({
  name: 'TdsTextField',
  inheritAttrs: false,
  props: {
    label: { type: String, required: true },
    hint: { type: String, default: undefined },
    error: { type: String, default: undefined },
    size: { type: String as PropType<FieldSize>, default: 'md' },
    id: { type: String, default: undefined },
    required: { type: Boolean, default: false },
    type: { type: String, default: 'text' },
    modelValue: { type: String, default: undefined },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    const generatedId = useGeneratedId('tds-field');
    const fieldId = props.id ?? generatedId;
    const hintId = props.hint ? `${fieldId}-hint` : undefined;
    const errorId = props.error ? `${fieldId}-error` : undefined;

    return () => {
      const forwardedAttrs = controlAttrs(attrs);
      const fieldDescribedBy = describedBy(attrs, hintId, errorId);

      return h('div', { class: cx('tds-field', attrClass(attrs)), style: attrs.style }, [
        h('label', { class: 'tds-field__label', for: fieldId }, [
          props.label,
          props.required ? h('span', { 'aria-hidden': 'true' }, ' *') : null,
        ]),
        props.hint ? h('p', { id: hintId, class: 'tds-helper-text' }, props.hint) : null,
        h('input', {
          ...forwardedAttrs,
          id: fieldId,
          type: props.type,
          class: cx('tds-input', `tds-input--${props.size}`, props.error && 'tds-input--error'),
          'aria-describedby': fieldDescribedBy,
          'aria-invalid': props.error ? true : attrs['aria-invalid'],
          'aria-required': props.required || attrs['aria-required'] || undefined,
          required: props.required,
          value: props.modelValue,
          onInput: (event: Event) => {
            callEventHandler(attrs.onInput, event);
            emit('update:modelValue', (event.target as HTMLInputElement).value);
          },
        }),
        props.error
          ? h('p', { id: errorId, class: 'tds-error-text', role: 'alert' }, props.error)
          : null,
      ]);
    };
  },
});
