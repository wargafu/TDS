import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { iconPaths, type IconName } from '@tdgs/core/icons';
import { attrClass, controlAttrs } from '../utils/attrs';
import { cx } from '../utils/cx';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | number;

export const Icon = defineComponent({
  name: 'TdsIcon',
  inheritAttrs: false,
  props: {
    name: { type: String as PropType<IconName>, required: true },
    size: { type: [String, Number] as PropType<IconSize>, default: 'md' },
    title: { type: String, default: undefined },
  },
  setup(props, { attrs }) {
    return () => {
      const svgAttrs = controlAttrs(attrs);
      const ariaLabel = attrs['aria-label'];
      const ariaLabelledBy = attrs['aria-labelledby'];
      const labelled = Boolean(props.title || ariaLabel || ariaLabelledBy);
      const sizeClass = typeof props.size === 'string' ? `tds-icon--${props.size}` : undefined;
      const sizeStyle =
        typeof props.size === 'number'
          ? { inlineSize: `${props.size}px`, blockSize: `${props.size}px` }
          : undefined;

      return h(
        'svg',
        {
          ...svgAttrs,
          class: cx('tds-icon', sizeClass, attrClass(attrs)),
          style: {
            ...sizeStyle,
            ...(typeof attrs.style === 'object' && attrs.style !== null ? attrs.style : {}),
          },
          viewBox: '0 0 24 24',
          'aria-hidden': attrs['aria-hidden'] ?? (!labelled ? true : undefined),
          role: labelled ? 'img' : undefined,
          focusable: 'false',
        },
        [props.title ? h('title', {}, props.title) : null, h('path', { d: iconPaths[props.name] })]
      );
    };
  },
});
