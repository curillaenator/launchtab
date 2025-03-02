import { hsla, colors } from './utils';
import type { ModedSet, ColorSet, ShadowsSet, ColorKey } from './interfaces';

const colorsLib = {
  white: 'hsl(0, 0%, 100%)',
  black: 'hsl(0, 0%, 0%)',

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

const getLightModeColors = (neutral: ColorSet): ModedSet => ({
  texts: {
    base: neutral[900],
    inversedBase: neutral[100],
    sub: neutral[400],
    disabled: neutral[200],

    codeblock: neutral[100],

    error: colorsLib.danger[500],
    success: colorsLib.nika[500],

    placeholder: neutral[400],
    inputColor: neutral[900],
  },

  icons: {
    dark: neutral[400],
    darkHover: neutral[500],
    light: neutral[100],
    lightHover: neutral[200],
  },

  borders: {
    base: neutral[200],
  },

  backgrounds: {
    base: colorsLib.white,
    base20: hsla(colorsLib.white, 0.2),
    base40: hsla(colorsLib.white, 0.4),

    dark: neutral[100],
    light: neutral[100],

    codeblock: neutral[700],
  },

  modals: {
    matte: hsla(neutral[100], 0.4),
  },
});

const getDarkModeColors = (neutral: ColorSet): ModedSet => ({
  texts: {
    base: neutral[100],
    inversedBase: neutral[900],
    sub: neutral[600],
    disabled: neutral[800],

    codeblock: neutral[100],

    error: colorsLib.danger[500],
    success: colorsLib.nika[500],

    placeholder: neutral[400],
    inputColor: neutral[100],
  },

  icons: {
    dark: neutral[700],
    darkHover: neutral[600],
    light: neutral[200],
    lightHover: neutral[100],
  },

  borders: {
    base: neutral[400],
  },

  backgrounds: {
    base: neutral[900],
    base20: hsla(neutral[900], 0.4),
    base40: hsla(neutral[900], 0.6),

    dark: neutral[800],
    light: neutral[600],

    codeblock: neutral[700],
  },

  modals: {
    matte: hsla(neutral[900], 0.8),
  },
});

const getDarkModePrimarySet = (primaryColorSet: ColorSet): ColorSet =>
  // @ts-expect-error
  Object.fromEntries(
    Object.keys(primaryColorSet).map((colorkey) => [
      (1000 - +colorkey) as ColorKey,
      primaryColorSet[+colorkey as ColorKey] as string,
    ]),
  );

const getLightModeShadows = (primarySet: ColorSet, neutralSet: ColorSet): ShadowsSet => ({
  header: `0px 0px 8px ${hsla(primarySet[500], 0.3)}`,
  card: `0px 0px 8px ${hsla(primarySet[500], 0.15)}`,
  drawer: `0px 0px 8px ${hsla(neutralSet[900], 0.15)}`,
  primary: `0px 2px 6px ${hsla(primarySet[500], 0.8)}`,
});

const getDarkModeShadows = (primarySet: ColorSet, neutralSet: ColorSet): ShadowsSet => ({
  header: `0px 0px 8px ${hsla(primarySet[500], 0.3)}`,
  card: `0px 0px 8px ${hsla(neutralSet[700], 0.5)}`,
  drawer: `0px 0px 8px ${hsla(neutralSet[700], 0.5)}`,
  primary: `0px 2px 6px ${hsla(primarySet[500], 0.8)}`,
});

export {
  colorsLib,
  getLightModeColors,
  getDarkModeColors,
  getLightModeShadows,
  getDarkModeShadows,
  getDarkModePrimarySet,
};
