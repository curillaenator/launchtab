import { colorsLib } from '../colors';

const hexTrasparent = (hex: string, opacity: number) => {
  const hexA = Math.ceil(255 * opacity).toString(16);
  return `${hex}${hexA}`;
};

export const getThemeShadowsWithColors = (primaryColor: string, darkMode: boolean) => {
  const shadowsStaticLightMode = {
    basic: `
      0px 4px 12px ${hexTrasparent(colorsLib.liver[600], 0.2)},
      0px 8px 24px ${hexTrasparent(colorsLib.liver[600], 0.15)},
      0px 16px 48px ${hexTrasparent(colorsLib.liver[600], 0.1)}
    `,
    dropdown: `
      0px 4px 12px ${hexTrasparent(colorsLib.liver[600], 0.2)},
      0px 8px 24px ${hexTrasparent(colorsLib.liver[600], 0.15)},
      0px 16px 48px ${hexTrasparent(colorsLib.liver[600], 0.1)}
    `,
    card: `0px 4px 6px ${hexTrasparent(colorsLib.liver[600], 0.2)}`,
    card2: `0px 8px 12px ${hexTrasparent(colorsLib.liver[600], 0.2)}`,
  };

  const shadowsStaticDarkMode = {
    basic: `
      0px 4px 12px ${hexTrasparent(colorsLib.liver[800], 0.2)},
      0px 8px 24px ${hexTrasparent(colorsLib.liver[800], 0.15)},
      0px 16px 48px ${hexTrasparent(colorsLib.liver[800], 0.1)}
    `,
    dropdown: `
      0px 2px 24px ${hexTrasparent(colorsLib.liver[700], 0.15)}
    `,
    card: `0px 4px 6px ${hexTrasparent(colorsLib.liver[800], 0.2)}`,
    card2: `0px 8px 12px ${hexTrasparent(colorsLib.liver[800], 0.2)}`,
  };

  const shadowsStatic = darkMode ? shadowsStaticDarkMode : shadowsStaticLightMode;

  return {
    shadows: {
      // shadows depending on primary theme color
      largeCtaButton: `0px 12px 21.5219px -4px ${primaryColor}5C, 0px 3.22593px 11.7019px -4px ${primaryColor}DC`,
      mediumCtaButton: `0px 12px 21.5219px -4px ${primaryColor}5C, 0px 3.22593px 11.7019px -4px ${primaryColor}DC`,

      // static shadows
      ...shadowsStatic,
    },
  };
};
