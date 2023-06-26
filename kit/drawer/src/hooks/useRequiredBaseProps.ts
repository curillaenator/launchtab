import { OmitedDrawerProps } from '../interfaces';

export const useRequiredBaseProps = (props: OmitedDrawerProps): OmitedDrawerProps => {
  const { portalId, open, onClose, disableBackgroundClick, placement } = props;

  return {
    portalId,
    open,
    onClose,
    disableBackgroundClick,
    placement,
  };
};
