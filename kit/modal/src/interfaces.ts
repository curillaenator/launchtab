import { PropsWithChildren } from 'react';

export interface ModalProps extends PropsWithChildren {
  trigger?: JSX.Element;
  open?: boolean;
  onClose?: () => void;
}
