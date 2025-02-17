import { createContext, use } from 'react';

interface CollapsibleContextValue {
  id: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CollapsibleContext = createContext<CollapsibleContextValue>({
  id: '',
  isOpen: false,
  setIsOpen: () => {},
});

function useCollapsibleContext() {
  const context = use(CollapsibleContext);
  if (!context) {
    throw new Error(
      'useCollapsibleContext must be used within a CollapsibleContext.Provider'
    );
  }
  return context;
}

export { CollapsibleContext, useCollapsibleContext };
