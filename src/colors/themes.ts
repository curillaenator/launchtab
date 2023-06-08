import { colorsLib } from './colors';

export const themeNames: { [title: string]: string } = {
  defaultTheme: 'Default Violet',
  dangerRed: 'Danger Red',
  awesome: 'Awesome Pinkish',
  phlox: 'Phlox ultra',
  classicBlueTheme: 'Classic Blue',
  greenTheme: 'Light green',
  radioactiveGreenTheme: 'Radioactive Green',
  sunnyOrange: 'Sunset Orange',
};

export const themes = {
  defaultTheme: {
    primary: colorsLib.electroviolet,
    secondary: colorsLib.electroviolet,
  },
  awesome: {
    primary: colorsLib.awesome,
    secondary: colorsLib.awesome,
  },
  classicBlueTheme: {
    primary: colorsLib.ultra,
    secondary: colorsLib.ultra,
  },
  dangerRed: {
    primary: colorsLib.danger,
    secondary: colorsLib.danger,
  },
  greenTheme: {
    primary: colorsLib.malachite,
    secondary: colorsLib.malachite,
  },
  radioactiveGreenTheme: {
    primary: colorsLib.nika,
    secondary: colorsLib.nika,
  },
  sunnyOrange: {
    primary: colorsLib.orange,
    secondary: colorsLib.orange,
  },
  phlox: {
    primary: colorsLib.phlox,
    secondary: colorsLib.phlox,
  },
};

export type TThemeName = keyof typeof themes;
