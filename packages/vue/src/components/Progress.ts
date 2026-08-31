import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { cx } from '../utils/cx';
import { attrClass, controlAttrs } from '../utils/attrs';
import { useGeneratedId } from '../utils/id';

export type ProgressVariant = 'default' | 'success' | 'warning' | 'danger';

export const Progress = defineComponent({
  name: 'TdsProgress',
  inheritAttrs: false,
  props: {
    value: { type: Number, default: undefined },
    max: { type: Number, default: 100 },
    label: { type: String, default: undefined },
    showValue: { type: Boolean, default: false },
    variant: { type: String as PropType<ProgressVariant>, default: 'default' },
  },
  setup(props, { attrs }) {
    const labelId = useGeneratedId('tds-progress');

    return () => {
      const determinate =
        typeof props.value === 'number' && Number.isFinite(props.value) && props.max > 0;
      const boundedValue = determinate
        ? Math.min(Math.max(props.value ?? 0, 0), props.max)
        : undefined;
      const percentage = boundedValue === undefined ? 0 : (boundedValue / props.max) * 100;
      const progressAttrs = controlAttrs(attrs);
      delete progressAttrs.class;
      delete progressAttrs.style;
      const label = props.label
        ? h('div', { id: labelId, class: 'tds-progress__label' }, [
            h('span', {}, props.label),
            props.showValue && determinate
              ? h('span', { 'aria-hidden': 'true' }, `${Math.round(percentage)}%`)
              : null,
          ])
        : null;

      return h(
        'div',
        {
          class: cx(
            'tds-progress',
            !determinate && 'tds-progress--indeterminate',
            `tds-progress--${props.variant}`,
            attrClass(attrs)
          ),
          style: attrs.style,
        },
        [
          label,
          h(
            'div',
            {
              ...progressAttrs,
              class: 'tds-progress__track',
              role: 'progressbar',
              'aria-label': props.label ? undefined : (attrs['aria-label'] ?? 'Progression'),
              'aria-labelledby': props.label ? labelId : attrs['aria-labelledby'],
              'aria-valuemin': determinate ? 0 : undefined,
              'aria-valuemax': determinate ? props.max : undefined,
              'aria-valuenow': determinate ? boundedValue : undefined,
            },
            h('div', {
              class: 'tds-progress__indicator',
              style: { '--tds-progress-value': `${percentage}%` },
            })
          ),
        ]
      );
    };
  },
});
