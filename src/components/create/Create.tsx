import React, { FC } from 'react';
import Popup from 'reactjs-popup';
import styled, { keyframes } from 'styled-components';
import { Corners } from '@launch-ui/shape';

import { useCreateForm } from './hooks/useCreateForm';

import { PagePopup } from './components/PagePopup';
import { BookmarkPopup } from './components/BookmarkPopup';

import { CreateContainerStyled } from './create.styled';
import { icons } from '@src/assets/icons';

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
}

export const Create: FC<ICreate> = ({ create }) => {
  const [states, handlers, handleCreate, resetStates] = useCreateForm(create);

  return (
    <PopupStyled
      offsetY={create === 'new-bookmark' ? 128 : 74}
      offsetX={create === 'new-bookmark' ? -64 : 32}
      arrow={false}
      onClose={() => resetStates()}
      keepTooltipInside='.launch-app-container'
      position={['left center', 'right center']}
      trigger={(open) => (
        <CreateContainerStyled active={open} isCreateBookmark={create === 'new-bookmark'}>
          <Corners borderRadius={create === 'new-bookmark' ? 24 : 18} stroke={create === 'new-bookmark' ? 4 : 0} />

          <button>{icons.plus}</button>
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
