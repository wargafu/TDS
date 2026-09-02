import { defineComponent, h } from 'vue';
import { toast, type ToastOptions, type ToastVariant } from '@tdgs/core/elements';

export { toast };
export type { ToastOptions, ToastVariant };

/**
 * Monte la région de toasts `<tds-toast-region>` (et enregistre le custom
 * element via l'import ci-dessus). Une seule instance près de la racine ;
 * appeler ensuite `toast('message', { variant })`.
 */
export const Toaster = defineComponent({
  name: 'TdsToaster',
  props: {
    label: { type: String, default: 'Notifications' },
  },
  setup(props) {
    return () => h('tds-toast-region', { 'aria-label': props.label });
  },
});
