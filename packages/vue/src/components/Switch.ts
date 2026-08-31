import { defineComponent, h } from 'vue';
import { cx } from '../utils/cx';
import { attrClass, callEventHandler, controlAttrs } from '../utils/attrs';

export const Switch = defineComponent({
  name: 'TdsSwitch',
  inheritAttrs: false,
  props: {
    label: { type: String, required: true },
    modelValue: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    return () => {
      const forwardedAttrs = controlAttrs(attrs);

      return h('label', { class: cx('tds-switch', attrClass(attrs)), style: attrs.style }, [
        h('input', {
          ...forwardedAttrs,
          type: 'checkbox',
          role: 'switch',
          checked: props.modelValue,
          'aria-checked': props.modelValue,
          onChange: (event: Event) => {
            callEventHandler(attrs.onChange, event);
            emit('update:modelValue', (event.target as HTMLInputElement).checked);
          },
        }),
        props.label,
      ]);
    };
  },
});
