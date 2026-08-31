import { defineComponent, h, ref, watch } from 'vue';
import { cx } from '../utils/cx';
import { useGeneratedId } from '../utils/id';
import { attrClass, callEventHandler, controlAttrs } from '../utils/attrs';

export const SearchField = defineComponent({
  name: 'TdsSearchField',
  inheritAttrs: false,
  props: {
    label: { type: String, required: true },
    id: { type: String, default: undefined },
    hideLabel: { type: Boolean, default: false },
    submitLabel: { type: String, default: 'Rechercher' },
    clearLabel: { type: String, default: 'Effacer la recherche' },
    clearable: { type: Boolean, default: true },
    modelValue: { type: String, default: '' },
  },
  emits: ['update:modelValue', 'submit', 'search', 'clear'],
  setup(props, { attrs, emit }) {
    const generatedId = useGeneratedId('tds-search');
    const inputId = props.id ?? generatedId;
    const inputValue = ref(props.modelValue);
    watch(
      () => props.modelValue,
      (value) => {
        inputValue.value = value;
      }
    );

    return () => {
      const inputAttrs = controlAttrs(attrs);
      delete inputAttrs.onInput;
      delete inputAttrs.onSubmit;

      return h(
        'form',
        {
          class: cx('tds-search', attrClass(attrs)),
          style: attrs.style,
          onSubmit: (event: Event) => {
            event.preventDefault();
            callEventHandler(attrs.onSubmit, event);
            emit('submit', event);
            emit('search', inputValue.value);
          },
        },
        [
          h(
            'label',
            {
              class: cx('tds-search__label', props.hideLabel && 'tds-search--label-hidden'),
              for: inputId,
            },
            props.label
          ),
          h('div', { class: 'tds-search__controls' }, [
            h('input', {
              ...inputAttrs,
              id: inputId,
              type: 'search',
              class: 'tds-search__input',
              value: inputValue.value,
              onInput: (event: Event) => {
                callEventHandler(attrs.onInput, event);
                inputValue.value = (event.target as HTMLInputElement).value;
                emit('update:modelValue', inputValue.value);
              },
            }),
            props.clearable
              ? h(
                  'button',
                  {
                    type: 'button',
                    class: 'tds-search__clear',
                    'aria-label': props.clearLabel,
                    disabled: attrs.disabled,
                    onClick: () => {
                      inputValue.value = '';
                      emit('update:modelValue', '');
                      emit('clear');
                    },
                  },
                  '×'
                )
              : null,
            h(
              'button',
              {
                type: 'submit',
                class: 'tds-search__submit',
                disabled: attrs.disabled,
              },
              props.submitLabel
            ),
          ]),
        ]
      );
    };
  },
});
