import React, { FC, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useUnit as useEffectorUnit } from 'effector-react';
import { debounce } from 'lodash';

import { ThemeProvider } from 'styled-components';
import { Outlet } from 'react-router-dom';
import { Drawer } from '@launch-ui/drawer';
import { Modal } from '@launch-ui/modal';

import { Header } from '@src/features/header';
import { Aside } from '@src/features/aside';
import { Background } from '@src/features/background';
import { Loader } from '@src/features/loader';
import { Settings } from '@src/features/settings';
import { SignIn } from '@src/features/signin';

import { $appStore, setSignIn, setRightDrawer } from '@src/entities/app';
import { $userStore, useAuthState } from '@src/entities/user';
import { $settingsStore } from '@src/entities/settings';
import { setHeaderShadowed } from '@src/entities/header';

import { useDomStyles } from '@src/hooks/useDomStyles';
import { useThemeToCssv } from '@src/hooks/useThemeToCssv';

import GlobalFonts from '@src/assets/fonts/fonts';
import LayoutStyled from './styled';

import { MAIN_ELEMENT_ID } from './constants';

// import { restoreMe } from '@src/entities/mock';

const MainStyled = styled.main`
  width: 100%;
  padding: 0 56px;
`;

export const Layout: FC = () => {
  const { isLoading, isAsideOpen, isSignInOpen, isRightDrawerOpen } = useEffectorUnit($appStore);
  const { uid } = useEffectorUnit($userStore);
  const { dynamicWallpaper } = useEffectorUnit($settingsStore);

  const mouseWatcher = useRef<((e: React.MouseEvent<Element, MouseEvent>) => void) | null>(null);

  const { currentTheme } = useDomStyles();
  const { ref: layoutRef } = useThemeToCssv(currentTheme);

  useAuthState();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onViewportScroll = useCallback(
    debounce((e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      //@ts-expect-error
      setHeaderShadowed(e.nativeEvent.target?.scrollTop > 56 * 2);
    }, 400),
    [],
  );

  // useEffect(() => {
  //   restoreMe();
  // }, []);

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalFonts />

      {isLoading && <Loader view='fullscreen' iconSize='56px' />}

      {!isLoading && (
        <LayoutStyled
          ref={layoutRef}
          className='layout-container'
          data-description='layout-container'
          $isAsideOpen={isAsideOpen}
          onMouseMove={(e) => {
            if (!dynamicWallpaper || isRightDrawerOpen || !mouseWatcher.current) return;
            mouseWatcher.current(e);
          }}
        >
          <Background
            setMouseWatcher={(watcher: (e: React.MouseEvent<Element, MouseEvent>) => void) => {
              if (!dynamicWallpaper) return;
              mouseWatcher.current = watcher;
            }}
          />

          <aside className='aside'>
            <Aside />
          </aside>

          <div className='viewport' onScroll={onViewportScroll}>
            <Header />

            <MainStyled id={MAIN_ELEMENT_ID}>
              <Outlet />
            </MainStyled>
          </div>

          {!!uid && (
            <Drawer portalId='launch-tabs-drawer' open={isRightDrawerOpen} onClose={() => setRightDrawer(false)}>
              <Settings />
            </Drawer>
          )}

          {!uid && (
            <Modal open={isSignInOpen} onClose={() => setSignIn(false)}>
              <SignIn closePopup={() => setSignIn(false)} />
            </Modal>
          )}
        </LayoutStyled>
      )}
    </ThemeProvider>
  );
};
