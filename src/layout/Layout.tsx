import React, { FC, useRef, useCallback, useState } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import { debounce } from 'lodash';
import styled from 'styled-components';

import { useTheme } from 'styled-components';
import { Outlet } from 'react-router-dom';
import { Drawer } from '@launch-ui/drawer';
import { Modal } from '@launch-ui/modal';

import { Header } from '@src/features/header';
import { Aside } from '@src/features/aside';
import { Background } from '@src/features/background';
import { Settings } from '@src/features/settings';
import { SignIn } from '@src/features/signin';

import { $appStore, setSignIn, setRightDrawer } from '@src/entities/app';
import { $userStore, useLauncUserData } from '@src/entities/user';
import { $settingsStore } from '@src/entities/settings';
import { setHeaderShadowed } from '@src/entities/header';

import { useThemeToCssv } from '@src/hooks/useThemeToCssv';

import { Loader } from '@src/features/loader';
import LayoutStyled from './styled';

import { MAIN_ELEMENT_ID } from './constants';

const MainStyled = styled.main`
  width: 100%;
  padding: 0 56px;
`;

export const Layout: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const user = useEffectorUnit($userStore);
  useLauncUserData(user, setIsLoading);

  const { isAsideOpen, isSignInOpen, isRightDrawerOpen } = useEffectorUnit($appStore);
  const { dynamicWallpaper } = useEffectorUnit($settingsStore);

  const mouseWatcher = useRef<((e: React.MouseEvent<Element, MouseEvent>) => void) | null>(null);

  const currentTheme = useTheme();
  const { ref: layoutRef } = useThemeToCssv(currentTheme);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onViewportScroll = useCallback(
    debounce((e: React.UIEvent<HTMLDivElement, UIEvent>) => {
      //@ts-expect-error
      setHeaderShadowed(e.nativeEvent.target?.scrollTop > 56 * 2);
    }, 400),
    [],
  );

  if (isLoading) return <Loader view='fullscreen' iconSize='56px' />;

  return (
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
  );
};
