import { defineComponent, h, ref } from 'vue';
import { cx } from '../utils/cx';
import { useGeneratedId } from '../utils/id';
import { attrClass, callEventHandler, controlAttrs, describedBy } from '../utils/attrs';

export const FileUpload = defineComponent({
  name: 'TdsFileUpload',
  inheritAttrs: false,
  props: {
    label: { type: String, required: true },
    hint: { type: String, default: undefined },
    error: { type: String, default: undefined },
    chooseLabel: { type: String, default: 'Choisir un fichier' },
    id: { type: String, default: undefined },
    required: { type: Boolean, default: false },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { attrs, emit }) {
    const generatedId = useGeneratedId('tds-file-upload');
    const inputId = props.id ?? generatedId;
    const labelId = `${inputId}-label`;
    const hintId = props.hint ? `${inputId}-hint` : undefined;
    const errorId = props.error ? `${inputId}-error` : undefined;
    const fileNames = ref<string[]>([]);

    return () => {
      const inputAttrs = controlAttrs(attrs);
      delete inputAttrs.onChange;

      return h('div', { class: cx('tds-file-upload', attrClass(attrs)), style: attrs.style }, [
        h('label', { id: labelId, class: 'tds-field__label', for: inputId }, [
          props.label,
          props.required ? h('span', { 'aria-hidden': 'true' }, ' *') : null,
        ]),
        props.hint ? h('p', { id: hintId, class: 'tds-file-upload__hint' }, props.hint) : null,
        h('input', {
          ...inputAttrs,
          id: inputId,
          class: 'tds-file-upload__input',
          type: 'file',
          required: props.required,
          'aria-labelledby': labelId,
          'aria-describedby': describedBy(attrs, hintId, errorId),
          'aria-invalid': props.error ? true : attrs['aria-invalid'],
          'aria-required': props.required || attrs['aria-required'] || undefined,
          onChange: (event: Event) => {
            callEventHandler(attrs.onChange, event);
            const files = (event.target as HTMLInputElement).files;
            fileNames.value = files ? Array.from(files, (file) => file.name) : [];
            emit('update:modelValue', files);
            emit('change', files);
          },
        }),
        h('label', { class: 'tds-file-upload__label', for: inputId }, [
          h('span', { class: 'tds-file-upload__choose' }, props.chooseLabel),
          h('span', {}, props.hint ?? 'Ajoutez un fichier depuis votre appareil.'),
        ]),
        fileNames.value.length > 0
          ? h(
              'ul',
              { class: 'tds-file-upload__files', 'aria-live': 'polite' },
              fileNames.value.map((fileName) => h('li', { key: fileName }, fileName))
            )
          : null,
        props.error
          ? h('p', { id: errorId, class: 'tds-file-upload__error', role: 'alert' }, props.error)
          : null,
      ]);
    };
  },
});
