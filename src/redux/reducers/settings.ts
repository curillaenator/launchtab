import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { batch } from 'react-redux';

import { settingsApi, localStorageApi } from '@src/api';

import type { TThemeName } from '@launch-ui/theme';
import type { TThunk } from '@src/types';

export interface ISettings {
  lookfeel: {
    isDynamicWallpaper: boolean;
    dynamicWallpaper: 'clouds' | 'beach';
    wallpaper: string | null;
    darkMode: boolean;
    themeName: TThemeName;
  };
}

export const INITIAL_LOOKFEEL_STATE: ISettings['lookfeel'] = {
  isDynamicWallpaper: true,
  dynamicWallpaper: 'clouds',
  wallpaper: null,
  darkMode: false,
  themeName: 'classicBlueTheme',
};

export const INITIAL_SETTINGS_STATE: ISettings = {
  lookfeel: INITIAL_LOOKFEEL_STATE,
};

const settingsSlice = createSlice({
  name: 'settings',

  initialState: INITIAL_SETTINGS_STATE,

  reducers: {
    setLookFeel: (state, action: PayloadAction<ISettings['lookfeel']>) => {
      state.lookfeel = { ...state.lookfeel, ...action.payload };
    },

    setSettings: (state, action: PayloadAction<ISettings>) => {
      state.lookfeel = action.payload.lookfeel;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getWallpapers.pending, (state) => {
  //       state.lookfeel.pixelsLoading = true;
  //     })
  //     .addCase(getWallpapers.rejected, (state) => {
  //       state.lookfeel.pixelsLoading = false;
  //       alert('Walpaper request rejected =(');
  //     })
  //     .addCase(getWallpapers.fulfilled, (state, action) => {
  //       state.lookfeel.pixelsLoading = false;
  //       state.lookfeel.pixels = {
  //         ...state.lookfeel.pixels,
  //         ...action.payload,
  //         photos: [...state.lookfeel.pixels.photos, ...action.payload.photos],
  //       };
  //     });
  // },
});

const settings = settingsSlice.reducer;

const { setLookFeel, setSettings } = settingsSlice.actions;

// THUNKS

export const resetSettings = (): TThunk => {
  return (dispatch) => {
    dispatch(setSettings({ ...INITIAL_SETTINGS_STATE }));
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

export { settings };
