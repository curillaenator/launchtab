import React, { FC, useEffect, useState, useRef, useMemo } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Outlet } from 'react-router-dom';
import { Drawer } from '@launch-ui/drawer';

import GlobalFonts from '@src/assets/fonts/fonts';
import { Background } from '@src/components/background/Background';
import { Header } from '@src/components/header/Header';
import { Aside } from '@src/components/aside';
import { Settings } from '@src/components/settings';
import { Sign } from '@src/components/sign';
import { Loader } from '@src/components/loader/Loader';

import { LayoutCTX } from './context';

import { useAppSelector, useAppDispatch } from '@src/hooks';
import { checkUserIsAuthed } from '@src/redux/reducers/auth';

import { useThemeComposer } from './useThemeComposer';

const LayoutStyled = styled.div<{ isAsideOpen: boolean }>`
  position: relative;

  display: flex;
  width: 100%;
  min-width: 1280px;
  color: ${({ theme }) => theme.texts.base};

  .aside {
    position: sticky;
    top: 0;
    width: ${({ isAsideOpen }) => (isAsideOpen ? '384px' : '0')};
    min-height: 100vh;
    max-height: 100vh;
    flex-shrink: 0;
    transition: width 200ms ease;
    overflow: hidden;
  }

  .viewport {
    width: 100%;
  }
`;

export const Layout: FC = () => {
  const dispatch = useAppDispatch();

  const { user, userLoading } = useAppSelector((state) => state.auth);
  const { isAppLoading } = useAppSelector((state) => state.loadings);

  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState<boolean>(false);

  const mouseWatcher = useRef<(e: React.MouseEvent<Element, MouseEvent>) => void>(null);
  const currentTheme = useThemeComposer();

  useEffect(() => {
    dispatch(checkUserIsAuthed());
  }, [dispatch]);

  useEffect(() => {
    const html = document.querySelector('html');

    if (!!html) {
      html.style.setProperty('background-color', currentTheme.backgrounds.light);
      html.style.setProperty('--scrollbar-thumb', currentTheme.primary[500]);
      html.style.setProperty('--scrollbar-track', currentTheme.backgrounds.light);

      html.style.setProperty('--dwr-overlay-bgc', currentTheme.backgrounds.base40);
      html.style.setProperty('--drw-sh', currentTheme.shadows.card);
      html.style.setProperty('--drw-ct-gn', currentTheme.texts.base);
    }
  }, [currentTheme]);

  const valueCTX = useMemo(
    () => ({
      isAsideOpen,
      isRightDrawerOpen,
      setIsAsideOpen,
      setIsRightDrawerOpen,
    }),
    [isAsideOpen, isRightDrawerOpen, setIsAsideOpen, setIsRightDrawerOpen],
  );

  if (userLoading || isAppLoading) return <Loader fullscreen />;

  return (
    <LayoutCTX.Provider value={valueCTX}>
      <ThemeProvider theme={currentTheme}>
        <GlobalFonts />

        <LayoutStyled
          className='layout-container'
          data-description='layout-container'
          isAsideOpen={isAsideOpen}
          onMouseMove={(e) => {
            if (isRightDrawerOpen || !mouseWatcher.current) return;
            mouseWatcher.current(e);
          }}
        >
          <Background
            setMouseWatcher={(watcher: (e: React.MouseEvent<Element, MouseEvent>) => void) => {
              mouseWatcher.current = watcher;
            }}
          />

          <aside className='aside'>
            <Aside />
          </aside>

          <div className='viewport'>
            <Header />

            <Outlet />
          </div>

          {!user?.isAnonymous ? (
            <Drawer portalId='launch-tabs-drawer' open={isRightDrawerOpen} onClose={() => setIsRightDrawerOpen(false)}>
              <Settings closeSettings={() => setIsRightDrawerOpen(false)} />
            </Drawer>
          ) : (
            <Sign />
          )}
        </LayoutStyled>
      </ThemeProvider>
    </LayoutCTX.Provider>
  );
};
