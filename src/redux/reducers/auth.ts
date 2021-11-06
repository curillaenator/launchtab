import firebase from "firebase/app";
import { auth as fbauth } from "../../api/firebase";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { batch } from "react-redux";

import { authApi } from "../../api/api";
import { resetSettings } from "./settings";
import { setIsAppLoading } from "./loadings";

import type { ISignUpCreds, ISignInCreds, TThunk } from "../../types/types";

interface IAuth {
  user: firebase.User | null;
  anonymousID: string | null;
}

const initialState: IAuth = {
  user: null,
  anonymousID: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<firebase.User | null>) => {
      state.user = action.payload;
    },

    setAnonymousID: (state, action: PayloadAction<string | null>) => {
      state.anonymousID = action.payload;
    },
  },
});
export const auth = authSlice.reducer;

const { setUser, setAnonymousID } = authSlice.actions;

// THUNKS

export const checkUserIsAuthed = (): TThunk => {
  return (dispatch) => {
    dispatch(setIsAppLoading(true));

    if ("settings" in localStorage && "bookmarks" in localStorage) {
      dispatch(setIsAppLoading(false));
    }

    fbauth.onAuthStateChanged((user) => {
      if (!user) {
        return authApi.signUpAnon();
      }

      user.isAnonymous
        ? dispatch(setAnonymousID(user.uid))
        : dispatch(setAnonymousID(null));

      batch(() => {
        dispatch(setUser(user));
        dispatch(setIsAppLoading(false));
      });
    });
  };
};

export const proSignUp = (creds: ISignUpCreds): TThunk => {
  return async (dispatch) => {
    dispatch(setIsAppLoading(true));
    await authApi.signUp(creds);
  };
};

export const signIn = (creds: ISignInCreds): TThunk => {
  return async (dispatch) => {
    dispatch(setIsAppLoading(true));
    await authApi.signIn(creds);
  };
};

export const logOut = (): TThunk => async (dispatch) => {
  dispatch(setIsAppLoading(true));
  await authApi.logoOut();
  dispatch(resetSettings());
};
