import React, { FC, useRef } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';

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

import { useDomStyles } from '@src/hooks/useDomStyles';

import GlobalFonts from '@src/assets/fonts/fonts';
import LayoutStyled from './styled';

export const Layout: FC = () => {
  const { isLoading, isAsideOpen, isSignInOpen, isRightDrawerOpen } = useEffectorUnit($appStore);
  const { uid } = useEffectorUnit($userStore);
  const { dynamicWallpaper } = useEffectorUnit($settingsStore);

  const mouseWatcher = useRef<((e: React.MouseEvent<Element, MouseEvent>) => void) | null>(null);

  const { currentTheme } = useDomStyles();

  useAuthState();

  return (
    // @ts-expect-error
    <ThemeProvider theme={currentTheme}>
      {/* @ts-expect-error */}
      <GlobalFonts />

      {isLoading && <Loader fullscreen size='56px' />}

      {!isLoading && (
        <LayoutStyled
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

          <div className='viewport'>
            <Header />
            <Outlet />
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
