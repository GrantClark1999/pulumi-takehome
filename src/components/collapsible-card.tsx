import { twMerge } from 'tailwind-merge';

import {
  CollapsibleContext,
  useCollapsibleContext,
} from '../context/collapsible-context';
import { useId, useState, useCallback, useRef, useEffect } from 'react';
import { ChevronDownIcon } from './icons/chevron-down-icon';

interface CollapsibleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function CollapsibleCard({
  className,
  defaultOpen = false,
  open,
  onOpenChange,
  ...props
}: CollapsibleCardProps) {
  const id = useId();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const isControlled = open !== undefined;

  const isOpen = isControlled ? open : internalOpen;
  const setIsOpen = useCallback(
    (open: boolean) => {
      onOpenChange?.(open);
      setInternalOpen(open);
    },
    [onOpenChange]
  );

  return (
    <CollapsibleContext.Provider value={{ isOpen, setIsOpen, id }}>
      <div
        data-state={isOpen ? 'open' : 'closed'}
        className={twMerge(
          'bg-card text-card-foreground rounded-lg border data-[state=open]:pb-6',
          className
        )}
        {...props}
      />
    </CollapsibleContext.Provider>
  );
}

function CollapsibleCardTrigger({
  className,
  children,
  onClick,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  const { id, isOpen, setIsOpen } = useCollapsibleContext();
  return (
    <button
      className={twMerge(
        'cursor-pointer flex w-full items-center gap-2 aria-expanded:[&>svg]:rotate-180 p-6',
        className
      )}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) {
          setIsOpen(!isOpen);
        }
      }}
      aria-controls={id}
      aria-expanded={isOpen}
      {...props}
    >
      {children}
      <ChevronDownIcon className="size-4 transition-transform duration-200 ml-auto" />
    </button>
  );
}

function CollapsibleCardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { id, isOpen } = useCollapsibleContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!contentRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const contentHeight = entries[0]?.contentRect.height;
      if (typeof contentHeight === 'number') {
        setHeight(contentHeight);
      }
    });

    resizeObserver.observe(contentRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      id={id}
      data-state={isOpen ? 'open' : 'closed'}
      aria-hidden={!isOpen}
      style={{ height: isOpen ? height : 0 }}
      className={twMerge(
        'overflow-y-clip transition-[height] duration-200 px-6',
        className
      )}
      {...props}
    >
      <div ref={contentRef}>{props.children}</div>
    </div>
  );
}

export {
  CollapsibleCard,
  CollapsibleCardTrigger,
  CollapsibleCardContent,
  //
  CollapsibleCard as Root,
  CollapsibleCardTrigger as Trigger,
  CollapsibleCardContent as Content,
};
