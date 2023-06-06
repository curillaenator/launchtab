export const getThemeShadowsWithColors = (primaryColor: string, darkMode: boolean) => {
  const shadowsStaticLightMode = {
    basic:
      '0px 1px 0px rgba(132, 132, 182, 0.07), 0px 67px 71px -4px rgba(17, 7, 30, 0.04), 0px 43.077px 50.8258px -4px rgba(17, 7, 30, 0.0222), 0px 24.6907px 38px 7px rgba(17, 7, 30, 0.0278), 0px 11.5156px 21.5219px -4px rgba(17, 7, 30, 0.046), 0px 3.22593px 11.7019px -4px rgba(17, 7, 30, 0.0462)',
    card: '0px 67px 71px -4px rgba(17, 7, 30, 0.04), 0px 43.077px 50.8258px -4px rgba(17, 7, 30, 0.0222), 0px 24.6907px 38px 7px rgba(17, 7, 30, 0.0278), 0px 11.5156px 21.5219px -4px rgba(17, 7, 30, 0.046), 0px 3.22593px 11.7019px -4px rgba(17, 7, 30, 0.0462)',
  };

  const shadowsStaticDarkMode = {
    basic:
      '0px 1px 0px rgba(20, 20, 26, 0.33), 0px 24.6907px 38px 7px rgba(21, 18, 24, 0.28), 0px 11.5156px 21.5219px -4px rgba(21, 16, 27, 0.4), inset 0px -1px 1px rgba(24, 20, 29, 0.38)',
    card: '0px 1px 0px rgba(20, 20, 26, 0.31), 0px 24.6907px 38px 7px rgba(21, 18, 24, 0.28), 0px 11.5156px 21.5219px -4px rgba(21, 16, 27, 0.4), inset 0px -1px 1px rgba(24, 20, 29, 0.24)',
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
