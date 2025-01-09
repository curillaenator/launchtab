import React, { FC, useEffect } from 'react';
import styled from 'styled-components';

const LaunchTabsStyled = styled.main`
  width: 100%;
  padding: 56px;
  padding-top: 96px;
`;

export const LaunchTabs: FC = () => {
  return <LaunchTabsStyled id='launch-app-container' className='launch-app-container'></LaunchTabsStyled>;
};
