import { useUnit as useEffectorUnit } from 'effector-react';

import { $settingsStore } from '@src/entities/settings';

import {
  themes,
  colorsLib,
  colorsStaticDarkMode,
  colorsStaticLightMode,
  shadowsStaticDarkMode,
  shadowsStaticLightMode,
  type TTheme,
} from '@launch-ui/theme';

export const useThemeComposer = (): TTheme => {
  const { themeName, darkMode } = useEffectorUnit($settingsStore);

  const colorsStatic = darkMode ? colorsStaticDarkMode : colorsStaticLightMode;
  const primaryColor = themes[themeName].primary[500];
  const shadows = darkMode ? shadowsStaticDarkMode(primaryColor) : shadowsStaticLightMode(primaryColor);

  return {
    white: colorsLib.white,
    black: colorsLib.black,
    shadows,
    ...themes[themeName],
    ...colorsStatic,
  };
};
