import 'styled-components';
import type { TTheme } from '@launch-ui/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends TTheme {} // eslint-disable-line @typescript-eslint/no-empty-interface
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
