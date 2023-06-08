import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Shape } from '@src/components/shape/Shape';

import { useAppSelector } from '@src/hooks/hooks';
import { useSearch } from './useSearch';

import { icons } from '@src/assets/icons';

const SEARCH_FIXED_PADDING_X = 88;

const SearchFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .subInput {
    text-align: center;
    color: ${({ theme }) => theme.white};
  }
`;

interface IInputStyled {
  isOpaque: boolean;
}

const InputStyled = styled.div<IInputStyled>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  width: 100%;
  padding: 0 ${SEARCH_FIXED_PADDING_X}px;

  .input-shape {
    fill: ${({ theme, isOpaque }) => (isOpaque ? theme.backgrounds.base20 : theme.backgrounds.base)};
    backdrop-filter: ${({ isOpaque }) => (isOpaque ? 'blur(5px)' : 'none')};

    &-focused {
      fill: ${({ theme, isOpaque }) => (isOpaque ? theme.backgrounds.base40 : theme.backgrounds.base)};
      filter: drop-shadow(${({ theme }) => theme.shadows.card});
    }
  }

  .google_logo {
    z-index: 100;
    position: absolute;
    top: 50%;
    left: calc(1.125rem + 88px);
    transform: translateY(-50%);
  }

  .searchInput {
    width: 100%;
    height: 56px;
    background-color: transparent;
    transition: 0.1s ease-in-out;
    font-size: 1rem;
    font-weight: 600;
    padding: 0 1.25rem 0 3.5rem;
    outline: none;
    color: ${({ theme, isOpaque }) => (isOpaque ? theme.white : theme.texts.base)};

    &::placeholder {
      color: ${({ theme }) => theme.texts.placeholder};
    }

    &::-webkit-search-cancel-button {
      appearance: none;
    }
  }

  @media (min-width: 1920px) {
    width: 75vw;
  }

  @media (min-width: 2560px) {
    width: 55vw;
  }
`;

export const SearchField: FC = () => {
  const [value, setValue, onSubmit] = useSearch();
  const [focused, setFocused] = useState<boolean>(false);

  const wallpapper = useAppSelector((state) => state.settings.lookfeel.wallpaper);

  return (
    <SearchFormStyled action='https://www.google.com/search' onSubmit={onSubmit}>
      <InputStyled isOpaque={!!wallpapper}>
        <Shape
          className={`input-shape ${focused ? 'input-shape-focused' : ''}`}
          borderRadius={18}
          contractXBy={SEARCH_FIXED_PADDING_X * 2}
          contractYBy={4}
        />

        {icons.searchEngines.google}

        <input
          className='searchInput'
          id='search'
          type='search'
          name='q'
          autoComplete='off'
          autoFocus
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Type URL or search query and press Enter'
        />
      </InputStyled>
    </SearchFormStyled>
  );
};
