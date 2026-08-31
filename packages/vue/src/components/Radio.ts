import { defineComponent, h } from 'vue';
import { cx } from '../utils/cx';
import { attrClass, callEventHandler, controlAttrs } from '../utils/attrs';

export const Radio = defineComponent({
  name: 'TdsRadio',
  inheritAttrs: false,
  props: {
    label: { type: String, required: true },
    value: { type: String, required: true },
    modelValue: { type: String, default: undefined },
    name: { type: String, default: undefined },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit }) {
    return () => {
      const forwardedAttrs = controlAttrs(attrs);

      return h('label', { class: cx('tds-radio', attrClass(attrs)), style: attrs.style }, [
        h('input', {
          ...forwardedAttrs,
          type: 'radio',
          name: props.name,
          value: props.value,
          checked: props.modelValue === props.value,
          onChange: (event: Event) => {
            callEventHandler(attrs.onChange, event);
            emit('update:modelValue', props.value);
          },
        }),
        props.label,
      ]);
    };
  },
});
