import { defineComponent, h, onMounted, ref, watch } from 'vue';
import type { PropType } from 'vue';
import { cx } from '../utils/cx';
import { useGeneratedId } from '../utils/id';

export type ModalSize = 'sm' | 'md' | 'lg';

export const Modal = defineComponent({
  name: 'TdsModal',
  props: {
    open: { type: Boolean, required: true },
    title: { type: String, required: true },
    size: { type: String as PropType<ModalSize>, default: 'md' },
    closeLabel: { type: String, default: 'Fermer' },
    closeOnBackdropClick: { type: Boolean, default: true },
  },
  emits: ['close'],
  setup(props, { slots, emit }) {
    const dialogRef = ref<HTMLDialogElement | null>(null);
    const titleId = useGeneratedId('tds-modal-title');

    function closeDialog() {
      const dialog = dialogRef.value;
      if (!dialog) return;
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    }

    function syncOpenState(open: boolean) {
      const dialog = dialogRef.value;
      if (!dialog) return;
      if (open && !dialog.open) {
        if (typeof dialog.showModal === 'function') dialog.showModal();
        else dialog.setAttribute('open', '');
      } else if (!open && dialog.open) {
        closeDialog();
      }
    }

    onMounted(() => {
      syncOpenState(props.open);
      dialogRef.value?.addEventListener('close', () => emit('close'));
    });

    watch(() => props.open, syncOpenState);

    return () =>
      h(
        'dialog',
        {
          ref: dialogRef,
          class: cx('tds-modal', props.size !== 'md' && `tds-modal--${props.size}`),
          'aria-labelledby': titleId,
          onClick: (event: MouseEvent) => {
            if (props.closeOnBackdropClick && event.target === dialogRef.value) {
              closeDialog();
            }
          },
        },
        [
          h('div', { class: 'tds-modal__header' }, [
            h('h2', { id: titleId, class: 'tds-modal__title' }, props.title),
            h(
              'button',
              {
                type: 'button',
                class: 'tds-modal__close',
                'aria-label': props.closeLabel,
                onClick: closeDialog,
              },
              '✕'
            ),
          ]),
          h('div', { class: 'tds-modal__body' }, slots.default?.()),
          slots.footer ? h('div', { class: 'tds-modal__footer' }, slots.footer()) : null,
        ]
      );
  },
});
