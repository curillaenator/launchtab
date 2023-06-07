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
    color: ${({ theme }) => theme.white};
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
  margin-bottom: 8px;
  width: 100%;
  padding: 0 88px;

  .google_logo {
    z-index: 100;
    position: absolute;
    top: 50%;
    left: calc(1.125rem + 88px);
    transform: translateY(-50%);
  }

  .searchInput {
    width: 100%;
    height: 3.75rem;
    background-color: ${({ theme, isOpaque }) => (isOpaque ? theme.backgrounds.base20 : theme.backgrounds.base)};
    border-radius: 1.85rem;
    backdrop-filter: ${({ isOpaque }) => (isOpaque ? 'blur(5px)' : 'none')};
    transition: 0.1s;
    font-size: 1rem;
    font-weight: 600;
    padding: 0 1.25rem 0 3.5rem;
    color: ${({ theme, isOpaque }) => (isOpaque ? theme.white : theme.texts.input)};
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.backgrounds.base40};

    &::placeholder {
      color: ${({ theme }) => theme.search.placeholder};
    }

    &::-webkit-search-cancel-button {
      cursor: pointer;
      appearance: none;
    }

    &:focus {
      box-shadow: inset 0 0 0 2px ${({ theme, isOpaque }) => (isOpaque ? theme.white : theme.primary[500])};
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
