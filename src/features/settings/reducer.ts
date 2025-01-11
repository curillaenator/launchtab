import type { PhotosWithTotalResults } from 'pexels';
import type { TReducer, TAction } from '@src/types';
import { INITIAL_LOOKFEEL_STATE, type ISettings } from '@src/redux/reducers/settings';

export const PEXELS_INITIAL_STATE: PhotosWithTotalResults = {
  total_results: 0,
  page: 1,
  per_page: 8,
  photos: [],
  next_page: 2,
};

const SET_INITIAL_STATE = 'form/SET_INITIAL_STATE';

const SET_IS_DYNAMIC_WALLPAPER = 'lookfeel/SET_IS_DYNAMIC_WALLPAPER';
const SET_DYNAMIC_WALLPAPER = 'lookfeel/SET_DYNAMIC_WALLPAPER';
const SET_WALLPAPER = 'lookfeel/SET_WALLPAPER';
const SET_THEME = 'lookfeel/SET_THEME';
const SET_DARKMODE = 'lookfeel/SET_DARKMODE';

const SET_PEXELS = 'lookfeel/SET_PEXELS';
const SET_PEXELS_PAGE = 'lookfeel/SET_PEXELS_PAGE';
const SET_PEXELS_QUERY = 'lookfeel/SET_PEXELS_QUERY';

interface IPexels {
  pexelsQuery: string | null;
  pexelsLoading: boolean;
  pexels: PhotosWithTotalResults;
}

// INITIAL STATE

export interface ISettingsFormState {
  pexels: IPexels;

  lookfeel: ISettings['lookfeel'];
}

export const initialState: ISettingsFormState = {
  pexels: {
    pexels: PEXELS_INITIAL_STATE,
    pexelsQuery: '',
    pexelsLoading: false,
  },

  lookfeel: INITIAL_LOOKFEEL_STATE,
};

// REDUCER

export const reducer: TReducer<ISettingsFormState> = (state, action) => {
  switch (action.type) {
    case SET_INITIAL_STATE:
      return {
        ...state,
        ...action.payload,
      };

    // LOOKFEEL

    case SET_IS_DYNAMIC_WALLPAPER:
      return {
        ...state,
        lookfeel: {
          ...state.lookfeel,
          isDynamicWallpaper: action.payload,
        },
      };

    case SET_DYNAMIC_WALLPAPER:
      return {
        ...state,
        lookfeel: {
          ...state.lookfeel,
          dynamicWallpaper: action.payload,
        },
      };

    case SET_WALLPAPER:
      return {
        ...state,
        lookfeel: {
          ...state.lookfeel,
          wallpaper: action.payload,
        },
      };

    case SET_THEME:
      return {
        ...state,
        lookfeel: {
          ...state.lookfeel,
          themeName: action.payload,
        },
      };

    case SET_DARKMODE:
      return {
        ...state,
        lookfeel: {
          ...state.lookfeel,
          darkMode: action.payload,
        },
      };

    // PEXELS

    case SET_PEXELS_QUERY:
      return {
        ...state,
        pexels: {
          ...state.pexels,
          pexelsQuery: action.payload,
        },
      };

    case SET_PEXELS:
      return {
        ...state,
        pexels: {
          pexels: action.payload,
          pexelsQuery: state.pexels.pexelsQuery,
          pexelsLoading: false,
        },
      };

    // DEFAULT

    default:
      return { ...state };
  }
};

// ACTIONS

export interface ILookFeelActions {
  setInitialState: TAction<ISettings>;

  setWallpaper: TAction<string>;
  setDarkMode: TAction<boolean>;
  setIsDynamicWallpaper: TAction<boolean>;
  setDynamicWallpaper: TAction<'clouds' | 'beach'>;
  setTheme: TAction<string>;

  setPexels: TAction<PhotosWithTotalResults>;
  setPixelsPage: TAction<number>;
  setPixelsQuery: TAction<string>;
}

export const LookFeelActions: ILookFeelActions = {
  setInitialState: (payload) => ({
    type: SET_INITIAL_STATE,
    payload,
  }),
  setWallpaper: (payload) => ({
    type: SET_WALLPAPER,
    payload,
  }),
  setDarkMode: (payload) => ({
    type: SET_DARKMODE,
    payload,
  }),
  setIsDynamicWallpaper: (payload) => ({
    type: SET_IS_DYNAMIC_WALLPAPER,
    payload,
  }),
  setDynamicWallpaper: (payload) => ({
    type: SET_DYNAMIC_WALLPAPER,
    payload,
  }),
  setTheme: (payload) => ({
    type: SET_THEME,
    payload,
  }),

  setPexels: (payload) => ({
    type: SET_PEXELS,
    payload,
  }),
  setPixelsQuery: (payload) => ({
    type: SET_PEXELS_QUERY,
    payload,
  }),
  setPixelsPage: (payload) => ({
    type: SET_PEXELS_PAGE,
    payload,
  }),
};
