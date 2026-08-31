import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { cx } from '../utils/cx';
import { attrClass, controlAttrs } from '../utils/attrs';
import { useGeneratedId } from '../utils/id';

export type NoticeVariant = 'info' | 'success' | 'warning' | 'danger';

export const Notice = defineComponent({
  name: 'TdsNotice',
  inheritAttrs: false,
  props: {
    variant: { type: String as PropType<NoticeVariant>, default: 'info' },
    title: { type: String, required: true },
    closeLabel: { type: String, default: 'Masquer ce bandeau' },
    closable: { type: Boolean, default: false },
  },
  emits: ['close'],
  setup(props, { attrs, slots, emit }) {
    const titleId = useGeneratedId('tds-notice-title');
    return () => {
      const urgent = props.variant === 'danger';
      return h(
        'div',
        {
          ...controlAttrs(attrs),
          class: cx('tds-notice', `tds-notice--${props.variant}`, attrClass(attrs)),
          style: attrs.style,
          role: urgent ? 'alert' : 'status',
          'aria-live': urgent ? 'assertive' : 'polite',
          'aria-labelledby': titleId,
        },
        [
          slots.icon
            ? h('span', { class: 'tds-notice__icon', 'aria-hidden': 'true' }, slots.icon())
            : null,
          h('div', { class: 'tds-notice__content' }, [
            h('span', { class: 'tds-notice__title', id: titleId }, props.title),
            slots.default ? h('div', { class: 'tds-notice__body' }, slots.default()) : null,
          ]),
          props.closable
            ? h(
                'button',
                {
                  type: 'button',
                  class: 'tds-notice__close',
                  'aria-label': props.closeLabel,
                  onClick: () => emit('close'),
                },
                h('span', { 'aria-hidden': 'true' }, '×')
              )
            : null,
        ]
      );
    };
  },
});
