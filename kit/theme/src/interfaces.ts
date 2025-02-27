import { colorsLib, colorsStaticLightMode } from './colors';

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
    drawer: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const themeTemplate = {
  white: colorsLib.white,
  black: colorsLib.black,
  primary: colorsLib.electroviolet as ColorSet,
  secondary: colorsLib.electroviolet as ColorSet,
  shadows: {
    header: ``,
    card: ``,
    primary: ``,
    drawer: '',
  },
  ...colorsStaticLightMode,
};

type TTheme = typeof themeTemplate;

export type { TTheme, ColorSet, ColorKey, ThemeType };
