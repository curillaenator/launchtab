import { useAppSelector } from '@src/hooks/hooks';

import {
  themes,
  colorsLib,
  colorsStaticDarkMode,
  colorsStaticLightMode,
  shadowsStaticDarkMode,
  shadowsStaticLightMode,
  type TTheme,
} from '@src/colors';

export const useThemeComposer = (): TTheme => {
  const { darkMode, themeName } = useAppSelector((state) => state.settings.lookfeel);

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
