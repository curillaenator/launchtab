import { OmitedBaseDrawerProps } from '../interfaces';

export const useRequiredBaseProps = (props: OmitedBaseDrawerProps): OmitedBaseDrawerProps => {
  const { portalId, open, onClose, disableBackgroundClick, placement } = props;

  return {
    portalId,
    open,
    onClose,
    disableBackgroundClick,
    placement,
  };
};
