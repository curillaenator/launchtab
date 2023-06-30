import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { batch } from 'react-redux';

import { settingsApi, localStorageApi } from '@src/api';

import type { TThemeName } from '@launch-ui/theme';
import type { TThunk } from '@src/types';

export interface ISettings {
  lookfeel: {
    isDynamicWallpaper: boolean;
    wallpaper: string | null;
    darkMode: boolean;
    themeName: TThemeName;
  };

  profile: { shortName: string | null };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  other: { other: any };
}

export const initialState: ISettings = {
  lookfeel: {
    isDynamicWallpaper: true,
    wallpaper: null,
    darkMode: false,
    themeName: 'defaultTheme',
  },

  profile: {
    shortName: null,
  },

  other: {
    other: null,
  },
};

const settingsSlice = createSlice({
  name: 'settings',

  initialState,

  reducers: {
    setLookFeel: (state, action: PayloadAction<ISettings['lookfeel']>) => {
      state.lookfeel = { ...state.lookfeel, ...action.payload };
    },

    setProfile: (state, action: PayloadAction<ISettings['profile']>) => {
      state.profile = { ...state.profile, ...action.payload };
    },

    setOther: (state, action: PayloadAction<ISettings['other']>) => {
      state.other = { ...state.other, ...action.payload };
    },

    setSettings: (state, action: PayloadAction<ISettings>) => {
      state.lookfeel = action.payload.lookfeel;
      state.profile = action.payload.profile;
      state.other = action.payload.other;
    },
  },
});

export const settings = settingsSlice.reducer;

const { setLookFeel, setProfile, setOther, setSettings } = settingsSlice.actions;

// THUNKS

export const resetSettings = (): TThunk => {
  return (dispatch) => {
    dispatch(setSettings({ ...initialState }));
    localStorageApi.clear();
  };
};

export const applySettings = (settings: ISettings): TThunk => {
  return (dispatch) => {
    if (!settings) return;

    batch(() => {
      if ('lookfeel' in settings) {
        dispatch(setLookFeel(settings.lookfeel));
      }

      if ('profile' in settings) {
        dispatch(setProfile(settings.profile));
      }

      if ('other' in settings) {
        dispatch(setOther(settings.other));
      }
    });
  };
};

export const updateSettings = (settings: ISettings): TThunk => {
  return async (dispatch, getState) => {
    const userID = getState().auth.user?.uid;
    const isAuthorized = !getState().auth.user?.isAnonymous;

    dispatch(setSettings(settings));

    if (isAuthorized) {
      localStorageApi.setSettings(settings);
    }

    if (userID) {
      settingsApi.updateSettings(userID, settings);
    }
  };
};
