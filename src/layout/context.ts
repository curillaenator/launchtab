import { createContext, type Dispatch, type SetStateAction } from 'react';

interface LayoutCTXType {
  isAsideOpen: boolean;
  isRightDrawerOpen: boolean;
  setIsAsideOpen: Dispatch<SetStateAction<boolean>>;
  setIsRightDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

export const LayoutCTX = createContext<LayoutCTXType>({
  isAsideOpen: false,
  isRightDrawerOpen: false,
  setIsAsideOpen: () => {},
  setIsRightDrawerOpen: () => {},
});
