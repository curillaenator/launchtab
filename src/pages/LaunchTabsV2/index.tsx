import React, { FC, useEffect } from 'react';
import { useUnit as UseEffectoUnit } from 'effector-react';
import { useQuery } from '@tanstack/react-query';
import { isEqual } from 'lodash';

import { getBookmarksQuery, setTabsWithoutDbUpdate, BookmarkTabProps } from '@src/entities/bookmarks';
import { $userStore } from '@src/entities/user';

import { BookmarksTabs } from '@src/features/bookmarksTabs';
import { Bookmarks } from '@src/features/bookmarks';

const LaunchTabs: FC = () => {
  const { uid } = UseEffectoUnit($userStore);

  const { data: bookmarksData } = useQuery({
    queryKey: ['bookmarks-query', uid],
    queryFn: () => getBookmarksQuery(uid!),
    enabled: !!uid,
    staleTime: 0,
  });

  useEffect(() => {
    const bookmarksLs = localStorage.getItem('bookmarks');

    let bookmarksParse: BookmarkTabProps[] = [];

    if (bookmarksLs) {
      bookmarksParse = JSON.parse(bookmarksLs) as BookmarkTabProps[];
      setTabsWithoutDbUpdate(bookmarksParse);
    }

    if (bookmarksData?.bookmarks.length) {
      const isLocalEqualToResponse = isEqual(bookmarksData.bookmarks, bookmarksParse);
      if (!isLocalEqualToResponse) setTabsWithoutDbUpdate(bookmarksData.bookmarks);
    }
  }, [bookmarksData]);

  return (
    <>
      <BookmarksTabs />
      <Bookmarks />
    </>
  );
};

export { LaunchTabs };
