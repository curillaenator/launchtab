import { useMemo } from "react";
import { useAppSelector } from "../../hooks/hooks";

import { themes } from "../../colors/themes";
import { getThemeShadowsWithColors } from "../../colors/colorGetters/getShadow";
import * as allColors from "../../colors/colors";
import type { TTheme } from "../../colors/interfaces";

export const useThemeComposer = (): TTheme => {
  const darkMode = useAppSelector((state) => state.settings.lookfeel.darkMode);
  const themeName = useAppSelector(
    (state) => state.settings.lookfeel.themeName
  );

  const currentTheme = useMemo(() => {
    const colorsStatic = darkMode
      ? allColors.colorsStaticDarkMode
      : allColors.colorsStaticLightMode;

    return {
      white: allColors.colorsLib.white,
      black: allColors.colorsLib.black,
      ...themes[themeName],
      ...colorsStatic,
      ...getThemeShadowsWithColors(themes[themeName].primary[500], darkMode),
    };
  }, [themeName, darkMode]);

  return currentTheme;
};
