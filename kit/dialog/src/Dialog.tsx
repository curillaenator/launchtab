import React, { forwardRef, ReactNode } from 'react';
import cn from 'classnames';

import { DilaogStyled } from './dialog.styled';

interface DialogProps {
  id: string;
  open?: boolean;
  children?: ReactNode;
}

const DialogComponent = forwardRef<HTMLDialogElement, DialogProps>((props, ref) => {
  const { id, open, children } = props;

  return (
    <DilaogStyled
      id={id}
      ref={ref}
      className={cn({
        dialog_open: open,
        dialog_closed: !open,
      })}
    >
      {children}
    </DilaogStyled>
  );
});

DialogComponent.displayName = 'Dialog';

export const Dialog = DialogComponent;
