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

//  hsl(223, 86%, 57%)
//  hsl(4, 100%, 46%)
//  hsl(263, 100%, 59%)
//  hsl(86, 81%, 38%)
//  hsl(143, 71%, 44%)
//  hsl(18, 100%, 54%)
//  hsl(346, 96%, 56%)
//  hsl(299, 86%, 39%)

const THEME_NAMES_TO_NEUTRAL_SAT: Record<TThemeName, number> = {
  classicBlueTheme: 223,
  dangerRed: 184,
  defaultTheme: 263 - 180,
  radioactiveGreenTheme: 86 + 180,
  greenTheme: 143 + 180,
  sunnyOrange: 198,
  awesome: 346 - 180,
  phlox: 299 - 180,
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
