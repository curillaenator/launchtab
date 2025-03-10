import { useEffect, useRef } from 'react';
import { toPairs } from 'lodash';
import { TTheme } from '@launch-ui/theme';

import { DRAWER_PORTAL_ID } from '../layout/constants';

const traverseTheme = (map: Map<string, string>, val: Record<string, unknown> | string, path: string[]) => {
  if (typeof val === 'string') return map.set('--'.concat(path.join('-')), val);

  toPairs(val).forEach(([themeKey, themeVal]) =>
    traverseTheme(map, themeVal as Record<string, unknown>, [...path, themeKey]),
  );
};

const useThemeToCssv = (theme: TTheme) => {
  const layoutRef = useRef<HTMLDivElement | null>(null);

  const cssv = useRef(new Map<string, string>());

  useEffect(() => {
    cssv.current.clear();

    // @ts-expect-error
    traverseTheme(cssv.current, theme, ['theme']);

    cssv.current.forEach((cssvVal, cssvKey) => layoutRef.current?.style.setProperty(cssvKey, cssvVal));

    const drawerContainer = document.getElementById(DRAWER_PORTAL_ID);

    if (!!drawerContainer) {
      cssv.current.forEach((cssvVal, cssvKey) => drawerContainer.style.setProperty(cssvKey, cssvVal));
    }
  }, [theme]);

  return { layoutRef };
};

export { useThemeToCssv };
