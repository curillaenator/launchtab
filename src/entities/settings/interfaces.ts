import type { TThemeName } from '@launch-ui/theme';

interface SettingsStore {
  isDynamicWallpaper: boolean;
  dynamicWallpaper: 'clouds' | 'beach';
  wallpaper: string | null;
  darkMode: boolean;
  themeName: TThemeName;
}

export type { SettingsStore };
