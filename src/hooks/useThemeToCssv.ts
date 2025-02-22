import { useEffect, useRef } from 'react';
import { useTheme } from 'styled-components';
import { toPairs } from 'lodash';

const traverseTheme = (map: Map<string, string>, val: Record<string, unknown> | string, path: string[]) => {
  if (typeof val === 'string') return map.set('--'.concat(path.join('-')), val);

  toPairs(val).forEach(([themeKey, themeVal]) =>
    traverseTheme(map, themeVal as Record<string, unknown>, [...path, themeKey]),
  );
};

const useThemeToCssv = () => {
  const pageRef = useRef<HTMLDivElement | null>(null);

  const cssv = useRef(new Map<string, string>());

  const theme = useTheme();

  useEffect(() => {
    cssv.current.clear();

    traverseTheme(cssv.current, theme, ['theme']);

    cssv.current.forEach((cssvVal, cssvKey) => pageRef.current?.style.setProperty(cssvKey, cssvVal));

    console.log('traverseTheme', cssv.current.entries());
  }, [theme]);

  return {
    pageRef,
  };
};

export { useThemeToCssv };
