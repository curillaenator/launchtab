import React, { FC } from 'react';
import Popup from 'reactjs-popup';
import styled, { keyframes } from 'styled-components';

import type { ModalProps } from './interfaces';

const appear = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const PopupStyled = styled(Popup)`
  &-overlay {
    min-width: 320px;
    padding: 0 1rem;
    background-color: ${({ theme }) => theme.backgrounds.base40};
    animation: ${appear} 0.12s linear;
    backdrop-filter: blur(5px);
  }

  &-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: transparent;
    color: ${({ theme }) => theme.texts.base};
    filter: drop-shadow(${({ theme }) => theme.shadows.drawer});
  }
`;

export const Modal: FC<ModalProps> = (props) => {
  const { trigger, open, children, onClose } = props;

  return (
    <PopupStyled
      modal
      position='center center'
      arrow={false}
      open={open}
      onClose={onClose}
      trigger={open === undefined ? () => <div>{trigger}</div> : undefined}
    >
      {children}
    </PopupStyled>
  );
};
