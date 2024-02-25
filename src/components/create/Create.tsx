import React, { FC, ReactNode, useMemo } from 'react';
import Popup from 'reactjs-popup';
import styled, { keyframes } from 'styled-components';
import { Corners } from '@launch-ui/shape';

import { useCreateForm } from './hooks/useCreateForm';
import { CreateFormCTX } from './context';

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

export const Create: FC<{ create: 'new-page' | 'new-bookmark' }> = ({ create }) => {
  const { formContextValue, resetFormState } = useCreateForm(create);

  return (
    <CreateFormCTX.Provider value={useMemo(() => formContextValue, [formContextValue])}>
      <PopupStyled
        offsetX={16}
        arrow={false}
        onClose={() => resetFormState()}
        keepTooltipInside='.layout-container'
        position={['right center', 'left center']}
        trigger={(open) => (
          <CreateContainerStyled active={open} isCreateBookmark={create === 'new-bookmark'}>
            <Corners borderRadius={create === 'new-bookmark' ? 24 : 18} stroke={create === 'new-bookmark' ? 4 : 0} />
            <button>{icons.plus}</button>
          </CreateContainerStyled>
        )}
      >
        {
          ((close: () => void) =>
            create === 'new-page' ? (
              <PagePopup closePopup={close} />
            ) : (
              <BookmarkPopup closePopup={close} />
            )) as unknown as ReactNode
        }
      </PopupStyled>
    </CreateFormCTX.Provider>
  );
};
