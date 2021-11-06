import { colorsLib } from "./colors";

export const themeNames: { [title: string]: string } = {
  defaultTheme: "Default",
  fireOrangeTheme: "Fire Orange",
  classicBlueTheme: "Classic Blue",
  radioactiveGreenTheme: "Radioactive Green",
  sunnyOrange: "Sunset Orange",
};

export const themes = {
  defaultTheme: {
    primary: colorsLib.electroviolet,
    secondary: colorsLib.aquamarina,
  },
  fireOrangeTheme: {
    primary: colorsLib.awesome,
    secondary: colorsLib.orange,
  },
  classicBlueTheme: {
    primary: colorsLib.ultra,
    secondary: colorsLib.malachite,
  },
  radioactiveGreenTheme: {
    primary: colorsLib.nika,
    secondary: colorsLib.malachite,
  },
  sunnyOrange: {
    primary: colorsLib.orange,
    secondary: colorsLib.orange,
  },
};

type TAllThemes = typeof themes;
export type TThemeName = keyof TAllThemes;
