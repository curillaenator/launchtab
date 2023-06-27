import 'styled-components';
import type { TTheme } from '@launch-ui/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends TTheme {} // eslint-disable-line @typescript-eslint/no-empty-interface
}
