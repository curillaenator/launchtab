import { Transition } from '@headlessui/react';
import styled from 'styled-components';

interface ContentStyledProps {
  closed?: boolean;
}

export const ContentStyled = styled.div<ContentStyledProps>`
  position: fixed;
  top: 0;
  right: 0;
  width: ${({ closed }) => (closed ? 'var(--dwr-closed-w, 0px)' : 'var(--dwr-opened-w, 420px)')};
  height: 100vh;
  min-height: 100vh;
  background: var(--dwr-ct-bgc, transparent);
  z-index: var(--dwr-z, 1300);
  filter: drop-shadow(var(--drw-sh, 0px 0px 6px rgba(0, 0, 0, 0.4)));

  transition: var(--dwr-animation-time, 0.2s) var(--dwr-animation-method, ease);
  overflow: hidden;
  color: var(--drw-ct-gn, black);
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
  z-index: var(--dwr-z, 1300);

  .overlay_enter {
    transition: opacity var(--dwr-animation-time, 0.2s) var(--dwr-animation-method, ease);

    &_from {
      opacity: 0;
    }

    &_to {
      opacity: 1;
    }
  }

  .overlay_leave {
    transition: opacity var(--dwr-animation-time, 0.2s) var(--dwr-animation-method, ease);

    &_from {
      opacity: 1;
    }

    &_to {
      opacity: 0;
    }
  }
`;
