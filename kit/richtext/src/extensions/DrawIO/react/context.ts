import { createContext, useContext } from 'react';

import type { UiWidgetProps } from './interfaces';

interface DrawioContextType extends UiWidgetProps {
  dataTestId?: string;
  src: string | null;
  toggleDrawIo: (targetSrc?: string) => void;
}

const $drawioContext = createContext<DrawioContextType>(
  //@ts-expect-error
  {},
);

const useDrawioContext = () => useContext($drawioContext);

export { $drawioContext, useDrawioContext };
