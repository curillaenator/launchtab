import { hexa } from './utils';

export const colorsLib = {
  white: '#FFFFFF',
  black: '#000000',
  electroviolet: {
    50: '#F5EFFF',
    100: '#EBDEFF',
    200: '#D0B4FF',
    300: '#B181FF',
    400: '#9859FF',
    500: '#7E2FFF',
    600: '#6526CC',
    700: '#4B1C98',
    800: '#3C167A',
    900: '#2D115C',
  },
  phlox: {
    50: '#fdecfd',
    100: '#fadafb',
    200: '#f4a9f6',
    300: '#ed6fef',
    400: '#e741ea',
    500: '#e111e5',
    600: '#b40eb7',
    700: '#860a88',
    800: '#6c086e',
    900: '#510653',
  },
  awesome: {
    50: '#ffeef2',
    100: '#fedde5',
    200: '#feb0c3',
    300: '#fd7b9a',
    400: '#fc5179',
    500: '#fb2558',
    600: '#c91e46',
    700: '#961634',
    800: '#78122a',
    900: '#5b0d20',
  },
  danger: {
    50: '#feeceb',
    100: '#fcd9d7',
    200: '#f8a8a3',
    300: '#f36d65',
    400: '#f03e33',
    500: '#ec0e00',
    600: '#bd0b00',
    700: '#8d0800',
    800: '#710700',
    900: '#550500',
  },
  orange: {
    50: '#fff2ec',
    100: '#ffe5da',
    200: '#ffc4aa',
    300: '#ff9c71',
    400: '#ff7c43',
    500: '#ff5b14',
    600: '#cc4910',
    700: '#98360c',
    800: '#7a2c0a',
    900: '#5c2107',
  },
  yellamerica: {
    50: '#fefaeb',
    100: '#fcf4d8',
    200: '#f8e6a4',
    300: '#f4d567',
    400: '#f1c836',
    500: '#edba04',
    600: '#be9503',
    700: '#8d6f02',
    800: '#715902',
    900: '#554301',
  },
  nika: {
    50: '#f5fced',
    100: '#ecf9db',
    200: '#d3f2ab',
    300: '#b5e973',
    400: '#9de245',
    500: '#84db17',
    600: '#6aaf12',
    700: '#4f820e',
    800: '#3f690b',
    900: '#304f08',
  },
  malachite: {
    50: '#EEFEF4',
    100: '#DDFDEA',
    200: '#B2FACE',
    300: '#7EF6AD',
    400: '#54F392',
    500: '#29F077',
    600: '#21C05F',
    700: '#188F47',
    800: '#147339',
    900: '#0F572B',
  },
  aquamarina: {
    50: '#ecfcfc',
    100: '#d8f9f9',
    200: '#a6f1f1',
    300: '#6ae7e7',
    400: '#3adfdf',
    500: '#09d7d7',
    600: '#07acac',
    700: '#058080',
    800: '#046767',
    900: '#034e4e',
  },
  ultra: {
    50: '#eff3fe',
    100: '#dfe7fd',
    200: '#b6c9fa',
    300: '#85a4f6',
    400: '#5d87f3',
    500: '#3569f0',
    600: '#2a54c0',
    700: '#203f8f',
    800: '#193273',
    900: '#132657',
  },
  silveria: {
    50: '#F9F9F9',
    100: '#F2F2F4',
    200: '#E2E2E5',
    300: '#CECED4',
    400: '#BEBEC6',
    500: '#AEAEB8',
    600: '#8B8B93',
    700: '#68686E',
    800: '#535358',
    900: '#3F3F42',
  },
  liver: {
    50: '#F1F1F2',
    100: '#E4E3E4',
    200: '#C0BFC1',
    300: '#969598',
    400: '#757276',
    500: '#524F54',
    600: '#423F43',
    700: '#312F32',
    800: '#272628',
    900: '#1E1C1E',
  },
};

export const colorsStaticLightMode = {
  texts: {
    base: colorsLib.liver[900],
    inversedBase: colorsLib.liver[100],
    sub: colorsLib.liver[400],
    disabled: colorsLib.liver[200],

    error: colorsLib.danger[500],
    success: colorsLib.nika[500],

    placeholder: colorsLib.liver[300],
    inputColor: colorsLib.liver[900],
  },

  icons: {
    dark: colorsLib.liver[400],
    darkHover: colorsLib.liver[500],
    light: colorsLib.liver[100],
    lightHover: colorsLib.liver[200],
  },

  backgrounds: {
    base: colorsLib.white,
    light: colorsLib.liver[100],
    lightest: colorsLib.liver[50],
    base20: hexa(colorsLib.white, 0.2),
    base40: hexa(colorsLib.white, 0.4),
  },

  modals: {
    matte: hexa(colorsLib.liver[100], 0.4),
  },
};

export const colorsStaticDarkMode = {
  texts: {
    base: colorsLib.liver[100],
    inversedBase: colorsLib.liver[900],
    sub: colorsLib.liver[600],
    disabled: colorsLib.liver[800],
    error: colorsLib.danger[500],
    success: colorsLib.nika[500],

    placeholder: colorsLib.liver[700],
    inputColor: colorsLib.liver[200],
  },

  icons: {
    dark: colorsLib.liver[700],
    darkHover: colorsLib.liver[600],
    light: colorsLib.liver[200],
    lightHover: colorsLib.liver[100],
  },

  backgrounds: {
    base: colorsLib.liver[900],
    light: colorsLib.liver[800],
    lightest: colorsLib.liver[700],
    base20: hexa(colorsLib.liver[900], 0.4),
    base40: hexa(colorsLib.liver[900], 0.6),
  },

  modals: {
    matte: hexa(colorsLib.liver[900], 0.8),
  },
};

export const shadowsStaticLightMode = (primaryColor: string) => ({
  card: `0px 0px 10px ${hexa(colorsLib.liver[900], 0.35)}`,
  primary: `0px 6px 8px ${hexa(primaryColor, 0.8)}`,
});

export const shadowsStaticDarkMode = (primaryColor: string) => ({
  card: `0px 0px 12px ${hexa(colorsLib.liver[800], 0.8)}`,
  primary: `0px 6px 8px ${hexa(primaryColor, 0.8)}`,
});
