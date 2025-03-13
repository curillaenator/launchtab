import { Transition } from '@headlessui/react';
import styled from 'styled-components';

const DRAWER_W = '420px';

const DrawerContainer = styled(Transition)`
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
    will-change: opacity;
    transition: opacity 200ms linear;

    &From {
      opacity: 0;
    }

    &To {
      opacity: 1;
    }
  }

  .overlay-leave {
    will-change: opacity;
    transition: opacity 200ms linear;

    &From {
      opacity: 1;
    }

    &To {
      opacity: 0;
    }
  }

  .content-enter {
    will-change: opacity, transform;

    position: fixed;
    top: 0;
    right: 0;

    transition:
      transform 0.2s ease,
      opacity 0.2s linear;

    &From {
      opacity: 0;
      transform: translateX(${DRAWER_W});
    }

    &To {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .content-leave {
    will-change: opacity, transform;
    position: fixed;
    top: 0;
    right: 0;

    transition:
      transform 0.2s ease,
      opacity 0.2s linear;

    &From {
      opacity: 1;
      transform: translateX(0);
    }

    &To {
      opacity: 0;
      transform: translateX(${DRAWER_W});
    }
  }
`;

const DrawerOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.backgrounds.base40};
  z-index: -1;
  backdrop-filter: blur(5px);
`;

const DrawerContent = styled.div`
  position: fixed;
  top: 0;
  right: 0;

  width: ${DRAWER_W};
  height: 100vh;
  min-height: 100vh;

  filter: drop-shadow(${({ theme }) => theme.shadows.drawer});
  background-color: transparent;
  color: ${({ theme }) => theme.texts.base};
`;

export { DrawerContainer, DrawerContent, DrawerOverlay };
