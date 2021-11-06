import { LOOKFEEL } from "./constants";
import { TReducer, TAction } from "../../types/types";
import { ISettings } from "../../redux/reducers/settings";

const SET_CURRENT_TAB = "form/SET_CURRENT_TAB";
const SET_INITIAL_STATE = "form/SET_INITIAL_STATE";

const SET_WALLPAPER = "lookfeel/SET_WALLPAPER";
const SET_THEME = "lookfeel/SET_THEME";
const SET_DARKMODE = "lookfeel/SET_DARKMODE";

const SET_SHORTNAME = "profile/SET_SHORTNAME";

// INITIAL STATE

export interface ISettingsState extends ISettings {
  currentTab: string;
}

export const initialState: ISettingsState = {
  currentTab: LOOKFEEL,
  lookfeel: {
    wallpaper: null,
    darkMode: false,
    themeName: "defaultTheme",
  },
  profile: {
    shortName: null,
  },
  other: {
    other: null,
  },
};

// REDUCER

export const reducer: TReducer<ISettingsState> = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_TAB:
      return { ...state, currentTab: action.payload };

    case SET_INITIAL_STATE:
      return { ...state, ...action.payload };

    // LOOKFEEL

    case SET_WALLPAPER:
      return {
        ...state,
        lookfeel: { ...state.lookfeel, wallpaper: action.payload },
      };

    case SET_THEME:
      return {
        ...state,
        lookfeel: { ...state.lookfeel, themeName: action.payload },
      };

    case SET_DARKMODE:
      return {
        ...state,
        lookfeel: { ...state.lookfeel, darkMode: action.payload },
      };

    // PROFILE

    case SET_SHORTNAME:
      return {
        ...state,
        profile: { ...state.profile, shortName: action.payload },
      };

    default:
      return { ...state };
  }
};

// ACTIONS

export const setCurrentTab: TAction<string> = (payload) => ({
  type: SET_CURRENT_TAB,
  payload,
});

export const setInitialState: TAction<ISettings> = (payload) => ({
  type: SET_INITIAL_STATE,
  payload,
});

// lookfeel

export interface ILookFeelActions {
  setWallpaper: TAction<string>;
  setDarkMode: TAction<boolean>;
  setTheme: TAction<string>;
}

export const LookFeelActions: ILookFeelActions = {
  setWallpaper: (payload) => ({
    type: SET_WALLPAPER,
    payload,
  }),
  setDarkMode: (payload) => ({
    type: SET_DARKMODE,
    payload,
  }),
  setTheme: (payload) => ({
    type: SET_THEME,
    payload,
  }),
};

// profile

export interface IProfileActions {
  setShortName: TAction<string>;
}

export const ProfileActions: IProfileActions = {
  setShortName: (payload) => ({
    type: SET_SHORTNAME,
    payload,
  }),
};
