import { useUnit as useEffectorUnit } from 'effector-react';

import { $settingsStore } from '@src/entities/settings';

import {
  themes,
  colorsLib,
  getNeutralSet,
  getLightModeColors,
  getDarkModeColors,
  getDarkModeShadows,
  getLightModeShadows,
  getDarkModePrimarySet,
  type TTheme,
  type TThemeName,
} from '@launch-ui/theme';

const THEME_NAMES_TO_NEUTRAL_SAT: Record<TThemeName, number> = {
  classicBlueTheme: 170,
  dangerRed: 180,
  defaultTheme: 140,
  radioactiveGreenTheme: 270,
  sunnyOrange: 220,
  awesome: 170,
  greenTheme: 270,
  phlox: 150,
};

export const useThemeComposer = (): TTheme => {
  const { themeName, darkMode } = useEffectorUnit($settingsStore);

  const accent = darkMode ? getDarkModePrimarySet(themes[themeName].primary) : themes[themeName].primary;

  const neutral = getNeutralSet(THEME_NAMES_TO_NEUTRAL_SAT[themeName], 10);

  const modedColors = darkMode ? getDarkModeColors(neutral) : getLightModeColors(neutral);

  const shadows = darkMode
    ? getDarkModeShadows(themes[themeName].primary, neutral)
    : getLightModeShadows(themes[themeName].primary, neutral);

  return {
    white: colorsLib.white,
    black: colorsLib.black,
    neutral,
    accent,
    shadows,

    ...themes[themeName],

    ...modedColors,
  };
};
