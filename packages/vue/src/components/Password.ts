import { defineComponent, h, ref } from 'vue';
import type { PropType } from 'vue';
import { cx } from '../utils/cx';
import { useGeneratedId } from '../utils/id';
import { attrClass, callEventHandler, controlAttrs, describedBy } from '../utils/attrs';
import type { FieldSize } from '../types';

/** Icône « œil » décorative (SVG inline, aria-hidden). */
function eyeIcon(hidden: boolean) {
  const common = {
    'aria-hidden': 'true',
    width: '18',
    height: '18',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '2',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  } as const;

  return h(
    'svg',
    common,
    hidden
      ? [
          h('path', {
            d: 'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94',
          }),
          h('path', {
            d: 'M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19',
          }),
          h('line', { x1: '1', y1: '1', x2: '23', y2: '23' }),
        ]
      : [
          h('path', { d: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z' }),
          h('circle', { cx: '12', cy: '12', r: '3' }),
        ]
  );
}

export const Password = defineComponent({
  name: 'TdsPassword',
  inheritAttrs: false,
  props: {
    label: { type: String, required: true },
    hint: { type: String, default: undefined },
    error: { type: String, default: undefined },
    size: { type: String as PropType<FieldSize>, default: 'md' },
    id: { type: String, default: undefined },
    required: { type: Boolean, default: false },
    modelValue: { type: String, default: undefined },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    const generatedId = useGeneratedId('tds-password');
    const fieldId = props.id ?? generatedId;
    const visible = ref(false);
    const hintId = props.hint ? `${fieldId}-hint` : undefined;
    const errorId = props.error ? `${fieldId}-error` : undefined;

    return () => {
      const forwardedAttrs = controlAttrs(attrs);
      const fieldDescribedBy = describedBy(attrs, hintId, errorId);
      const revealLabel = visible.value ? 'Masquer le mot de passe' : 'Afficher le mot de passe';

      return h('div', { class: cx('tds-password', attrClass(attrs)), style: attrs.style }, [
        h('label', { class: 'tds-field__label', for: fieldId }, [
          props.label,
          props.required ? h('span', { 'aria-hidden': 'true' }, ' *') : null,
        ]),
        props.hint ? h('p', { id: hintId, class: 'tds-helper-text' }, props.hint) : null,
        h('div', { class: 'tds-password__control' }, [
          h('input', {
            ...forwardedAttrs,
            id: fieldId,
            type: visible.value ? 'text' : 'password',
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
          h(
            'button',
            {
              type: 'button',
              class: 'tds-password__toggle',
              'aria-label': revealLabel,
              'aria-pressed': visible.value,
              onClick: () => {
                visible.value = !visible.value;
              },
            },
            [eyeIcon(visible.value)]
          ),
        ]),
        props.error
          ? h('p', { id: errorId, class: 'tds-error-text', role: 'alert' }, props.error)
          : null,
      ]);
    };
  },
});
