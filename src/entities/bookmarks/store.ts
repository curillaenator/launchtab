import { createStore, createEvent, createEffect } from 'effector';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';

import { getUserData } from '@src/entities/user';
import { fsdb, rtdb } from '@src/api/firebase';

import { DEFAULT_PAGES } from './constants';
import type { BookmarksStore, BookmarkTabProps, BookmarkCardProps } from './interfaces';

const DEFAULT_APP_STORE: BookmarksStore = {
  currentTab: 'Home',
  tabs: DEFAULT_PAGES,
};

const setCurrentTab = createEvent<string>();
const setTabs = createEvent<BookmarkTabProps[]>();

interface ReorderCardPayload {
  uid: string;
  tabs: BookmarkTabProps[];
  tabName: string;
  reorderedCards: BookmarkCardProps[];
}
const reorderCards = createEffect(async ({ uid, tabs, tabName, reorderedCards }: ReorderCardPayload) => {
  const updatedTabIdx = tabs.findIndex((el) => el.name === tabName);

  console.log('name', tabs, tabName, updatedTabIdx);
  if (updatedTabIdx < 0) return tabs;

  const newFullTabs = [...tabs];

  newFullTabs.splice(updatedTabIdx, 1, { name: tabName, pages: reorderedCards });

  updateDoc(doc(collection(fsdb, 'users'), uid), { pages: newFullTabs }).catch(
    () => 'Something went wrong, try reload page',
  );

  return newFullTabs;
});

const $bookmarksStore = createStore<BookmarksStore>(DEFAULT_APP_STORE);

$bookmarksStore
  .on(reorderCards.doneData, (prevState, reorderedTabs) => ({
    ...prevState,
    tabs: reorderedTabs,
  }))
  .on(getUserData.doneData, (prevState, fsUser) => ({
    ...prevState,
    tabs: fsUser.pages,
  }))
  .on(setTabs, (prevState, tabs) => ({ ...prevState, tabs }))
  .on(setCurrentTab, (prevState, currentTab) => ({ ...prevState, currentTab }));

export { $bookmarksStore, setTabs, setCurrentTab, reorderCards };
