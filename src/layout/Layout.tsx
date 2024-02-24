import React, { FC, useEffect, useState, useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Outlet } from 'react-router-dom';
import { Drawer } from '@launch-ui/drawer';

import GlobalFonts from '@src/assets/fonts/fonts';
import { Background } from '@src/components/background/Background';
import { Header } from '@src/components/header/Header';
import { Settings } from '@src/components/settings';
import { Sign } from '@src/components/sign';
import { Loader } from '@src/components/loader/Loader';

import { useAppSelector, useAppDispatch } from '@src/hooks';
import { checkUserIsAuthed } from '@src/redux/reducers/auth';

import { useThemeComposer } from './useThemeComposer';

const LayoutStyled = styled.div`
  position: relative;
  width: 100%;
  min-width: 1280px;
  min-height: 100vh;
  color: ${({ theme }) => theme.texts.base};
`;

export const Layout: FC = () => {
  const dispatch = useAppDispatch();

  const { user, userLoading } = useAppSelector((state) => state.auth);
  const { isAppLoading, isDataLoading } = useAppSelector((state) => state.loadings);

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

  if (userLoading || isAppLoading || isDataLoading) return <Loader fullscreen />;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalFonts />

      <LayoutStyled
        className='layout-container'
        data-description='layout-container'
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

        <Header isAnon={!!user?.isAnonymous} setSettingsModal={() => setIsRightDrawerOpen(true)} />

        <Outlet />

        {!user?.isAnonymous ? (
          <Drawer portalId='launch-tabs-drawer' open={isRightDrawerOpen} onClose={() => setIsRightDrawerOpen(false)}>
            <Settings closeSettings={() => setIsRightDrawerOpen(false)} />
          </Drawer>
        ) : (
          <Sign />
        )}
      </LayoutStyled>
    </ThemeProvider>
  );
};
