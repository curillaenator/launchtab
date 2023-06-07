import React, { FC } from 'react';
import Popup from 'reactjs-popup';
import styled, { keyframes } from 'styled-components';
import { Shape } from '@src/components/shape/Shape';

import { useCreateForm } from './hooks/useCreateForm';
import { usePopupPosition } from './hooks/usePopupPosition';

import { BtnIcon, ButtonsIcons } from '@src/components/buttons';
import { PagePopup } from './components/PagePopup';
import { BookmarkPopup } from './components/BookmarkPopup';

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

interface CreateContainerStyledProps {
  isCreateBookmark: boolean;
}

const CreateContainerStyled = styled.div<CreateContainerStyledProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ isCreateBookmark }) => (isCreateBookmark ? '100%' : 'fit-content')};
  height: ${({ isCreateBookmark }) => (isCreateBookmark ? '100%' : 'fit-content')};
  min-height: 186px;

  .create-shape {
    fill: transparent;
    stroke: ${({ theme, isCreateBookmark }) => (isCreateBookmark ? theme.backgrounds.lightest : 'transparent')};
    stroke-width: 1px;
  }
`;

interface ICreate {
  create: 'new-page' | 'new-bookmark';
  iconName?: ButtonsIcons;
}

export const Create: FC<ICreate> = ({ create, iconName = 'addBigIcon' }) => {
  const [states, handlers, handleCreate, resetStates] = useCreateForm(create);
  const [position, offsetY, onTriggerClick] = usePopupPosition('bottom center');

  return (
    <PopupStyled
      offsetY={create === 'new-bookmark' ? offsetY : 74}
      offsetX={create === 'new-bookmark' ? -64 : 32}
      arrow={false}
      onClose={() => resetStates()}
      position={position}
      trigger={(open) => (
        <CreateContainerStyled isCreateBookmark={create === 'new-bookmark'}>
          {create === 'new-bookmark' && <Shape borderRadius={18} className={`create-shape`} />}

          <BtnIcon
            iconName={iconName}
            active={open}
            // @ts-expect-error need fix types
            handler={onTriggerClick}
          />
        </CreateContainerStyled>
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
