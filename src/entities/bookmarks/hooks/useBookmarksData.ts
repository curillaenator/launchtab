import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { isEqual } from 'lodash';

import { BookmarkTabProps } from '../interfaces';
import { setTabsWithoutDbUpdate } from '../store';
import { getBookmarksQuery } from '../api';

const useBookmarksData = (uid: string | null) => {
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

    if (bookmarksData?.bookmarks.length && !isEqual(bookmarksData.bookmarks, bookmarksParse)) {
      setTabsWithoutDbUpdate(bookmarksData.bookmarks);
    }
  }, [bookmarksData]);
};

export { useBookmarksData };
