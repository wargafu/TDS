import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function getPaginationItems(
  current: number,
  total: number,
  siblingCount = 1
): (number | 'ellipsis')[] {
  const totalPageNumbers = siblingCount * 2 + 5;
  if (totalPageNumbers >= total) return range(1, total);

  const leftSiblingIndex = Math.max(current - siblingCount, 1);
  const rightSiblingIndex = Math.min(current + siblingCount, total);
  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < total - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    return [...range(1, 3 + siblingCount * 2), 'ellipsis', total];
  }
  if (showLeftEllipsis && !showRightEllipsis) {
    return [1, 'ellipsis', ...range(total - (3 + siblingCount * 2) + 1, total)];
  }
  return [1, 'ellipsis', ...range(leftSiblingIndex, rightSiblingIndex), 'ellipsis', total];
}

export const Pagination = defineComponent({
  name: 'TdsPagination',
  props: {
    currentPage: { type: Number, required: true },
    totalPages: { type: Number, required: true },
    hrefFor: { type: Function as PropType<(page: number) => string>, default: undefined },
    siblingCount: { type: Number, default: 1 },
    label: { type: String, default: 'Pagination' },
    previousLabel: { type: String, default: 'Page précédente' },
    nextLabel: { type: String, default: 'Page suivante' },
  },
  emits: ['change'],
  setup(props, { emit }) {
    return () => {
      const items = getPaginationItems(props.currentPage, props.totalPages, props.siblingCount);
      const isFirst = props.currentPage <= 1;
      const isLast = props.currentPage >= props.totalPages;

      function renderControl(page: number, content: string, ariaLabel: string, disabled: boolean) {
        if (props.hrefFor) {
          return h(
            'a',
            {
              href: props.hrefFor(page),
              class: 'tds-pagination__link',
              'aria-disabled': disabled || undefined,
              'aria-label': ariaLabel,
            },
            content
          );
        }
        return h(
          'button',
          {
            type: 'button',
            class: 'tds-pagination__link',
            disabled,
            'aria-label': ariaLabel,
            onClick: () => emit('change', page),
          },
          content
        );
      }

      function renderPage(page: number) {
        const isCurrent = page === props.currentPage;
        if (props.hrefFor) {
          return h(
            'a',
            {
              href: props.hrefFor(page),
              class: 'tds-pagination__link',
              'aria-current': isCurrent ? 'page' : undefined,
              'aria-label': `Page ${page}`,
            },
            String(page)
          );
        }
        return h(
          'button',
          {
            type: 'button',
            class: 'tds-pagination__link',
            'aria-current': isCurrent ? 'page' : undefined,
            'aria-label': `Page ${page}`,
            onClick: () => emit('change', page),
          },
          String(page)
        );
      }

      return h('nav', { 'aria-label': props.label }, [
        h('ul', { class: 'tds-pagination__list' }, [
          h('li', {}, renderControl(props.currentPage - 1, '‹', props.previousLabel, isFirst)),
          ...items.map((item, index) =>
            item === 'ellipsis'
              ? h(
                  'li',
                  { key: `ellipsis-${index}` },
                  h('span', { class: 'tds-pagination__ellipsis' }, '…')
                )
              : h('li', { key: item }, renderPage(item))
          ),
          h('li', {}, renderControl(props.currentPage + 1, '›', props.nextLabel, isLast)),
        ]),
      ]);
    };
  },
});
