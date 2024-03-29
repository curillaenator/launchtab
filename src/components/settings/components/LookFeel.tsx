import React, { FC, Dispatch, useEffect, useRef } from 'react';
import { createClient, PhotosWithTotalResults } from 'pexels';
import { AnyAction } from '@reduxjs/toolkit';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import { Select } from '@launch-ui/select';

import { ButtonGhost } from '@launch-ui/button';
import { TextInput, Switch, Titlewrap } from '@src/components/inputs';
import { ImagePreview } from '@src/components/imagePreview/ImagePreview';

import { themeNames } from '@launch-ui/theme';

import { PEXELS_INITIAL_STATE, type ILookFeelActions, type ISettingsFormState } from '../reducer';

import ShevronIcon from '@src/assets/svg/shevron.svg';
// import TrashBinIcon from '@src/assets/svg/trash.svg';
import UpdateIcon from '@src/assets/svg/update.svg';

const client = createClient('C4n9S5rIWDpuE2YVHwTmyZy7CMuHjehR6lsquBxJq2NTIoIatAWR5AT5');

const animation = keyframes`${fadeIn}`;
const LookFeelStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  /* height: 100%; */
  min-height: 320px;
  animation: ${animation} 0.2s linear;
  /* padding-right: 16px; */
`;

interface ILookFeel {
  values: ISettingsFormState;
  setters: ILookFeelActions;
  dispatch: Dispatch<AnyAction>;
}

export const LookFeel: FC<ILookFeel> = (props) => {
  const { values, setters, dispatch } = props;
  const { lookfeel, pexels } = values;

  const themeOptions = Object.keys(themeNames).map((themeKey) => ({
    title: themeNames[themeKey],
    value: themeKey,
  }));

  const pexelsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!pexels.pexelsQuery) {
      dispatch(setters.setPexels(PEXELS_INITIAL_STATE));
      return;
    }

    if (pexelsTimer.current) clearTimeout(pexelsTimer.current);

    pexelsTimer.current = setTimeout(() => {
      client.photos
        .search({
          query: pexels.pexelsQuery as string,
          per_page: 30,
          page: 1,
        })
        .then((res) => {
          dispatch(setters.setPexels(res as PhotosWithTotalResults));
        })
        .catch(() => {
          alert('Image service unfurtunatelly failed =(');
        });

      // dispatch(setters.setPexels(RES_MOCK));
    }, 2000);
  }, [pexels.pexelsQuery, setters, dispatch]);

  return (
    <LookFeelStyled>
      <Titlewrap title='Theme'>
        <Select
          shevronIcon={<ShevronIcon className='svg_icon dropdown-title-shevron' />}
          selected={lookfeel.themeName}
          options={themeOptions}
          onChange={(themeName) => dispatch(setters.setTheme(themeName))}
        />
      </Titlewrap>

      <Titlewrap title='Dark Mode'>
        <Switch value={lookfeel.darkMode} onChange={() => dispatch(setters.setDarkMode(!lookfeel.darkMode))} />
      </Titlewrap>

      <Titlewrap title='Dynamic wallpaper'>
        <Switch
          value={lookfeel.isDynamicWallpaper}
          onChange={() => dispatch(setters.setIsDynamicWallpaper(!lookfeel.isDynamicWallpaper))}
        />
      </Titlewrap>

      {lookfeel.isDynamicWallpaper && (
        <Titlewrap title='Select dynamic wallpaper'>
          <Select
            shevronIcon={<ShevronIcon className='svg_icon dropdown-title-shevron' />}
            selected={lookfeel.dynamicWallpaper}
            options={[
              { title: 'Flowy Clouds', value: 'clouds' },
              { title: 'Beach Noon', value: 'beach' },
            ]}
            onChange={(dynWallpaper) => dispatch(setters.setDynamicWallpaper(dynWallpaper as 'beach' | 'clouds'))}
          />
        </Titlewrap>
      )}

      {!lookfeel.isDynamicWallpaper && (
        <>
          {lookfeel.wallpaper && (
            <Titlewrap title='Current wallpaper' noOffset>
              <ImagePreview clickable={false} alt='launchtabs-wallpaper' src={lookfeel.wallpaper} />
            </Titlewrap>
          )}

          <Titlewrap title='Search wallpaper'>
            <TextInput
              iconName='search'
              type='url'
              name='background'
              placeholder='Type any tag (example "nature")'
              value={pexels.pexelsQuery as string}
              onChange={(query) => dispatch(setters.setPixelsQuery(query))}
            />

            <ButtonGhost
              LeftIcon={UpdateIcon}
              title='Clear wallpaper'
              style={{ width: 'fit-content' }}
              onClick={() => dispatch(setters.setWallpaper(''))}
            />
          </Titlewrap>

          {pexels.pexels.photos.map((photo) => (
            <ImagePreview
              key={photo.id}
              alt={photo.alt as string}
              src={photo.src.large}
              onClick={() => dispatch(setters.setWallpaper(photo.src.original))}
              active={values.lookfeel.wallpaper === photo.src.original}
              avgColor={photo.avg_color as string}
              clickable
            />
          ))}
        </>
      )}
    </LookFeelStyled>
  );
};
