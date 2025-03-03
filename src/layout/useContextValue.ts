import { useCallback, useRef } from 'react';
import type { LauyotContext } from './context';

const useContextValue = (): LauyotContext => {
  const currentSpaceId = useRef<string>('');
  const setCurrentSpaceId = useCallback((space: string) => {
    currentSpaceId.current = space;
  }, []);

  return { currentSpaceId, setCurrentSpaceId };
};

export { useContextValue };
