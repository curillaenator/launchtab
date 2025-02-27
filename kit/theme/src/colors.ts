import { hsla, hexa, neutrals, colors } from './utils';

export const colorsLib = {
  white: '#FFFFFF',
  black: '#000000',

  neutral: neutrals(40),

  electroviolet: colors(263, 100, 59), // #7E2FFF, hsl(263, 100%, 59%)
  phlox: colors(299, 86, 39), // #b40eb7, hsl(299, 86%, 39%)
  awesome: colors(346, 96, 56), // #fb2558, hsl(346, 96%, 56%)
  danger: colors(4, 100, 46), // #ec0e00, hsl(4, 100%, 46%)
  ultra: colors(223, 86, 57), // #3569f0, hsl(223, 86%, 57%)
  orange: colors(18, 100, 54), // #ff5b14, hsl(18, 100%, 54%)
  nika: colors(86, 81, 38), // #84db17, hsl(86, 81%, 38%)
  malachite: colors(143, 71, 44), // #21C05F, hsl(143, 71%, 44%)
  aquamarina: colors(180, 92, 44), // #09d7d7, hsl(180, 92%, 44%)
  yellamerica: colors(47, 97, 47), // #edba04, hsl(47, 97%, 47%)
};

export const colorsStaticLightMode = {
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

export const colorsStaticDarkMode = {
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

export const shadowsStaticLightMode = (primaryColor: string) => ({
  header: `0px 0px 8px ${hsla(primaryColor, 0.3)}`,
  card: `0px 0px 8px ${hsla(primaryColor, 0.15)}`,
  drawer: `0px 0px 8px ${hsla(colorsLib.neutral[900], 0.15)}`,
  primary: `0px 2px 6px ${hsla(primaryColor, 0.8)}`,
});

export const shadowsStaticDarkMode = (primaryColor: string) => ({
  header: `0px 0px 8px ${hsla(primaryColor, 0.3)}`,
  card: `0px 0px 8px ${hsla(colorsLib.neutral[700], 0.5)}`,
  drawer: `0px 0px 8px ${hsla(colorsLib.neutral[700], 0.5)}`,
  primary: `0px 2px 6px ${hsla(primaryColor, 0.8)}`,
});
