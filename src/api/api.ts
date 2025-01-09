import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, set, push, child } from 'firebase/database';

import type { ISettings } from '@src/redux/reducers/settings';
import type { IUpdate, IData } from '@src/types';

import { fsdb, rtdb } from './firebase';

interface UserDataResponse {
  uid: string;
  pages: IData[];
  settings: ISettings;
}

export const pagesApi = {
  async getData(userID: string): Promise<UserDataResponse | string> {
    const snap = await getDoc(doc(fsdb, 'users', userID));

    console.log('getData', snap.data());

    const userData = snap.data() as { uid: string; pages: IData[]; settings: ISettings };

    // if (userData?.pages?.length) {
    //   userData.pages.forEach((page) => {
    //     const pageKey = push(child(ref(rtdb), `pages/${userData.uid}`)).key;

    //     set(ref(rtdb, `pages/${userData.uid}/${pageKey}`), page);
    //   });
    // }

    return snap.exists() ? userData : 'Something went wrong, try reload page';
  },

  async updateData(data: IUpdate) {
    return updateDoc(doc(collection(fsdb, 'users'), data.uid), { pages: data.tabs })
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
