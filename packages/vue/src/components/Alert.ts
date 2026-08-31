import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { cx } from '../utils/cx';
import { useGeneratedId } from '../utils/id';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export const Alert = defineComponent({
  name: 'TdsAlert',
  props: {
    variant: { type: String as PropType<AlertVariant>, default: 'info' },
    title: { type: String, required: true },
    closeLabel: { type: String, default: 'Fermer cette notification' },
    closable: { type: Boolean, default: false },
  },
  emits: ['close'],
  setup(props, { slots, emit, slots: { icon: iconSlot } }) {
    const titleId = useGeneratedId('tds-alert-title');
    return () => {
      const isDanger = props.variant === 'danger';
      return h(
        'div',
        {
          class: cx('tds-alert', `tds-alert--${props.variant}`),
          role: isDanger ? 'alert' : 'status',
          'aria-live': isDanger ? 'assertive' : 'polite',
          'aria-labelledby': titleId,
        },
        [
          iconSlot
            ? h('span', { class: 'tds-alert__icon', 'aria-hidden': 'true' }, iconSlot())
            : null,
          h('div', { class: 'tds-alert__content' }, [
            h('p', { class: 'tds-alert__title', id: titleId }, props.title),
            slots.default ? h('div', { class: 'tds-alert__body' }, slots.default()) : null,
          ]),
          props.closable
            ? h(
                'button',
                {
                  type: 'button',
                  class: 'tds-alert__close',
                  'aria-label': props.closeLabel,
                  onClick: () => emit('close'),
                },
                '✕'
              )
            : null,
        ]
      );
    };
  },
});
