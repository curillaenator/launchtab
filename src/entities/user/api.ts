import { signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { createEffect } from 'effector';

import { setAppLoading } from '@src/entities/app';
import { updateUser, resetUser } from '@src/entities/user';
import { fsdb, auth } from '@src/api/firebase';

import { NULL_USER } from './contants';
import { DEFAULT_PAGES } from '../bookmarks/constants';
import { DEFAULT_SETTINGS } from '../settings/constants';

const googleProvider = new GoogleAuthProvider();

const login = () => {
  signInWithPopup(auth, googleProvider).then(async ({ user }) => {
    const userSnap = await getDoc(doc(fsdb, 'users', user.uid));

    if (!userSnap.exists()) {
      await setDoc(doc(fsdb, 'users', user.uid), {
        uid: user.uid,
        username: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        pages: DEFAULT_PAGES,
        settings: DEFAULT_SETTINGS,
      });
    }

    updateUser({ uid: user.uid, email: user.email, avatar: user.photoURL, username: user.displayName });
  });
};

const logout = () => {
  setAppLoading(true);
  signOut(auth);

  resetUser();
  setAppLoading(false);
};

const getUserData = createEffect(async (uid: string) => {
  const userSnap = await getDoc(doc(fsdb, 'users', uid));
  setAppLoading(false);

  return !!userSnap.exists() ? userSnap.data() : { ...NULL_USER, pages: DEFAULT_PAGES, settings: DEFAULT_SETTINGS };
});

export { login, logout, getUserData };
