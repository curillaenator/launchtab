import React, { FC } from 'react';
import styled from 'styled-components';

import { useAppSelector } from '../../../hooks/hooks';
import { useSearch } from './useSearch';

import { Typography } from '../../typography/Typography';

import { icons } from '../../../assets/icons';

const SearchFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .subInput {
    text-align: center;
    color: ${({ theme }) => theme.texts.title.searchSub};
  }
`;

interface IInputStyled {
  isOpaque: boolean;
}

const InputStyled = styled.div<IInputStyled>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 6px;
  width: 100%;

  .google_logo {
    position: absolute;
    top: 50%;
    left: 1.125rem;
    transform: translateY(-50%);
    ${({ theme }) => theme.imageEffects.grayscaleAndBrightness}
    z-index:100;
  }

  .searchInput {
    width: 100%;
    height: 3.75rem;
    background-color: ${({ theme, isOpaque }) => (isOpaque ? theme.shapes.base20 : theme.background)};
    border-radius: 1.85rem;
    border: 0.5px solid ${({ theme }) => theme.search.border};
    backdrop-filter: blur(5px);
    transition: 0.1s;
    font-size: 1rem;
    padding: 0 1.25rem 0 3.5rem;
    color: ${({ theme }) => theme.search.text};

    &::placeholder {
      color: ${({ theme }) => theme.search.placeholder};
    }

    &::-webkit-search-cancel-button {
      filter: invert(1) brightness(0.36);
    }

    &:focus {
      box-shadow: 0 0 0 5px ${({ theme }) => theme.search.borderFocus};

      .google_logo {
        ${({ theme }) => theme.imageEffects.cardImageDarkModeHover};
      }
    }
  }

  @media (min-width: 768px) {
    width: 65vw;
  }

  @media (min-width: 1152px) {
    width: 45vw;
  }

  @media (min-width: 1440px) {
    width: 35vw;
  }
`;

export const SearchField: FC = () => {
  const [value, setValue, onSubmit] = useSearch();

  const wallpapper = useAppSelector((state) => state.settings.lookfeel.wallpaper);

  return (
    <SearchFormStyled action='https://www.google.com/search' onSubmit={onSubmit}>
      <InputStyled isOpaque={!!wallpapper}>
        {icons.searchEngines.google}

        <input
          className='searchInput'
          id='search'
          type='search'
          name='q'
          autoComplete='off'
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </InputStyled>

      <Typography type='TextRegular11' className='subInput'>
        Type URL or search query and press Enter
      </Typography>
    </SearchFormStyled>
  );
};
