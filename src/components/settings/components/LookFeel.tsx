import React, { FC, Dispatch } from 'react';
import { AnyAction } from '@reduxjs/toolkit';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';

import { TextInput, Dropdown, Switch, Titlewrap } from '@src/components/inputs';
import { ImagePreview } from '@src/components/imagePreview/ImagePreview';

import { themeNames } from '@launch-ui/theme';

import type { ILookFeelActions, ISettingsState } from '../reducer';

const animation = keyframes`${fadeIn}`;
const LookFeelStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  min-height: 320px;
  animation: ${animation} 0.2s linear;
  /* padding-right: 16px; */
`;

interface ILookFeel {
  values: ISettingsState['lookfeel'];
  setters: ILookFeelActions;
  dispatch: Dispatch<AnyAction>;
}

export const LookFeel: FC<ILookFeel> = ({ values, setters, dispatch }) => {
  const themeOptions = Object.keys(themeNames).map((themeKey) => ({
    title: themeNames[themeKey],
    value: themeKey,
  }));

  return (
    <LookFeelStyled>
      <Titlewrap title='Theme'>
        <Dropdown
          selected={values.themeName}
          options={themeOptions}
          onChange={(themeName) => dispatch(setters.setTheme(themeName))}
        />
      </Titlewrap>

      <Titlewrap title='Dark Mode'>
        <Switch value={values.darkMode} onChange={() => dispatch(setters.setDarkMode(!values.darkMode))} />
      </Titlewrap>

      <Titlewrap title='Wallpaper'>
        <TextInput
          iconName='link'
          type='url'
          name='background'
          placeholder='full link to any image'
          value={values.wallpaper || ''}
          onChange={(url) => dispatch(setters.setWallpaper(url))}
        />
      </Titlewrap>

      <ImagePreview imageURL={values.wallpaper || ''} />
    </LookFeelStyled>
  );
};
