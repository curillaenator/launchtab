import React, { FC, useContext } from 'react';
import styled from 'styled-components';
import { BtnIcon } from '@launch-ui/button';

import { useAppSelector } from '@src/hooks/hooks';

import { LayoutCTX } from '@src/layout';

import { SearchField } from './components/SearchField';

const HeaderStyled = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  width: 100%;
  padding: 56px 56px 96px;
`;

export const Header: FC = () => {
  const { setIsAsideOpen, setIsRightDrawerOpen } = useContext(LayoutCTX);

  const { user } = useAppSelector((state) => state.auth);
  const { isDataSyncing } = useAppSelector((state) => state.loadings);

  return (
    <HeaderStyled>
      {!user?.isAnonymous && (
        <BtnIcon iconName='menu' handler={() => setIsAsideOpen((prev) => !prev)} isLoading={isDataSyncing} />
      )}

      <SearchField />

      {!user?.isAnonymous && (
        <BtnIcon iconName='settings' handler={() => setIsRightDrawerOpen(true)} isLoading={isDataSyncing} />
      )}
    </HeaderStyled>
  );
};
