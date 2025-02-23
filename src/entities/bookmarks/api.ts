import { doc, getDoc } from 'firebase/firestore';
import { fsdb } from '@src/api/firebase';

import type { BookmarkTabProps } from './interfaces';

const getBookmarksQuery = async (uid: string) => {
  const bookmarksSnap = await getDoc(doc(fsdb, 'bookmarks', uid));

  if (!bookmarksSnap.exists()) return null;

  return bookmarksSnap.data() as { bookmarks: BookmarkTabProps[] };
};

export { getBookmarksQuery };
