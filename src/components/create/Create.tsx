import React, { FC } from "react";
import Popup from "reactjs-popup";
import styled, { keyframes } from "styled-components";

import { useCreateForm } from "./hooks/useCreateForm";
import { usePopupPosition } from "./hooks/usePopupPosition";

import { BtnIcon } from "../buttons";
import { PagePopup } from "./components/PagePopup";
import { BookmarkPopup } from "./components/BookmarkPopup";

import { ButtonsIcons } from "../buttons";

const appear = keyframes`
  from {
    opacity: 0;
    transform: translateY(32px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PopupStyled = styled(Popup)`
  &-overlay {
  }

  &-content {
    width: fit-content;
    background-color: transparent;
    animation: ${appear} 0.2s ease-out;
  }
`;

interface ICreate {
  create: "new-page" | "new-bookmark";
  iconName?: ButtonsIcons;
}

export const Create: FC<ICreate> = ({ create, iconName = "addSmallIcon" }) => {
  const [states, handlers, handleCreate, resetStates] = useCreateForm(create);
  const [position, offsetY, onTriggerClick] = usePopupPosition("bottom center");

  return (
    <PopupStyled
      offsetY={create === "new-bookmark" ? offsetY : 0}
      arrow={false}
      onClose={() => resetStates()}
      position={position}
      trigger={(open) => (
        <div>
          <BtnIcon
            iconName={iconName}
            active={open}
            //@ts-ignore
            handler={onTriggerClick}
          />
        </div>
      )}
    >
      {(close: () => void) => (
        <>
          {create === "new-page" && (
            <PagePopup
              pageName={states.name}
              handlePageName={handlers.handleName}
              handleCreate={handleCreate}
              close={close}
            />
          )}

          {create === "new-bookmark" && (
            <BookmarkPopup
              values={states}
              handlers={handlers}
              handleCreate={handleCreate}
              close={close}
            />
          )}
        </>
      )}
    </PopupStyled>
  );
};
