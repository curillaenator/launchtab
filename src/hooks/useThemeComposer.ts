import { useUnit as useEffectorUnit } from 'effector-react';

import { $settingsStore } from '@src/entities/settings';

import {
  themes,
  colorsLib,
  lightModeColors,
  darkModeColors,
  getDarkModeShadows,
  getLightModeShadows,
  getDarkModePrimarySet,
  type TTheme,
} from '@launch-ui/theme';

export const useThemeComposer = (): TTheme => {
  const { themeName, darkMode } = useEffectorUnit($settingsStore);

  const accent = darkMode
    ? { accent: getDarkModePrimarySet(themes[themeName].primary) }
    : { accent: themes[themeName].primary };

  const modedColors = darkMode ? darkModeColors : lightModeColors;

  const shadows = darkMode
    ? getDarkModeShadows(themes[themeName].primary)
    : getLightModeShadows(themes[themeName].primary);

  return {
    white: colorsLib.white,
    black: colorsLib.black,
    ...themes[themeName],
    ...modedColors,
    ...accent,
    shadows,
  };
};
