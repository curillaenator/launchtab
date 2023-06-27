import styled from 'styled-components';

interface OverlayStyledProps {
  disableBackgroundClick: boolean;
}

export const OverlayStyled = styled.div<OverlayStyledProps>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--dwr-overlay-bgc, rgba(255, 255, 255, 0.4));
  z-index: -1;
  backdrop-filter: var(--drw-overlay-backdrop-filter, none);
  pointer-events: ${({ disableBackgroundClick }) => (disableBackgroundClick ? 'none' : 'all')};
`;
