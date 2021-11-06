import React, { FC, useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalFonts from "../../assets/fonts/fonts";

import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { useDataQuery } from "./useDataQuery";
import { useThemeComposer } from "./useThemeComposer";

import { Header } from "../header/Header";
import { Loader } from "../loader/Loader";
import { Background } from "../background/Background";
import { Pages } from "../pages/Pages";
import { Bookmarks } from "../bookmarks/Bookmarks";
import { Sign } from "../sign";
import { Modal } from "../modal/Modal";
import { Settings } from "../settings/Settings";

import { checkUserIsAuthed } from "../../redux/reducers/auth";
import { getCurBookmarks } from "../../redux/reducers/bookmarks";

const AppStyled = styled.div`
  position: relative;
  width: 100%;
  min-width: 320px;
  padding: 3.5rem 1rem;
  margin: 0 auto;
  color: ${({ theme }) => theme.texts.body.paragraph};

  @media (min-width: 768px) {
    padding: 4.5rem 2rem;
  }

  @media (min-width: 1152px) {
    padding: 4.5rem 4rem;
  }

  @media (min-width: 1440px) {
    padding: 4.5rem 7rem;
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
            <Header
              isAnon={isAnon}
              setSettingsModal={() => setSettingsModal(true)}
            />

            <Pages pages={pages} curPage={curPage} />

            <Bookmarks bookmarks={curBookmarks} curPage={curPage} />
          </>
        )}

        {isAnon && <Sign />}
      </AppStyled>
    </ThemeProvider>
  );
};
