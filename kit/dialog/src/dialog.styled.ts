import styled from 'styled-components';

export const DilaogStyled = styled.dialog`
  --shp-bgc: var(--dialog-bgc, #ffffff);
  --shp-bdc: var(--dialog-bgc, #ffffff);

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: none;

  &:modal {
    opacity: 0;
    height: fit-content;
    width: fit-content;
    padding: 40px;
    min-width: var(--dialog-mw, 320px);
    min-height: var(--dialog-mh, 200px);

    background-color: var(--dialog-bgc, #ffffff);
    border-radius: var(--dialog-bdrs, calc(24px * 1.25 + 3px));
    color: var(--dialog-c, black);
    transition: 0.2s ease-in-out;
  }

  &::backdrop {
    will-change: opacity;
    transition: 0.2s ease-in-out;
  }

  &:not([open]) {
    &:modal {
      opacity: 0;
    }

    &::backdrop {
      background: transparent;
      opacity: 0;
    }
  }

  &[open] {
    &:modal {
      opacity: 1;
    }

    &::backdrop {
      background: var(--dialog-backdrop, rgba(255, 255, 255, 0.4)) !important;
      opacity: 1;
    }
  }
`;
