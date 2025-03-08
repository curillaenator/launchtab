import { signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { fsdb, auth } from '@src/api/firebase';
import { pick } from 'lodash';

import { COMMON_USERS_DOCS_SPACE } from '@src/shared/appConfig';

import { setSettings } from '../settings';
import { setTabsWithoutDbUpdate } from '../bookmarks';
import { setUser } from './store';

import { NULL_USER } from './contants';
import { DEFAULT_PAGES } from '../bookmarks/constants';
import { DEFAULT_SETTINGS } from '../settings/constants';

import type { LaunchStoreUser } from './interfaces';

const googleProvider = new GoogleAuthProvider();

const login = () => {
  signInWithPopup(auth, googleProvider);
};

const logout = () => {
  setUser(NULL_USER);
  setSettings(DEFAULT_SETTINGS);
  setTabsWithoutDbUpdate(DEFAULT_PAGES);
  localStorage.clear();
  signOut(auth);
};

async function getUserLaunchDataQuery(user: LaunchStoreUser) {
  if (!user?.uid) return null;

  const userSnap = await getDoc(doc(fsdb, 'users', user.uid));

  if (!userSnap.exists()) {
    await setDoc(doc(fsdb, 'users', user.uid), { ...user, spaces: [COMMON_USERS_DOCS_SPACE] });
    return null;
  }

  const dbUser = userSnap.data() as LaunchStoreUser;

  return pick(dbUser, ['spaces', 'lastViewedSpace', 'settings']) as Partial<LaunchStoreUser>;
}

export { login, logout, getUserLaunchDataQuery };
