import React, { FC, useRef } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';

import { ThemeProvider } from 'styled-components';
import { Outlet } from 'react-router-dom';
import { Drawer } from '@launch-ui/drawer';
import { Modal } from '@launch-ui/modal';

import LayoutStyled from './styled';
import GlobalFonts from '@src/assets/fonts/fonts';
import { Background } from '@src/components/background/Background';
import { Header } from '@src/components/header/Header';
import { Aside } from '@src/components/aside';
import { Settings } from '@src/components/settings';
import { SignIn } from '@src/components/signin';
import { Loader } from '@src/components/loader';

import { $appStore, setSignIn, setRightDrawer } from '@src/entities/app';
import { $userStore, useAuthState } from '@src/entities/user';

import { useDomStyles } from '@src/hooks/useDomStyles';

export const Layout: FC = () => {
  const { isLoading, isAsideOpen, isSignInOpen, isRightDrawerOpen } = useEffectorUnit($appStore);
  const user = useEffectorUnit($userStore);

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

          {!!user.uid && (
            <Drawer portalId='launch-tabs-drawer' open={isRightDrawerOpen} onClose={() => setRightDrawer(false)}>
              <Settings />
            </Drawer>
          )}

          {!user.uid && (
            <Modal open={isSignInOpen} onClose={() => setSignIn(false)}>
              <SignIn closePopup={() => setSignIn(false)} />
            </Modal>
          )}
        </LayoutStyled>
      )}
    </ThemeProvider>
  );
};
