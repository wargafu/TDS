import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { cx } from '../utils/cx';
import { attrClass, controlAttrs } from '../utils/attrs';

export type StepStatus = 'complete' | 'current' | 'upcoming' | 'error';

export interface StepItem {
  id: string;
  label: string;
  description?: string;
  href?: string;
  status?: StepStatus;
}

function statusFor(item: StepItem, index: number, activeIndex: number): StepStatus {
  return (
    item.status ??
    (index < activeIndex ? 'complete' : index === activeIndex ? 'current' : 'upcoming')
  );
}

export const Stepper = defineComponent({
  name: 'TdsStepper',
  inheritAttrs: false,
  props: {
    items: { type: Array as PropType<StepItem[]>, required: true },
    currentId: { type: String, default: undefined },
    currentIndex: { type: Number, default: undefined },
    label: { type: String, default: 'Étapes' },
  },
  emits: ['change'],
  setup(props, { attrs, emit }) {
    return () => {
      const currentItemIndex = props.currentId
        ? props.items.findIndex((item) => item.id === props.currentId)
        : -1;
      const explicitCurrentIndex = props.items.findIndex((item) => item.status === 'current');
      const activeIndex =
        currentItemIndex >= 0
          ? currentItemIndex
          : (props.currentIndex ?? (explicitCurrentIndex >= 0 ? explicitCurrentIndex : 0));

      return h(
        'nav',
        {
          ...controlAttrs(attrs),
          class: attrClass(attrs),
          style: attrs.style,
          'aria-label': props.label,
        },
        h(
          'ol',
          { class: 'tds-stepper' },
          props.items.map((item, index) => {
            const status = statusFor(item, index, activeIndex);
            const labelClass = cx('tds-stepper__label');
            const label = item.href
              ? h('a', { class: labelClass, href: item.href }, item.label)
              : status !== 'upcoming'
                ? h(
                    'button',
                    {
                      type: 'button',
                      class: cx(labelClass, 'tds-stepper__button'),
                      onClick: () => emit('change', item.id),
                    },
                    item.label
                  )
                : h('span', { class: labelClass }, item.label);

            return h(
              'li',
              {
                key: item.id,
                class: cx('tds-stepper__item', `tds-stepper--${status}`),
                'aria-current': status === 'current' ? 'step' : undefined,
              },
              [
                h(
                  'span',
                  { class: 'tds-stepper__marker', 'aria-hidden': 'true' },
                  status === 'complete' ? '✓' : String(index + 1)
                ),
                h('span', { class: 'tds-stepper__content' }, [
                  label,
                  item.description
                    ? h('span', { class: 'tds-stepper__description' }, item.description)
                    : null,
                ]),
              ]
            );
          })
        )
      );
    };
  },
});
