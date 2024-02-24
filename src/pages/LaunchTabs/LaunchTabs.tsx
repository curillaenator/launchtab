import React, { FC, useEffect } from 'react';
import styled from 'styled-components';

import { useAppSelector, useAppDispatch } from '@src/hooks';

import { Pages } from '@src/components/pages/Pages';
import { Bookmarks } from '@src/components/bookmarks/Bookmarks';

import { getCurBookmarks } from '@src/redux/reducers/bookmarks';
import { useDataQuery } from './useDataQuery';

const LaunchTabsStyled = styled.main`
  --app-pd: 56px;

  width: 100%;
  padding: var(--app-pd);

  /* @media (min-width: 1920px) {
    --app-pd: 96px;
  } */
`;

export const LaunchTabs: FC = () => {
  const dispatch = useAppDispatch();

  useDataQuery();

  const { pages, curPage, curBookmarks } = useAppSelector((state) => state.bookmarks);

  useEffect(() => {
    dispatch(getCurBookmarks(curPage));
  }, [curPage, dispatch]);

  return (
    <LaunchTabsStyled id='launch-app-container' className='launch-app-container'>
      <Pages pages={pages} curPage={curPage} />
      <Bookmarks bookmarks={curBookmarks} curPage={curPage} />
    </LaunchTabsStyled>
  );
};
