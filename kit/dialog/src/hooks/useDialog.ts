import { useState, useRef, useLayoutEffect, useCallback } from 'react';

export const useDialog = () => {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const openDialog = useCallback(() => {
    const { current: dialog } = ref;

    setOpen(true);
    dialog?.showModal();
  }, []);

  const closeDialog = useCallback(() => {
    const { current: dialog } = ref;

    setOpen(false);
    setTimeout(() => dialog?.close(), 200); // время нужно также же как в стилях $animationTime.
  }, []);

  useLayoutEffect(() => {
    const hadleBackdropClick = (e: MouseEvent) => {
      // @ts-expect-error because
      const rect = e.target?.getBoundingClientRect();

      if (rect.left > e.clientX || rect.right < e.clientX || rect.top > e.clientY || rect.bottom < e.clientY) {
        closeDialog();
      }
    };

    const { current: dialog } = ref;

    if (open) {
      dialog?.addEventListener('click', hadleBackdropClick);
    } else {
      dialog?.removeEventListener('click', hadleBackdropClick);
    }

    return () => dialog?.removeEventListener('click', hadleBackdropClick);
  }, [open, closeDialog]);

  return {
    open,
    ref,
    openDialog,
    closeDialog,
  };
};
