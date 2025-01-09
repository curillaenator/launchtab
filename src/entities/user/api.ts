import { signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { setAppLoading } from '@src/entities/app';
import { updateUser, resetUser } from '@src/entities/user';
import { auth } from '@src/api';

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

export { login, logout };
