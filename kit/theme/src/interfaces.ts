type ColorKey = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type ColorSet = Record<ColorKey, string>;

interface ModedSet {
  texts: {
    base: string;
    inversedBase: string;
    sub: string;
    disabled: string;

    codeblock: string;

    error: string;
    success: string;

    placeholder: string;
    inputColor: string;
  };

  icons: {
    dark: string;
    darkHover: string;
    light: string;
    lightHover: string;
  };

  borders: {
    base: string;
  };

  backgrounds: {
    base: string;
    base20: string;
    base40: string;

    dark: string;
    light: string;

    codeblock: string;
  };

  modals: {
    matte: string;
  };
}

interface ShadowsSet {
  header: string;
  card: string;
  primary: string;
  drawer: string;
}

interface LaunchTheme extends ModedSet {
  white: string;
  black: string;
  primary: ColorSet;
  accent: ColorSet;
  neutral: ColorSet;
  secondary: ColorSet;
  shadows: ShadowsSet;
}

export type { LaunchTheme as TTheme, ColorSet, ColorKey, ModedSet, ShadowsSet };
