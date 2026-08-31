import { defineComponent, h } from 'vue';
import { cx } from '../utils/cx';
import { useGeneratedId } from '../utils/id';

export const Tooltip = defineComponent({
  name: 'TdsTooltip',
  props: {
    content: { type: String, required: true },
  },
  setup(props, { slots }) {
    const bubbleId = useGeneratedId('tds-tooltip');
    return () =>
      h('span', { class: cx('tds-tooltip'), tabindex: 0, 'aria-describedby': bubbleId }, [
        slots.default?.(),
        h('span', { class: 'tds-tooltip__bubble', id: bubbleId, role: 'tooltip' }, props.content),
      ]);
  },
});
