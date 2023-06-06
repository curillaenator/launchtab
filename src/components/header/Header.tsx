import React, { FC } from 'react';
import styled from 'styled-components';

import { useAppSelector } from '../../hooks/hooks';

import { SearchField } from './components/SearchField';
import { BtnIcon } from '../buttons';

const HeaderStyled = styled.header`
  position: relative;
  margin-bottom: 5.75rem;

  .header-button {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

interface IHeader {
  isAnon: boolean;
  setSettingsModal: () => void;
}

export const Header: FC<IHeader> = ({ isAnon, setSettingsModal }) => {
  const isDataSyncing = useAppSelector((state) => state.loadings.isDataSyncing);

  return (
    <HeaderStyled>
      <SearchField />

      {!isAnon && (
        <div className='header-button'>
          <BtnIcon iconName='settings' handler={setSettingsModal} isLoading={isDataSyncing} />
        </div>
      )}
    </HeaderStyled>
  );
};
