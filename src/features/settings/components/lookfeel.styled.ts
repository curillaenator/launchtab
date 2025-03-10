import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const animation = keyframes`${fadeIn}`;

const LookFeelStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--layout-pd);
  width: 100%;

  padding: var(--layout-pd) 0;
  min-height: 320px;
  animation: ${animation} 0.2s linear;
  /* padding-right: 16px; */

  .search-pexels-wallpaper-controls {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export { LookFeelStyled };
