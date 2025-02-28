import { hsla, hexa, neutrals, colors } from './utils';
import type { ModedSet, ColorSet, ShadowsSet, ColorKey } from './interfaces';

const colorsLib = {
  white: 'hsl(0, 0%, 100%)',
  black: 'hsl(0, 0%, 0%)',

  neutral: neutrals(40),

  electroviolet: colors(263, 100, 59), //  hsl(263, 100%, 59%)
  phlox: colors(299, 86, 39), //  hsl(299, 86%, 39%)
  awesome: colors(346, 96, 56), //  hsl(346, 96%, 56%)
  danger: colors(4, 100, 46), //  hsl(4, 100%, 46%)
  ultra: colors(223, 86, 57), //  hsl(223, 86%, 57%)
  orange: colors(18, 100, 54), //  hsl(18, 100%, 54%)
  nika: colors(86, 81, 38), //  hsl(86, 81%, 38%)
  malachite: colors(143, 71, 44), //  hsl(143, 71%, 44%)
  aquamarina: colors(180, 92, 44), //  hsl(180, 92%, 44%)
  yellamerica: colors(47, 97, 47), //  hsl(47, 97%, 47%)
};

const lightModeColors: ModedSet = {
  texts: {
    base: colorsLib.neutral[900],
    inversedBase: colorsLib.neutral[100],
    sub: colorsLib.neutral[400],
    disabled: colorsLib.neutral[200],

    codeblock: colorsLib.neutral[100],

    error: colorsLib.danger[500],
    success: colorsLib.nika[500],

    placeholder: colorsLib.neutral[500],
    inputColor: colorsLib.neutral[900],
  },

  icons: {
    dark: colorsLib.neutral[400],
    darkHover: colorsLib.neutral[500],
    light: colorsLib.neutral[100],
    lightHover: colorsLib.neutral[200],
  },

  borders: {
    base: colorsLib.neutral[200],
  },

  backgrounds: {
    base: colorsLib.white,
    base20: hexa(colorsLib.white, 0.2),
    base40: hexa(colorsLib.white, 0.4),

    dark: colorsLib.neutral[100],
    light: colorsLib.neutral[100],

    codeblock: colorsLib.neutral[700],
  },

  modals: {
    matte: hsla(colorsLib.neutral[100], 0.4),
  },
};

const darkModeColors: ModedSet = {
  texts: {
    base: colorsLib.neutral[100],
    inversedBase: colorsLib.neutral[900],
    sub: colorsLib.neutral[600],
    disabled: colorsLib.neutral[800],

    codeblock: colorsLib.neutral[100],

    error: colorsLib.danger[500],
    success: colorsLib.nika[500],

    placeholder: colorsLib.neutral[400],
    inputColor: colorsLib.neutral[100],
  },

  icons: {
    dark: colorsLib.neutral[700],
    darkHover: colorsLib.neutral[600],
    light: colorsLib.neutral[200],
    lightHover: colorsLib.neutral[100],
  },

  borders: {
    base: colorsLib.neutral[400],
  },

  backgrounds: {
    base: colorsLib.neutral[900],
    base20: hsla(colorsLib.neutral[900], 0.4),
    base40: hsla(colorsLib.neutral[900], 0.6),

    dark: colorsLib.neutral[800],
    light: colorsLib.neutral[600],

    codeblock: colorsLib.neutral[700],
  },

  modals: {
    matte: hsla(colorsLib.neutral[900], 0.8),
  },
};

const getDarkModePrimarySet = (primaryColorSet: ColorSet): ColorSet =>
  // @ts-expect-error
  Object.fromEntries(
    Object.keys(primaryColorSet).map((colorkey) => [
      (1000 - +colorkey) as ColorKey,
      primaryColorSet[+colorkey as ColorKey] as string,
    ]),
  );

const getLightModeShadows = (primaryColorSet: ColorSet): ShadowsSet => ({
  header: `0px 0px 8px ${hsla(primaryColorSet[500], 0.3)}`,
  card: `0px 0px 8px ${hsla(primaryColorSet[500], 0.15)}`,
  drawer: `0px 0px 8px ${hsla(colorsLib.neutral[900], 0.15)}`,
  primary: `0px 2px 6px ${hsla(primaryColorSet[500], 0.8)}`,
});

const getDarkModeShadows = (primaryColorSet: ColorSet): ShadowsSet => ({
  header: `0px 0px 8px ${hsla(primaryColorSet[500], 0.3)}`,
  card: `0px 0px 8px ${hsla(colorsLib.neutral[700], 0.5)}`,
  drawer: `0px 0px 8px ${hsla(colorsLib.neutral[700], 0.5)}`,
  primary: `0px 2px 6px ${hsla(primaryColorSet[500], 0.8)}`,
});

export { colorsLib, lightModeColors, darkModeColors, getLightModeShadows, getDarkModeShadows, getDarkModePrimarySet };
