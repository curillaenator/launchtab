import React, { FC, useEffect, useRef } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import { createClient as createPexelsClient, PhotosWithTotalResults as PexelsPhotosWithTotalResults } from 'pexels';

import { themeNames } from '@launch-ui/theme';
import { Dropable } from '@launch-ui/dropable';
import { ButtonGhost, ButtonAction } from '@launch-ui/button';
import { Switch, Input, Titlewrap } from '@launch-ui/input';
import { Loader } from '@launch-ui/loader';

import { ImagePreview } from '@src/components/imagePreview/ImagePreview';

import { $settingsStore, setSettings } from '@src/entities/settings';
import { useDropable } from '@src/hooks/useDropable';

import { $pexelsStore, setPexels, setPexelsLoading, setPexelsQuery } from '@src/entities/pexels';

import { LookFeelStyled } from './lookfeel.styled';

import DotIcon from '@src/assets/svg/dot.svg';
import UpdateIcon from '@src/assets/svg/update.svg';
import SearchIcon from '@src/assets/svg/search.svg';

const client = createPexelsClient('C4n9S5rIWDpuE2YVHwTmyZy7CMuHjehR6lsquBxJq2NTIoIatAWR5AT5');

const DYNAMIC_WP_OPTIONS = [
  { title: 'Flowy Clouds', value: 'clouds' },
  { title: 'Beach Noon', value: 'beach' },
];

export const LookFeel: FC = () => {
  const settingsState = useEffectorUnit($settingsStore);

  const { pexels, pexelsLoading, pexelsQuery } = useEffectorUnit($pexelsStore);

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
      setPexelsLoading(true);

      client.photos
        .search({ query: pexelsQuery, per_page: 50, page: 1 })
        .then((res) => {
          setPexels(res as PexelsPhotosWithTotalResults);
        })
        .catch(() => {
          alert('Image service unfurtunatelly failed =(');
        })
        .finally(() => {
          setPexelsLoading(false);
        });
    }, 5000);
  }, [pexelsQuery]);

  const { isOpen: isThemeOpen = false, closeDropdown: closeTheme, ...restTheme } = useDropable();
  const { isOpen: isDynamicWpOpen = false, closeDropdown: closeDynamicWp, ...restDynamicWp } = useDropable();

  return (
    <LookFeelStyled>
      <Titlewrap title='Theme'>
        <Dropable
          {...restTheme}
          maxWidth={356}
          minWidth={356}
          offset={[0, 4]}
          openNode={
            <ButtonAction
              title={themeOptions.find(({ value }) => settingsState.themeName === value)?.title || 'Not selected'}
              active={isThemeOpen}
              appearance='secondary'
              fullwidth
            />
          }
        >
          {themeOptions.map(({ title, value }) => (
            <ButtonGhost
              key={value}
              height={32}
              title={title}
              active={value === settingsState.themeName}
              onClick={() => {
                //@ts-expect-error
                setSettings({ themeName: value });
                closeTheme?.();
              }}
              LeftIcon={() => <DotIcon />}
            />
          ))}
        </Dropable>
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
          <Dropable
            {...restDynamicWp}
            maxWidth={356}
            minWidth={356}
            offset={[0, 4]}
            openNode={
              <ButtonAction
                title={
                  DYNAMIC_WP_OPTIONS.find(({ value }) => settingsState.dynamicWallpaper === value)?.title ||
                  'Not selected'
                }
                active={isDynamicWpOpen}
                appearance='secondary'
                fullwidth
              />
            }
          >
            {DYNAMIC_WP_OPTIONS.map(({ title, value }) => (
              <ButtonGhost
                key={value}
                height={32}
                title={title}
                active={value === settingsState.dynamicWallpaper}
                onClick={() => {
                  //@ts-expect-error
                  setSettings({ dynamicWallpaper: value });
                  closeDynamicWp?.();
                }}
                LeftIcon={() => <DotIcon />}
              />
            ))}
          </Dropable>
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
              //@ts-expect-error
              disabled={pexelsLoading}
              icon={() => <SearchIcon />}
              type='url'
              name='background'
              placeholder='Type any tag (example "nature")'
              value={pexelsQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPexelsQuery(e.target.value)}
            />

            <div className='search-pexels-wallpaper-controls'>
              <ButtonGhost
                disabled={pexelsLoading}
                LeftIcon={() => <UpdateIcon />}
                title='Clear wallpaper'
                style={{ width: 'fit-content' }}
                onClick={() => setSettings({ wallpaper: null })}
              />

              {pexelsLoading && <Loader iconSize='24px' iconPadding='8px' />}
            </div>
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
