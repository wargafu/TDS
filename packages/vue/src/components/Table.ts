import { defineComponent, h } from 'vue';
import { cx } from '../utils/cx';
import { attrClass, controlAttrs } from '../utils/attrs';

export const Table = defineComponent({
  name: 'TdsTable',
  inheritAttrs: false,
  props: {
    striped: { type: Boolean, default: false },
    bordered: { type: Boolean, default: false },
    compact: { type: Boolean, default: false },
    wrapperClassName: { type: String, default: undefined },
  },
  setup(props, { attrs, slots }) {
    return () =>
      h('div', { class: cx('tds-table-wrapper', props.wrapperClassName) }, [
        h(
          'table',
          {
            ...controlAttrs(attrs),
            class: cx(
              'tds-table',
              props.striped && 'tds-table--striped',
              props.bordered && 'tds-table--bordered',
              props.compact && 'tds-table--compact',
              attrClass(attrs)
            ),
          },
          slots.default?.()
        ),
      ]);
  },
});

export const TableActionsCell = defineComponent({
  name: 'TdsTableActionsCell',
  inheritAttrs: false,
  setup(_props, { attrs, slots }) {
    return () =>
      h(
        'td',
        { ...controlAttrs(attrs), class: cx('tds-table__actions', attrClass(attrs)) },
        slots.default?.()
      );
  },
});

export const TableActionsHeader = defineComponent({
  name: 'TdsTableActionsHeader',
  inheritAttrs: false,
  setup(_props, { attrs, slots }) {
    return () =>
      h(
        'th',
        { ...controlAttrs(attrs), class: cx('tds-table__actions', attrClass(attrs)), scope: 'col' },
        slots.default?.()
      );
  },
});
