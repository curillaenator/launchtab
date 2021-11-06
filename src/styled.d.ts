import "styled-components";
import { TTheme } from "./colors/interfaces";

declare module "styled-components" {
  export interface DefaultTheme extends TTheme {}
}
