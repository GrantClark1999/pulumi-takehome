import * as CollapsibleCard from "./collapsible-card";
import { InfoIcon } from "./icons/info-icon";

export function UncontrolledExample() {
  return (
    <div className="w-full space-y-2">
      <h2 className="text-lg font-bold">Uncontrolled Example</h2>
      <CollapsibleCard.Root>
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
          <CollapsibleCard.Footer>
            <button className="cursor-pointer border-2 border-primary px-2 py-1.5 rounded-md bg-background hover:bg-primary/10 transition-colors text-primary">
              Cancel
            </button>
            <button className="cursor-pointer border-2 border-transparent px-2 py-1.5 rounded-md bg-background hover:bg-primary/80 transition-colors bg-primary text-primary-foreground">
              Submit
            </button>
          </CollapsibleCard.Footer>
        </CollapsibleCard.Content>
      </CollapsibleCard.Root>
    </div>
  );
}
