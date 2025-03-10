import { useCallback, useRef } from 'react';

export const useEditorReset = () => {
  const editorReset = useRef<() => void>(() => {});

  const getResetFn = useCallback((editorResetFn: () => void) => {
    editorReset.current = editorResetFn;
  }, []);

  return {
    editorReset,
    getResetFn,
  };
};
