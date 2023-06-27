export interface DrawerProps {
  portalId: string;
  open: boolean;
  onClose: () => void;
  disableBackgroundClick?: boolean;
  overlayClassName?: string;
  scrollClassName?: string;
  transitionClassName?: string;
  contentClassName?: string;
  placement?: 'left' | 'right';
  openWidth?: string;
}

export type OmitedDrawerProps = Omit<DrawerProps, 'overlayClassName' | 'scrollClassName' | 'transitionClassName'>;
