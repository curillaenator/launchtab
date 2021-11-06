import React, { FC } from "react";
import Popup from "reactjs-popup";
import styled, { keyframes } from "styled-components";

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
    background-color: ${({ theme }) => theme.modals.matte};
    backdrop-filter: blur(16px);
    animation: ${appear} 0.12s linear;
  }

  &-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: transparent;
    color: ${({ theme }) => theme.texts.body.paragraph};
  }
`;

interface IModal {
  trigger?: JSX.Element;
  open?: boolean;
  onClose?: () => void;
}

export const Modal: FC<IModal> = ({ trigger, open, children, onClose }) => {
  return (
    <PopupStyled
      modal
      position="center center"
      arrow={false}
      open={open}
      onClose={onClose}
      trigger={open === undefined ? () => <div>{trigger}</div> : undefined}
    >
      {children}
    </PopupStyled>
  );
};
