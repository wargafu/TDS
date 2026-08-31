import { defineComponent, h } from 'vue';
import { cx } from '../utils/cx';

export const SkipLink = defineComponent({
  name: 'TdsSkipLink',
  props: {
    targetId: { type: String, default: 'main-content' },
  },
  setup(props, { slots }) {
    return () =>
      h(
        'a',
        { href: `#${props.targetId}`, class: cx('tds-skip-link') },
        slots.default?.() ?? 'Aller au contenu principal'
      );
  },
});
