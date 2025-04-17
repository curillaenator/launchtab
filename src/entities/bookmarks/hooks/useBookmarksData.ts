import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { isEqual } from 'lodash';

import { parseJSONWithoutError } from '@src/shared/parseJSONWithoutError';

import { BookmarkTabProps } from '../interfaces';
import { setTabsWithoutDbUpdate } from '../store';
import { getBookmarksQuery } from '../api';

const useBookmarksData = (uid: string | null) => {
  const { data: bookmarksData, isLoading: isBookmarksDataLoading } = useQuery({
    queryKey: ['bookmarks-query', uid],
    queryFn: () => getBookmarksQuery(uid!),
    enabled: !!uid,
    staleTime: 0,
  });

  // should not be in deps of next useEffect
  // const bookmarksLs = localStorage.getItem('bookmarks');
  const localBookmarks = parseJSONWithoutError<BookmarkTabProps[]>(localStorage.getItem('bookmarks'));

  useEffect(() => {
    if (localBookmarks) setTabsWithoutDbUpdate(localBookmarks);

    const shouldUpdate = !isEqual(bookmarksData?.bookmarks, localBookmarks);

    if (shouldUpdate && bookmarksData?.bookmarks.length) setTabsWithoutDbUpdate(bookmarksData.bookmarks);
  }, [bookmarksData]); // eslint-disable-line react-hooks/exhaustive-deps

  return { isBookmarksDataLoading: !localBookmarks && isBookmarksDataLoading };
};

export { useBookmarksData };
