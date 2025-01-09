import { createStore, createEvent } from 'effector';

import type { TThemeName } from '@launch-ui/theme';

interface SettingsStore {
  isDynamicWallpaper: boolean;
  dynamicWallpaper: 'clouds' | 'beach';
  wallpaper: string | null;
  darkMode: boolean;
  themeName: TThemeName;
}

const DEFAULT_SETTINGS: SettingsStore = {
  isDynamicWallpaper: true,
  dynamicWallpaper: 'clouds',
  wallpaper: null,
  darkMode: false,
  themeName: 'defaultTheme',
};

const setSettings = createEvent<Partial<SettingsStore>>();

const $settingsStore = createStore<SettingsStore>(DEFAULT_SETTINGS);

$settingsStore.on(setSettings, (prevState, newSettings) => ({
  ...prevState,
  ...newSettings,
}));

export { $settingsStore, setSettings };
