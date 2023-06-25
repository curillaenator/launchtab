import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { batch } from 'react-redux';
import {
  signInAnonymously,
  EmailAuthProvider,
  linkWithCredential,
  updateProfile,
  signInWithCredential,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  type User,
} from 'firebase/auth';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';

import { auth, fsdb, initiateAnon } from '@src/api';

import { resetSettings } from './settings';
import { setIsAppLoading } from './loadings';

import type { ISignUpCreds, ISignInCreds, TThunk } from '@src/types';

interface IAuth {
  user: User | null;
  userLoading?: boolean;
  userError?: string;
}

const initialState: IAuth = {
  user: null,
  userLoading: false,
  userError: undefined,
};

export const proSignUp = createAsyncThunk('auth/proSignUp', async (creds: ISignUpCreds) => {
  const { email, password, displayName } = creds;
  const credential = EmailAuthProvider.credential(email, password);

  const { user } = await linkWithCredential(auth.currentUser as User, credential);

  await updateDoc(doc(collection(fsdb, 'users'), user.uid), { displayName, email });
  await updateProfile(user, { displayName });
  const { user: linkedUser } = await signInWithCredential(auth, credential);

  return linkedUser;
});

export const signIn = createAsyncThunk('auth/signIn', async (creds: ISignInCreds) => {
  const { email, password } = creds;
  const user = await signInWithEmailAndPassword(auth, email, password);
  return user;
});

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(proSignUp.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(proSignUp.fulfilled, (state) => {
        state.userLoading = false;
      })
      .addCase(signIn.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(signIn.fulfilled, (state) => {
        state.userLoading = false;
      });
  },
});

export const authReducer = authSlice.reducer;

const { setUser } = authSlice.actions;

// THUNKS

export const checkUserIsAuthed = (): TThunk => {
  return (dispatch) => {
    dispatch(setIsAppLoading(true));

    if ('settings' in localStorage && 'bookmarks' in localStorage) {
      dispatch(setIsAppLoading(false));
    }

    onAuthStateChanged(auth, async (user) => {
      if (!!user) {
        batch(() => {
          dispatch(setUser(user));
          dispatch(setIsAppLoading(false));
        });

        return;
      }

      const anonUser = (await signInAnonymously(auth)).user;
      await setDoc(doc(collection(fsdb, 'users'), anonUser.uid), initiateAnon(anonUser.uid));

      batch(() => {
        dispatch(setUser(anonUser));
        dispatch(setIsAppLoading(false));
      });
    });
  };
};

export const logOut = (): TThunk => async (dispatch) => {
  dispatch(setIsAppLoading(true));
  signOut(auth);
  dispatch(resetSettings());
};
