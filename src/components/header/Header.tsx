import React, { FC, useEffect, useCallback, useState } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';

import styled from 'styled-components';
import { Button } from '@launch-ui/button';

import { $appStore, setAside, setRightDrawer, setSignIn } from '@src/entities/app';
import { $userStore } from '@src/entities/user';

import { SearchField } from './components/SearchField';

//@ts-expect-error
import SettingsIcon from '@src/assets/svg/settings.svg';
//@ts-expect-error
import MeatballsIcon from '@src/assets/svg/meatballs.svg';
//@ts-expect-error
import LoginIcon from '@src/assets/svg/login.svg';

const HeaderStyled = styled.header<{ shadowed: boolean }>`
  z-index: 1000;
  display: flex;
  position: sticky;
  top: 0;
  width: 100%;
  padding: 56px 56px 0;
  filter: drop-shadow(${({ theme, shadowed }) => (shadowed ? theme.shadows.card : '0 0 0 0 transparent')});
  transition: filter 300ms ease;
`;

export const Header: FC = () => {
  const user = useEffectorUnit($userStore);
  const { isAsideOpen, isRightDrawerOpen } = useEffectorUnit($appStore);

  const [shadowed, setShadowed] = useState<boolean>(false);

  const hanleShadowed = useCallback(() => {
    setShadowed(window.scrollY > 56 * 2);
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', hanleShadowed);
    return () => document.removeEventListener('scroll', hanleShadowed);
  }, [hanleShadowed]);

  return (
    <HeaderStyled shadowed={shadowed}>
      <Button IconLeft={MeatballsIcon} onClick={() => setAside(!isAsideOpen)} />

      <SearchField />

      <Button
        IconLeft={!!user.uid ? SettingsIcon : LoginIcon}
        onClick={() => {
          if (!!user.uid) {
            setRightDrawer(!isRightDrawerOpen);
          } else {
            setSignIn(true);
          }
        }}
      />
    </HeaderStyled>
  );
};
