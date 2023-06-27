import { colorsLib, colorsStaticLightMode } from './colors';
import { hexa } from './utils';

const themeTemplate = {
  white: colorsLib.white,
  black: colorsLib.black,
  primary: colorsLib.electroviolet,
  secondary: colorsLib.electroviolet,
  shadows: {
    card: `0px 0px 12px ${hexa(colorsLib.liver[800], 0.8)}`,
    primary: `0px 6px 8px ${hexa(colorsLib.electroviolet[500], 0.8)}`,
  },
  ...colorsStaticLightMode,
};

export type TTheme = typeof themeTemplate;
