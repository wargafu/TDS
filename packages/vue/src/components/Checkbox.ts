import { defineComponent, h } from 'vue';
import { cx } from '../utils/cx';
import { attrClass, callEventHandler, controlAttrs } from '../utils/attrs';

export const Checkbox = defineComponent({
  name: 'TdsCheckbox',
  inheritAttrs: false,
  props: {
    label: { type: String, required: true },
    modelValue: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    return () => {
      const forwardedAttrs = controlAttrs(attrs);

      return h('label', { class: cx('tds-checkbox', attrClass(attrs)), style: attrs.style }, [
        h('input', {
          ...forwardedAttrs,
          type: 'checkbox',
          checked: props.modelValue,
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
