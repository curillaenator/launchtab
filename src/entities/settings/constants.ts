import type { SettingsStore } from './interfaces';

// import defaultBg from '@src/assets/images/wallpaper.jpg';
import defaultBg from '@src/assets/images/dark-abstract.jpg';

const DEFAULT_SETTINGS: SettingsStore = {
  isDynamicWallpaper: false,
  dynamicWallpaper: 'clouds',
  wallpaper: defaultBg,
  darkMode: false,
  themeName: 'classicBlueTheme',
};

export { DEFAULT_SETTINGS };
