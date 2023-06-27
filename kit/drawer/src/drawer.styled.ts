import { Transition } from '@headlessui/react';
import styled from 'styled-components';

interface ContentStyledProps {
  closed?: boolean;
}

export const ContentStyled = styled.div<ContentStyledProps>`
  position: fixed;
  top: 0;
  right: 0;
  width: ${({ closed }) => (closed ? '0px' : '420px')};
  height: 100vh;
  min-height: 100vh;
  background: transparent;
  z-index: 1300;
  filter: drop-shadow(${({ theme }) => theme.shadows.card});
  transition: 0.2s ease;
  overflow: hidden;
  color: ${({ theme }) => theme.texts.base};
`;

export const TransitionStyled = styled(Transition)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  z-index: 1300;

  .overlay_enter {
    transition: opacity 0.2s ease;

    &_from {
      opacity: 0;
    }

    &_to {
      opacity: 1;
    }
  }

  .overlay_leave {
    transition: opacity 0.2s ease;

    &_from {
      opacity: 1;
    }

    &_to {
      opacity: 0;
    }
  }
`;
