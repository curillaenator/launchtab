import { createContext } from 'react';

interface DrawerContextType {
  isAnimationCompleted: boolean;
}

export const ModalContext = createContext<DrawerContextType>({
  isAnimationCompleted: false,
});
