import {
  signInAnonymously,
  EmailAuthProvider,
  linkWithCredential,
  updateProfile,
  signInWithCredential,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  type User,
} from 'firebase/auth';

import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import type { ISettings } from '@src/redux/reducers/settings';
import type { ISignUpCreds, ISignInCreds, IUpdate, IData } from '@src/types';

import { auth, fsdb } from './firebase';
import { initiateAnon } from './apiHelpers';

export const authApi = {
  async signUpAnon() {
    const user = (await signInAnonymously(auth)).user;

    if (!user) alert('Auth failed');

    const defaultAnonBookmarks = initiateAnon(user.uid);

    await setDoc(doc(collection(fsdb, 'users'), user.uid), defaultAnonBookmarks).catch(
      (e) => `Code: ${e.code}, message ${e.message}`,
    );

    return user.uid;
  },

  async signUp(creds: ISignUpCreds) {
    const { email, password, displayName } = creds;
    const credential = EmailAuthProvider.credential(email, password);

    const { user } = await linkWithCredential(auth.currentUser as User, credential);

    await updateDoc(doc(collection(fsdb, 'users'), user.uid), { displayName, email });
    await updateProfile(user, { displayName });
    const { user: linkedUser } = await signInWithCredential(auth, credential);

    return linkedUser;
  },

  async signIn(creds: ISignInCreds) {
    return (await signInWithEmailAndPassword(auth, creds.email, creds.password)).user;
  },

  async logoOut() {
    await signOut(auth);
    await 'Signout successful';
  },

  async passwordReset(email: string) {
    await sendPasswordResetEmail(auth, email);
    return `Password Reset Email sent to ${email}`;
  },
};

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
