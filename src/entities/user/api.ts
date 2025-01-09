import { signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { createEffect } from 'effector';

import { setAppLoading } from '@src/entities/app';
import { updateUser, resetUser } from '@src/entities/user';
import { fsdb, auth } from '@src/api/firebase';

import { NULL_USER } from './contants';

const googleProvider = new GoogleAuthProvider();

const login = () => {
  signInWithPopup(auth, googleProvider).then(({ user }) =>
    updateUser({ uid: user.uid, email: user.email, avatar: user.photoURL, username: user.displayName }),
  );
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
  return !!userSnap.exists() ? userSnap.data() : { ...NULL_USER };
});

export { login, logout, getUserData };
