import { useRef, useState } from 'react';
import type { KeyboardEvent, ReactElement, ReactNode } from 'react';
import { cx } from '../utils/cx';

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  label: string;
  defaultSelectedId?: string;
  selectedId?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export function Tabs({
  items,
  label,
  defaultSelectedId,
  selectedId: controlledId,
  onChange,
  className,
}: TabsProps): ReactElement {
  const [uncontrolledId, setUncontrolledId] = useState(defaultSelectedId ?? items[0]?.id);
  const selectedId = controlledId ?? uncontrolledId;
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  function selectTab(id: string) {
    if (controlledId === undefined) setUncontrolledId(id);
    onChange?.(id);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % items.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + items.length) % items.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = items.length - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      const next = items[nextIndex];
      if (!next) return;
      selectTab(next.id);
      triggerRefs.current[next.id]?.focus();
    }
  }

  return (
    <div className={className}>
      <div className="tds-tabs__list" role="tablist" aria-label={label}>
        {items.map((item, index) => {
          const selected = item.id === selectedId;
          return (
            <button
              key={item.id}
              ref={(el) => {
                triggerRefs.current[item.id] = el;
              }}
              type="button"
              className="tds-tabs__trigger"
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectTab(item.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          className={cx('tds-tabs__panel')}
          role="tabpanel"
          id={`panel-${item.id}`}
          aria-labelledby={`tab-${item.id}`}
          hidden={item.id !== selectedId}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
