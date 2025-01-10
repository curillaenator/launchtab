import type { SettingsStore } from './interfaces';

//@ts-expect-error
import defaultBg from '@src/assets/images/wallpaper.jpg';

const DEFAULT_SETTINGS: SettingsStore = {
  isDynamicWallpaper: false,
  dynamicWallpaper: 'clouds',
  wallpaper: defaultBg,
  darkMode: false,
  themeName: 'classicBlueTheme',
};

export { DEFAULT_SETTINGS };
