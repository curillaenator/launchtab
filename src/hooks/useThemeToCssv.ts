import { useEffect, useRef } from 'react';
import { toPairs } from 'lodash';
import { TTheme } from '@launch-ui/theme';

const traverseTheme = (map: Map<string, string>, val: Record<string, unknown> | string, path: string[]) => {
  if (typeof val === 'string') return map.set('--'.concat(path.join('-')), val);

  toPairs(val).forEach(([themeKey, themeVal]) =>
    traverseTheme(map, themeVal as Record<string, unknown>, [...path, themeKey]),
  );
};

const useThemeToCssv = (theme: TTheme) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const cssv = useRef(new Map<string, string>());

  useEffect(() => {
    cssv.current.clear();

    traverseTheme(cssv.current, theme, ['theme']);

    console.log('cssv.current', cssv.current);

    cssv.current.forEach((cssvVal, cssvKey) => ref.current?.style.setProperty(cssvKey, cssvVal));
  }, [theme]);

  return { ref };
};

export { useThemeToCssv };
