import { useContext } from 'react';

import { ModalContext } from '../context';

export const useDrawerContext = () => {
  const { isAnimationCompleted } = useContext(ModalContext);
  return { isAnimationCompleted };
};
