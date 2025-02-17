import React, { FC } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';

import styled from 'styled-components';
import { Button } from '@launch-ui/button';

import { $appStore, setAside, setRightDrawer, setSignIn } from '@src/entities/app';
import { $userStore } from '@src/entities/user';
import { $headerStore } from '@src/entities/header';

import { SearchField } from './components/SearchField';

//@ts-expect-error
import SettingsIcon from '@src/assets/svg/settings.svg';
//@ts-expect-error
import MeatballsIcon from '@src/assets/svg/meatballs.svg';
//@ts-expect-error
import LoginIcon from '@src/assets/svg/login.svg';

interface HeaderStyledProps {
  isHeaderShadowed: boolean;
}

const HeaderStyled = styled.header<HeaderStyledProps>`
  z-index: 1000;
  display: flex;
  position: sticky;
  top: 0;
  width: calc(100% - 128px);
  padding: 56px 0;
  margin: 0 64px;
  transition: filter 300ms ease;
  will-change: filter;
  filter: drop-shadow(
    ${({ theme, isHeaderShadowed }) => (isHeaderShadowed ? theme.shadows.header : '0 0 0 0 transparent')}
  );
`;

export const Header: FC = () => {
  const user = useEffectorUnit($userStore);
  const { isAsideOpen, isRightDrawerOpen } = useEffectorUnit($appStore);
  const { isHeaderShadowed } = useEffectorUnit($headerStore);

  return (
    <HeaderStyled isHeaderShadowed={isHeaderShadowed}>
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
