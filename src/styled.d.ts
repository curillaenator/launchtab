import 'styled-components';
import { TTheme } from './colors/interfaces';

declare module 'styled-components' {
  export interface DefaultTheme extends TTheme {} // eslint-disable-line @typescript-eslint/no-empty-interface
}
