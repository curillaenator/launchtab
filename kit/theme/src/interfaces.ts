import { colorsLib, colorsStaticLightMode } from './colors';
import { hexa } from './utils';

type ColorKey = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type ColorSet = Record<ColorKey, string>;

type StaticForModeColors = typeof colorsStaticLightMode;

interface ThemeType extends StaticForModeColors {
  white: string;
  black: string;
  primary: ColorSet;
  secondary: ColorSet;
  shadows: {
    header: string;
    card: string;
    primary: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const themeTemplate = {
  white: colorsLib.white,
  black: colorsLib.black,
  primary: colorsLib.electroviolet as ColorSet,
  secondary: colorsLib.electroviolet as ColorSet,
  shadows: {
    header: `0px 0px 12px ${hexa(colorsLib.liver[800], 0.8)}`,
    card: `0px 0px 12px ${hexa(colorsLib.liver[800], 0.8)}`,
    primary: `0px 6px 8px ${hexa(colorsLib.electroviolet[500], 0.8)}`,
  },
  ...colorsStaticLightMode,
};

type TTheme = typeof themeTemplate;

export type { TTheme, ColorSet, ColorKey, ThemeType };
