import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '@src/api';
import { getUserData } from '@src/entities/user';

const useAuthState = () => {
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (user) => getUserData(user));

    return () => unsubAuth();
  }, []);
};

export { useAuthState };
