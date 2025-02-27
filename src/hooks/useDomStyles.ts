import { useEffect } from 'react';

import { useThemeComposer } from './useThemeComposer';

const useDomStyles = () => {
  const currentTheme = useThemeComposer();

  useEffect(() => {
    const html = document.querySelector('html');

    if (!!html) {
      html.style.setProperty('background-color', currentTheme.backgrounds.base);
      // html.style.setProperty('--scrollbar-thumb', currentTheme.primary[700]);
      // html.style.setProperty('--scrollbar-track', currentTheme.backgrounds.light);

      html.style.setProperty('--dwr-overlay-bgc', currentTheme.backgrounds.base40);
      html.style.setProperty('--drw-sh', currentTheme.shadows.card);
      html.style.setProperty('--drw-ct-gn', currentTheme.texts.base);
    }
  }, [currentTheme]);

  return { currentTheme };
};

export { useDomStyles };
