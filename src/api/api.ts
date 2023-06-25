import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';

import type { ISettings } from '@src/redux/reducers/settings';
import type { IUpdate, IData } from '@src/types';

import { fsdb } from './firebase';

export const pagesApi = {
  async getData(userID: string) {
    const snap = await getDoc(doc(fsdb, 'users', userID));
    return snap.exists() ? snap.data() : 'Something went wrong, try reload page';
  },

  async updateData(data: IUpdate) {
    return updateDoc(doc(collection(fsdb, 'users'), data.uid), { pages: data.tabs })
      .then(() => 'Update successful!')
      .catch(() => 'Something went wrong, try reload page');
  },
};

export const settingsApi = {
  async updateSettings(userID: string, settings: ISettings): Promise<string> {
    return updateDoc(doc(collection(fsdb, 'users'), userID), { settings })
      .then(() => 'Update successful!')
      .catch(() => 'Something went wrong, try reload page');
  },
};

interface LocalStorageAPI {
  setSettings: (object: ISettings) => void;
  getSettings: () => ISettings | null;
  setBookmarks: (object: IData[]) => void;
  getBookmarks: () => IData[] | null;
  clear: () => void;
}

export const localStorageApi: LocalStorageAPI = {
  setSettings: (object) => localStorage.setItem('settings', JSON.stringify(object)),

  getSettings: () => {
    const localSettings = localStorage.getItem('settings');
    if (!!localSettings) return JSON.parse(localSettings);
    return null;
  },

  setBookmarks: (object) => localStorage.setItem('bookmarks', JSON.stringify(object)),

  getBookmarks: () => {
    const localBookmarks = localStorage.getItem('bookmarks');
    if (!!localBookmarks) return JSON.parse(localBookmarks);
    return null;
  },

  clear: () => localStorage.clear(),
};
