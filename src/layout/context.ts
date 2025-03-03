import { createContext, MutableRefObject } from 'react';

interface LauyotContext {
  currentSpaceId: MutableRefObject<string>;
  setCurrentSpaceId: (currentSpace: string) => void;
}

//@ts-expect-error
const $layoutContex = createContext<LauyotContext>({});

export { $layoutContex, type LauyotContext };
