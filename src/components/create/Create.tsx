import React, { FC, ReactNode, useMemo } from 'react';
import Popup from 'reactjs-popup';
import styled, { css, keyframes } from 'styled-components';
import { Corners } from '@launch-ui/shape';
import { Button } from '@launch-ui/button';

import { useCreateForm } from './hooks/useCreateForm';
import { CreateFormCTX } from './context';

import { PagePopup } from './components/PagePopup';
import { BookmarkPopup } from './components/BookmarkPopup';

import LinkIcon from '@src/assets/svg/link.svg';
import FolderIcon from '@src/assets/svg/folder.svg';

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

export const CreateBookmarkCard = styled.div<{ active: boolean }>`
  --shp-bdc: ${({ theme }) => theme.backgrounds.base};

  color: ${({ theme }) => theme.backgrounds.base};
  border-radius: calc(19px * 1.25 + 3px);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 56px;
  min-width: 56px;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.backgrounds.base20};
  min-height: 186px;
  cursor: pointer;

  ${css({ 'svg[data-svg-corner]': { '--shp-bgc': 'transparent' } })}

  ${({ theme, active }) =>
    active
      ? css({
          'background-color': theme.backgrounds.base40,
          '--shp-bdc': theme.primary[500],
          color: theme.primary[500],
        })
      : css({
          '&:hover': {
            '--shp-bdc': theme.primary[500],
            color: theme.primary[500],
            'background-color': theme.backgrounds.base40,
          },
          '&:active': {
            '--shp-bdc': theme.primary[600],
            color: theme.primary[600],
          },
        })}
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
        trigger={(open) =>
          create === 'new-page' ? (
            <Button active={open} IconLeft={FolderIcon} />
          ) : (
            <CreateBookmarkCard active={open}>
              <Corners borderRadius={24} stroke={3} />
              <LinkIcon width={32} height={32} viewBox='0 0 24 24' fill='none' />
            </CreateBookmarkCard>
          )
        }
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
