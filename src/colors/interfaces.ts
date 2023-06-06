import { colorsLib, colorsStaticLightMode } from './colors';
import { getThemeShadowsWithColors } from './colorGetters/getShadow';

const themeTemplate = {
  white: colorsLib.white,
  black: colorsLib.black,
  primary: colorsLib.electroviolet,
  secondary: colorsLib.electroviolet,
  ...colorsStaticLightMode,
  ...getThemeShadowsWithColors(colorsLib.electroviolet[500], false),
};

export type TTheme = typeof themeTemplate;
