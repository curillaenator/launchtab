import React, { FC } from 'react';
import Popup from 'reactjs-popup';
import styled, { keyframes } from 'styled-components';

import { useCreateForm } from './hooks/useCreateForm';
import { usePopupPosition } from './hooks/usePopupPosition';

import { BtnIcon } from '../buttons';
import { PagePopup } from './components/PagePopup';
import { BookmarkPopup } from './components/BookmarkPopup';

import { ButtonsIcons } from '../buttons';

const appear = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
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
  create: 'new-page' | 'new-bookmark';
  iconName?: ButtonsIcons;
}

export const Create: FC<ICreate> = ({ create, iconName = 'addSmallIcon' }) => {
  const [states, handlers, handleCreate, resetStates] = useCreateForm(create);
  const [position, offsetY, onTriggerClick] = usePopupPosition('bottom center');

  return (
    <PopupStyled
      offsetY={create === 'new-bookmark' ? offsetY : 74}
      offsetX={create === 'new-bookmark' ? 38 : 32}
      arrow={false}
      onClose={() => resetStates()}
      position={position}
      trigger={(open) => (
        <div
          style={{
            width: 'fit-content',
            height: 'fit-content',
          }}
        >
          <BtnIcon
            iconName={iconName}
            active={open}
            // @ts-expect-error need fix types
            handler={onTriggerClick}
          />
        </div>
      )}
    >
      {
        // @ts-expect-error need fix types
        (close: () => void) => (
          <>
            {create === 'new-page' && (
              <PagePopup
                pageName={states.name}
                handlePageName={handlers.handleName}
                handleCreate={handleCreate}
                close={close}
              />
            )}

            {create === 'new-bookmark' && (
              <BookmarkPopup values={states} handlers={handlers} handleCreate={handleCreate} close={close} />
            )}
          </>
        )
      }
    </PopupStyled>
  );
};
