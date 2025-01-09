import type { SettingsStore } from './interfaces';

const DEFAULT_SETTINGS: SettingsStore = {
  isDynamicWallpaper: true,
  dynamicWallpaper: 'clouds',
  wallpaper: null,
  darkMode: false,
  themeName: 'defaultTheme',
};

export { DEFAULT_SETTINGS };
