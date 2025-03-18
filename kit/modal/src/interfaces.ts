import type { CornerProps } from '@launch-ui/shape';

interface ModalProps {
  portalId: string;
  open: boolean;
  onClose: () => void;
  borderRadius?: CornerProps['borderRadius'];
}

export type { ModalProps };
