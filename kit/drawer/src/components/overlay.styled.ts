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
  background-color: ${({ theme }) => {
    console.log('OverlayStyled', theme.backgrounds);
    return theme.backgrounds.base40;
  }};
  z-index: -1;
  pointer-events: ${({ disableBackgroundClick }) => (disableBackgroundClick ? 'none' : 'all')};
  backdrop-filter: blur(5px);
`;
