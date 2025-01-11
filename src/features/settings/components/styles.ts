import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

const animation = keyframes`${fadeIn}`;
const LookFeelStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  /* height: 100%; */
  min-height: 320px;
  animation: ${animation} 0.2s linear;
  /* padding-right: 16px; */
`;

export { LookFeelStyled };
