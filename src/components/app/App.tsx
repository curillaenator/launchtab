import React, { FC, useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalFonts from '../../assets/fonts/fonts';

import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { useDataQuery } from './useDataQuery';
import { useThemeComposer } from './useThemeComposer';

import { Header } from '../header/Header';
import { Loader } from '../loader/Loader';
import { Background } from '../background/Background';
import { Pages } from '../pages/Pages';
import { Bookmarks } from '../bookmarks/Bookmarks';
import { Sign } from '../sign';
import { Modal } from '../modal/Modal';
import { Settings } from '../settings/Settings';

import { checkUserIsAuthed } from '../../redux/reducers/auth';
import { getCurBookmarks } from '../../redux/reducers/bookmarks';

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

  const user = useAppSelector((state) => state.auth.user);
  const { bookmarks, loadings } = useAppSelector((state) => state);

  const { data, pages, curPage, curBookmarks } = bookmarks;
  const { isAppLoading, isDataLoading } = loadings;

  const [settingsModal, setSettingsModal] = useState(false);
  const [isAnon] = useDataQuery(user);
  const currentTheme = useThemeComposer();

  useEffect(() => dispatch(checkUserIsAuthed()), [dispatch]);
  useEffect(() => dispatch(getCurBookmarks(curPage)), [curPage, dispatch]);

  useEffect(() => {
    const html = document.querySelector('html');

    if (!!html) {
      html.style.setProperty('background-color', currentTheme.backgrounds.light);
      html.style.setProperty('--scrollbar-thumb', currentTheme.backgrounds.base);
      html.style.setProperty('--scrollbar-track', currentTheme.backgrounds.light);
    }
  }, [currentTheme]);

  if (isAppLoading || isDataLoading) return <Loader fullscreen />;

  return (
    <ThemeProvider theme={currentTheme}>
      <AppStyled>
        <GlobalFonts />
        <Background />

        <Modal open={settingsModal} onClose={() => setSettingsModal(false)}>
          <Settings closeSettings={() => setSettingsModal(false)} />
        </Modal>

        {data && (
          <>
            <Header isAnon={isAnon} setSettingsModal={() => setSettingsModal(true)} />

            <div className='main-screen'>
              <Pages pages={pages} curPage={curPage} />

              <Bookmarks bookmarks={curBookmarks} curPage={curPage} />
            </div>
          </>
        )}

        {isAnon && <Sign />}
      </AppStyled>
    </ThemeProvider>
  );
};
