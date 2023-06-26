import { useEffect, useCallback } from 'react';

import { BaseDrawerProps } from '../interfaces';

export const useCloseOnEscape = (props: BaseDrawerProps) => {
  const { onClose } = props;

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.body.addEventListener('keydown', handleEscape);
    return () => {
      document.body.removeEventListener('keydown', handleEscape);
    };
  }, [handleEscape]);
};
