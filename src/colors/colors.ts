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
    title: {
      base: colorsLib.liver[900],
      sub: colorsLib.silveria[900],
      searchSub: colorsLib.silveria[100],
    },
    body: {
      paragraph: colorsLib.silveria[700],
      caption: colorsLib.silveria[500],
    },
    input: {
      placeholder: colorsLib.silveria[500],
      filled: colorsLib.silveria[900],
      caption: colorsLib.silveria[500],
      error: colorsLib.danger[500],
      success: colorsLib.nika[600],
    },
    button: {
      base: colorsLib.silveria[500],
      here: 500,
      hover: colorsLib.liver[900],
      danger: colorsLib.danger[400],
      dangerHover: colorsLib.danger[300],
    },
  },

  borderLines: colorsLib.silveria[100],

  search: {
    base: colorsLib.white,
    border: colorsLib.silveria[100],
    borderFocus: colorsLib.silveria[50],
    text: colorsLib.silveria[900],
    placeholder: colorsLib.silveria[500],
    clearIcon: colorsLib.silveria[500],
  },

  shapes: {
    base: '#F9F9FB',
    base20: '#FCFCFD66',
    hover: '#FCFCFD',
    hover20: '#FCFCFD9E',
  },

  icons: {
    dark: colorsLib.silveria[500],
    darkHover: colorsLib.liver[700],
    light: colorsLib.silveria[200],
    lightHover: colorsLib.liver[300],
  },

  imageEffects: {
    grayscaleAndBrightness: '',
    cardImageDarkMode: '',
    cardImageDarkModeHover: '',
  },

  background: colorsLib.white,

  modals: {
    matte: `rgba(244, 242, 245, 0.4)`,
  },
};

export const colorsStaticDarkMode = {
  texts: {
    title: {
      base: colorsLib.liver[900],
      sub: colorsLib.silveria[100],
      searchSub: colorsLib.silveria[100],
    },
    body: {
      paragraph: colorsLib.silveria[700],
      caption: colorsLib.silveria[900],
    },
    input: {
      placeholder: colorsLib.silveria[700],
      filled: colorsLib.silveria[200],
      caption: colorsLib.silveria[900],
      error: colorsLib.danger[500],
      success: colorsLib.nika[600],
    },
    button: {
      base: colorsLib.silveria[800],
      here: 500,
      hover: colorsLib.silveria[500],
      danger: colorsLib.danger[400],
      dangerHover: colorsLib.danger[300],
    },
  },

  borderLines: '#1F1D20',

  search: {
    base: 'none',
    border: '#1d1a1e',
    borderFocus: '#1F1D20',
    text: colorsLib.silveria[400],
    placeholder: colorsLib.liver[700],
    clearIcon: colorsLib.silveria[600],
  },

  shapes: {
    base: '#1F1D20',
    base20: '#1F1D2048',
    hover: '#252326',
    hover20: '#25232648',
  },

  icons: {
    dark: colorsLib.silveria[700],
    darkHover: colorsLib.liver[700],
    light: colorsLib.liver[700],
    lightHover: colorsLib.liver[500],
  },

  // -webkit-filter:  -moz-filter:

  imageEffects: {
    grayscaleAndBrightness: 'filter: grayscale(1) sepia(.0) brightness(.72) contrast(1.32)',
    cardImageDarkMode: 'saturate(.24) opacity(.72)',
    cardImageDarkModeHover: 'saturate(1) opacity(1)',
  },

  background: '#211F22',

  modals: {
    matte: 'rgba(19, 18, 19, 0.4)',
  },
};
