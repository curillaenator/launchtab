import React, { FC, useContext } from 'react';
import styled from 'styled-components';

import { Shape } from '@launch-ui/shape';
import { Input } from '@launch-ui/input';
import { Typography } from '@launch-ui/typography';
import { ButtonAction, ButtonGhost } from '@launch-ui/button';

import { CreateFormCTX } from '../context';
import { useCustomIcons } from '../hooks/useCustomIcons';

import { Loader } from '@src/features/loader';

import { Scrollbars } from '@src/components/scrollbars';
import { Card } from '@src/components/card';

import LabelIcon from '@src/assets/svg/lable.svg';
import LinkIcon from '@src/assets/svg/link.svg';

const ICONS_IN_A_ROW = 4;

const BookmarkPopupStyled = styled.form`
  position: relative;
  width: calc(80px * ${ICONS_IN_A_ROW} + 8px * (${ICONS_IN_A_ROW} - 1) + 2 * 32px + 16px);
  padding: 32px;
  background-color: transparent;

  .popup-shape {
    overflow: visible;
    fill: ${({ theme }) => theme.backgrounds.base};
    filter: drop-shadow(${({ theme }) => theme.shadows.card});
    z-index: 0;
    pointer-events: none;
  }

  .popup-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 24px;
    color: ${({ theme }) => theme.texts.base};

    & > h3 {
      z-index: 1;
    }

    &-themed {
      color: ${({ theme }) => theme.primary[700]};
    }
  }

  .popup-inputs {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 24px;
  }

  .popup-iconsLoader {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .popup-icons {
    width: 100%;
    margin-bottom: 24px;

    &-array {
      display: grid;
      grid-template-columns: repeat(${ICONS_IN_A_ROW}, 80px);
      width: calc(80px * ${ICONS_IN_A_ROW} + 8px * (${ICONS_IN_A_ROW} - 1));
      gap: 8px;

      &-selector {
        width: fit-content;
        height: fit-content;
      }

      &-image {
        width: 80px;
        height: 80px;
        object-fit: contain;
        overflow: hidden;
      }
    }
  }

  .popup-preview {
    padding: 0 32px;
    margin-bottom: 24px;
  }

  .popup-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
`;

export const BookmarkPopup: FC<{ closePopup: () => void }> = ({ closePopup }) => {
  const { formState, dispatchForm, handleCreate } = useContext(CreateFormCTX);

  const { iconsWithGoodLinks, isFetching, fetchIcons } = useCustomIcons(formState.name);

  return (
    <BookmarkPopupStyled
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate?.();
        closePopup();
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Испольтзован Shape чтобы отбросить красивую тень */}
      <Shape borderRadius={24} className='popup-shape' />

      <div className='popup-title'>
        <Typography type='RoundedHeavy24'>New</Typography>

        <Typography type='RoundedHeavy24' className='popup-title-themed'>
          link
        </Typography>
      </div>

      <div className='popup-inputs'>
        <Input
          type='text'
          icon={() => <LabelIcon />}
          name='new-bookmark'
          limitSymbols={24}
          value={formState.name}
          onChange={(e) => dispatchForm?.({ key: 'name', payload: e.target.value })}
          onFocusOut={fetchIcons}
          placeholder='Title'
        />

        <Input
          type='text'
          icon={() => <LinkIcon />}
          name='new-link'
          value={formState.link}
          onChange={(e) => dispatchForm?.({ key: 'link', payload: e.target.value })}
          placeholder='Site link'
        />
      </div>

      {isFetching && (
        <div className='popup-iconsLoader'>
          <Loader iconSize='32px' />
        </div>
      )}

      {!!iconsWithGoodLinks.length && !isFetching && (
        <div className='popup-icons'>
          <Scrollbars height='168px'>
            <div className='popup-icons-array'>
              {iconsWithGoodLinks.map((icon) => (
                <button
                  type='button'
                  key={icon.url}
                  className='popup-icons-array-selector'
                  onClick={() => dispatchForm?.({ key: 'iconURL', payload: icon.url })}
                >
                  <img key={icon.url} className='popup-icons-array-image' src={icon.url} alt={icon.url} />
                </button>
              ))}
            </div>
          </Scrollbars>
        </div>
      )}

      <div className='popup-preview'>
        <Card
          as='div'
          hasBorder
          bookmark={{
            name: formState.name || 'Title',
            link: formState.link,
            imageURL: formState.imageURL,
            iconURL: formState.iconURL,
          }}
        />
      </div>

      <div className='popup-buttons'>
        <ButtonAction title='Create' type='submit' />
        <ButtonGhost title='Cancel' type='button' onClick={() => closePopup()} />
      </div>
    </BookmarkPopupStyled>
  );
};
