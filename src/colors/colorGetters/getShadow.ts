import { colorsLib } from '../colors';

const hexTrasparent = (hex: string, opacity: number) => {
  const hexA = Math.ceil(255 * opacity).toString(16);
  return `${hex}${hexA}`;
};

export const getThemeShadowsWithColors = (primaryColor: string, darkMode: boolean) => {
  const shadowsStaticLightMode = {
    basic: `
      0px 4px 12px ${hexTrasparent(colorsLib.liver[900], 0.2)},
      0px 8px 24px ${hexTrasparent(colorsLib.liver[900], 0.15)},
      0px 16px 48px ${hexTrasparent(colorsLib.liver[900], 0.1)}
    `,
  };

  const shadowsStaticDarkMode = {
    basic: 'none',
  };

  const shadowsStatic = darkMode ? shadowsStaticDarkMode : shadowsStaticLightMode;

  return {
    shadows: {
      // shadows depending on primary theme color
      largeCtaButton: `0px 12px 21.5219px -4px ${primaryColor}5C, 0px 3.22593px 11.7019px -4px ${primaryColor}DC`,
      largeCtaButtonHover: ``,
      largeCtaButtonActive: ``,

      mediumCtaButton: `0px 12px 21.5219px -4px ${primaryColor}5C, 0px 3.22593px 11.7019px -4px ${primaryColor}DC`,
      mediumCtaButtonHover: ``,
      mediumCtaButtonActive: ``,

      largeSecondaty: ``,
      mediumSecondaryButton: ``,

      filter: {
        cardTitleShadow: `drop-shadow(0px 0px 4px ${primaryColor})`,
      },

      // static shadows
      ...shadowsStatic,
    },
  };
};
