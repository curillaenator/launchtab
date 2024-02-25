import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Corners } from '@launch-ui/shape';

import { useAppSelector } from '@src/hooks/hooks';
import { useSearch } from './useSearch';

import GoogleIcon from '@src/assets/svg/google.svg';

const SearchFormStyled = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
  overflow: visible;
`;

interface IInputStyled {
  isOpaque: boolean;
  focused: boolean;
}

const InputStyled = styled.div<IInputStyled>`
  --shp-bgc: ${({ theme }) => theme.backgrounds.base};
  --shp-bdc: ${({ theme, focused }) => (focused ? theme.primary[500] : theme.backgrounds.base)};

  position: relative;
  width: 75%;
  overflow: visible;
  border-radius: calc(20px * 1.25 + 3px);
  background-color: var(--shp-bgc);
  box-shadow: inset 0 0 0 2px var(--shp-bdc);

  @media (width > 2560px) {
    width: 50%;
  }

  &:hover {
    --shp-bdc: ${({ theme, focused }) => (focused ? theme.primary[500] : theme.primary[400])};
  }

  .google_logo {
    z-index: 100;
    position: absolute;
    top: 50%;
    left: 1.125rem;
    transform: translateY(-50%);
  }

  .searchInput {
    /* position: s */
    display: block;
    width: 100%;
    height: 56px;
    background-color: transparent;
    transition: 0.1s ease-in-out;
    font-size: 1rem;
    font-weight: 600;
    padding: 0 1.25rem 0 3.5rem;
    outline: none;
    color: ${({ theme }) => theme.texts.base};
    z-index: 100;
    position: relative;

    &::placeholder {
      color: ${({ theme }) => theme.texts.placeholder};
    }

    &::-webkit-search-cancel-button {
      appearance: none;
    }
  }
`;

export const SearchField: FC = () => {
  const [value, setValue, onSubmit] = useSearch();
  const [focused, setFocused] = useState<boolean>(false);

  const wallpapper = useAppSelector((state) => state.settings.lookfeel.wallpaper);

  return (
    <SearchFormStyled action='https://www.google.com/search' onSubmit={onSubmit}>
      <InputStyled isOpaque={!!wallpapper} focused={focused}>
        <Corners stroke={2} borderRadius={20} />

        <GoogleIcon className='search_engine google_logo' />

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
