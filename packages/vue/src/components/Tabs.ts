import { computed, defineComponent, h, ref } from 'vue';
import type { PropType } from 'vue';

export interface TabItemDef {
  id: string;
  label: string;
}

/**
 * Contenu de chaque panneau fourni via un slot nommé `panel-<id>`.
 */
export const Tabs = defineComponent({
  name: 'TdsTabs',
  props: {
    items: { type: Array as PropType<TabItemDef[]>, required: true },
    label: { type: String, required: true },
    defaultSelectedId: { type: String, default: undefined },
    modelValue: { type: String, default: undefined },
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    const internalId = ref(props.defaultSelectedId ?? props.items[0]?.id);
    const selectedId = computed(() => props.modelValue ?? internalId.value);
    const triggerRefs: Record<string, HTMLButtonElement | null> = {};

    function selectTab(id: string) {
      if (props.modelValue === undefined) internalId.value = id;
      emit('update:modelValue', id);
    }

    function handleKeydown(event: KeyboardEvent, index: number) {
      let nextIndex: number | null = null;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % props.items.length;
      else if (event.key === 'ArrowLeft')
        nextIndex = (index - 1 + props.items.length) % props.items.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = props.items.length - 1;

      if (nextIndex !== null) {
        event.preventDefault();
        const next = props.items[nextIndex];
        if (!next) return;
        selectTab(next.id);
        triggerRefs[next.id]?.focus();
      }
    }

    return () =>
      h('div', {}, [
        h(
          'div',
          { class: 'tds-tabs__list', role: 'tablist', 'aria-label': props.label },
          props.items.map((item, index) => {
            const selected = item.id === selectedId.value;
            return h(
              'button',
              {
                ref: (el) => {
                  triggerRefs[item.id] = el as HTMLButtonElement | null;
                },
                key: item.id,
                type: 'button',
                class: 'tds-tabs__trigger',
                role: 'tab',
                id: `tab-${item.id}`,
                'aria-selected': selected,
                'aria-controls': `panel-${item.id}`,
                tabindex: selected ? 0 : -1,
                onClick: () => selectTab(item.id),
                onKeydown: (event: KeyboardEvent) => handleKeydown(event, index),
              },
              item.label
            );
          })
        ),
        ...props.items.map((item) =>
          h(
            'div',
            {
              key: item.id,
              class: 'tds-tabs__panel',
              role: 'tabpanel',
              id: `panel-${item.id}`,
              'aria-labelledby': `tab-${item.id}`,
              hidden: item.id !== selectedId.value,
            },
            slots[`panel-${item.id}`]?.()
          )
        ),
      ]);
  },
});
