import React, { FC, useEffect, useRef } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import { createClient, PhotosWithTotalResults } from 'pexels';

import { Select } from '@launch-ui/select';

import { ButtonGhost } from '@launch-ui/button';
import { Switch, Input, Titlewrap } from '@launch-ui/input';
import { ImagePreview } from '@src/components/imagePreview/ImagePreview';

import { themeNames } from '@launch-ui/theme';

import { $settingsStore, setSettings } from '@src/entities/settings';

import {
  $pexelsStore,
  setPexels,
  // setPexelsLoading,
  setPexelsQuery,
} from '@src/entities/pexels';

import { LookFeelStyled } from './styles';

import ShevronIcon from '@src/assets/svg/shevron.svg';
import UpdateIcon from '@src/assets/svg/update.svg';
import SearchIcon from '@src/assets/svg/search.svg';

const client = createClient('C4n9S5rIWDpuE2YVHwTmyZy7CMuHjehR6lsquBxJq2NTIoIatAWR5AT5');

export const LookFeel: FC = () => {
  const settingsState = useEffectorUnit($settingsStore);

  const {
    pexels,
    // pexelsLoading,
    pexelsQuery,
  } = useEffectorUnit($pexelsStore);

  const themeOptions = Object.keys(themeNames).map((themeKey) => ({
    title: themeNames[themeKey],
    value: themeKey,
  }));

  const pexelsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!pexelsQuery) {
      return;
    }

    if (pexelsTimer.current) clearTimeout(pexelsTimer.current);

    pexelsTimer.current = setTimeout(() => {
      client.photos
        .search({ query: pexelsQuery, per_page: 30, page: 1 })
        .then((res) => {
          setPexels(res as PhotosWithTotalResults);
        })
        .catch(() => {
          alert('Image service unfurtunatelly failed =(');
        });
    }, 2000);
  }, [pexelsQuery]);

  return (
    <LookFeelStyled>
      <Titlewrap title='Theme'>
        <Select
          shevronIcon={<ShevronIcon className='svg_icon dropdown-title-shevron' />}
          selected={settingsState.themeName}
          options={themeOptions}
          onChange={(themeName) =>
            //@ts-expect-error
            setSettings({ themeName })
          }
        />
      </Titlewrap>

      <Titlewrap title='Dark Mode'>
        <Switch
          //
          checked={settingsState.darkMode}
          onChange={() => setSettings({ darkMode: !settingsState.darkMode })}
        />
      </Titlewrap>

      <Titlewrap title='Dynamic wallpaper'>
        <Switch
          checked={settingsState.isDynamicWallpaper}
          onChange={() => setSettings({ isDynamicWallpaper: !settingsState.isDynamicWallpaper })}
        />
      </Titlewrap>

      {settingsState.isDynamicWallpaper && (
        <Titlewrap title='Select dynamic wallpaper'>
          <Select
            shevronIcon={<ShevronIcon className='svg_icon dropdown-title-shevron' />}
            selected={settingsState.dynamicWallpaper}
            options={[
              { title: 'Flowy Clouds', value: 'clouds' },
              { title: 'Beach Noon', value: 'beach' },
            ]}
            onChange={(dynWallpaper) => setSettings({ dynamicWallpaper: dynWallpaper as 'beach' | 'clouds' })}
          />
        </Titlewrap>
      )}

      {!settingsState.isDynamicWallpaper && (
        <>
          {settingsState.wallpaper && (
            <Titlewrap title='Current wallpaper' noOffset>
              <ImagePreview clickable={false} alt='launchtabs-wallpaper' src={settingsState.wallpaper} />
            </Titlewrap>
          )}

          <Titlewrap title='Search wallpaper'>
            <Input
              icon={() => <SearchIcon />}
              type='url'
              name='background'
              placeholder='Type any tag (example "nature")'
              value={pexelsQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPexelsQuery(e.target.value)}
            />

            <ButtonGhost
              LeftIcon={() => <UpdateIcon />}
              title='Clear wallpaper'
              style={{ width: 'fit-content' }}
              onClick={() => setSettings({ wallpaper: null })}
            />
          </Titlewrap>

          {pexels.photos.map((photo) => (
            <ImagePreview
              key={photo.id}
              alt={photo.alt as string}
              src={photo.src.large}
              onClick={() => setSettings({ wallpaper: photo.src.original })}
              active={settingsState.wallpaper === photo.src.original}
              avgColor={photo.avg_color as string}
              clickable
            />
          ))}
        </>
      )}
    </LookFeelStyled>
  );
};
