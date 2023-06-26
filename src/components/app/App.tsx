import React, { FC, useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Drawer } from '@launch-ui/drawer';

import GlobalFonts from '@src/assets/fonts/fonts';

import { useAppSelector, useAppDispatch } from '@src/hooks';

import { Header } from '@src/components/header/Header';
import { Loader } from '@src/components/loader/Loader';
import { Background } from '@src/components/background/Background';
import { Pages } from '@src/components/pages/Pages';
import { Bookmarks } from '@src/components/bookmarks/Bookmarks';
import { Sign } from '@src/components/sign';
import { Settings } from '@src/components/settings';

import { checkUserIsAuthed } from '@src/redux/reducers/auth';
import { getCurBookmarks } from '@src/redux/reducers/bookmarks';

import { useDataQuery } from './useDataQuery';
import { useThemeComposer } from './useThemeComposer';

const AppStyled = styled.div`
  --app-pd: 64px;

  position: relative;
  width: 100%;
  min-width: 1280px;
  min-height: 100vh;
  padding: var(--app-pd);
  margin: 0 auto;
  color: ${({ theme }) => theme.texts.base};

  .main-screen {
    width: 100%;
    height: 100%;
    padding-top: calc(var(--app-pd) * 3);
    min-height: calc(100vh - var(--app-pd) * 2);
  }

  @media (min-width: 1920px) {
    --app-pd: 96px;
  }
`;

export const App: FC = () => {
  const dispatch = useAppDispatch();

  const bookmarks = useAppSelector((state) => state.bookmarks);
  const loadings = useAppSelector((state) => state.loadings);
  const { userLoading } = useAppSelector((state) => state.auth);

  const { data, pages, curPage, curBookmarks } = bookmarks;
  const { isAppLoading, isDataLoading } = loadings;

  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState<boolean>(false);

  const { isUserAnon } = useDataQuery();

  const currentTheme = useThemeComposer();

  useEffect(() => {
    dispatch(checkUserIsAuthed());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCurBookmarks(curPage));
  }, [curPage, dispatch]);

  useEffect(() => {
    const html = document.querySelector('html');

    if (!!html) {
      html.style.setProperty('background-color', currentTheme.backgrounds.light);
      html.style.setProperty('--scrollbar-thumb', currentTheme.backgrounds.base);
      html.style.setProperty('--scrollbar-track', currentTheme.backgrounds.light);

      html.style.setProperty('--dwr-overlay-bgc', currentTheme.backgrounds.base40);
      html.style.setProperty('--drw-overlay-backdrop-filter', 'blur(8px)');
      html.style.setProperty('--drw-sh', currentTheme.shadows.card);
      html.style.setProperty('--drw-ct-gn', currentTheme.texts.base);
    }
  }, [currentTheme]);

  if (userLoading || isAppLoading || isDataLoading) return <Loader fullscreen />;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalFonts />

      <AppStyled>
        <Background />

        {data && (
          <>
            <Header isAnon={!!isUserAnon} setSettingsModal={() => setIsRightDrawerOpen(true)} />

            <div className='main-screen'>
              <Pages pages={pages} curPage={curPage} />
              <Bookmarks bookmarks={curBookmarks} curPage={curPage} />
            </div>
          </>
        )}

        {!isUserAnon && (
          <Drawer portalId='launch-tabs-drawer' open={isRightDrawerOpen} onClose={() => setIsRightDrawerOpen(false)}>
            <Settings closeSettings={() => setIsRightDrawerOpen(false)} />
          </Drawer>
        )}

        {isUserAnon && <Sign />}
      </AppStyled>
    </ThemeProvider>
  );
};
