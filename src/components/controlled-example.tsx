import { useState } from 'react';
import * as CollapsibleCard from './collapsible-card';
import { InfoIcon } from './icons/info-icon';

export function ControlledExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Controlled Example</h2>
        <button
          className="cursor-pointer px-2 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close' : 'Open'}
        </button>
      </div>
      <CollapsibleCard.Root open={open} onOpenChange={setOpen}>
        <CollapsibleCard.Trigger>Stack permissions</CollapsibleCard.Trigger>
        <CollapsibleCard.Content>
          <button className="cursor-pointer border-2 border-primary px-2 py-1.5 rounded-md bg-background hover:bg-primary/10 transition-colors text-primary">
            Grant stack access
          </button>
          <div className="flex items-center justify-center flex-col gap-1 p-6 text-muted-foreground">
            <InfoIcon className="size-10" />
            <h3>No Stacks</h3>
            <p>This team does not grant access to any stacks.</p>
          </div>
        </CollapsibleCard.Content>
      </CollapsibleCard.Root>
    </div>
  );
}
