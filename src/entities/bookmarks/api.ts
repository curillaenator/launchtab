import { collection, doc, updateDoc, getDoc } from 'firebase/firestore';
import { fsdb } from '@src/api/firebase';

import type { BookmarkTabProps } from './interfaces';

const getBookmarksQuery = async (uid: string) => {
  const bookmarksSnap = await getDoc(doc(fsdb, 'bookmarks', uid));
  if (!bookmarksSnap.exists()) return null;

  return bookmarksSnap.data() as { bookmarks: BookmarkTabProps[] };
};

const updateBookmarksQuery = (uid: string | null, bookmarks: BookmarkTabProps[]) => {
  if (!uid) return;
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  updateDoc(doc(collection(fsdb, 'bookmarks'), uid), { bookmarks });
};

export { getBookmarksQuery, updateBookmarksQuery };
