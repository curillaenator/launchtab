import { createEffect } from 'effector';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { fsdb } from '@src/api/firebase';
import type { BookmarkTabProps, BookmarkCardProps } from './interfaces';

interface BasePayload {
  uid: string;
  tabName: string;
  tabs: BookmarkTabProps[];
}

interface RemoveCardPayload extends BasePayload {
  cardIdx: number;
}

interface ReorderCardPayload extends BasePayload {
  reorderedCards: BookmarkCardProps[];
}

interface CreateCardPayload extends BasePayload {
  card: BookmarkCardProps;
}

const updateDatabases = (uid: string, tabs: BookmarkTabProps[]) => {
  updateDoc(doc(collection(fsdb, 'users'), uid), { pages: tabs });
  localStorage.setItem('tabs', JSON.stringify(tabs));
};

const reorderTabs = createEffect(({ uid, tabs }: BasePayload) => {
  updateDatabases(uid, tabs);

  return tabs;
});

const reorderCards = createEffect(({ uid, tabs, tabName, reorderedCards }: ReorderCardPayload) => {
  const newFullTabs = [...tabs];
  const updatedTabIdx = tabs.findIndex((el) => el.name === tabName);

  if (updatedTabIdx < 0) return tabs;

  newFullTabs.splice(updatedTabIdx, 1, { name: tabName, pages: reorderedCards });

  updateDatabases(uid, newFullTabs);

  return newFullTabs;
});

const removeCards = createEffect(({ uid, tabs, tabName, cardIdx }: RemoveCardPayload) => {
  const newFullTabs = [...tabs];
  const updatedTabIdx = tabs.findIndex((el) => el.name === tabName);

  if (updatedTabIdx < 0) return tabs;

  const updatedCards = [...tabs[updatedTabIdx].pages];
  updatedCards.splice(cardIdx, 1);

  newFullTabs.splice(updatedTabIdx, 1, { name: tabName, pages: updatedCards });

  updateDatabases(uid, newFullTabs);
  return newFullTabs;
});

const removeTabs = createEffect(({ uid, tabName, tabs }: BasePayload) => {
  const newFullTabs = [...tabs];
  const removeTabIdx = newFullTabs.findIndex((el) => el.name === tabName);

  if (removeTabIdx < 0) return tabs;

  newFullTabs.splice(removeTabIdx, 1);

  updateDatabases(uid, newFullTabs);

  return newFullTabs;
});

const createTab = createEffect(({ uid, tabName, tabs }: BasePayload) => {
  const newFullTabs = [...tabs, { name: tabName, pages: [] }];
  updateDatabases(uid, newFullTabs);
  return newFullTabs;
});

const createCard = createEffect(({ uid, tabName, tabs, card }: CreateCardPayload) => {
  const newFullTabs = [...tabs];
  const updatedTabIdx = tabs.findIndex((el) => el.name === tabName);
  if (updatedTabIdx < 0) return tabs;

  newFullTabs.splice(updatedTabIdx, 1, { name: tabName, pages: [...tabs[updatedTabIdx].pages, card] });

  updateDatabases(uid, newFullTabs);
  return newFullTabs;
});

export { reorderTabs, reorderCards, createTab, createCard, removeCards, removeTabs };
