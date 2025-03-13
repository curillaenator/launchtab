import { Transition } from '@headlessui/react';
import styled from 'styled-components';

const ModalContainer = styled(Transition)`
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

  .overlay-enter {
    transition: opacity 200ms ease;

    &From {
      opacity: 0;
    }

    &To {
      opacity: 1;
    }
  }

  .overlay-leave {
    transition: opacity 200ms ease;

    &From {
      opacity: 1;
    }

    &To {
      opacity: 0;
    }
  }
`;

const ModalContent = styled.div<{ borderRadius: number }>`
  --shp-bgc: ${({ theme }) => theme.backgrounds.base};
  --shp-bdc: transparent;
  // for corners
  position: relative;

  border-radius: calc(${({ borderRadius }) => borderRadius}px * 1.25 + 3px);
  background-color: ${({ theme }) => theme.backgrounds.base};
  color: ${({ theme }) => theme.texts.base};

  filter: drop-shadow(${({ theme }) => theme.shadows.drawer});
`;

const MadolOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.backgrounds.base40};
  z-index: -1;
  backdrop-filter: blur(5px);
`;

export { ModalContainer, ModalContent, MadolOverlay };
